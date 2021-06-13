require('dotenv').config();

// const { Client } = require('discord.js');
// const client1 = new Client();
const path = require('path')
const Commando = require('discord.js-commando');
const { config } = require('dotenv');
const client = new Commando.CommandoClient({
    owner: '697657417416048671',
    commandPrefix: config.prefix,
    disableEveryone: true,
});
const { MessageEmbed, VoiceConnection } = require('discord.js');
const { connect } = require('http2');
const { connected } = require('process');
const { getEventListener } = require('events');


/* friend user id variables */
const pickle = '851222943845056573';
const jake = '843638901255176222';
const brock = '697657417416048671';
const disco = '187419143350386688';
const brett = '445487271295188992';
const bryce = '698688179678740520';
const paul = '696813641135161434';
const pete = '695418325941092453';
const paulBot = '851903165125361774';
const botCommandChat = '853413179919695902';



/* BOT LOGIN */

client.on('ready', () => {
    console.log(`${client.user.username} has logged in`);

    client.registry
    .registerGroups([
        ['misc', 'misc commands']
    ])
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands({
        unknownCommand: false
    })
    // .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'cmds'));
});



    /* WELCOME MESSAGE */

client.on('guildMemberAdd', (member) => {
    // console.log(member)
    const generalID = '853145041241505812';
    
    const txtChannel = member.guild.channels.cache.get(generalID)
    
    const embed = new MessageEmbed()
    .setTitle(`All hail ${member.guild.name}`)
    .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
    .setDescription(`Welcome, ${member.user.tag}`)
    .setFooter(`#picklerick`,member.user.displayAvatarURL({dynamic: true, size: 512}))
    .setTimestamp()
    .setColor('RANDOM')
    txtChannel.send(embed)
});



    /* LEAVE MESSAGE */

client.on('guildMemberRemove', member => {
    // console.log(member)
    const generalID = '853145041241505812';
    
    const txtChannel = member.guild.channels.cache.get(generalID)
    
    const embed = new MessageEmbed()
    .setTitle(`${member.guild.name} hates you`)
    .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
    .setDescription(`Goodbye, ${member.user.tag}`)
    .setFooter(`#picklerick`,member.user.displayAvatarURL({dynamic: true, size: 512}))
    .setTimestamp()
    .setColor('RANDOM')
    txtChannel.send(embed)
});



    /* REPLIES */
    
client.on('message', (message) => {
    if (message.author.bot) return false;

    if (message.mentions.has(client.user.id)) {
        if (message.author.id === brett) {
            message.reply('hello brett')
        } else if (message.author.id === disco) {
            message.reply(`hello disco`) 
        } else if (message.author.id === brock) {
            message.reply('hello brock')
        } else if (message.author.id === bryce) {
            message.reply('hello bryce')
        } else if (message.author.id === jake) {
            message.reply('hello jake')
        } else if (message.author.id === paul) {
            message.reply('hello paul')
        } else if (message.author.id === pete) {
            message.reply('hello pete')
        } else return;
    }
});
// setTimeout(() => { message.reply('oh my hell jake stfu pls fuck') }, 3000)



/* INFINITE LOOP WITH OTHER BOT */

// client.on('message', (message) => {
//     if (message.author.id === paulBot) {
//         message.reply('hello bot')
//     }
// })



    /* JOIN/LEAVE VOICE CHANNEL */

client.on('message', (message) => {
    // const { channel } = message.member.voice;
    
    if (message.content === '/rick') {
        if (message.member.voice.channel) {
            message.member.voice.channel.join()
        } else {
            message.channel.send('Join a voice channel if you want me to join')
        }
    }
});

client.on('message', (message) => {
    // const { voice } = message.member;
    // const { channel } = message.member.voice;

    if (message.content === '/leave') {
        if (!message.member.voice.channelID) {
            message.reply('You must be in a voice channel')
        } else {
            message.member.voice.channel.leave()
        }
    }
});



    /* SPEAKING EVENT */

client.on('guildMemberSpeaking', speaking => {
        // speaking.voice.channelID
    const broadcast = client.voice.createBroadcast();
    const dispatcher = broadcast.play('./cmds/misc/soundBitEight.mp3')

    if (speaking.voice) {
        // console.log(speaking)
        // console.log(speaking.voice.member)
        // speaking.voice.connection.player.broadcast.play()

        broadcast.setMaxListeners().play(path.join(__dirname, 'soundBitEight.mp3'))

        // console.log('THE BROADCAST', broadcast)

        // client.voice.createBroadcast();
        // client.voice.createBroadcast().play('./cmds/misc/soundBitEight.mp3')
        
        // broadcast.play(dispatcher)

        // ('./cmds/misc/soundBitEight.mp3')
        
        // setTimeout(() => { speaking.voice.setChannel('853170046623678474') }, 3000)
        // speaking.send('test')
    } else return;
});



    /* DELETE BOT-COMMAND MESSAGES */

client.on('message', message => {
    if (message.channel.id === botCommandChat) {
        setTimeout(() => { message.delete() }, 6000)
    }
});



client.login(process.env.DISCORDJS_BOT_TOKEN);