const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction, client) {

        const embed = new EmbedBuilder()
        .setTitle('Bots ping')
        .setColor(0x0000FF)
        .setDescription(`🏓 | Latency is ${Date.now() - interaction.createdTimestamp}ms.
        📚 | API Latency is ${Math.round(client.ws.ping)}ms`); 
    
		await interaction.reply({ embeds: [embed] });
	},
}