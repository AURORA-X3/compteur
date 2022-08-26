const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const prefix = "_";
var isOn = false;
var day = 89280;
var mod = 0;


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

    setInterval(myTimer, 1200000);

    function myTimer() {
        if(isOn == true){
            day = day + 1;
            message.channel.send("Jour :" + String(day) + "Année" + String(day / 360));
        }
        mod = day % 1800;
    
        if(mod == 0){
            message.channel.send("C'est le jour des IMPOTS !!!!!!");

        }
    }


});

client.login(process.env.TOKEN);