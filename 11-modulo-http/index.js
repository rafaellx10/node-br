const http = require("http");
const PORT = 5000;

http
	.createServer((request, response) => {
		response.end("Hello NodeJS");
	})
	.listen(PORT, () => console.log(`Server running on port ${PORT}`));
