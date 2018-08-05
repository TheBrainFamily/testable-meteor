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
    const newQuery = typeof query === 'string' ? { _id: query } : query;
    return this.datastore.update(newQuery, set, options);
  }
  upsert(query, set) {
    return this.datastore.upsert(query, set);
  }
  remove(query, opts) {
    const newQuery = typeof query === 'string' ? { _id: query } : query;
    return this.datastore.remove(newQuery, opts);
  }
}

const Mongo = {
  Collection,
};

export { Mongo };
