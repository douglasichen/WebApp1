const express = require('express');
const app = express();


app.use('/users', (req, res, next) => {
	console.log('Entered "users" route.');
	res.send('<h1>Welcome to the users page.</h1>');
	res.send('<body><form action="/users" method="POST"><input type="text" name="input"><button type="submit">Send</button></form></body>');
});


app.use('/', (req, res, next) => {
	console.log('Entered home page.');


	data = [];
	// handle request
	req.on('data', (chunk) => {
		data.push(chunk);
	});
	req.on('end', () => {
		stringData = Buffer.concat(data).toString().split('=')[1];
		if (stringData && stringData.length > 0) {
			console.log(stringData);
			data = [];
		}
		res.end();
	});

	resData = '<h1>Welcome to the home page.</h1>'+
	'<body>'+
		'<form action="/" method="POST">'+
			'<input type="text" name="input">'+
			'<button type="submit">Send</button>'+
		'</form>'+
	'</body>';

	return res.send(resData);	
});


app.listen(3000);