const Session = {
  get: function(name) {
    return this[name]
  },
  set: function(name, value) {
    this[name] = value
  },
  setDefault: function(name, value) {
    if (!this.hasOwnProperty(name)) {
      this[name] = value
    }
  },
}
export { Session }
