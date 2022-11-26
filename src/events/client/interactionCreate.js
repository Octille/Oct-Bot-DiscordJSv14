const { InteractionCollector } = require("discord.js");
const { EmbedBuilder } = require('discord.js');
const profileModel = require("../../models/profileSchema");
const ms = require('ms');
const { CustomPlugin } = require("distube");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {

    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        let profileData = await profileModel.findOne({ userID: interaction.user.id });
        try {
          if (!profileData) {
            let profile = await profileModel.create({
              userID: interaction.user.id,
              serverID: interaction.user.id,
              coins: 1000,
              bank: 0,
              cooldownenabled: 0,
              Company: {
                 miners: 0,
                 workers: 0 
                },
                Items: {
                  Shirt: 1,
                  Pants: 1,
              },
              commands_cooldowns: []                                        
            });

            profile.save();
              const firstjoinembed = new EmbedBuilder()
              .setTitle('Welcome')
              .setDescription('Looks like this is your first time using **Oct Bot**, I have set up some things for you! you are now able to use my commands.')
              .setFooter({text: `To get started you can do \`/help\``})
              .setColor(0x5e6298)
            return interaction.reply({ embeds: [firstjoinembed] })
          }
        } catch (err) {
          console.log(err)
        }
        if(profileData.coins < 0){
          const bank = profileData.bank
           
          let half = bank * 0.5;
          if(bank < 2){
            half = 0;
          }
          await profileModel.findOneAndUpdate(
            {
              userID: interaction.user.id,
            },
            {
              $inc: {
              bank: -half,
            },
          },
          );
          await profileModel.findOneAndUpdate(
            {
              userID: interaction.user.id,
            },
            {
                $set: {
                  coins: 0,
                },
              },
            
            );
            return interaction.reply('Looks like you lost all your coins and had a stroke, you paid the hospital half your bank.');
            
        }

        if(profileData.cooldownenabled === '1') return command.execute(interaction, client);

        const COOLDOWN = profileData.commands_cooldowns.find((x) => x.name === command.data.name)
        if(COOLDOWN === undefined || !COOLDOWN){
  
        await profileModel.findOneAndUpdate(
          {
            userID: interaction.user.id,
          },
          {
            $push:{
              commands_cooldowns: {
                name: command.data.name,
                time: Date.now(),
              }
            }
     
          }
        )
        
        }else{
          const command_cooldown = command.cooldown * 1000
          if(command_cooldown - (Date.now() - COOLDOWN.time) > 0){
            var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
            const TIME = ms(command_cooldown - (Date.now() - COOLDOWN.time))
            const embedcooldown = new EmbedBuilder()
            .setTitle(`Woah, slow down`)
            .setDescription(`The command **${command.data.name}** is on cooldown for \`${TIME}\``)
            .setFooter({ text: 'While you wait you can vote for oct bot on top.gg' })
            .setColor(randomColor);
            return interaction.reply({ embeds: [embedcooldown] })
          }
          await profileModel.findOneAndUpdate(
            {
              userID: interaction.user.id,
            },
            {
              $pull:{
                commands_cooldowns: {
                  name: command.data.name,
                }
              }
       
            }
          )
          await profileModel.findOneAndUpdate(
            {
              userID: interaction.user.id,
            },
            {
              $push:{
                commands_cooldowns: {
                  name: command.data.name,
                  time: Date.now(),
                }
              }
       
            }
          )
  
        } 
        return command.execute(interaction, client);
      } catch (error) {
        await interaction.reply({
          content: `Something went wrong.`,
          ephermeral: true,
        });
        console.error(error);
      }
    }
  },
};
