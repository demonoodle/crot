const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token} = require('./config.json');
const poke = require('./poke.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();



function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}





client.once("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Pokémon on 408823 servers!`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Playing PUBG Mobile`);
});

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));



if (commandName === "ping"){

const m = await message.channel.send("Pingping bening aduhay?");

    m.edit("Pingping bening aduhay?.");
    m.edit("Pingping bening aduhay?..");
    m.edit("Pingping bening aduhay?...");
    m.edit("Pingping bening aduhay?....");
    m.edit("Pingping bening aduhay?.....");

    m.edit(`Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);

}





if (commandName === "restart"){

if (message.author.id === '526612804648566831') {

message.channel.send('Restarting..');
message.channel.send('Restarting..');
message.channel.send('Restarting..');

		process.exit();
			
		}
else

  message.channel.send('Sorry cuk, cuma si Kousei yg bisa pake command ini!');

}







if (commandName === "prank" || 
	commandName === "p" || 
	commandName === "crot"){


		const item = poke[Math.floor(Math.random() * poke.length)];
const filter = response => (response.content === item.answers);




		const pokeEmbed = new Discord.RichEmbed()
    		.setColor('#48a499')
    		.setTitle('A wild pokémon has appeared!')
    		.setDescription('Guess the pokémon and type p!catch <pokémon> to catch it!')
    		.setImage(url=item.url)


		

		const channel = client.channels.get('526612804648566831');



		if (channel) {

			channel.send(pokeEmbed)
			
			.then(() => {
    channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })



       	.then(collected => {
           	channel.send(`Congratulations ${collected.first().author}! You caught a level ${item.lvl} ${item.nama}!`);
        	})


.catch(collected => {
            return;
        });

});

 }
else
message.channel.send('Error, channel tidak ditemukan.');

}











 if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`Jangan kecepetan dong Lumia pusing! tunggu ${timeLeft.toFixed(1)} detik lagi.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('Kalem dulu cuy lagi error nih. coba command lain gih!');
	}
});

client.login(token);
