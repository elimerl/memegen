const spawn = require("child_process").spawnSync
/**
 * @typedef {Object} ProcessObject
 * @property {number} pid Process ID of the process.
 * @property {Buffer} stdout The process stdout.
 * @property {Buffer} stderr The process stdout.
 * @property {number} status The exit code.
 */
/**
 * Runs `magick convert` syncronously and returns when done.
 * @param {string[]} args
 * @returns {ProcessObject} 
 */
function convert(args) {
	let pArgs = args
	pArgs.unshift("convert")
	return spawn("magick", pArgs)
}
module.exports = {
	convert
}