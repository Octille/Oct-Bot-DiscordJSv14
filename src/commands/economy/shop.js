const profileModel = require("../../models/profileSchema");
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shop')
		.setDescription('shop'),
	async execute(interaction, client) {
        const shop1 = new EmbedBuilder()
        .setColor(0x5e6298)
        .setTitle('Shop')
        .addFields({name:`🍪 Cookie — **₪ 25**`, value: `This item is completely cosmetic for now.`})
        .addFields({name:`<:FishingRod:816342491111882782> Fishing Rod — **₪ 10,000**`, value: `Buying this will unlock \`/fish\``})
        .addFields({name:`coming soon . . . `, value: `Coming soon!`})
        .addFields({name:`coming soon . . . `, value: `Coming soon!`})
        .setFooter({text: 'page 1/1'})
        return interaction.reply({ embeds: [shop1] });
	},
}