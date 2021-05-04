const bromas = [
	'Soy buenisimo jugando csgo',
	'Bonita noooche, bonita noooche',
	'Uyyyy le hice 2 de dmg en 1',
	'Si me matas, me muero',
	'Si me votas, me voy',
];

module.exports = {
    name:'broma',
    description:'Comando para que darack haga una broma',
    execute(message,args){
        message.channel.send(bromas[Math.floor(Math.random() * bromas.length)]);
    }
}