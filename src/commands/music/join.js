const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, ChannelType } = require('discord.js');
const { joinVoiceChannel,  getVoiceConnection } = require('@discordjs/voice');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('joins channel.')
		.addChannelOption(option => (
			option
			.setName('voice-channel')
			.setDescription('Voice channel to join.')
			.setRequired(true)
			.addChannelTypes(ChannelType.GuildVoice)
		)),      
	async execute(interaction, client) {
        const voiceChannel = interaction.options.getChannel('voice-channel');
		joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: interaction.guildId,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		});
            const channeljoined = new EmbedBuilder()
            .setColor(0x5e6298)
            .setTitle(`Successfully Joined`)
            .setDescription(`Channel Name: \`${voiceChannel.name}\`
            Channel ID: \`${voiceChannel.id}\`
            Joined from: \`${interaction.channel.name}\``)
            .setFooter({ text: 'Try playing some music to unlock all the features!'})
            interaction.reply({ embeds : [channeljoined] })
	},
}