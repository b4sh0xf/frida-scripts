Java.perform(function () {
    var StringClass = Java.use("java.lang.String");

    StringClass.equals.overload('java.lang.Object').implementation = function (a) {
        if (a != null && a.toString() === "a2a3d412e92d896134d9c9126d756f") {
            console.log("[+] comparation manipulated")
            return true
        }
        return this.equals(obj)
    }
})
