// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  switch(typeof(obj)){
    case 'function':
    case 'undefined': //Multicriteria case
      return 'null';
    case 'number':
    case 'boolean':
      return '' + obj; //Force it into a string
    case 'string':
      return '"' + obj + '"';

    case 'object':
      obj == null ? return 'null' :

        var returnarray = _(obj).map(function(item, position, obj) {
          if(typeof(item) !== 'object'){ 
            if(Array.isArray(obj)){
              return stringifyJSON(item);
            } else {
              return position + ':' + item;
            }
          } else {
            return stringifyJSON(item);
          }
        });
      return true;  
};
