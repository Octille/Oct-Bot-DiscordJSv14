const chalk = require('chalk');

module.exports  ={
    name: 'connecting',
    once: true,
    async execute(){
        console.log(chalk.cyan("[Database Status]: Connecting..."));
    }
}
