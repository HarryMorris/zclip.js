module.exports = function FakeCli() {
  this.printed = [];
  this.printedErrors = [];
  this.exitCode;

  this.printHeader = function(message) {
    this.printed.push(message);
  }

  this.print = function(message) {
    this.printed.push(message);
  }

  this.printError = function(error) {
    this.printedErrors.push(error);
  }

  this.exit = function(exitCode) {
    this.exitCode = exitCode;
  }
}

