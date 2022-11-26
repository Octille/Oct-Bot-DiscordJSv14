const profileModel = require("../../models/profileSchema");
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Replies with the balance of the user.')
        .addUserOption(option =>
			option
				.setName('user')
				.setDescription('balance of user')),
	async execute(interaction, client) {
        try {
            const user = interaction.options.getUser('user') || interaction.user;
            let profileData;
            try {
              profileData = await profileModel.findOne({ userID: user.id })
            } catch (err) {
              profileData = await profileModel.findOne({ userID:user.id })
            }
            const coins = profileData.coins;
            const bank = profileData.bank;
            const total = coins+bank;
            
              const Balance = new EmbedBuilder()
              .setColor("2F3136")
              .setAuthor({name: `${user.username}'s balance`, iconURL: user.displayAvatarURL({ dynamic: true })})
              .setDescription(`Wallet: **₪ ${profileData.coins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}**\n Bank: **₪ ${profileData.bank.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}** \nTotal net worth: **₪ ${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}**`)
              
              interaction.reply({ embeds: [Balance] });
              } catch (err){
                console.log(err)
                interaction.reply('**You or the person you mentioned does not have a bank.**')
              }
	},
}