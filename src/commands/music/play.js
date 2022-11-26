const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays music')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Input song title.')
                .setRequired(true)),

	async execute(interaction, client) {
        const voiceChannel = interaction.member.voice.channel
        if (!interaction.member.voice.channel) return interaction.reply('**You must be in a voice channel to use this command!**');
        const song = interaction.options.getString('query');
        client.distube.play(voiceChannel, song, {
            member: interaction.member,
            textChannel: interaction.channel
        })
        const searchingEmbed = new EmbedBuilder()
        .setDescription(`🔎 Searching \`${song}\``)
        .setColor(0x5e6298)
        interaction.reply({ embeds: [searchingEmbed] })



        
	},
}