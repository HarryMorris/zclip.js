module.exports = function(str) {
  if (!str) return '';

  // Replace symbols with spaces
  str = str.replace(/[^a-zA-Z0-9]/g, ' ')

  // dedup spaces
  str = str.replace(/\s+/g, ' ');

  // split string on spaces or uppercase

  var words = str.split(/(?=[A-Z][a-z]+)|\s/g)

  words.forEach(function(word, index) {

    // lower case all the words
    word = word.toLowerCase();

    // upper case every word except the first
    if (index != 0) {
      word = word.replace(/^(.)/, function($1) { return $1.toUpperCase(); })
    }

    words[index] = word;
  });

  return words.join('');
}
