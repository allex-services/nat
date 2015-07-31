function createNatService(execlib, ParentServicePack) {
  'use strict';
  var ParentService = ParentServicePack.Service,
    dataSuite = execlib.dataSuite,
    MemoryStorage = dataSuite.MemoryStorage;

  dataSuite.filterFactory.extend('natlookup',require('./natlookupfiltercreator'));

  function factoryCreator(parentFactory) {
    return {
      'service': require('./users/serviceusercreator')(execlib, parentFactory.get('service')),
      'user': require('./users/usercreator')(execlib, parentFactory.get('user')) 
    };
  }

  function NatService(prophash) {
    ParentService.call(this, prophash);
  }
  ParentService.inherit(NatService, factoryCreator, require('./storagedescriptor'));
  NatService.prototype.__cleanUp = function() {
    ParentService.prototype.__cleanUp.call(this);
  };
  NatService.prototype.createStorage = function(storagedescriptor) {
    return new MemoryStorage(storagedescriptor);
  };
  return NatService;
}

module.exports = createNatService;
