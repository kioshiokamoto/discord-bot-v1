import Discord from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Discord.Client({
	partials: ['MESSAGE', 'REACTION', 'CHANNEL', 'USER'],
});

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
	console.log('Se inicializa BOT!');
});

const bromas = [
	'Soy buenisimo jugando csgo',
	'Bonita noooche, bonita noooche',
	'Uyyyy le hice 2 de dmg en 1',
	'Si me matas, me muero',
	'Si me votas, me voy',
];
const csgo = [
	'Pero coneeectate!',
];

client.on('message', (msg) => {
	if (msg.content === '.broma') {
		msg.channel.send(bromas[Math.floor(Math.random() * bromas.length)]);
	}
    if (msg.content === '.csgo') {
		msg.channel.send(csgo[Math.floor(Math.random() * csgo.length)]);
	}
    if (msg.content === '!cbazcode') {
		msg.channel.send('Suscribete a: https://www.youtube.com/channel/UCs1DHnQij0wp0lP1V96rukg');
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
