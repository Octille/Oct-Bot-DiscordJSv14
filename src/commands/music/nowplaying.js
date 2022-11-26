const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const progressbar = require('string-progressbar');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('nowplaying')
		.setDescription('Shows current song playing in queue.'),
	async execute(interaction, client) {

        if (!interaction.member.voice.channel) return interaction.reply('**You must be in a voice channel to use this command!**');
        const queue = client.distube.getQueue(interaction);
        let queueDuration;
        let queueTimeLeft;
        try{
            queueDuration = queue.duration // in seconds
            queueTimeLeft = queue.currentTime // in seconds
        }catch(err){
            const emptyQueueEmbed = new EmbedBuilder()
            .setTitle("Empty queue")
            .setColor(0x5e6298)
            .setDescription(`There is no song currently playing on\n\`${interaction.guild.name}\``)
            .setFooter({text: `Play some music to use this command!`})
            return interaction.reply({ embeds: [emptyQueueEmbed] })
        }
        var formatedQueueTimeLeft = new Date(queueTimeLeft * 1000).toISOString().slice(11, 19);// in hh:mm:ss format
        
        if(queueDuration <= 3600){
            formatedQueueTimeLeft = new Date(queueTimeLeft * 1000).toISOString().slice(14, 19); // mm:ss format
        }
        var total = queueDuration;
        var current = queueTimeLeft;
        const size = 40
        let progressBar = progressbar.splitBar(total, current, size);


        if(!queue){
            const emptyQueueEmbed = new EmbedBuilder()
            .setTitle("Empty queue")
            .setColor(0x5e6298)
            .setDescription(`There is no song currently playing on\n\`${interaction.guild.name}\``)
            .setFooter({text: `Play some music to use this command!`})
            return interaction.reply({ embeds: [emptyQueueEmbed] })
        }

        const q = queue.songs.map((song, i) => `[${song.name}](${song.url})

        \`${progressBar[0]}\`
        🕒\`${formatedQueueTimeLeft}/${song.formattedDuration}\` | 👁️\`${song.views}\``)

        const songthumbnail = queue.songs.map((song, i) => 
            song.thumbnail
        )

        const embed = new EmbedBuilder()

        .setTitle('Now Playing')
        .setDescription(q[0])
        .setColor(0x5e6298)
        .setThumbnail(songthumbnail[0])
        .setFooter({text: "Invite Oct Bot using octbot.ml/invite!"})

        interaction.reply({ embeds: [embed]})

	},
}