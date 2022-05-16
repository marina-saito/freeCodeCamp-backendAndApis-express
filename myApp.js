require('dotenv').config();

let bodyParser = require('body-parser');

let express = require('express');
let app = express();

console.log('Hello World');

const publicPath = __dirname + '/public';
app.use('/public', express.static(publicPath));

app.use(function (req, _res, next) {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
});


app.use(bodyParser.urlencoded({ extended: false }))

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
});

app.get('/:word/echo', function(req, res) {
	res.json({
		echo: req.params.word,
	});
});

app.route('/name')
	.get(function(req, res) {
		res.json({
			name: `${req.query.first} ${req.query.last}`,
		});
	});

module.exports = app;
