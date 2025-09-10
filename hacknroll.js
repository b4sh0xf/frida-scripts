defineHandler({
  onEnter(log, args, state) {
    log('connect()')
  },

  onLeave(log, retval, state) {
    retval.replace(-1);
  }
})
