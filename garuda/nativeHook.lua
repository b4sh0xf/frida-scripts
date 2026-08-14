--[[
	PLT/GOT hooking

	+-----------------+		
        |    .text        |	
        +-----------------+
        | call strcmp@plt |							
	+-----------------+

		|
		|
		v

	+-----------------+	   +-----------------+		+-----------------+
        |     .plt        |	   |	.got	     |		|     libc.so     |
        +-----------------+	   +-----------------+   --> 	+-----------------+
	| adrp x16	  |  --->  | strcmp addr     |		|  strcmp() {...} |
	| ldr x17         | 	   +-----------------+		+-----------------+
	| br *got[n]      |			
        +-----------------+			
						|
						|  (hijacked pointer)
						| 
						v

	
					+-----------------+
					| hooking code	  |
					+-----------------+
						

	inline trampoline: inject (tamper!) a JMP instruction to the hooking code on strcmp() prologue

]]

targetLib = "libc.so"
targetFn  = "strcmp"

function getOffset(module, export)
	for _, symbol in ipairs(Module.exports(module)) do
		if symbol.name == export then
			print(string.format("[*] strcmp() offset at libc: 0x%x", symbol.offset))
			return symbol.offset	
		end
	end
end


hook("libc.so", getOffset(targetLib, targetFn), {
	caller = "libkikyspro.so" -- force PLT/GOT hooking
	onEnter = function(args)
		print("[*] strcmp() called!")
		print(string.format("const char *s1: %s", Memory.readString(args[0])))
		print(string.format("const char *s2: %s", Memory.readString(args[1])))
	end,
	onLeave = function(retval)
		print(string.format("[+] returned: %d", retval.value))
	end
})
