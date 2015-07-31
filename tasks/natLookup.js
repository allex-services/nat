function createNatLookupTask (execlib) {
  'use strict';
  var lib = execlib.lib,
    q = lib.q,
    execSuite = execlib.execSuite,
    SinkTask = execSuite.SinkTask,
    taskRegistry = execSuite.taskRegistry;

  function NatLookupTask (prophash) {
    SinkTask.call(this, prophash);
    this.sink = prophash.sink;
    this.cb = prophash.cb;
    this.iport = prophash.iport;
    this.materializeDataTask = null;
  }
  lib.inherit(NatLookupTask, SinkTask);
  NatLookupTask.prototype.__cleanUp = function () {
    if (this.materializeDataTask) {
      lib.runNext(this.materializeDataTask.destroy.bind(this.materializeDataTask));
    }
    this.materializeDataTask = null;
    this.cb = null;
    this.iport = null;
    this.sink = null;
  };
  NatLookupTask.prototype.go = function () {
    if (!this.sink) {
      return;
    }
    if (this.materializeDataTask) {
      return;
    }
    this.materializeDataTask = taskRegistry.run('materializeData', {
      sink: this.sink,
      data: [],
      onRecordCreation: this.onRecord.bind(this)/*,
      onRecordDeletion: this.onRecordDeleted.bind(this)*/
    });
  };
  NatLookupTask.prototype.onRecord = function (record) {
    console.log('NAT', record);
    var port;
    if (lib.isArray(record.iport) && record.eport === 0) {
      port = this.iport;
    } else {
      port = record.eport;
    }
    if (this.cb) {
      this.cb(record.eaddress, port);
    }
  };
  NatLookupTask.prototype.compulsoryConstructionProperties = ['sink', 'iport', 'cb'];

  return NatLookupTask;
}

module.exports = createNatLookupTask;
