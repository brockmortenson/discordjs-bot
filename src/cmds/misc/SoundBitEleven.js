const Commando = require('discord.js-commando');
const path = require('path');

module.exports = class PlayAudioCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: '11',
            group: 'misc',
            memberName: 'audio11',
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
            connection.play(path.join(__dirname, 'soundBitEleven.mp3'), {volume: 0.8})
        })
    }
}