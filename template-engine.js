/*
Javascript template engine.

The template engine needs to handle two things:
- Variable substitution. {{variable}}
- If-statements. {{#if variable}}content{{/if}}

templatelib.js:

For example, given the following template:

var entryTemplate = '\
  <div class="entry">\
    <h1>Welcome {{name}}</h1>\
    <div class="body">\
      {{body}}\
    </div>\
    {{#if loggedIn}}\
      Logout {{name}}\
    {{/if}}\
  </div>';

Implement tlib, such that we should be able to load a template, and render it with any set of variables:
> var template = tlib.loadTemplate(entryTemplate);
> var html = template.render({name: "Maor", body: "Some content", loggedIn: true});
> html

<div class="entry">
  <h1>Welcome Maor</h1>
  <div class="body">
    Some content
  </div>
  Logout Maor
</div>
*/

// Create a tlib object that has a loadTemplate method, which returns an instance of a template class.
var tlib = {
  loadTemplate: function(templateString) {
    // Return an instance of a templateString class.  
    return new Template(templateString);
  },
};

// Create the template class and store a render method on the prototype object.
var Template = function(templateString) {
  this.templateString = templateString;
};

// TODO: Ensure you're not checking string indices that are undefined. 
Template.prototype.render = function(variables) {
  var result = '';
  
  for (var i = 0; i < this.templateString.length; i++) {
    // Iterate over a string and when we encounter a {{
    if (templateString[i] === '{' && templateString[i + 1] === '{') {
      
      var endingIndex = templateString.indexOf('}}', i + 2);
      if (templateString.substr(i + 2, 3) === '#if') {
        // ... when we encounter a {{#if
        // Form the conditional statement and evaluate it.
        var ifStatement = templateString.substr(i + 2, endingIndex);
        var endingIfStatementIndex = templateString.indexOf('{{/if}}', i + 2);
        var ifStatementBody = templateString.substr(i + 2, endingIfStatementIndex);
        // If true, save the body of the if statement and process it.
        if (variables[ifStatement]) {
          result.concat(ifStatementBody); 
        }
        // Otherwise, discard the body of the if statement. variable.  
        i = endingIfStatementIndex + 7; // 7 is the length of the string {{/if}}
      } else {
        // It's a variable
        // Find the corresponding }}, store everything in between
        var varName = templateString.substr(i + 2, endingIndex);
        // Then, substitute the variable with the corresponding value
        if (variables[varName]) {
          result.concat(variables[varName]);
        }
      }
    } else {
      result.concat(templateString[i]); 
    }
  }
};

/*
Next steps...
 - In what ways should we make it more sophisticated? (prioritizing what it needs to do and why)
 - Refactor variable names
 - Refactor to avoid using so many magic numbers
 - Refactor to leverage common patterns (i.e. identifying start index, end index, and everything in between) --> helper function?
 - Consider using recursion to process nested if statements

*/