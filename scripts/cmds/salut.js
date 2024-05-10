const axios = require('axios');

const Prefixes = [
  'salut',
  'bonsoir',
  'bonjour',
  'yo',
  'hi',
'cc',
];

module.exports = {
  config: {
    name: "salut",
    version: 1.0,
    author: "Enock",
    longDescription: "salut",
    category: "salut",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
   if (!prompt) {
        await message.reply(" 〖ホ〗༄ＳＡＳＵＫＥ༄〖ホ〗 ●▬▬▬๑۩۩๑▬▬▬▬▬●  𝄞𝘚𝘢𝘭𝘶𝘵 𝘮𝘰𝘪 𝘤'𝘦𝘴𝘵 𝗌𝖺𝗌𝗎𝗄𝖾 𝘕𝘰𝘶𝘣𝘭𝘪𝘦 𝘱𝘢𝘴 𝘥𝘦 𝘮𝘦 𝘱𝘰𝘴𝘦𝘳 𝘵𝘦𝘴 𝘱𝘳𝘰𝘣𝘭è𝘮𝘦𝘴 𝘫𝘦 𝘱𝘰𝘶𝘳𝘳𝘢𝘪𝘴 𝘵'𝘢𝘪𝘥𝘦𝘳 𝘨𝘳â𝘤𝘦 𝘢 𝘮𝘰𝘯 𝗌𝗁𝖺𝗋𝗂𝗇𝗀𝖺𝗇❦✾ ●▬▬▬▬๑۩۩๑▬▬▬▬●");
        return;
      }


      const response = await axios.get(`https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;

 
    await message.reply(answer);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
