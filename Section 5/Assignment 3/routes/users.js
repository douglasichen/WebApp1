const path = require('path');
const rootDir = path.dirname(require.main.filename);
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.sendFile(path.join(rootDir, "views", "users.html"));
});

module.exports = router;