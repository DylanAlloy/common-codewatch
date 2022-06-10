const
    express = require("express")
    , router = express.Router()
    ;

/* A router that is used to get the search term from the user. */
router.get("/", function (req, res, next) {
    var search = req.params.search;
    const util = require('util');
    const exec = util.promisify(require('child_process').exec);

    /**
     * It pulls a docker image from docker hub, and then runs a vulnerability scan on it.
     * </code>
     * @param search - The name of the image you want to scan.
     */
    async function docker(search) {
        try {
            const { error, stdout, stderr } = await exec(`docker pull ${search}`, { maxBuffer: 1024 * 10000 });
            if (stderr) {
                res.send(stderr)
            } else if (error) {
                res.send(error)
            } else {
                trivy(search)
            }
        } catch (e) {
            res.send(e)
        }
    }
    /**
     * It takes a search term, runs a command line command, and returns the output of that command.
     * </code>
     * @param search - The image name that you want to scan.
     */
    async function trivy(search) {
        const { stdout, stderr } = await exec(`trivy image -f json ${search}`, { maxBuffer: 1024 * 10000 })
        if (stderr) {
            res.send(stderr)
        } else {
            const i = stdout.indexOf('{');
            const splits = [stdout.slice(0, i), stdout.slice(i + 1)];
            var items = JSON.parse("{" + splits[1]).Results
            res.send(items)
        }
    }
    docker(search);
})

module.exports = router;
