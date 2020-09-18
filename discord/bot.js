const config = require("./config.json")
const request = require("request")
const short = require("short-uuid")
const discord = require("discord.js")
const client = new discord.Client()
const prefix = "!"
client.on("ready", () => {
	console.log("Logged in as " + client.user.username)
})
client.on("message", (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	let args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();
	args = args.join(' ')
	try {
		JSON.parse(args)
	} catch (error) {
		message.reply(`Invalid JSON. Try something like {"text0": "you explode", "text1": "you respawn", "text2": "you explode again"}`)
		return;
	}

	const meme = JSON.parse(args)
	if (command === "panik") {
		const image = new discord.MessageAttachment(`http://localhost:3000/panik?text0=${meme.text0}&text1=${meme.text1}&text2=${meme.text2}`, "panik.png")
		message.reply("Here's the panik meme:", image);

	} else if (command === "drake") {
		const image = new discord.MessageAttachment(`http://localhost:3000/drake?text0=${meme.text0}&text1=${meme.text1}`, "drake.png")
		message.reply("Here's the drake meme:", image);


	}



})
client.login(config.token)