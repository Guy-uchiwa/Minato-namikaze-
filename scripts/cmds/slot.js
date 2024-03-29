module.exports = {
  config: {
    name: "slot",
    version: "1.1",
    author: "Kshitiz x Gojo",
    role: 0,
    shortDescription: "𝐉𝐨𝐮𝐞 𝐚𝐮 𝐉𝐞𝐮𝐱 𝐒𝐥𝐨𝐭",
    longDescription: "𝐉𝐨𝐮𝐞 𝐚𝐮 𝐉𝐞𝐮𝐱 𝐒𝐥𝐨𝐭",
    category: "game",
    guide: {
      en: "{p}slot {money} / reply to gift box by number"
    }
  },

  onStart: async function ({ args, message, event, api, usersData }) {
    try {
      const amount = parseInt(args[0]);
      if (isNaN(amount) || amount <= 0) {
        return message.reply("༄𝑉𝑜𝑡𝑟𝑒 𝑚𝑜𝑛𝑡𝑎𝑛𝑡 𝑑'𝑎𝑟𝑔𝑒𝑛𝑡 𝑛'𝑒𝑠𝑡 𝑝𝑎𝑠 𝑉𝑎𝑙𝑙𝑖𝑑𝑒💰⚖️✍️");
      }

      const senderID = event.senderID;

      const userData = await usersData.get(senderID);

      if (amount > userData.money) {
        return message.reply("貧窮的  𝑉𝑜𝑡𝑟𝑒 𝑎𝑟𝑔𝑒𝑛𝑡 𝑛'𝑒𝑠𝑡 𝑝𝑎𝑠 𝑎𝑠𝑠𝑒𝑧 𝑝𝑜𝑢𝑟 𝑗𝑜𝑢𝑒𝑟 á 𝑐𝑒 𝑗𝑒𝑢𝑥 🈲🔒.");
      }

      const sentMessage = await message.reply("💌💌💌");

      const emojis = ['🖤', '🖤', '💝'];
      emojis.sort(() => Math.random() - 0.5); 

      const shuffledEmojis = emojis.join('');

      const gemPosition = emojis.indexOf('💝');

      global.GoatBot.onReply.set(sentMessage.messageID, {
        commandName: "slot",
        messageID: sentMessage.messageID,
        correctAnswer: gemPosition,
        amount: amount,
        senderID: senderID
      });

    } catch (error) {
      console.error("🙊𝐋𝐚 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞 𝐒𝐥𝐨𝐭:,𝐄𝐫𝐫𝐞𝐮𝐫😿");
      message.reply("😿𝐔𝐧𝐞 𝐞𝐫𝐫𝐞𝐮𝐫 𝐬'𝐞𝐬𝐭 𝐩𝐫𝐨𝐝𝐮𝐢𝐭𝐞");
    }
  },

  onReply: async function ({ message, event, Reply, api, usersData }) {
    try {
      if (!event || !message || !Reply) return; 
      const userAnswer = event.body.trim();

      if (isNaN(userAnswer) || userAnswer < 1 || userAnswer > 3) {
        return message.reply("☺️𝐌𝐞𝐫𝐜𝐢𝐞 𝐝𝐞 𝐫𝐞́𝐩𝐨𝐧𝐝𝐫𝐞 𝐚𝐯𝐞𝐜 𝐮𝐧 𝐜𝐡𝐢𝐟𝐟𝐫𝐞 𝐞𝐧𝐭𝐫𝐞 1 𝐞𝐭 3.");
      }

      const gemPosition = Reply.correctAnswer;
      const chosenPosition = parseInt(userAnswer) - 1; 

      const senderID = Reply.senderID;
      const userData = await usersData.get(senderID);

      if (chosenPosition === gemPosition) {
        const winnings = Reply.amount * 2;
        await usersData.set(senderID, { money: userData.money + winnings }); 
        await message.reply(`🎊𝙔𝙤𝙪𝙥𝙞𝙧𝙚🎉 𝙫𝙤𝙪𝙨 𝙖𝙫𝙚𝙯 𝙙é𝙘𝙖𝙞𝙨𝙨é📦🏷️ 𝙪𝙣𝙚 𝙨𝙤𝙢𝙢𝙚 𝙙𝙚 ${winnings} ᗴᖇᖇO💵💴💶💷 .`);
      } else {
        const lostAmount = Reply.amount;
        await usersData.set(senderID, { money: userData.money - lostAmount });
        await message.reply('🥺𝙏𝙤𝙪𝙩𝙚𝙨 𝙢𝙚𝙨 𝘾𝙤𝙣𝙙𝙤𝙡é𝙖𝙣𝙘𝙚𝙨 𝙫𝙤𝙪𝙨 𝙖𝙫𝙚𝙯 𝙥𝙚𝙧𝙙𝙪🤧.${lostAmount}.`);
      }

      const emojis = ['🖤', '🖤', '💝'];
      const revealedEmojis = emojis.map((emoji, index) => (index === gemPosition) ? '💝' : '🖤').join('');
      await api.editMessage(revealedEmojis, Reply.messageID);
    } catch (error) {
      console.error("Error while handling user reply:", error);
    }
  }
};
