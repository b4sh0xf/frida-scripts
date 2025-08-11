Java.perform(() => {

        let pin = Java.use('infosecadventures.allsafe.challenges.PinBypass')

        pin['checkPin'].implementation = function (a) {
                console.log('[+] now all pins are valid')
                return true
        }

})
