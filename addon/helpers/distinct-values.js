/*

distinctValues(items, propertyName, true)
inputs: items(array of objects) you want to go through
        propertyName(string) you want to test
        optional 'true' if you want to count items with undefined property
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

if you want also count articles with undefined type:
return distinctValues([rowsFiltered, 'type', true]);

*/

import { helper } from '@ember/component/helper';

export function distinctValues(params) {
  var items = params[0];  // = articles
  var propertyName = params[1];
  var countUndefined = params[2];
  var itemsArray = { 'values' : [], 'valuesWithCounts' : [] };

  items.forEach(function(item) {
    var properties = item.get(propertyName);
    // skip and don't count, when properties are undefined
    // (some article has undefined highlights). But article status is true/false so we must test != undefined
    if (properties != undefined || countUndefined) {
      // some properties are array, some not, so unified it
      if (!Ember.isArray(properties)) {
        properties = [properties]
      }
      properties.forEach(function(property){
        // find item with this property:
        let valuesWithCounts = itemsArray.valuesWithCounts;
        let propertyArrayItem = valuesWithCounts.findBy('value', property);

        if (!propertyArrayItem)  {  // item with this property not yet included, so add
          propertyArrayItem = {'value': property, 'count': 0};
          itemsArray.valuesWithCounts.push(propertyArrayItem);
        }
        // increment number of objects:
        propertyArrayItem.count++;
      });
    }

  });

  // sort created array by count from highest to lowest
  itemsArray.valuesWithCounts = itemsArray.valuesWithCounts.sortBy('count').reverseObjects() ;
  //go through valuesWithCounts and create pure value array [ 1, 3, 5...]
  itemsArray.valuesWithCounts.forEach(function(object){
    itemsArray.values.push(object.value)
  })

  return itemsArray;
}

export default helper(distinctValues);
