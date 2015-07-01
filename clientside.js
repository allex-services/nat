function createClientSide(execlib) {
  'use strict';
  var execSuite = execlib.execSuite,
  dataServicePack = execSuite.registry.get('allex_dataservice'),
  ParentServicePack = dataServicePack;

  return {
    SinkMap: require('./sinkmapcreator')(execlib, ParentServicePack)
  };
}

module.exports = createClientSide;
