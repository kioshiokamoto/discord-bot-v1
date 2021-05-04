const Discord = require('discord.js')
const fs = require('fs')
require('dotenv').config()


const client = new Discord.Client({
	partials: ['MESSAGE', 'REACTION', 'CHANNEL', 'USER'],
});

const prefix = '.';

client.login(process.env.BOT_TOKEN);

client.once('ready', () => {
	console.log('Se inicializa BOT!');
});



client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
    client.commands.set(command.name, command);
}

client.on('message', (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	//Argumentos
	const args = message.content.slice(prefix.length).split(/ +/);
	//Comando
	const command = args.shift().toLocaleLowerCase();

	if (command === 'broma') {
        client.commands.get('broma').execute(message, args);
	}
	if (command === 'csgo') {
		client.commands.get('csgo').execute(message, args);
	}
	if (command === 'cbazcode') {
		client.commands.get('cbazcode').execute(message, args);
		//Para responder a usuario
		//message.reply('Preparate para el evento 300 subs')
	}
});

//Agregar
client.on('messageReactionAdd', async (reaction, user) => {
	//Verifica partials
	if (reaction.message.partial) await reaction.message.fetch();
	if (reaction.partial) await reaction.fetch();
	//Verifica que no haya sido un bot el que reacciono
	if (user.bot) return;
	//Verifica que mensaje este en servidor
	if (!reaction.message.guild) return;

	//id del canal de discord
	if (reaction.message.channel.id == '678760025757450296') {
		//Asigna rol a usuario que haya escrito mensaje atraves de una reaccion con emoji
		if (reaction.emoji.name === '👀') {
			await reaction.message.guild.members.cache.get(user.id).roles.add('716128061875028008');
		}
		if (reaction.emoji.name === '🐍') {
			await reaction.message.guild.members.cache.get(user.id).roles.add('731312866799517747');
		}
	} else return;
});

// Remover
client.on('messageReactionRemove', async (reaction, user) => {
	if (reaction.message.partial) await reaction.message.fetch();
	if (reaction.partial) await reaction.fetch();
	if (user.bot) return;
	if (!reaction.message.guild) return;

	if (reaction.message.channel.id == '678760025757450296') {
		if (reaction.emoji.name === '👀') {
			await reaction.message.guild.members.cache.get(user.id).roles.remove('716128061875028008');
		}
		if (reaction.emoji.name === '🐍') {
			await reaction.message.guild.members.cache.get(user.id).roles.remove('731312866799517747');
		}
	} else return;
});
