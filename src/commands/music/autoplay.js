const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('autoplay')
		.setDescription('Sets repeat mode.')
        .addIntegerOption(option =>
            option.setName('options')
                .setDescription('Select an option.')
                .setRequired(true)
                .addChoices(
                { name: 'Repeat Queue', value: 2 },
                { name: 'Repeat Song', value: 1 },
                { name: 'Off', value: 0 }
                )),
	async execute(interaction, client) {
        
            const queue = client.distube.getQueue(interaction)
            if(!queue){
                const emptyQueueEmbed = new EmbedBuilder()
                .setTitle("Empty queue")
                .setColor(0x5e6298)
                .setDescription(`There is no song currently playing on\n\`${interaction.guild.name}\``)
                .setFooter({text: `Play some music to use this command!`})
                return interaction.reply({ embeds: [emptyQueueEmbed] })
            }
        const userOptions = interaction.options.getInteger('options');
        let mode = client.distube.setRepeatMode(interaction, userOptions);
        mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
        const queueRepeatEmbed = new EmbedBuilder()
        .setDescription("🔁 Set repeat mode to `" + mode + "`")
        .setColor(0x5e6298)
        interaction.reply({ embeds: [queueRepeatEmbed] });
	},
}