require("dotenv").config();
const { token } = process.env;
const { connect } = require("mongoose")
const { Client, Collection, GatewayIntentBits, EmbedBuilder, Partials } = require("discord.js");
const fs = require("fs");
const client = new Client({
  restTimeOffset: 0,   
intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMembers,
],
partials: [
  Partials.Message, 
  Partials.Channel, 
  Partials.Reaction
], 
});

const { DisTube } = require('distube')

client.distube = new DisTube(client, {
  streamType: 1,
  searchSongs: 1,
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
})
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

(async () => {
  client.handleEvents();
  setTimeout(function(){
  client.handleCommands();
 }, 1000);
})();


client.distube.on("playSong", (queue, song) => {
  const playing = new EmbedBuilder()
  .setTitle('🎶 Now Playing')
  .setDescription(`[${song.name}](${song.url})

  Duration: \`${song.formattedDuration}\` | Filters: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Volume: \`${queue.volume}%\``)
  .setThumbnail(song.thumbnail)
  .setColor(0x5e6298)
  queue.textChannel.send({ embeds: [playing] })
})
client.distube.on("addSong", (queue, song) => {

  const playing = new EmbedBuilder()
  .setTitle('🎶 New Song Added To Queue')
  .setDescription(`[${song.name}](${song.url})

  Duration: \`${song.formattedDuration}\` | Filters: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Volume: \`${queue.volume}%\``)
  .setThumbnail(song.thumbnail)
  .setColor(0x5e6298)
  queue.textChannel.send({ embeds: [playing] })
})
client.distube.on("playList", (queue, playlist, song) => {queue.textChannel.send(`playing playlist`)})
client.distube.on("addList", (queue, playlist) => queue.textChannel.send(
  `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
)).on("searchNoResult", (message, query) => message.channel.send(`❌No results found for \`${query}\`!`));



client.login(token);
(async () => {
  connect(process.env.MONGODB_SRV).catch(console.error)
})();
