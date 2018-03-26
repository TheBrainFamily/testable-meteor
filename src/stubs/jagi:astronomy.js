import _ from 'underscore'
const Class = {
  create(opts) {
    const createdClass = {
      find(query, queryOpts) {
        const allFound = this.collection.find(query, queryOpts)
        allFound.forEach(found => Object.assign(found, this.helpers))
        return allFound
      },
      findOne(query, queryOpts) {
        const found = this.collection.findOne(query, queryOpts)
        if (found) {
          return Object.assign({}, found, this.helpers)
        } else {
          return undefined
        }
      },
      insert(object) {
        return this.collection.insert(object)
      },
      remove(query, queryOpts) {
        return this.collection.remove(query, queryOpts)
      },
      inherit(inheritOpts) {
        const child = {}
        if (inheritOpts.collection) {
          child.collection = inheritOpts.collection
        }
        // if (inheritOpts.name) {
        //   child.name = inheritOpts.name
        // }
        child.helpers = Object.assign({}, this.helpers, inheritOpts.helpers || {})
        return Object.assign({}, this, child)
      },
    }
    if (opts.collection) {
      createdClass.collection = opts.collection
    }
    // createdClass.name = opts.name
    createdClass.helpers = opts.helpers || {}
    const newFunction = function() {
      return Object.assign(
        {},
        {
          save: function() {
            const keysToBeInserted = Object.keys(this).filter(key => {
              return !newFunction._forbiddenKeys.includes(key)
            })
            const documentToSave = _.pick(this, keysToBeInserted)
            this.insert(documentToSave)
          },
        },
        createdClass,
      )
    }
    newFunction._forbiddenKeys = ['save']
    Object.keys(createdClass).forEach(key => {
      newFunction[key] = createdClass[key]
      newFunction._forbiddenKeys.push(key)
    })
    return newFunction
  },
}

const Enum = {
  create(opts) {
    const returnObject = opts
    returnObject['getIdentifiers'] = function() {
      return this.identifiers
    }
    return returnObject
  },
}

export { Class, Enum }
