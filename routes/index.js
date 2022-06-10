const config = require('../config.json')
const express = require("express");
const router = express.Router();

/* The below code is creating a route that will return the health of the application. */
router.get('/', (req, res) => {
    let health;
    health.isUp = {
        uptime: process.uptime(),
        message: 'OK',
        date: new Date()
    }
    var fs = require('fs'), obj
    fs.readFile(`${__dirname}/../config.json`, handleFile)
    /**
     * If there's an error, set the health status to unhealthy and return. Otherwise, parse the JSON
     * and set the health status to healthy and the number of keys in the JSON object.
     * @param err - The error object, if any.
     * @param data - The data that is returned from the file.
     * @returns The function handleFile is being returned.
     */
    function handleFile(err, data) {
        if (err) { health.config({ "status": "unhealthy", "error": err }); return; }
        obj = JSON.parse(data)
        health.config = { "status": "healthy", "keys": Object.keys(obj).length }
    }
    res.json(response);
});

module.exports = router;