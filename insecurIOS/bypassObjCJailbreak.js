function bypassObjCJailBreak() {
    if (ObjC.available) {

        let JailbreakObjcChecker = ObjC.classes["JailbreakObjcChecker"]
        let methods              = JailbreakObjcChecker.$ownMethods

        methods.forEach(methodName => {
            let method = JailbreakObjcChecker[methodName]
        
            if (method) {
                Interceptor.attach(method.implementation, {
                    onEnter(args) {
                        console.log(`[*] method ${methodName} called at offset ${args[1]}`)
                    },
                    onLeave(retval) {
                        retval.replace(0)
                        console.log(`[+] returned: ${retval}`)
                    }
                })
            } else {
                console.log("[!] method not found")
            }

        })
        

    } else {
        console.log("[!] ObjC runtime error")
    }
}

bypassObjCJailBreak()
