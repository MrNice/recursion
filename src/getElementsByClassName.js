// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But in stead we're going to implement it from scratch:
var getElementsByClassName = function (className) {
  // your code here
  var matchingElements = [];

  var isClass = function(element, className) {
    return _(element.classList).any(function(item) {
      return item == className;
    });
  }

  var pullMatching = function(domElement) { 
    if(isClass(domElement, className)) {
      matchingElements.push(domElement);
    }
    if(domElement.childElementCount){
      _(domElement.children).each(pullMatching);
    } 
  } 

  pullMatching(document.body);
  return matchingElements;
};
