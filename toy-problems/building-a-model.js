// Example Problem
function example () {
  // empty model - no existing attributes
  // var person = new Model();

  // model with data
  var person = new Model({name: 'Jess', age: 22});

  // these are the methods for the Model:
  person.set('name', 'Bob');
  person.get('name');
  person.has('name') // -> true (in this example)
  person.unset('name');

  person.has('name') // -> false

  person.on('some-event', function callback(){});

  // the `on` method allows us to handle change
  // events. Model emits two events for each change:
  // 'change': emitted on any change
  // 'change:#{attribute}': emitted only when `attribute`
  //                        changes.
  // here's a concrete example:
  person.on('change', function(attr, oldVal, newVal) {
    // called when any attribute changes
  });
  person.on('change:name', function(oldVal, newVal) {
    // called only when the "name" attribute changes.
    // note that the signature of this callback is
    // different from the general 'change' event
    // callback
  });

  // the two functions above should run when we call set('name', ...)
  person.set('name', 'Cally')

  // only the first function above should run here, since it runs on every change
  person.set('favorite color', 'red')

  // note that Model accepts arbitrary properties
  var company = new Model();
  company.set('employees', 2500);
  company.set('revenue', 5);
}

/*
 * MY SOLUTION
 * This creates a model similar to those in Backbone. It includes
 * methods: set, get, has, unset, and on. On can be used to listen
 * for changes to any properties stored, and executes the provided
 * callback functions when those attributes change. On can also be
 * used with the first parameter, 'change', to execute the provided
 * callback function when any attribute changes.
 */

var Model = function(seedData) {
  // set the initial values for the model
  // set empty arrays to store functions for onChange events per key
  this.properties = {};
  this.onChange = {
    'general': [], // revisit this nomenclature; store these differently?
  };
  for (var key in seedData) {
    this.properties[key] = seedData[key];
    this.onChange[key] = [];
    console.log(key);
  }
};

Model.prototype.set = function(key, value) {
  if (!this.onChange[key]) {
    console.log(key, 'Setting as empty array...');
    this.onChange[key] = [];
  };

  this._executeListeningFunctions(key, value);
  this.properties[key] = value;
};

Model.prototype.get = function(key) {
  return this.properties[key];
};

Model.prototype.has = function(key) {
  return Boolean(this.properties[key]);
};

Model.prototype.unset = function(key) {
  this._executeListeningFunctions(key);
  this.properties[key] = undefined;
};

Model.prototype.on = function(listener, callback) {
  if (listener === 'change') {
    // add callback to the array of general functions
    this.onChange['general'].push(callback);
  } else if (listener.substr(0, 6) === 'change') {
    var key = listener.substr(7);
    if (!this.onChange[key]) { this.onChange[key] = []; };
    this.onChange[key].push(callback);
  }
};

Model.prototype._executeListeningFunctions = function(key, value) {
  value = value || undefined;
  // execute all the general functions
  for (var i = 0; i < this.onChange['general'].length; i++) {
    this.onChange['general'][i](key, this.properties[key], value);
  }
  // execute all the key-specific functions
  for (var i = 0; i < this.onChange[key].length; i++) {
    this.onChange[key][i](this.properties[key], value);
  }
};

// TESTING CODE
var dog = new Model({'bark': 'loud'});
dog.set('on', 'top of old smokey')
dog.set('onChange', 'oops')
dog.on('change:growl', function(oldGrowl, newGrowl) {
  console.log('growl changed', oldGrowl, newGrowl) // want 'growl changed undefined, low'
});
dog.set('growl', 'low');
dog.unset('growl');
