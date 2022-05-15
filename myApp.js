let express = require('express');
let app = express();

console.log('Hello World');

const publicPath = __dirname + '/public';
app.use('/public', express.static(publicPath));

app.get('/', function(req,res) {
	const absolutePath = __dirname + '/views/index.html';
	res.sendFile(absolutePath);
});

app.get('/json', function(req,res) {
	res.json({
		message: 'Hello json',
	})
})

module.exports = app;
