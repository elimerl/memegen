/*  This is a testing system that is run every commit. USE FOR LEGACY IMAGEMAGICK ONLY!
    Copyright (C) 2020 elimerl

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>. 
 */
const spawn = require("child_process").spawnSync
/**
 * @typedef {Object} ProcessObject
 * @property {number} pid Pro   cess ID of the process.
 * @property {Buffer} stdout The process stdout.
 * @property {Buffer} stderr The process stdout.
 * @property {number} status The exit code.
 */
/**
 * Runs `convert` syncronously and returns when done.
 * @param {string[]} args
 * @returns {ProcessObject} 
 */
function convert(args) {
    let pArgs = args
    return spawn("convert", pArgs)
}

/**
 * Runs `compare` syncronously and returns when done.
 * @param {string[]} args
 * @returns {ProcessObject} 
 */
function compare(args) {
    let pArgs = args
    return spawn("compare", pArgs)
}
module.exports = {
    convert,
    compare
}