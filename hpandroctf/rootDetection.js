Java.perform(() => {

        let root = Java.use('hpandro.android.security.ui.activity.task.rootDetection.RootManagementTaskActivity')

        root['detectRootManagementApps'].implementation = function(a, b) {
                return false
        }
})
