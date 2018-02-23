module.exports = MissingArgumentsError;

function MissingArgumentsError(missingArgs) {
  this.name = 'MissingArgumentsError';
  this.message = 'Missing required arguments';
  this.stack = (new Error()).stack;
  this.missingArgs = missingArgs;
}

MissingArgumentsError.prototype = new Error;

