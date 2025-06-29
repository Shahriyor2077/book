import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}
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
}
