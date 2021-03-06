// https://medium.freecodecamp.org/javascript-modules-a-beginner-s-guide-783f7d7a5fcc

// Example 2: Global import
// Fix the bug: ReferenceError: globalVariable is not defined.
var globalVariable = {};

(function(globalVariable) {
  // Keep this variables private inside this closure scope
  var privateFunction = function() {
    console.log('Shhhh, this is private!');
  }

  // Let's output something    
  globalVariable.callPrivateFunction = function() {
    privateFunction();
  };

  // Expose the below methods via the globalVariable interface while
  // hiding the implementation of the method within the 
  // function() block
  globalVariable.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  globalVariable.filter = function(collection, test) {
    var filtered = [];
    globalVariable.each(collection, function(item) {
      if (test(item)) {
        filtered.push(item);
      }
    });
    return filtered;
  };

  globalVariable.map = function(collection, iterator) {
    var mapped = [];
    globalUtils.each(collection, function(value, key, collection) {
      mapped.push(iterator(value));
    });
    return mapped;
  };

  globalVariable.reduce = function(collection, iterator, accumulator) {
    var startingValueMissing = accumulator === undefined;

    globalVariable.each(collection, function(item) {
      if(startingValueMissing) {
        accumulator = item;
        startingValueMissing = false;
      } else {
        accumulator = iterator(accumulator, item);
      }
    });

    return accumulator;
  };
}(globalVariable)); // vs interface object

globalVariable.callPrivateFunction();
// Shhhh, this is private!

