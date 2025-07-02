import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Bot } from "./models/bot.model";
import { InjectBot } from "nestjs-telegraf";
import { BOT_NAME } from "../app.constants";
import { Context, Markup, Telegraf } from "telegraf";

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Bot) private readonly botModel: typeof Bot,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>
  ) {}

  async start(ctx: Context) {
    try {
      const user_id = ctx.from?.id;
      let user = await this.botModel.findByPk(user_id);

      if (!user) {
        user = await this.botModel.create({
          user_id: user_id!,
          username: ctx.from?.username!,
          first_name: ctx.from?.first_name!,
          last_name: ctx.from?.last_name!,
          language_code: ctx.from?.language_code!,
        });
      }

      if (!user.status) {
        await ctx.replyWithHTML(
          `Iltimos akkauntni faollashtirish uchun <b>☎Telefon raqamni yuborish</b> tugmasini bosing`,
          {
            ...Markup.keyboard([
              [Markup.button.contactRequest("☎Telefon raqamni yuborish")],
            ]).resize(),
          }
        );
      } else {
        await ctx.replyWithHTML(
          `Ushbu Bot InBook Premium foydalanuvchilari uchun kitob izlash imkonini beradi`,
          {
            ...Markup.removeKeyboard(),
          }
        );
      }
    } catch (error) {
      console.log(`Error on Start`, error);
    }
  }

  async onContact(ctx: Context) {
    try {
      if ("contact" in ctx.message!) {
        const user_id = ctx.from?.id;
        const user = await this.botModel.findByPk(user_id);
        if (!user) {
          await ctx.replyWithHTML(`Iltimos <b>Start</b> tugmasini bosing`, {
            ...Markup.keyboard([["/start"]]).resize(),
          });
        } else if (ctx.message.contact.user_id != user_id) {
          await ctx.replyWithHTML(
            `Iltimos o'zingizni telefon raqamingizni yuborish</b> yuboring`,
            {
              ...Markup.keyboard([
                [Markup.button.contactRequest("☎Telefon raqamni yuborish")],
              ]).resize(),
            }
          );
        } else {
          let phone = ctx.message.contact.phone_number;
          phone = phone[0] != "+" ? "+" + phone : phone;
          user.phone_number = ctx.message.contact.phone_number;
          user.status = true;
          await user.save();

          await ctx.replyWithHTML(`Tabriklayman akkaunt faollashtirildi`, {
            ...Markup.removeKeyboard(),
          });
        }
      }
    } catch (error) {
      console.log(`Error on Contact`, error);
    }
  }

  async onStop(ctx: Context){
    try {
        const user_id=ctx.from?.id;
        const user=await this.botModel.findByPk(user_id);
        if(!user){
            await ctx.replyWithHTML(`Siz avval ro'yxatdan o'tmagansiz`, {
                ...Markup.removeKeyboard(),
            });
        }else if(user.status){
            user.status=false;
            user.phone_number="";
            await user.save();
            await this.bot.telegram.sendChatAction(user.user_id, "typing")

            await ctx.replyWithHTML(`Siz vaqtincha botdan chiqib ketdingiz.Qayta faollashtirish uchun /start tugmasini bosing`, {
                ...Markup.keyboard([["/start"]]).resize()
            })
        }
    } catch (error) {
        console.log(`Error on Stop:`, error);
    }
  }

  async sendOtp(phone_number: string, OTP: string): Promise<boolean | undefined>{
    try {
        const user=await this.botModel.findOne({where: {phone_number}});
        if(!user || !user.status){
            return false;
        }

        await this.bot.telegram.sendMessage(user.user_id, `verify code: ${OTP}`);


        return true
    } catch (error) {
        console.log(`Error on sentOtp`, error);
    }
  }
}

