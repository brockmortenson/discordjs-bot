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
const { MessageEmbed } = require('discord.js');



/* friend user id variables */
const pickle = '851222943845056573';
const jake = '843638901255176222';
const brock = '697657417416048671';
const disco = '187419143350386688';
const brett = '445487271295188992';
const bryce = '698688179678740520';
const paul = '696813641135161434';
const pete = '695418325941092453';
const brady = '230140913811324928';
const jens = '523324188187164682';
const paulBot = '851903165125361774';
const botCommandChat = '853413179919695902';
const general = '853145041241505812';
const mediaTxt = '854478168353013810';



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
    .setTitle(`${member.guild.name} has rejected`)
    .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
    .setDescription(`${member.user.tag}`)
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

    if (message.content === '/bye') {
        if (!message.member.voice.channelID) {
            message.reply('You must be in a voice channel')
        } else {
            message.member.voice.channel.leave()
        }
    }
});



    /* SPEAKING EVENT */

let target = null;

client.on('message', message => {
    if (message.content === '/brock') {
        target = brock
    } else if (message.content === '/paul') {
        target = paul
    } else if (message.content === '/bryce') {
        target = bryce
    } else if (message.content === '/pete') {
        target = pete
    } else if (message.content === '/brett') {
        target = brett
    } else if (message.content === '/brady') {
        target = brady
    } else if (message.content === '/jens') {
        target = jens
    } else if (message.content === '/stop') {
        target = null
    }
});

client.on('guildMemberSpeaking', async (member, speaking) => {
    if (member.user.id === target && target !== null) {
        const connection = await member.voice.channel.join();
        const dispatcher = connection.play(path.join(__dirname, './cmds/misc/soundBitSeven.mp3'), {volume: 3})

        dispatcher.pause();

        if (speaking) {
            // console.log('speaking');
            dispatcher.resume();
        }
        if (speaking == false) {
            // console.log('silent');
            dispatcher.pause();
        }
    }
});



    /* DELETE BOT-COMMAND MESSAGES */

client.on('message', message => {
    if (message.channel.id === botCommandChat) {
        setTimeout(() => { message.delete() }, 6000)
    }
});

client.on('message', message => {
    if (message.content === '!1' || message.content === '!2' || message.content === '!3' || message.content === '!4' || message.content === '!5' || message.content === '!6' || message.content === '!7' || message.content === '!8' || message.content === '!9' || message.content === '!10' || message.content === '!11' || message.content === '!12' || message.content === '!13' || message.content === '/rick' || message.content === '/bye' || message.content === '/brock' || message.content === '/paul' || message.content === '/bryce' || message.content === '/pete' || message.content === '/brett' || message.content === '/brady' || message.content === '/jens') {
        setTimeout(() => { message.delete() }, 6000)
    }
});



client.login(process.env.DISCORDJS_BOT_TOKEN);