Java.perform(() => {

        let crypto = Java.use('infosecadventures.allsafe.challenges.WeakCryptography')

        crypto['encrypt'].implementation = function(a) {
                console.log(`[+] entry: ${a}`)
                let res = typeof(a)
                console.log(`[+] encrypted (mod): ${res}`)
                return res
        }

        crypto['md5Hash'].implementation = function(a) {
                console.log(`[+] entry: ${a}`)
                let res = this.md5Hash(a)
                console.log(`[+] hash: ${res}`)
                return res
        }

})
