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
    this.materializeQueryTask = null;
  }
  lib.inherit(NatLookupTask, SinkTask);
  NatLookupTask.prototype.__cleanUp = function () {
    if (this.materializeQueryTask) {
      lib.runNext(this.materializeQueryTask.destroy.bind(this.materializeQueryTask));
    }
    this.materializeQueryTask = null;
    this.cb = null;
    this.iport = null;
    this.sink = null;
  };
  NatLookupTask.prototype.go = function () {
    if (!this.sink) {
      return;
    }
    if (this.materializeQueryTask) {
      return;
    }
    this.materializeQueryTask = taskRegistry.run('materializeQuery', {
      sink: this.sink,
      continuous: true,
      data: [],
      onRecordCreation: this.onRecord.bind(this)
    });
  };
  NatLookupTask.prototype.onRecord = function (record) {
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
