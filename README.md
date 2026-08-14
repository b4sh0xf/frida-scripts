# mobile instrumentation

some frida and renef scripts to manipulate apps in runtime and bypass client side protections (and some arm64 assembly notes)

## disclaimer
- this scripts are specific to determinate apps, dont try to replicate in any other apps

## general usage
- the majority of this scripts are used by this way
  
    ```bash
  ➜  ~ frida -U -f <package> -l script.js
  ```
