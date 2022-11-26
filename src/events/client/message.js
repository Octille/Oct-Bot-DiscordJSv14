module.exports = {
    name: "messageCreate",
    async execute(message){
        if(message.content == "<@816413181793665056>"){
            message.reply('hello!')
        }
    }
}