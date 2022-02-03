var express = require('express');
var app = express();
const Canvas = require('canvas')
const path = require('path')
const StackBlur = require('stackblur-canvas');
const fs = require('fs')

// example url: http://localhost:8080/?avatarUrl=avatarUrlHere&username=usernameOnImage&tag=tagOnImage
app.get('/', async function (req, res) {
    if(!req.query.username || !req.query.tag || !req.query.avatarUrl) return res.send({ "error": true, "message": "url must contain all GET options (username, tag, avatarUrl)" })
    try {
        const nickname = `${req.query.username}#${req.query.tag}`

        Canvas.registerFont('./fonts/Roboto-Regular.ttf', { family: 'Roboto-Regular' })

        const properties = { width: 350, height: 400}
        const canvas = Canvas.createCanvas(properties.width, properties.height);
        const context = canvas.getContext('2d');

        // context.fillStyle = '#3644d6';
        // context.fillRect(0, 0, properties.width, properties.height);
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
        const avatar = await Canvas.loadImage(req.query.avatarUrl); // recommended image size is 4096px for the best quality
        context.drawImage(avatar, properties.width / 4 - 10, 30, 192, 192);

        res.send({ "buffer": canvas.toBuffer(), "image": "welcome.png" });
    } catch (err) {
        res.send({ "error": true })
    }
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});