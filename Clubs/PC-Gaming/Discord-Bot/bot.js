/* TODO: https://discord.com/developers/applications/ (for keeping track of Bot name/description)
 *     https://discordjs.guide/creating-your-bot/adding-more-commands.html#simple-command-structure (current review of discord.js)
 */

// ================================================================ PERMANENT CONSTANTS

// direct where the config file is located
const { prefix, github, token } = require('../../../../psu-pc-gaming-discord-bot-config.json');

// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// other constants for the bot
const prefixLength = `${prefix}`.length; // TODO: Might be thinking of the `${}` usage in the wrong way

// ================================================================ BOT CONSTANTS

// other constants that will be used throughout the program, but may be changed
const listenMinMsgLength = prefixLength; // TODO: if I consider to use pings to also execute commands, I'll need to change the min length
const discordStatusMsg = `${prefix}` + 'help | for commands';
const discordStatusType = 'PLAYING';
const discordStatus = 'online';
const discordLoggedIn = `Logged in as ${client.user.tag}!`; // TODO: Might need to be moved back into client.once, if not declared before getting as constant
// the following is related to gamemodes
const GAMEMODE_ALL = -1;
const GAMEMODE_NONE = 0;
// commands and by what role/rank value
// TODO: NEED TO GET COMMANDS READY FOR CERTAIN RANKS!

// ================================================================ BOT VARIABLES

// these will all need to be initialized upon first bot use (array-index indicates a position within the gamemodes array)
var emojiMap = {
//    emoji: array-index
};
var gamemodeMap = {
//    gamemode: array-index
};
var gamemodes = [
//    [emoji, gamemode, description]
];
// TODO: NEED CODE TO POPULATE AND MANIPULATE THE ABOVE ARRAYS, AND LASTLY BELOW
var userdata = [
//    [userId, modes] // where modes is the list of the array indexes from gamemodes chosen by the user (if the constant choices are used, they take priority over all other choices, e.g. GAMEMODE_ALL and GAMEMODE_NONE)
];

// ================================================================ FUNCTIONS

/**
 * displays all possible commands available to the user via the roles/permissions they have (pings them too)
 * @param {User Object} userObj - Required, as will be used to check for user id, name, and roles to display proper message information
 * @param {String} command - Optional argument to get more details about a command, invalid commands throw an error message to the user
 */
var help = function(usrObj, command) {
    // TODO: CODE FUNCTION!
}

/**
 * displays the information about the bot's creator, and the purpose of the bot
 */
var info = function(/* void */) {
    // TODO: CODE FUNCTION!
}

/**
 * displays the milliseconds delay from between the bot and the server
 */
var ping = function(/* void */) {
    // TODO: CODE FUNCTION!
}

/**
 * displays the github website where this bot's source code will be stored on (stored in the config.json as `github`)
 */
var github = function(/* void */) {
    // TODO: CODE FUNCTION! ... variable for web link is `${github}`
}

/**
 * displays the list of websites/social media (first time use, websites will be empty) related to/about the club
 */
var web = function(/* void */) {
    // TODO: CODE FUNCTION!
}

/**
 * depending on rank, this will add websites to the websites/social media list
 * @param {User Object} userObj - Required, as will be used to check for user id, name, and roles to display proper message information
 * @param {String Array} argsSplit - will contain the full/partial (yet valid) website URL for the website to be added,
          and a description (short summary) of it for users to understand where the URL will take them...
          it will error when there's less than 2 arguments/there is an already existing gamemode
 */
var addWeb = function(userObj, argsSplit) {
    // TODO: CODE FUNCTION!
}

/**
 * depending on rank, this will remove websites from the websites/social media list
 * @param {User Object} userObj - Required, as will be used to check for user id, name, and roles to display proper message information
 * @param {String} website - this is the full/partial (yet valid) website URL for the website to be removed,
          and errors if it wasn't in the list to begin with
 */
var rmWeb = function(userObj, website) {
    // TODO: CODE FUNCTION!
}

/**
 * displays the list of gamemodes currently available/active on the server
 */
var showGamemodes = function(/* void */) {
    // TODO: CODE FUNCTION!
}

/**
 * depending on rank, this may add a new gamemode reaction to a specific message
 * @param {User Object} userObj - Required, as will be used to check for user id, name, and roles to display proper message information
 * @param {String Array}  - will contain the msgId, emoji to use, gamemode name, and description for the gamemodes;
          it will error if any argument is missing, or if the argument already exists (from emoji or gamemode name)
 */
var addGame = function(userObj, argsSplit) {
    // TODO: CODE FUNCTION!
}

/**
 * depending on rank, this may remove a gamemode reaction to a specific message
 * @param {User Object} userObj - Required, as will be used to check for user id, name, and roles to display proper message information
 * @param {String Array} argsSplit - will contain the msgId, and either the emoji or gamemode name to remove, and
          it will error if any argument is missing, or if the arguments found no existing gamemode
 */
var rmGame = function(userObj, argsSplit) {
    // TODO: CODE FUNCTION!
}

/**
 * depending on the user's chosen groups, and their choice argument, will notify other users that opted into the messages
 * @param {String} choices - this is an optional argument if you want to specify gamemode(s),
          and emoji/gamemode name can be interchangably used, and not providing this argument reads your current assigned groups to ping
 */
var lookingForGroup = function(choices) {
    // TODO: CODE FUNCTION! ... choice(s) gets checked against GAMEMODE_ALL and GAMEMODE_NONE, then gets checked against the maps
}

/* TODO: Will need the ability to first read from data file(s) if there exists any, then, need
 *     to use any initial data to initialize program variables, next, we'd need a way to start
 *     up any listeners from previous data (and also how to start them/control them), getting
 *     towards the end, we'll also need new/changed settings, and userdata, to save too.
 *
 *     Might be thinking about a backup solution, so backup of settings/userdata happens in an
 *     interval, maybe might make a command to toggle this on/off, and the ability to change
 *     the time frame of the backups.
 *
 *     If backups would be saved and used, there may need to be a bot-disabling function so
 *     data isn't changed/corrupted while saving the 'checkpoint' backup.
 */

// ================================================================ MAIN

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log(discordLoggedIn);
    
    // set the status message and type
    // TODO: this will need to be changed once the `custom status` feature is available in the discord.js library
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
    
    // slims the message down for further processing
    let msgContent = message.content.trim();
    
    // make sure that the message starts with the prefix
    if (msgContent.length >= listenMinMsgLength && msgContent.startsWith(`${prefix}`)) {
        let command = null;
        let argsString = null;
        let argsSplitLength = 0;
        let argsSplit = [];
        let msgSplit = msgContent.split(' ');
        let argsSplitStart = 0; // this will change according to wear in the string the first argument is
        let argsStringStart = 0; // this will change according to wear in the string the first argument is
        
        // grabs the word/phrase we need to check the commands (in lower case)
        if (msgSplit[0].length = prefixLength) { // command is whitespaced
            argsSplitStart = 1;
            command = msgSplit[argsSplitStart].toLowerCase();
        } else { // the command isn't whitespaced, need to remove prefix
            command = msgSplit[argsSplitStart].toLowerCase().substring(prefixLength);
        }
        
        // finalize arguments string
        argsSplitStart = msgContent.indexOf(msgSplit[argsSplitStart]) + msgSplit[argsSplitStart].length + 1; // needs space length added to get to start of index
        argsString = argsSplitStart < msgContent.length ? msgContent.substring(argsSplitStart) : null;
        argsSplit = argsString != null ? argsString.split(' ') : null;
        
        // check for highest member role available to user
        let userObj = ...; // TODO: SOMEHOW FIND THE RANK COMPARED TO ALL, AND DISPLAY COMMANDS APPROPRIATELY
        
        // now to check all possible commands (matches exactly)
        switch (command) {
            case '?':
            case 'h': case 'help': help(userObj, argsSplit != null ? argsSplit[0] : null); return;
            
            case 'i': case 'info':
            case 'a': case 'about': info(); return;
            
            case 'ms':
            case 'p': case 'ping': ping(); return;
            
            case 'project':
            case 'source': case 'source-code':
            case 'gh': case 'git': case 'github': github(); return;
            
            case 'w': case 'web': case 'website': case 'websites':
            case 'l': case 'link': case 'links':
            case 'sm': case 'social': case 'socials': case 'social-media': web(); return;
            
            case '+w': case '+web': case '+website': case 'add-website': case 'additional-website': addWeb(userObj, argsSplit);
            
            case '-w': case '-web': case '-website': case 'rm-website': case 'remove-website': rmWeb(userObj, argsString);
            
            case 'g': case 'games': showGamemodes();
            
            case '+g': case '+game': case 'add-game': case 'additional-game': case 'new-game': case 'create-game': addGame(userObj, argsSplit);
            
            case '-g': case '-game': case 'rm-game': case 'remove-game': case 'del-game': case 'delete-game': rmWeb(userObj, argsSplit);
            
            case 'lfg': case 'looking-for-group': lookingForGroup(argsSplit != null ? argsSplit[0] : null);
            case 'lfga': case 'lfg-all': case 'lfg-any': case 'looking-for-group-all': case 'looking-for-group-any': lookingForGroup(GAMEMODE_ALL);
            case 'lfgn': case 'lfg-none': case 'looking-for-group-none': lookingForGroup(GAMEMODE_NONE);
        }
    } // else, ignore the message
});

// login to Discord with app token
client.login(token);