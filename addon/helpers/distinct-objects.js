/*

distinctObjects(items, propertyName)
inputs: - items(array of objects) you want to go through
        - propertyName(string) you want to test
        - optional sortByProperty(string) if you want to sort it by. If sortByProperty
        is not passed, the array is sorted by distinctObjectsCount (from highest
        number to lowest)
        - optional true for counting objects with undefined property.
        Then the undefined object is { 'name': 'undefined', 'distinctObjectsCount': 10}
output: array of propertyName objects, also counts the number of occurrences
        of this property in distinctObjectsCount.
        In output .rows we store objects of that property. For example all articles
        according to input array
output : [
  { object of propertyName,
    distinctObjectsCount: count of this object,
    rows: [ array of 'items' with this property ]
  }
  ... another object of propertyName
]

NOTE:
 * this helper works only with Ember objects
 * working with undefined values works only for object with relationship

-----------------------------

Example of use for making array of users in showen articles (rowsFiltered)
and counting number of their articles:

// Make array of object categories of showen articles. Only parent categories are included.
// Number of articles in categories are counted in distinctObjectsCount variable.
// Array is sorted by name of category.
categories : Ember.computed('rowsFiltered', function() {
  var rowsFiltered = this.get('rowsFiltered');
  return distinctObjects([rowsFiltered, 'parentCategories', 'name']);
}),

// Make array of users of showen articles. Count number of user articles in distinctObjectsCount.
// Array is sorted from highest number of user articles.
users : Ember.computed('rowsFiltered', function() {
  var rowsFiltered = this.get('rowsFiltered');
  return distinctObjects([rowsFiltered, 'user']);
}),

// make array of all practices supporters for the select box
// count also practices with undefined supporter
supporterNames : computed('rowsFiltered.@each.supporter', function() {
  var rowsFiltered = this.get('rowsFiltered');
  return distinctObjects([rowsFiltered, 'supporter', '', true]);
}),

*/

import EmberObject from '@ember/object';
import { isArray } from '@ember/array';
import { helper } from '@ember/component/helper';

export function distinctObjects(params) {
  var items = params[0];
  var propertyName = params[1];
  var sortByProperty = params[2];
  var countUndefined = params[3];
  var itemsArray = [];
  const emptyObject = EmberObject.extend({
    'name': 'undefined'
  });

  items.forEach(function(item) {
    // create array items with this propertyName:
    var objects = item.get(propertyName);
    // if it's not an array, make it. Because then we can use another forEach
    // and doesn't matter, if there is only one object, or more objects
    // 1 user of the article VS. many categories of the article
    if (!isArray(objects)) {
      objects = [objects]
    }
    objects.forEach(function(object){
      // Object is empty/not-defined and we do not count undefined object, skip this item.
      var isDefined = object.get('id') ? true : false;
      if (!isDefined && !countUndefined) {
        return;
      }
      // Find item with this id.
      var propertyArrayItem = itemsArray.findBy('id', object.get('id'));
      // If the item with this id is not yet included, add it.
      if (!propertyArrayItem)  {
        // If the object is undefined, we create an object representing the undefined value
        // (we can then set distinctObjectsCount for the undefined values).
        if (!isDefined) {
          object = emptyObject.create();
        }
        propertyArrayItem = object;
        propertyArrayItem.set('distinctObjectsCount', 0);  // number will be counted
        propertyArrayItem.set('rows', []);  // array of objects with this property
        itemsArray.pushObject(propertyArrayItem);
      }
      // increment number of objects and insert item object into output
      propertyArrayItem.incrementProperty('distinctObjectsCount');
      propertyArrayItem.get('rows').pushObject(item);
    });
  });

  if (sortByProperty) {
    itemsArray = itemsArray.sortBy(sortByProperty);
  } else {
    itemsArray = itemsArray.sortBy('distinctObjectsCount').reverseObjects();
  }

  return itemsArray;
}

export default helper(distinctObjects);
