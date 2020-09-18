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

const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const chai = require('chai').assert
const request = require('request')
const os = require('os');
const im = require('../lib/im')
const fs = require('fs')
it('Test that express is working', (done) => {
	app.get('*', (req, res) => {
		res.json({
			working: 'This response means the server is working.'
		})
	})
	app.listen(port, () => {
		request('http://localhost:' + port + '/', (err, res, body) => {
			if (err) done(err)
			else if (JSON.parse(body).working !== 'This response means the server is working.') {
				done(new Error('Bad response'));
			} else {
				done()
			}

		})

	})

});

it('Generate test meme', (done) => {
	im.convert(['memes/panic.png',
		'-gravity', 'NorthWest',
		'-font', 'fonts/AlfaSlabOne-Regular.ttf',
		'-pointsize', '70',
		'-annotate', '+70+100', '',
		'-annotate', '+70+700', '',
		'-annotate', '+70+1400', '',
		'test/test.png'
	])
	const convert = im.compare(['-metric', 'PHASH', 'test/panic.png', 'test/test.png', 'null:'])
	chai.strictEqual(convert.stderr.toString('utf-8'), '0')
	done()
})