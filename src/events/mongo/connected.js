const chalk = require('chalk');

module.exports  ={
    name: 'connected',
    once: true,
    async execute(){
        console.log(chalk.green("[Database Status]: Connected."));
    }
}