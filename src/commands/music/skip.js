const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips song'),
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
        const queueSkipEmbed = new EmbedBuilder()
        .setDescription(`⏩ Skipped \`${currentlyPlaying[0]}\``)
        .setColor(0x5e6298)
        if (!queue.autoplay && queue.songs.length == 1)
        queue.stop(interaction);
        else
        queue.skip(interaction);

        interaction.reply({ embeds: [queueSkipEmbed] })
    }
}