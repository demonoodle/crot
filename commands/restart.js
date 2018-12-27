module.exports = {
	name: 'restart',
	description: 'Shutdown!',
	cooldown: 5,
	execute(message) {

  if (message.author.id === '236051314080088064') {

message.channel.send('Restarting..');
message.channel.send('Restarting..');
message.channel.send('Restarting..');

		process.exit();
			
		}
else

  message.channel.send('Sorry cuk, cuma si Kousei yg bisa pake command ini!');
	},
};