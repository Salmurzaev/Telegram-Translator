require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

const { Telegraf } = require('telegraf');
const translator = require('translation-google');

const bot = new Telegraf(process.env.TOKEN);
bot.start((ctx) => ctx.reply('Привет, какое слово перевести ?'));
bot.help((ctx) => ctx.reply('Переводчик с ru-en & en-ru'));

bot.on('message', async (ctx) => {
 
  const text = ctx.message.text;
  const username = ctx.message.from.username;
  if (/[а-я]/i.test(text)) {
    const translation = await translator(text, { from: 'ru', to: 'en' });
    return ctx.reply(translation.text);
  } else {
    const translation = await translator(text, { from: 'en', to: 'ru' });
    return ctx.reply(translation.text);
  }
});

bot.launch();

app.listen(PORT, () => {
  console.log('Server started on port', PORT)
})
