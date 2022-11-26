const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const profileModel = require("../../models/profileSchema");

module.exports = {
     data: new SlashCommandBuilder()
		.setName('devcommand')
		.setDescription('DEV COMMAND')
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove-cooldown')
                .setDescription('Removes cooldowns from the user.')
                .addUserOption(option => 
                    option.setName('user')
                    .setDescription('The user')
                    .setRequired(true))
                .addStringOption(option => 
                    option
                    .setName('command')
                    .setDescription('Select command.')
                    .setRequired(true)))                   
        .addSubcommand(subcommand =>
              subcommand
              .setName('cooldown')
              .setDescription('Disables or Enables cooldowns for the user.')
              .addUserOption(option => 
                  option.setName('user')
                  .setDescription('The user')
                  .setRequired(true))
              .addIntegerOption(option => 
                  option
                  .setName('disable-enable')
                  .setDescription('Select an option.')
                  .addChoices(
                    { name: 'Disable', value: 1},
                    { name: 'Enable', value: 0}
                  )
                  .setRequired(true)))
       .addSubcommand(subcommand =>
              subcommand
              .setName('promote')
              .setDescription('Promotes user to a developer')
              .addUserOption(option => 
                  option.setName('user')
              .setDescription('The user')
              .setRequired(true)))    
       .addSubcommand(subcommand =>
              subcommand
              .setName('demote')
              .setDescription('Deomotes user to user')
              .addUserOption(option => 
                  option.setName('user')
              .setDescription('The user')
              .setRequired(true))),     

	async execute(interaction, client) {

          const cooldownSubcommand = interaction.options.getSubcommand()
          const interactionUserOption = interaction.options.getUser('user')
          const interactionCommandOption = interaction.options.getString('command')
          const interactionDisableEnabledOption = interaction.options.getInteger('disable-enable')
          const userData = await profileModel.findOne({userID: interaction.user.id})
          if(userData.isDeveloper == false || userData.isDeveloper == undefined) return interaction.reply('Command is unavailable.')
          let EnabledDisabled;

          switch(cooldownSubcommand) {
            case 'remove-cooldown':
              
              await profileModel.findOneAndUpdate(
                  {
                    userID: interactionUserOption.id,
                  },
                  {
                    $pull:{
                      commands_cooldowns: {
                        name: interactionCommandOption,
                      }
                    }
             
                  }
                )

                  interaction.reply(`Removed cooldowns from \`${interactionCommandOption}\` for ${interactionUserOption}`)
              break;
            case 'cooldown':

              if(interactionDisableEnabledOption == 0) {
                EnabledDisabled = 'Enabled'
              }
              if(interactionDisableEnabledOption == 1) {
                EnabledDisabled = 'Disabled'
              }
              await profileModel.findOneAndUpdate(
                {
                  userID: interactionUserOption.id,
                },
                {
                  $set:{
                    cooldownenabled: interactionDisableEnabledOption,
                  }
           
                }
              )
              interaction.reply(`${EnabledDisabled} cooldowns for ${interactionUserOption}`)
              break;
            case 'promote':
              if(interaction.user.id != '460509056487129090' ) return interaction.reply('Command is unavailable.')
              await profileModel.findOneAndUpdate(
                {
                  userID: interactionUserOption.id,
                },
                {
                  $set:{
                    isDeveloper: true
                  }
                }
              )
              interaction.reply(`${interactionUserOption} Has been promoted to \`Developer\``)
            break;
            case 'demote':
              if(interaction.user.id != '460509056487129090' ) return interaction.reply('Command is unavailable.')
              await profileModel.findOneAndUpdate(
                {
                  userID: interactionUserOption.id,
                },
                {
                  $set:{
                    isDeveloper: false
                  }
                }
              )
              interaction.reply(`${interactionUserOption} Has been promoted to \`User\``)
              break;
            default:
          }
	},
}

