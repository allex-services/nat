function createNatLookupFilterCreator(execlib,basicfilters) {
  'use strict';
  var lib = execlib.lib,
    Filter = basicfilters.Filter;

  function NatLookupFilter (filterdescriptor) {
    Filter.call(this, filterdescriptor);
    this.iaddress = filterdescriptor.iaddress;
    this.iport = filterdescriptor.iport;
  }
  lib.inherit(NatLookupFilter, Filter);
  NatLookupFilter.prototype.isOK = function (datahash) {
    //console.log('nat ok?',datahash,this.iaddress,this.iport);
    if (datahash.iaddress !== this.iaddress) {
      //console.log('nope');
      return false;
    }
    if(lib.isArray(datahash.iport)){
      //console.log(this.iport >= datahash.iport[0] && this.iport <= datahash.iport[1]);
      return this.iport >= datahash.iport[0] && this.iport <= datahash.iport[1]; 
    }
    //console.log(this.iport === datahash.iport);
    return this.iport === datahash.iport;
  };

  return NatLookupFilter;
}

module.exports = createNatLookupFilterCreator;
