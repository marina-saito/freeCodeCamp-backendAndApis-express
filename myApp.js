require('dotenv').config();

let express = require('express');
let app = express();

console.log('Hello World');

const publicPath = __dirname + '/public';
app.use('/public', express.static(publicPath));

app.use(function (req, res, next) {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
});

app.get('/', function(req,res) {
	const absolutePath = __dirname + '/views/index.html';
	res.sendFile(absolutePath);
});

app.get('/json', function(req,res) {
	const messageStyle = process.env.MESSAGE_STYLE;
	const message = 'Hello json';

	res.json({
		message: messageStyle === 'uppercase' ? message.toUpperCase() : message,
	})
})

module.exports = app;
