/*  This program is an Express server to generate memes using ImageMagick <https://imagemagick.org>
    Copyright (C) <year>  <name of author>

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
const im = require('./lib/im')

const express = require('express')
const rateLimit = require('express-rate-limit');
const short = require('short-uuid')
const app = express()
const port = 3000
const path = require('path')
app.use(express.static(path.join(__dirname, 'site')))
app.use(express.static(path.join(__dirname, 'memes')))

const limiter = rateLimit({
	windowMs: 15 * 1000, // 15 seconds
	max: 10 // limit each IP to 10 requests per windowMs
});
const verbose = (process.argv[2] === '--verbose')
//  apply to all requests
app.use(limiter);
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'site', 'index.htm'))
})
app.get('/panik', (req, res) => {
	const text = [req.query.text0, req.query.text1, req.query.text2]
	const imgUUID = short.generate()
	if (verbose) console.log('Request ID ' + imgUUID + ' has been sent. Processing...')
	panic(text, imgUUID)
	if (verbose) console.log('Request ID ' + imgUUID + ' has been processed. Redirecting...')
	res.redirect('../file/' + imgUUID)
})
app.get('/drake', (req, res) => {
	const text = [req.query.text0, req.query.text1]
	const imgUUID = short.generate()
	if (verbose) console.log('Request ID ' + imgUUID + ' has been sent. Processing...')
	drake(text, imgUUID)
	if (verbose) console.log('Request ID ' + imgUUID + ' has been processed. Redirecting...')
	res.redirect('../file/' + imgUUID)
})
app.get('/file/:id', (req, res) => {
	const fileID = req.params.id
	if (verbose) console.log('Request ID ' + fileID + ' has been requested. Finishing...')
	res.sendFile(path.join(__dirname, 'out', fileID + '.png'))
	if (verbose) console.log('Request ID ' + fileID + ' has been finished.')
})
app.listen(port, () => {
	console.log(`Memegen listening at http://localhost:${port}`)
})
/**
 * Generates the Panik Kalm Panik meme.
 * @param {string[]} text 3-long array of strings.
 * @param {string} imgUUID Id of the image to be stored
 * @returns {string} Relative path to where the output is stored.
 */
function panic(text, imgUUID) {
	im.convert(['memes/panic.png',
		'-gravity', 'NorthWest',
		'-font', 'fonts/AlfaSlabOne-Regular.ttf',
		'-pointsize', '70',
		'-annotate', '+70+100', text[0],
		'-annotate', '+70+700', text[1],
		'-annotate', '+70+1400', text[2],
		`out/${imgUUID}.png`
	])
	return `out/${imgUUID}.png`
}

function drake(text, imgUUID) {
	im.convert(['memes/drake.png',
		'-gravity', 'NorthEast',
		'-font', 'fonts/ComicSansMS.ttf',
		'-pointsize', '40',
		'-annotate', '+10+100', text[0],
		'-annotate', '+10+450', text[1],
		`out/${imgUUID}.png`
	])
	return `out/${imgUUID}.png`
}