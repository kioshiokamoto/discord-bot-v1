const csgo = ['Pero coneeectate!'];

module.exports = {
    name:'csgo',
    description:'Comandos para csgo',
    execute(message,args){
        message.channel.send(csgo[Math.floor(Math.random() * csgo.length)]);
    }
}