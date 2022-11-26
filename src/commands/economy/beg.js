const profileModel = require("../../models/profileSchema");
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    cooldown: 60,
	data: new SlashCommandBuilder()
		.setName('beg')
		.setDescription('Beg for coins.'),
	async execute(interaction, client) {
        const randomNumber = Math.floor(Math.random() * 500) + 1;
        const response = await profileModel.findOneAndUpdate(
          {
            userID: interaction.user.id,
          },
          {
            $inc: {
              coins: randomNumber,
            },
            $set: {
              "cooldowns.Beg":  new Date(),
            }
          }
        );
       const messages = [`Charli D'Amelio threw **₪${randomNumber}** at you whilst dancing!`, `Ben Simmons shot a 3! Earning you **₪${randomNumber}**!`, `Your mom just donated **₪${randomNumber}** to the aids society which landed in your hands.`, `Steven Hawking just sent down **₪${randomNumber}** from heaven!`, `You decided that black lives matter and was donated **₪${randomNumber}**.`, `Oct (developer) sent you **₪${randomNumber}**!`, `Someone *finally* liked your tiktok earning you **₪${randomNumber}**!`, `A fan blew **₪${randomNumber}** at you.`, `Your friend lent you **₪${randomNumber}**. Remember to return it.`, `Bella Poarch liked your tiktok and earned you fame! **₪${randomNumber}** was earned!`, `You woke up and it was time to go to school. Your alarm clock exploded releasing **₪${randomNumber}**.`, `Your laptop exploded in class and **₪${randomNumber}** fell out!`, `You robbed a bank for **₪${randomNumber}**!`, `You robbed a pawn shop for **₪${randomNumber}**.`, `You met Logan Paul and used it as clickbait earning you **₪${randomNumber}**.`, `You decided to go for a walk after finding out you cannot afford that new keyboard you wanted. You found **₪${randomNumber}** outside! Walking is great.`, `You became a Trump supporter earning you **₪${randomNumber}**. ***the dev is Canadian and neutral on the topic.***`, `You supported Biden and earned **₪${randomNumber}**! ***the dev is Canadian and is neutral on the topic.***`, `You uploaded a TikTok and you were able to pull **₪${randomNumber}** from creator fund!`, `You died and went to hell. After dying there you went to heaven. You were revived and paid **₪${randomNumber}** because of your GoFundMe page you made for free money... atleast it worked`, `You were eating a burrito and managed to swallow **₪${randomNumber}**. Hey, atleast you got to collect it afterwards.`, `**₪${randomNumber}**`, `You paid **₪${randomNumber + 100}** and earned **₪${randomNumber}**...`, `You sold your kidneys for a whopping **₪${randomNumber}**!`, `Stan Lee sent you **₪${randomNumber}** from the upper lands.`, `You decided black lives dont matter and that all lives matter. The developer sent you **₪${randomNumber}**.`, `You were given **₪${randomNumber}**! Try "/balance" to see it`, `Stop begging! well, here's **₪${randomNumber}** since you asked so kindly.`, `You earned **₪${randomNumber}** after becoming a slut...`, `Your Oct Bot balance has been reset. jk here's **₪${randomNumber}** to make up for that.`, `You just earned **₪${randomNumber}** after selling your left kidney on the white market.`, `You revealed Obama\'s last name earning you **₪${randomNumber}**.`, `You discovered a meteor and the US Government gave you a 2 million dollar grant for it. However, after taxes you brought home a WHOPPING **₪${randomNumber}**!!!`]
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  
        return interaction.reply(randomMessage);
	},
}