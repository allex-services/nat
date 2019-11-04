function createNatClientTask (execlib) {
  'use strict';

  var lib = execlib.lib,
    q = lib.q,
    execSuite = execlib.execSuite,
    SinkTask = execSuite.SinkTask,
    taskRegistry = execSuite.taskRegistry;

  function NatClient () {
    this.data = [];
    this.materializeQueryTask = null;
  }
  NatClient.prototype.destroy = function () {
    if (this.materializeQueryTask) {
      this.materializeQueryTask.destroy();
    }
    this.materializeQueryTask = null;
  };
  NatClient.prototype.setSink = function (sink) {
    this.data = [];
    if (!sink) {
      return;
    }
    this.materializeQueryTask = taskRegistry.run('materializeQuery', {
      sink: this.sink,
      filter: {},
      continuous: true,
      data: this.data
    });
  };
  NatClient.prototype.find = function (ipaddress, port) {
  };


  function NatClientTask (prophash) {
    SinkTask.call(this, prophash);
  }
  lib.inherit(NatClientTask, SinkTask);
  NatClientTask.prototype.go = function () {
    var ret = new NatClient();
    ret.setSink(this.sink); 
    this.destroy();
    return ret;
  };
  NatClientTask.prototype.compulsoryConstructionProperties = ['sink'];

  return NatClientTask;
}
module.exports = createNatClientTask;
