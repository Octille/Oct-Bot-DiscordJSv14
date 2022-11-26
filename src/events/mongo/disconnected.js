const chalk = require('chalk');

module.exports  ={
    name: 'disconnected',
    once: true,
    async execute(){
        console.log(chalk.red("[Database Status]: Disconnected"));
    }
}
