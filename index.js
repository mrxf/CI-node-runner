const argv = require('yargs').argv;
const exec = require('child_process').exec;
function entry() {
    let isInstalledNodeModules = false;

    exec("npm ls --json", function(err, stdout, stderr) {
        if (err) return installModule()
        fnExecCommands();
    })

    /** 
     * 安装依赖
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
     * 执行参数中的命令
     */
    function fnExecCommands() {
        argv._.forEach(v => {
            exec(v, (err, stdout, stderr) => {
                if(err) return console.log(err);
                console.log(stdout);
            });
        })
    }
}
module.exports = entry;