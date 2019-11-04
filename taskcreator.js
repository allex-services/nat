function createClientSide(execlib) {
  'use strict';
  return [{
    name: 'natLookup',
    klass: require('./tasks/natLookup')(execlib)
  },{
    name: 'natClient',
    klass: require('./tasks/natClient')(execlib)
  }]
}

module.exports = createClientSide;
