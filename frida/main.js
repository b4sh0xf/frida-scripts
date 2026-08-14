let target = "libantifrida.so"
let isLoaded = false
let hookFn1, hookFn2

Interceptor.attach(Moduflle.findExportByName(null, "android_dlopen_ext"), {
	onEnter(args) {
		let path = Memory.readCString(args[0])
		if (path.includes(target)) {
			isLoaded = true
		}
	},
	onLeave(retval) {
		if (isLoaded) {
			var targetModule = Process.getModuleByName(target)
			console.log(`[*] ${target.name} loaded at ${targetModule.base}`)

			hookFn1 = Interceptor.attach(targetModule.base.add(0x176c), {
				onEnter(args) {
					console.log("[*] fn1 called")
					startStalker(this.threadId, targetMoodule)
				},
				onLeave(retval) {
					console.log("[*] fn1 execution terminated")
					stopStalker(this.threadId)
					hookFn1.detach()
				}
			})

			hookFn2 = Interceptor.attach(targetModule.base.add(0x183c), {
                                onEnter(args) {
                                        console.log("[*] fn2 called")
					startStalker(this.threadId, targetModule)
                                },
                                onLeave(retval) {
                                        console.log("[*] fn2 execution terminated")
					stopStalker(this.threadId)
					hookFn2.detach()
                                }
                        })
		}
	}
})

function initStalker(threadId, targetModule) {
	Stalker.follow(threadId, {
		transform: function(iterator) {
			let op
			while(op = iterator.next*() != null) {
				if (op.address <= targetModule.base.add(targetModule.size) && op.address >= targetModule.base) {
					if (op.mnemonic == "svc") {
						iterator.putCallOut(function(context) {
							var instr = Instruction.parse(context.pc); // pc -> address to the next instruction
							var offset = instr.address.sub(targetModule.base)
							let x8 = context.x8
							console.log(`[+] ${offset} -> ${instr.toString()} | syscall number = ${x8}`)
						})
					}
				}
				iterator.keep()
			}
		}
	})
}

function stopStalker(threadId) {
	Stalker.unfollow(threadId)
	Stalker.flush()
}
