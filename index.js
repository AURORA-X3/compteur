const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const prefix = "compteur_";
var isOn = false;
var day = 89282;
var annee = 0;
var mod = 0;
var trigger = true;

annee = day / 360;

client.on("ready", () => {
    console.log("ready");
});

client.on("messageCreate", message => {
    if(message.author.bot) return;

    if(message.content === prefix + "start"){
        isOn = true;
        message.channel.send("started");
    }

    if(message.content === prefix + "stop"){
        isOn = false;
        message.channel.send("stoped");
    }

    if(message.content === prefix + "day"){
        message.channel.send(String(day - (Math.trunc(annee) * 360)));
    }

    if(message.content === prefix + "fullDay"){
        message.channel.send(String(day));
    }

    if(message.content === prefix + "year"){
        message.channel.send(String(Math.trunc(annee)));
    }

    trigger = true;
    setInterval(myTimer, 400000);

    function myTimer() {
        if(isOn == true && trigger == true){
            day = day + 1;
            message.channel.send("Jour : " + String(day - (Math.trunc(annee) * 360)) + " Année : " + String(Math.trunc(annee)));
            trigger = false;
        }
        mod = day % 1800;
    
        if(mod == 0){
            message.channel.send("C'est le jour des IMPOTS !!!!!!");

        }
    }


});

client.login(process.env.TOKEN);