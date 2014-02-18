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
      if(obj == null) { return 'null'; } else {
        var returnArray = _(obj).chain()
          .map(function(item, position, obj) {
            var typeo = typeof(item);
            if(Array.isArray(obj) ){
              return stringifyJSON(item);
            } else {
              if(typeo == 'undefined' || typeo == 'function'){
                return;
              } else {
                return '"' + position + '":' + stringifyJSON(item);
              }
            }
          })
          .reject(function(item) { return item == undefined; })
          .value();
      }

      var cappies = { 'start': '{', 'end':'}' };
      if(Array.isArray(obj)){
        cappies['start'] = '[';
        cappies['end'] = ']';
      }    
 
      return cappies['start'] + returnArray.join(',') + cappies['end'];
  }  
}
