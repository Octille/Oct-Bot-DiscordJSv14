const profileModel = require("../../models/profileSchema");
const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Replies the servers leaderboard.'),
	async execute(interaction, client) {
        let replyText = [];
        const guild = interaction.guild

        var bar = guild.members.fetch().then(async(members) => {
            const memberid = {}
             
            let sortedusers
             await members.forEach(member => {
                var { id, user } = member
                var { username } = user
                  profileModel.findOne({ userID: id }).then(data => {
                      let Data = data;
                         
             try{
                memberid[Data.userID] = (memberid[Data.userID] || 0) + Data.coins
             }catch{
             } 
            })             
        })
            bar.then((err) =>  {
                setTimeout(() => {;                 
            sortedusers = Object.keys(memberid).sort(
                (a, b) => memberid[b] - memberid[a]
              )
              sortedusers.length = 5
              
                try{
                    for (const members of sortedusers) {
                        const topusers = client.users.cache.find(user => user.id === members)            
                        const count = memberid[members]
                        replyText.push(`${topusers.username}: **₪ ${count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}**\n`)
                    }
                }catch(err){
                    console.log(err)
                }
                replyText[0] = `🥇 ${replyText[0]}`
                replyText[1] = `🥈 ${replyText[1]}`
                replyText[2] = `🥉 ${replyText[2]}`
                const embedDescription = replyText.join('')
                .replace(',🥇', '🥇')
                .replace(',🥈', '🥈')
                .replace(',🥉', '🥉')
                const topusersembed = new EmbedBuilder()
                .setTitle('Top Users:')
                .setDescription(embedDescription.replace('undefined\n', ''))
                .setColor(0x5e6298)
                .setFooter({text: 'note that this is the users balance and not networth'})
                interaction.reply({ embeds: [topusersembed] })
            
        }, 1500)
    });
    })
	},
}