// ================================================================ PERMANENT CONSTANTS

// direct where the config file is located
const { prefix, token } = require('../../../../psu-pc-gaming-discord-bot-config.json');

// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// other constants for the bot
const prefixLength = `${prefix}`.length;

// ================================================================ BOT CONSTANTS

// other constants that will be used throughout the program, but may be changed
const listenMinMsgLength = prefixLength; // TODO: if I consider to use pings to also execute commands, I'll need to change the min length
const discordStatusMsg = `${prefix}` + 'help | for commands';
const discordStatusType = 'PLAYING';
const discordStatus = 'online';
const discordLoggedIn = `Logged in as ${client.user.tag}!`; // TODO: Might need to be moved back into client.once, if not declared before getting as constant

// ================================================================ FUNCTIONS

// var aFunction = function(var1, var2, ...) {
    // internal function code here
}

// ================================================================ MAIN

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log(discordLoggedIn);
    
    // set the status message and type // TODO: this will need to be changed once custom statuses come to bots
    client.user.setPresence({
        game: { 
            name: discordStatusMsg,
            type: discordStatusType
        },
        status: discordStatus
    });
});

// listen to messages for commands
client.on('message', message => {
    console.log(message.content);
    
    // slim the message down for further processing
    let msgContent = message.content.trim();
    
    // make sure that the message starts with the prefix
    if (msgContent.length >= listenMinMsgLength && msgContent.startsWith(`${prefix}`)) {
        let command = null;
        let msgSplit = msgContent.split(" ");
        let argsStart = 1; // this can change in the case of spaces between the prefix and the command
        
        // grabs the word/phrase we need to check the commands (in lower case)
        if (msgSplit[0].length = prefixLength) { // command is whitespaced
            command = msgSplit[1].toLowerCase();
            argsStart = 2;
        } else { // command isn't whitespaced, need to remove prefix
            command = msgSplit[0].substring(1).toLowerCase();
        }
        
        // now to check all possible commands (matches exactly)
        switch (command) {
            case "?": case "h": case "help": ...; // TODO: INCLUDE MY FUNCTION!
            case "a": case "about": case "i": case "info": ...; // TODO: INCLUDE MY FUNCTION!
            case "p": case "ping": case "ms": ...; // TODO: INCLUDE MY FUNCTION!
            case "l": case "link": case: "links": case "w": case: "website": case "websites": ...; // TODO: INCLUDE MY FUNCTION!
            case "sm": case "social": case "socials": case "social-media": ...; // TODO: INCLUDE MY FUNCTION!
            case "gh": case "github": case "project": ...; // TODO: INCLUDE MY FUNCTION!
            case "+g": case "+game": case "add-game": case "additional-game": case "new-game": ...; // TODO: INCLUDE MY FUNCTION!
            case "-g": case "-game": case "rm-game": case "remove-game": case "delete-game": ...; // TODO: INCLUDE MY FUNCTION!
            case "lfg": case "looking-for-group": ...; // TODO: INCLUDE MY FUNCTION!
            case "lfga": case "lfg-any": case "looking-for-group-any": ...; // TODO: INCLUDE MY FUNCTION!
        }
    } // else, ignore the message
    
    // DETECT COMMANDS (need to fix into getting first argument for command detection)
    /*if (message.content.startsWith(`${prefix}ping`)) {
        message.channel.send('Pong.');
    } else if (message.content.startsWith(`${prefix}beep`)) {
        message.channel.send('Boop.');
    }*/
});

// login to Discord with your app's token
client.login(token);