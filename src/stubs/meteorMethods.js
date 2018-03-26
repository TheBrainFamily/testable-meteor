let methods = {}
const meteorMethods = {
  methods(methodsToSet) {
    methods = { ...methods, ...methodsToSet }
  },
  call(methodName) {
    methods[methodName].apply({}, Array.prototype.slice.call(arguments, 1))
  },
  callPromise(methodName) {
    return new Promise(function(resolve, reject) {
      const value = methods[methodName].apply({}, Array.prototype.slice.call(arguments, 1))
      resolve(value)
    })
  },
}

export default meteorMethods
