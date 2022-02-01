const { Client, Intents, MessageAttachment, MessageButton, MessageActionRow } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_BANS, ], partials: ['USER', 'MESSAGE', 'CHANNEL', 'REACTION'] });

const path = require('path');
const Canvas = require('canvas');
const StackBlur = require('stackblur-canvas');

client.on('ready', async () => {
    console.info(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('!pomoc', { type: 'PLAYING' })
    console.log(client.guilds.cache.get('725686977999011840').members.cache.get('692646805741240430'))
})

client.on('messageCreate', async message => {
    console.log(message.member.bannable)
    if((message.author.id != '692646805741240430' || message.author.id != '659734735660122113') && !message.content.startsWith('!welcome')) return

    const args = message.content.trim().split(/ +/g)
    if(!args[1]) return
    console.log(args[1])
    const channel = client.channels.cache.get('762248851033686026');
    const user = message.guild.members.cache.get(args[1])
    const member = message.guild.members.cache.get(args[1])
    console.log(user, member);
    if(!user || !member) return

    Canvas.registerFont('./fonts/Roboto-Regular.ttf', { family: 'Roboto-Regular' })

    const properties = { width: 350, height: 400}
    const canvas = Canvas.createCanvas(properties.width, properties.height);
    const context = canvas.getContext('2d');

    const background = await Canvas.loadImage(path.join(__dirname, './assets/welcomeImgBg.jpg'))
    context.drawImage(background, 1332 - 1332 * 1.5, -80, 1322, 850) // 1332 x 850

    context.fillStyle = 'rgba(0, 0, 0, 0.7)';
    context.fillRect(10, 10, properties.width - 20, properties.height - 20)

    StackBlur.canvasRGBA(canvas, 10, 10, properties.width - 20, properties.height - 20, 8)

    context.textAlign = 'center'
    context.font = "26px Roboto-Regular"
    context.fillStyle = '#3a3a3a'
    context.fillText("Witamy,", properties.width / 2 - 2, properties.height / 1.4 - 8)
    context.fillStyle = '#a0a0a0'
    context.fillText("Witamy,", properties.width / 2, properties.height / 1.4 - 10)
    
    const nickname = user.tag

    let fontSize = '31'

    do {
        fontSize--;
        context.font = fontSize + "px " + "Roboto-Regular";
    } while (context.measureText(nickname).width > canvas.width)

    // context.font = `${fontSize}px Roboto-Regular`
    // if(context.measureText(nickname).width > properties.width - 10){
    //     fontSize = (context.measureText(nickname).width / properties.width) - fontSize + 14;
    // }

    context.fillStyle = '#bababa'
    context.font = `${fontSize}px Roboto-Regular`
    context.fillText(nickname, (properties.width - 10) / 2, properties.height / 1.2 - 19)
    context.fillStyle = '#dadada'
    context.fillText(nickname, (properties.width - 10) / 2, properties.height / 1.2 - 20)
    // console.log(context.measureText(nickname))

    context.beginPath()
    context.arc(96 + properties.width / 4 - 10, 96 + 30, 110, 0, Math.PI * 2, true)
    context.arc(40 + properties.width / 4 - 10, 40 + 30, 40, 0, Math.PI * 2, true)
    context.arc(154 + properties.width / 4 - 10, 40 + 30, 40, 0, Math.PI * 2, true)
    context.arc(39 + properties.width / 4 - 10, 152 + 30, 40, 0, Math.PI * 2, true)
    context.arc(152 + properties.width / 4 - 10, 152 + 30, 40, 0, Math.PI * 2, true)
    context.arc(130 + properties.width / 4 - 10, 130 + 30, 55, 0, Math.PI * 2, true)
    context.arc(40 + properties.width / 4 - 10, 40 + 30, 40, 0, Math.PI * 2, true)
    context.closePath()
    context.clip()
    const bg = await Canvas.loadImage(user.displayAvatarURL({ format: "png", size: 4096 }));
    context.drawImage(bg, properties.width / 4 - 10, 30, 192, 192);

    const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome.png');

    const banButton = new MessageButton()
    .setLabel('ban')
    .setCustomId('quickBan')
    .setStyle('PRIMARY')
    const kickButton = new MessageButton()
    .setLabel('kick')
    .setCustomId('quickKick')
    .setStyle('PRIMARY')

    const row = new MessageActionRow().addComponents([banButton, kickButton]);

    message.reply({ content: `Hej, <@${member.user.id}> <:racoonWave:851433852034875423>`, files: [attachment], components: [row] });
})

client.on('interactionCreate', async interaction => {
    if(interaction.isButton){
        if(interaction.customId == "quickBan"){
            const message = await interaction.channel.messages.fetch(interaction.message.reference.messageId)
            const member = interaction.guild.members.cache.get(message.mentions.users.first().id)
            interaction.reply(`bannable: ${member.bannable}`)
        }
    }
})

require('dotenv').config()
client.login(process.env.token);






// client.on('guildMemberAdd', async (member) => {
//     // if(member.user.id == "716930597150392351"){
//     //     member.roles.add("780784534559129621")
//     // }

//     // const args = message.content.trim().split(/ +/g)
//     const channel = client.channels.cache.get('762248851033686026');
//     const user = await // client.users.fetch(member.user.id);

//     Canvas.registerFont('./fonts/Roboto-Regular.ttf', { family: 'Roboto-Regular' })

//     const properties = { width: 350, height: 400}
//     const canvas = Canvas.createCanvas(properties.width, properties.height);
//     const context = canvas.getContext('2d');

//     // context.fillStyle = '#3644d6';
//     // context.fillRect(0, 0, properties.width, properties.height);
//     const background = await Canvas.loadImage(path.join(__dirname, './assets/welcomeImgBg.jpg'))
//     context.drawImage(background, 1332 - 1332 * 1.5, -80, 1322, 850) // 1332 x 850

//     context.fillStyle = 'rgba(0, 0, 0, 0.7)';
//     context.fillRect(10, 10, properties.width - 20, properties.height - 20)

//     StackBlur.canvasRGBA(canvas, 10, 10, properties.width - 20, properties.height - 20, 8)

//     context.textAlign = 'center'
//     context.font = "26px Roboto-Regular"
//     context.fillStyle = '#3a3a3a'
//     context.fillText("Witamy,", properties.width / 2 - 2, properties.height / 1.4 - 8)
//     context.fillStyle = '#a0a0a0'
//     context.fillText("Witamy,", properties.width / 2, properties.height / 1.4 - 10)
    
//     const nickname = user.tag

//     let fontSize = '31'

//     do {
//         fontSize--;
//         context.font = fontSize + "px " + "Roboto-Regular";
//     } while (context.measureText(nickname).width > canvas.width)

//     // context.font = `${fontSize}px Roboto-Regular`
//     // if(context.measureText(nickname).width > properties.width - 10){
//     //     fontSize = (context.measureText(nickname).width / properties.width) - fontSize + 14;
//     // }

//     context.fillStyle = '#bababa'
//     context.font = `${fontSize}px Roboto-Regular`
//     context.fillText(nickname, (properties.width - 10) / 2, properties.height / 1.2 - 19)
//     context.fillStyle = '#dadada'
//     context.fillText(nickname, (properties.width - 10) / 2, properties.height / 1.2 - 20)
//     // console.log(context.measureText(nickname))

//     context.beginPath()
//     context.arc(96 + properties.width / 4 - 10, 96 + 30, 110, 0, Math.PI * 2, true)
//     context.arc(40 + properties.width / 4 - 10, 40 + 30, 40, 0, Math.PI * 2, true)
//     context.arc(154 + properties.width / 4 - 10, 40 + 30, 40, 0, Math.PI * 2, true)
//     context.arc(39 + properties.width / 4 - 10, 152 + 30, 40, 0, Math.PI * 2, true)
//     context.arc(152 + properties.width / 4 - 10, 152 + 30, 40, 0, Math.PI * 2, true)
//     context.arc(130 + properties.width / 4 - 10, 130 + 30, 55, 0, Math.PI * 2, true)
//     context.arc(40 + properties.width / 4 - 10, 40 + 30, 40, 0, Math.PI * 2, true)
//     context.closePath()
//     context.clip()
//     const bg = await Canvas.loadImage(user.displayAvatarURL({ format: "png", size: 4096 }));
//     context.drawImage(bg, properties.width / 4 - 10, 30, 192, 192);

//     const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome.png');

//     const banButton = new MessageButton()
//     .setLabel('ban')
//     .setCustomId('quickBan')
//     const kickButton = new MessageButton()
//     .setLabel('kick')
//     .setCustomId('quickKick')

//     channel.send({ content: `Hej, <@${member.user.id}> <:racoonWave:851433852034875423>`, files: [attachment], components: [button] });
// })