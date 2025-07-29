Java.perform(() => {

    let RootUtil = Java.use('com.app.solydbank.RootUtil')

    RootUtil['isDeviceRooted'].implementation = function() {
        console.log('[+] root detection bypassed sucessfully!')
        return false
    }

})
