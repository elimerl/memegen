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
const path = require("path")
const chai = require("chai").assert
const request = require("request")
it('Test that express is working', (done) => {
	app.get("*", (req, res) => {
		res.status(404).send("achoo")
	})
	app.listen(port, () => {
		console.log("done")
		request("http://localhost:" + port + "/", (err, res, body) => {
			if (err) done(err)
			else if (res.statusCode === 404) {
				done(new Error("Status code 404"));
			} else {
				console.log(body)
				done()
			}

		})

	})

});
it('always will pass', (done) => {
	done()
})