function createClientSide(execlib) {
  'use strict';
  return [{
    name: 'natLookup',
    klass: require('./tasks/natLookup')(execlib)
  }]
}

module.exports = createClientSide;
