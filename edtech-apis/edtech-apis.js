// Coderpad's available libraries include:

// Helpers:
let _ = require('lodash');
// let _ = require('underscore'

// Async stuff
// let async = require('async')

// HTTP Request:
let request = require('request')
// request
//   .get('http://google.com/')
//   .on('response', function(response) {
//     console.log(response.statusCode);
//   })
//   .on('error', function(err) {
//     console.log(err);
//   });

// Promises:
// let promise = require('bluebird')
// let promise = require('q')

// More details:
// https://coderpad.io/languages#javascript

// Take these 2 JSON APIs and output a list of all the available courses, 
// with the course provider appended to the course title, 
// sorted alphabetically by course title.

// Udacity structure - courses[].title
const udacity = 'https://www.udacity.com/public-api/v0/courses';

// Coursera structure - elements[].name
const coursera = 'https://api.coursera.org/api/courses.v1?start=0&limit=100'

// Write a helper function that accepts a URL and a callback function to execute upon success of the AJAX request.

// request('http://www.google.com', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) // Show the HTML for the Google homepage. 
//   }
// })
const printCourses = (url, callback) => {
  // Make the ajax request.
  request(url, (error, response, body) => {
    if (error) { console.log(error); }
    callback(JSON.parse(body));
  });
};

// Udacity
printCourses(udacity, (response) => {
  _.each(response.courses, (course) => {
    
  });
});
// Coursera
