const axios = require('axios');

const Prefixes = [
  '/ai',
  'kim',
  'Nemo',
  '+ai',
  'nemo',
  'ai',
  'ask',
'hinata',
];

module.exports = {
  config: {
    name: "ask",
    version: 1.0,
    author: "OtinXSandip",
    longDescription: "AI",
    category: "ai",
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
        await message.reply("〖ホ〗ᕼIᑎᗩTᗩ〖ホ〗     ⊙◎◎◎◎◎◎◎◎◎◎◎◎◎◎◎◎◎⊙  🤍𝙎𝙖𝙡𝙪𝙩 𝙢𝙤𝙞 𝙘'𝙚𝙨𝙩 𝙃𝙞𝙣𝙖𝙩𝙖❀ 𝙖𝙫𝙚𝙘 𝙢𝙤𝙣 𝘽𝙞𝙖𝙠𝙪𝙜𝙖𝙣 𝙟𝙚 𝙥𝙤𝙪𝙧𝙖𝙞𝙨 𝙩'𝙖𝙞𝙙𝙚𝙧 𝙙𝙖𝙣𝙨 𝙩𝙖 𝙢𝙞𝙨𝙨𝙞𝙤𝙣 💙");
        return;
      }


      const response = await axios.get(`https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;

 
    await message.reply({ body: `〖ホ〗ᕼIᑎᗩTᗩ〖ホ〗
 ⊙◎◎◎◎◎◎◎◎◎◎◎◎◎◎◎◎◎⊙        
${answer}
𝑬𝒏𝒐𝒄𝒌 𝒄𝒓𝒆́𝒂𝒕𝒊𝒐𝒏 🔵🔴`,
});

   } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
