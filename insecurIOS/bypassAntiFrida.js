let libSys  = Process.findModuleByName("libSystem.B.dylib");

function bypassAntiFrida() {
    let methods = ["bind", "listen", "socket"];

    console.log(`[*] libSystem found at ${libSys.base}`)

    libSys.enumerateExports().forEach((method) => {
        if (methods.includes(method.name)) {
            Interceptor.attach(method.address, {
                onEnter() {
                    console.log(`[*] libSystem@${method.name} called at ${method.address}`);
                },
                onLeave(retval) {
                    retval.replace(0)
                    console.log(`[!] returned ${retval} (bypassed)`);
                }
            })
        }
    })
}

bypassAntiFrida()
