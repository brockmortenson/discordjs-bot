const Commando = require('discord.js-commando');
const path = require('path');

module.exports = class PlayAudioCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: '4',
            group: 'misc',
            memberName: 'audio4',
            description: 'Plays some audio'
        });
    }

    async run (message) {
        const { voice } = message.member;

        if (!voice.channelID) {
            message.reply('You must be in a voice channel')
            return
        }
        voice.channel
        .join()
        .then((connection) => {
            connection.play(path.join(__dirname, 'soundBitFour.mp3'), {volume: 1.5})
        })
    }
}