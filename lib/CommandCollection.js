var util = require(__appRoot + 'lib/util')();

module.exports = function(meta) {
  return new CommandCollection(meta);
}

function CommandCollection(meta) {
  this.meta = meta;
}

CommandCollection.prototype.availableCommands = function() {
  if (!this.meta) return [];
  if (this._availableCommands) return this._availableCommands;

  this._availableCommands = [];
  Object.getOwnPropertyNames(this.meta).forEach((commandId) => {
    this._availableCommands.push(util.camelCase(this.meta[commandId].name));
  });

  return this._availableCommands;
}

CommandCollection.prototype.argsForCommand = function(commandName) {
  var commandId = Object.getOwnPropertyNames(this.meta).find((_commandId) => {
    return this.meta[_commandId].name == commandName;
  });

  var commandData = this.meta[commandId];
  var commandArgs = [];

  Object.getOwnPropertyNames(commandData.args).forEach((argId) => {
    commandArgs.push(commandData.args[argId]);
  });

  return commandArgs;
}
