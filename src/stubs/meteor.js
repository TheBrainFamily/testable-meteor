import meteorMethods from './meteorMethods'
import ReactiveVar from './reactive-var'
import { Mongo } from './mongo.js';

class MeteorError extends Error {
  constructor(...args) {
    super();
    this.errorType = 'MeteorError';
    this.name = 'MeteorError';
    this.message = _.last(args);
  }
}


const Meteor = {
  ...meteorMethods,
  ReactiveVar,
  setTimeout: () => {},
  users: new Mongo.Collection('Users'),
  call() {},
  user() {},
  userId() {},
  isServer: true,
  isClient: true,
  startup() {},
  subscribe() {
    return { ready: () => false };
  },
  publish() {},
  settings: {
    public: {},
  },
  Error: MeteorError,
}

export { Meteor }
