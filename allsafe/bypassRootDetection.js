Java.perform(() => {

        let root = Java.use('com.scottyab.rootbeer.RootBeer')

        root['isRooted'].implementation = function () {
                console.log('[+] bypassing root detection')
                return false
        }

})
