const FlowRouter = {
  params: {},
  getQueryParam: function(paramName) {
    return this.params.paramName || ''
  },
  setQueryParams: function(param) {
    this.params = Object.assign({}, param)
  },
  getParam(param) {
    return param
  },
  path: function(param, object) {
    return `http://${param}`
  },
  watchPathChange: function() {},
  current: () => ({ path: '' }),
  go: () => {},
  context: {},
}

export { FlowRouter }
