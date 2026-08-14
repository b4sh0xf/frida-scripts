hook("com/kikps/kikypspro/KikyPS", "myStr", "(Ljava/lang/string;)Ljava/lang/String;", {
	onEnter = function(args)
		print("[*] com.kikps.kikypspro.KikyPS.myStr() called")
		-- args[0] -> ArtMethod ptr
		-- args[1] -> this ptr for instance methods and first parameter for static methods
		print("[1] parameter: " .. Jni.getStringUTF(args[1]))	
	end,
	onLeave = function(retval)
		print("[*] original return: %s" .. retval.value)
	end
})
