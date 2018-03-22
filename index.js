const exec = require('child_process').exec;
const maxBuffer = 1024 * 5000;
function entry() {
    let isInstalledNodeModules = true;

    exec("npm ls --json",{maxBuffer: maxBuffer}, function(err, stdout, stderr) {
        if (err) {
            isInstalledNodeModules = false;
            return installModule();
        }
        fnExecCommands();
    })

    /** 
     * install node modules
     */
    function installModule() {
        if(!isInstalledNodeModules) {
            console.log("Installing missing modules!");
            exec('npm i', function(err, stdout, stderr) {
                isInstalledNodeModules = true;
                if (err) return ;
                console.log("Re execution of the command");
                fnExecCommands();
            });
        }
    }

    /**
     * exec the commands
     */
    function fnExecCommands() {
        const userArgv = process.argv.slice(2);
        const userCommand = userArgv.join(" ");
        exec(userCommand, (err, stdout, stderr) => {
            if(err) return console.log(err);
            console.log(stdout);
        });
    }
}
module.exports = entry;