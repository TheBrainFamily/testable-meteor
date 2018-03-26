import DataStore from 'nedb-promise';

import fakeCollection from '../helpers/mongoFaker';

class Collection {
  constructor(collectionName) {
    this._name = collectionName;

    this.datastore = fakeCollection(new DataStore());
  }

  allow() {}

  deny() {}

  _ensureIndex() {}

  find(query, opts) {
    return this.datastore.find(query, opts);
  }

  findOne(query, opts) {
    const newQuery = typeof query === 'string' ? { _id: query } : query;
    return this.datastore.findOne(newQuery, opts);
  }

  insert(document) {
    return this.datastore.insert(document);
  }

  update(query, set, options = {}) {
    return this.datastore.update(query, set, options);
  }
  upsert(query, set) {
    return this.datastore.upsert(query, set);
  }
  remove(query, opts) {
    return this.datastore.remove(query, opts);
  }
}

const Mongo = {
  Collection,
};

export { Mongo };
