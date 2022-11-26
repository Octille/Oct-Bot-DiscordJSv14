const profileModel = require("../../models/profileSchema");
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDescription('Vote for Oct Bot on top.gg'),
	async execute(interaction, client) {
        const voteEmbed = new EmbedBuilder()
        .setColor(0xFFA500)
        .setTitle('Vote for Oct Bot!')
        .setDescription(`Vote Oct Bot on top.gg for free rewards!
        **Top.gg**
        [click here](https://top.gg/bot/741776473613926490/vote)

        Rewards:
        **₪ 500, 000**`)
        .setFooter({text: 'After voting you can check by doing /didivote.'})
        interaction.reply({ embeds: [voteEmbed] })
	},
}