let target = "libfatalpay.so"
const offset = 0x121b38

function initObserver() {
	Process.attachModuleObserver({
		onAdded(module) {
			module.name == target ? console.log(`[*] target module loaded at: ${module.base}`) : console.log("[!] module not found"); return
			initMemoryScan(module)
			bypassIntegrityCheck(module)
		},
		onRemoved(module) {
			console.log(`[*] ${target} unloaded `)
		}

		Interceptor.attach(module.base.add(offset), {
			onEnter(args) {
				console.log(`[*] method called witha args: ${args[3].readCString()}`)
			},
			onLeave(retval) {
				console.log("[*] method execution finished")
			}
		})
	})
}

/*
*   some protections are not traditional AntiFrida, they avoid only Interceptor api calls
*   integrity checks (read operations) are performed against the code snippet that recieves the injection
*   to bypass them, we can scan the target library .text section
*/

function initMemoryScan(lib) {
	const ranges = lib.enumerateRanges(`r-x`)
	const _text = ranges[0]
	console.log(`[!] .text section found at ${_text.base}`)

	MemoryAccessMonitor.enable({
		base: _text.base,
		size: _text.size
	}, {
		onAccess(details) {
			if (details.operation == "read") {
				let src = Process.findModuleByAddress(details.from)
				if (src && src.name == target) {
					let tOffset = details.address.sub(_text.base)
					console.log(`[*] target offset: ${tOffset}`)
					console.log(`[*] ${src.name} !${details.from.sub(src.base)}`)
				}
			}
		}
	})
}

/*      flow
*   mov x8, xzr   <-- move to x8 register the 0 value
*   str wzr, [x8] <-- try to load the value from, now, 0 offset = SIGSEV
*   b   FUNC
*
*   ldrb w14, [x12, x13, LSL ] <-- load to w14 register the hardened function bytecode from the disk
*   ldrb w15, [x11, x13, LSL ] <-- load to w15 register the hardened function bytecode from the memory
*   cmp w14, w15	       <-- real comparsion, if fails = SIGSEV
*   b.ne FUNC
*/

function bypassIntegrityCheck(lib) {
	Interceptor.attach(lib.base.add(0x115590), function() {
		this.context.x14 = this.context.x15
	})
}
