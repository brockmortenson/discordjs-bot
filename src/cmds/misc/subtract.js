const Commando = require('discord.js-commando');

module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'subtract',
            group: 'misc',
            memberName: 'subtract',
            description: 'Subtracts numbers',
            argsType: 'multiple'
        });
    }

    async run(message, args) {
        let total = 0;

        for (const arg of args) {
            total -= parseInt(arg)
            console.log(args)
        }
        message.reply(`The answer is ${total}`)
    }
}