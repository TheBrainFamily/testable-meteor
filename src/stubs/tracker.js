const Tracker = {
  autorun: (func, ...args) => {
    const stop = () => {};
    func({ stop, ...args });
  },
  nonreactive: (func, ...args) => { func(args); },
};

export { Tracker };
