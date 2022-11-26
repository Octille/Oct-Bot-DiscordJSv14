const profileModel = require("../../models/profileSchema");
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
let itemCost = require('../../models/itemCost.json')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('buy')
		.setDescription('buy')
        .addStringOption(options =>
            options
            .setName('item')
            .setDescription('item')
            .setRequired(true)
            .addChoices(
                {name: 'Fishing Rod', value: 'Items'},
                {name: 'Cookie', value: 'Items.Cookies'}
                ))
            
        .addNumberOption(options =>
            options
            .setName('amount')
            .setDescription('Amount of items to buy.')),
	async execute(interaction, client) {
        const amount = interaction.options.getNumber('amount') || 1;
        const item = interaction.options.getString('item');
        const userData = profileModel.findOne({ userID: interaction.user.id });
        const itemString = item.valueOf()
        itemCost = JSON.stringify(itemCost)
        console.log(itemCost.get(itemString))


        
	},
}