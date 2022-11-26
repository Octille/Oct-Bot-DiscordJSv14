const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('Resumes queue.'),
    async execute(interaction, client){
        if (!interaction.member.voice.channel) return interaction.reply('**You must be in a voice channel to use this command!**');
        const queue = client.distube.getQueue(interaction);
        if(!queue){
            const emptyQueueEmbed = new EmbedBuilder()
            .setTitle("Empty queue")
            .setColor(0x5e6298)
            .setDescription(`There is no song currently playing on\n\`${interaction.guild.name}\``)
            .setFooter({text: `Play some music to use this command!`})
            return interaction.reply({ embeds: [emptyQueueEmbed] })
        }
        const currentlyPlaying = queue.songs.map((song, i) => `${song.name}`);
        const queuePauseEmbed = new EmbedBuilder()
        .setDescription(`▶️ Queue has been resumed.`)
        .setColor(0x5e6298)
        try{
            queue.resume(interaction);
        }catch{
            const alreadyQueuePauseEmbed = new EmbedBuilder()
            .setDescription(`❌ The queue is already playing!`)
            .setColor(0x5e6298)
            return interaction.reply({ embeds: [alreadyQueuePauseEmbed] })
        }

        interaction.reply({ embeds: [queuePauseEmbed] })
    }
}