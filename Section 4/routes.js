const fs = require('fs');

const requestHandler = (req, res) => {
	const url = req.url;
	const method = req.method;

	if (url === '/') {
		res.write('<html>');
		res.write('<head><title>Enter Message</title><head>');
		res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
		res.write('</html>');
		return res.end();
	}
	if (url === '/message' && method === 'POST') {
		// get request data
		const body = [];
		req.on('data', (chunk) => {
			body.push(chunk);
		});
		return req.on('end', () => {
			const parsedBody = Buffer.concat(body).toString();
			const message = parsedBody.split('=')[1];
	
			fs.writeFile('message.txt', message, (err) => {
				if (err) {
					return console.log('There is an error with writing file "message.txt"');
				}
				res.statusCode = 302;
				res.setHeader('Location', '/');		
				return res.end();
			});
		});
	}
	
	res.setHeader('Content-type', 'text/html');
	res.write('<html>');
	res.write('<head><title>My First Page</title><head>');
	res.write('<body><h1>Hello fromm my Node.js Server!</h1></body>');
	res.write('</html>');
};

// module.exports = {
// 	handler: requestHandler,
// 	someText: 'Some hard coded text'
// };

exports.handler = requestHandler;
exports.someText = 'Some text'; 
