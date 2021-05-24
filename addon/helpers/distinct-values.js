/*

distinctValues(items, propertyName, true)
inputs: items(array of objects) you want to go through
        propertyName(string) you want to test
        optional 'true' if you want to count items with undefined property
        optional 'true' if you want array to be sorted aplhabetically (and not by item count)
output: object like this, saved number of occurrences of this property in .count.
        Array is sorted by count (from highest number to lowest).
        In output .rows we store objects of that property. For example all articles
        according to input array
output:
{ 'values': [ 1, 3, 4...],
  'valuesWithCounts' : [
    { 'value': 1, 'count': 12, 'rows': [ array of 'items' with this property ]},
    { 'value': 3, 'count': 10, 'rows': [ array of 'items' with this property ]},
    ...
  ]
}

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

if you want sort by aplhabet:
return distinctValues([rowsFiltered, 'type', false, true]);

*/

import { helper } from '@ember/component/helper';
import { isArray } from '@ember/array';

export function distinctValues(params) {
  var items = params[0];  // = articles
  var propertyName = params[1];
  var countUndefined = params[2];
  var sortByAlphabet = params[3];
  var itemsArray = { 'values' : [], 'valuesWithCounts' : [] };

  items.forEach(function(item) {
    var properties = item.get(propertyName);
    // skip and don't count, when properties are undefined
    // (some article has undefined highlights). But article status is true/false so we must test != undefined
    if (properties != undefined || countUndefined) {
      // some properties are array, some not, so unified it
      if (!isArray(properties)) {
        properties = [properties]
      }
      properties.forEach(function(property){
        // find item with this property:
        let valuesWithCounts = itemsArray.valuesWithCounts;
        let propertyArrayItem = valuesWithCounts.findBy('value', property);

        if (!propertyArrayItem)  {  // item with this property not yet included, so add
          propertyArrayItem = {'value': property, 'count': 0, 'rows': []};
          itemsArray.valuesWithCounts.pushObject(propertyArrayItem);
        }
        // increment number of objects and insert item object into output
        propertyArrayItem.count++;
        propertyArrayItem.rows.pushObject(item);
      });
    }

  });

  // sort created array by count from highest to lowest
  itemsArray.valuesWithCounts = itemsArray.valuesWithCounts.sortBy('count').reverseObjects() ;
  //go through valuesWithCounts and create pure value array [ 1, 3, 5...]
  itemsArray.valuesWithCounts.forEach(function(object){
    itemsArray.values.pushObject(object.value)
  })

  if (sortByAlphabet) {
    itemsArray.valuesWithCounts = itemsArray.valuesWithCounts.sortBy('value');
    itemsArray.values.sort();
  }

  return itemsArray;
}

export default helper(distinctValues);
