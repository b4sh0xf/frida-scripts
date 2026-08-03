let baseAddr = Process.mainModule.base

function calculateOffset(nValue, virtualGhidraAddress = 0x100000000) {
        let offset = nValue - virtualGhidraAddress
        return baseAddr.add(offset)
}

function bypassSwiftJailBreak() {
    let methods = {
        "checkURLSchemes":          0x100005458,
        "checkWritableDirectories": 0x1000055F0,
        "checkForbiddenFiles":      0x100005ADC,
        "checkJailbreakPaths":      0x100005D1C,
        "checkForkAbility":         0x100005EAC,
        "checkSymbolicLinks":       0x10000607C
    }

    console.log(`[*] ${Process.mainModule.name} base address: ${baseAddr}`)

    Object.entries(methods).forEach(([method, addr]) => {

        let targetAddr = calculateOffset(addr)
        
        Interceptor.attach(targetAddr, {
            onEnter() {
                console.log(`[*] ${method} called at: 0x${targetAddr.toString(16)}`);
            },
            onLeave(retval) {
                retval.replace(ptr(0x0))
                console.log(`[+] returned: ${retval} (bypassed)`)
            }
        })
    })
}

bypassSwiftJailBreak()
