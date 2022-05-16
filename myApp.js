require('dotenv').config();

let express = require('express');
let app = express();

console.log('Hello World');

const publicPath = __dirname + '/public';
app.use('/public', express.static(publicPath));

app.use(function (req, _res, next) {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
});

app.get('/', function(_req, res) {
	const absolutePath = __dirname + '/views/index.html';
	res.sendFile(absolutePath);
});

app.get('/json', function(_req, res) {
	const messageStyle = process.env.MESSAGE_STYLE;
	const message = 'Hello json';

	res.json({
		message: messageStyle === 'uppercase' ? message.toUpperCase() : message,
	});
});

app.get('/now', function(req, _res, next) {
	req.time = new Date().toString();
	next();
}, function(req, res) {
	res.json({
		time: req.time,
	});
})

module.exports = app;
