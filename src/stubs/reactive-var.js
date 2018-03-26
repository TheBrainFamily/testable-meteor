class ReactiveVar {
  constructor(value) {
    this.value = value
  }
  get() {
    return this.value
  }
  set(value) {
    this.value = value
  }
}

export { ReactiveVar }
