/*

distinctValues(items, propertyName)
inputs: items(array of objects) you want to go through
        propertyName(string) you want to test
        the array is sorted by count (from highest number to lowest)
output: object like this, saved number of occurrences of this property in .count:
{ 'values': [ 1, 3, 4...],
  'valuesWithCounts' : [ { 'value': 1, 'count': 12 }, { 'value': 3, 'count': 10 }, ...] }

-----------------------------

Example of use for making object of types in showen articles (rowsFiltered)
and counting number of articles of this type:

article highlights are defined:
{1: "Slideshow", 2: "Doporučujeme přečíst (TIP)"}
article types:
{1: "Běžný článek", 2: "SEO", 3: "Rozhovor", 4: "Soutěž", 5: "Proti proudu"}

// Object with array of article types and its count:
// types = { 'values': [ 1, 3, 4...],
// 'valuesWithCounts' : [ { 'value': 1, 'count': 12 }, { 'value': 3, 'count': 10 }, ...] }
types : Ember.computed('rowsFiltered', function() {
  var rowsFiltered = this.get('rowsFiltered');
  return distinctValues([rowsFiltered, 'type']);
}),

// The same for article highlights:
highlights : Ember.computed('rowsFiltered', function() {
  var rowsFiltered = this.get('rowsFiltered');
  return distinctValues([rowsFiltered, 'highlight']);
}),

*/

import Ember from 'ember';

export function distinctValues(params) {
  var items = params[0];
  var propertyName = params[1];
  // var sortByValue = params[2];
  var itemsArray = { 'values' : [], 'valuesWithCounts' : [] };

  console.log(items);
  console.log(propertyName);
  // console.log(sortByValue);

  items.forEach(function(item) {
    // create array items with this propertyName:
    var properties = item.get(propertyName);
    console.log('property u článku', properties);
    // skip and don't count, when properties are undefined (some article highlights are undefined)
    if (properties) {
      // some properties are array, some not, so unified it
      if (!Ember.isArray(properties)) {
        properties = [properties]
      }
      properties.forEach((property) => {
        console.log('property po forEach', property);
        // find item with this id:
        // var valuesWithCounts = itemsArray.get('valuesWithCounts'); nefunguje, proč?
        var valuesWithCounts = itemsArray.valuesWithCounts;
        // var propertyArrayItem = itemsArray.get('valuesWithCounts').findBy('property', property);
        var propertyArrayItem = valuesWithCounts.findBy('value', property);

        if (!propertyArrayItem)  {  // item with this id not yet included, so add
          propertyArrayItem = {'value': property, 'count': 0};

          // console.log('propertyArrayItem', propertyArrayItem);
          itemsArray.valuesWithCounts.push(propertyArrayItem);
          //itemsArray.valuesWithCounts.push({'value': property, 'count': 0});

          // console.log('itemsArray', itemsArray);
        }
        // increment number of objects:

        propertyArrayItem.count++;
      });
  }

  });
   // sort by count from highest to lowest
   itemsArray.valuesWithCounts = itemsArray.valuesWithCounts.sortBy('count').reverse() ;

  //go through valuesWithCounts and create value array [ 1, 3, 5...]
  itemsArray.valuesWithCounts.forEach(function(object){
    // console.log('1 řádka', object);
    itemsArray.values.push(object.value)
    // console.log('itemsArray.values', itemsArray.values);
  })

  console.log(itemsArray);

  return itemsArray;
}

export default Ember.Helper.helper(distinctValues);
