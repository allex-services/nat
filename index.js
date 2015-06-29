function createServicePack(execlib) {
  'use strict';
  var ret = require('./clientside')(execlib),
    execSuite = execlib.execSuite,
  dataServicePack = execSuite.registry.register('allex_dataservice'),
  ParentServicePack = dataServicePack;

  ret.Service = require('./servicecreator')(execlib, ParentServicePack);
  return ret;
}

module.exports = createServicePack;
