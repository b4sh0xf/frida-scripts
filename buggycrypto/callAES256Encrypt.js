Java.perform(() => {

        let CryptoClass = Java.use('com.dns.buggycrypto.CryptoClass')

        CryptoClass['aes256encrypt'].implementation = function(a, b, c) {
                console.log("[+] method aes256encrypt called!")
                return this['aes256encrypt'](a, b, c)
        }

})
