const TelegramBot = require('node-telegram-bot-api');

const TOKEN = '8102946239:AAFNNkcUuRA5VAsqJDUBq_w3s-vLCtBZvGo';
const WEB_APP_URL = 'https://resto-demo.vercel.app';

const bot = new TelegramBot(TOKEN, { polling: true });

console.log('🤖 RESTO Demo bot started!');

// /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || 'Гость';

  bot.sendMessage(chatId,
    `Привет, ${firstName}! 👋\n\nЭто демонстрация возможностей Telegram Mini App для ресторанов от нашей команды "PASEKA.IT"\n\nВ приложении показано, как может быть реализован следующий функционал:\n🍽️ Бронирование столиков\n📋 Меню с актуальными позициями\n🎫 Мероприятия и события\n🎁 Подарочные сертификаты\n\nНажмите кнопку ниже, чтобы открыть приложение:`,
    {
      reply_markup: {
        inline_keyboard: [[
          {
            text: '🍽️ Открыть приложение',
            web_app: { url: WEB_APP_URL }
          }
        ]]
      }
    }
  );
});

// /booking command
bot.onText(/\/booking/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId,
    '📅 Забронировать столик:\n\nВыберите ресторан и удобное время в приложении:',
    {
      reply_markup: {
        inline_keyboard: [[
          {
            text: '📅 Забронировать',
            web_app: { url: WEB_APP_URL }
          }
        ]]
      }
    }
  );
});

// /help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId,
    `ℹ️ Помощь\n\nДоступные команды:\n/start — Запустить приложение\n/booking — Забронировать столик\n/help — Эта справка\n\nИли просто нажмите кнопку меню "Открыть" внизу экрана.`
  );
});

// Handle errors
bot.on('polling_error', (error) => {
  console.error('Polling error:', error.code);
});

console.log('Bot is running...');
