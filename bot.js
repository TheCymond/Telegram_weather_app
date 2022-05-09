const axios = require("axios");
const { Telegraf } = require("telegraf");
const TOKEN = "5374023067:AAEviazzWtjnal7nQDsscx03ER-inX-Tl8M";
const bot = new Telegraf(TOKEN);
const Url =
  'http://api.weatherstack.com/current?access_key=a4526f4e34340020b34865e2cc70d5d9&query="';

const fetchData = async (cityName) => {
  const res = await axios.get(`${Url + cityName}`);
  return res;
};

// fetchData("New York");

bot.start((ctx) => {
  ctx.reply("Hello im a bot");
});

bot.on("text", async (ctx) => {
  const { message } = ctx;
  const { data } = await fetchData(message.text);
  if (data.success === false) {
    ctx.reply("Enter a valid city name:");
  } else {
    const { current, location } = data;
    const weatherStatus = current.weather_descriptions[0];

    ctx.reply(
      `🌆 City:${location.name}\n-\n 🌡 Temperature ${
        current.temperature
      }°\n-\n❓ Weather status: ${
        (weatherStatus.toLowerCase().includes("clear") === true && "☀️") ||
        (weatherStatus.toLowerCase().includes("sunny") === true && "☀️") ||
        (weatherStatus.toLowerCase().includes("cloud") === true && "☁️") ||
        (weatherStatus.toLowerCase().includes("overcast") === true && "☁️") ||
        (weatherStatus.toLowerCase().includes("rain") === true && "🌧") ||
        (weatherStatus.toLowerCase().includes("snow") === true && "❄️")
      } ${current.weather_descriptions[0]}`
    );
  }
});

bot.launch();
