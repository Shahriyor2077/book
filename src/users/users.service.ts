import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from "bcrypt";
import { PhoneUserDto } from "./dto/phone-user.dto";
import * as otpGenerator from "otp-generator"
import { BotService } from "src/bot/bot.service";
import { Otp } from "./models/otp.model";
import { AddMinutesToDate } from "src/common/helpers/addMinutes";
import { timestamp } from "rxjs";
import { encode } from "src/common/helpers/crypto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Otp) private readonly otpModel: typeof Otp,
  private readonly botService: BotService
) {}
  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);

    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashed_password,
    });

    //SendMail
    return newUser;
  }

  findAll() {
    return this.userModel.findAll();
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  findUserByActivationLink(activation_link: string) {
    return this.userModel.findOne({ where: { activation_link } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      const hashed_password = await bcrypt.hash(updateUserDto.password, 7);
      updateUserDto.password = hashed_password;
    }

    await user.update(updateUserDto);

    return user;
  }

  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    const updatedUser = await this.userModel.update(
      { refresh_token },
      { where: { id } }
    );
    return updatedUser;
  };

  async activateUser(link: string){
    if(!link){
      throw new BadRequestException("Activation link not found")
    }

    const updateUser=await this.userModel.update(
      {is_active: true},
      {
        where: {activation_link: link, 
          is_active: false
        },
        returning: true
      }
    )
    if(!updateUser[1][0]){
      throw new BadRequestException("User already activate")
    }
    return {
      message: "User activated successfully",
      is_active: updateUser[1][0].is_active
    };
  }

  async newOtp(phoneUserDto: PhoneUserDto){
    const phone_number=phoneUserDto.phone
    const otp=otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const isSend=await this.botService.sendOtp(phone_number, otp)
    if(!isSend){
      throw new BadRequestException("Avval botdan ro'yxatdan o'ting")
    }

    const now=new Date()
    const expiration_time=AddMinutesToDate(now, 5);
    await this.otpModel.destroy({where: {phone_number}});
    const dbOtp=await this.otpModel.create({
      otp, expiration_time, phone_number
    });
    const details={
      timestamp: now,
      phone_number,
      otp_id: dbOtp.id,
    };
    const encodedData=await encode(JSON.stringify(details))

    return {
      message: "Otp botga yuborildi",
      verification_code: encodedData
    }
  }

}
