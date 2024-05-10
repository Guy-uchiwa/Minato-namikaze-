const axios = require('axios');

const Prefixes = [
  '/ai',
  'kim',
  'sasuke',
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
        await message.reply("〖ホ〗ᕼIᑎᗩTᗩ〖❦〗     ●▬▬▬๑۩۩๑▬▬▬▬▬●  🤍𝙎𝙖𝙡𝙪𝙩 𝙢𝙤𝙞 𝙘'𝙚𝙨𝙩 𝙃𝙞𝙣𝙖𝙩𝙖𝄞 𝙌𝙪𝙚 𝙥𝙪𝙞𝙨-𝙟𝙚  𝙛𝙖𝙞𝙨 𝙥𝙤𝙪𝙨 𝙩𝙤𝙞 𝙖𝙪𝙟𝙤𝙪𝙧𝙙'𝙝𝙪𝙞? 💙");
        return;
      }


      const response = await axios.get(`https://sandipbaruwal.onrender.com/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;

 
    await message.reply({ body: `🤍༄◍𝖲𝖠𝖲𝖴𝖪𝖤◍༄💙
 ●▬▬▬▬๑۩۩๑▬▬▬▬●        
${answer}
●▬▬▬๑۩۩๑▬▬▬▬▬● ❦❦𝗀𝗎𝗒 𝒄𝒓𝒆́𝒂𝒕𝒊𝒐𝒏❦𝄞 `,
});

   } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
