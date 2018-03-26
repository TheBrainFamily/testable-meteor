import Future from 'fibers/future';
import _ from 'underscore';

const ___mongoFakerTimestamp = '___mongoFakerTimestamp';

const findOne = function (query, collection) {
  function callDB() {
    const future = new Future();
    collection.findOne(query).then((data) => {
      future.return(_.omit(data, ___mongoFakerTimestamp));
    });
    return future;
  }

  return callDB().wait();
}.future();

const update = function (matchingQuery, setQuery, collection, options) {
  function callDBUpdate() {
    const future = new Future();
    collection.update(matchingQuery, setQuery, options).then(() => {
      future.return();
    });
    return future;
  }

  return callDBUpdate().wait();
}.future();

const find = function (query, options, collection) {
  function callDBFind() {
    const future = new Future();
    collection.find(query, { options }).then((data) => {
      const sorterFields = [];
      if (options && options.sort) {
        Object.keys(options.sort).forEach((key) => {
          if (options.sort[key] === 1) {
            sorterFields.push(key);
          } else {
            sorterFields.push(`-${key}`);
          }
        });
      }
      sorterFields.push(___mongoFakerTimestamp)
      const sorted = data.sort(fieldSorter(sorterFields));
      const sanitized = _.map(sorted, doc => _.omit(doc, ___mongoFakerTimestamp))
      future.return(sanitized);
    });
    return future;
  }

  return callDBFind().wait();
}.future();

function fieldSorter(fields) {
  return (a, b) =>
    fields
      .map((o) => {
        let dir = 1;
        if (o[0] === '-') {
          dir = -1;
          o = o.substring(1);
        }
        return a[o] > b[o] ? dir : a[o] < b[o] ? -dir : 0;
      })
      .reduce((p, n) => (p || n), 0);
}

const insert = function (query, collection) {
  function callDBInsert() {
    const future = new Future();
    setTimeout(() => {
      if (query instanceof Array) {
        query.forEach(obj => {
          obj[___mongoFakerTimestamp] = new Date().getTime()
        })
      } else {
        query = {...query, [___mongoFakerTimestamp]: new Date().getTime()}
      }
      collection.insert(query)
        .then((data) => {
          if (data instanceof Array) {
            future.return(data.map(datum => datum._id));
          } else {
            future.return(data._id);
          }
        });
    },1)
    return future;
  }

  return callDBInsert().wait();
}.future();

const remove = function (query, options, collection) {
  function callDBRemove() {
    const future = new Future();
    collection.remove(query, options).then(() => {
      future.return();
    });
    return future;
  }
  return callDBRemove().wait();
}.future();

export default function fakeCollection(collection) {
  return {
    findOne(query) {
      return findOne(query, collection).wait();
    },
    update(matchingQuery, setQuery, options) {
      update(matchingQuery, setQuery, collection, options).wait();
    },
    upsert(matchingQuery, setQuery) {
      update(matchingQuery, setQuery, collection, { upsert: true }).wait();
    },
    find(query, options = {}) {
      const data = find(query, options, collection).wait();
      const handler = {
        get(target, name) {
          if (!(name in target)) {
            return function () {
              return target.fetch()[name](...Array.from(arguments));
            };
          }
          return target[name];
        },
      };
      return new Proxy(
        {
          length: data.length,
          fetch: () => data,
          count: () => data.length,
          observe: () => {}, // FIXME support initial add callback
        },
        handler,
      );
    },
    insert(query) {
      return insert(query, collection).wait();
    },
    remove(query, options = {}) {
      remove(query, options, collection).wait();
    },
  };
}
