/*

distinctObjects(items, propertyName)
inputs: items(array of objects) you want to go through
        propertyName(string) you want to test
        optional sortByProperty(string) if you want to sort it by. If sortByProperty
        is not passed, the array is sorted by distinctObjectsCount (from highest
        number to lowest)
output: array of propertyName objects, also counts the number of occurrences
of this property in distinctObjectsCount.

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

*/

import Ember from 'ember';

export function distinctObjects(params) {
  var items = params[0];
  var propertyName = params[1];
  var sortByProperty = params[2];
  var itemsArray = [];
  items.forEach(function(item) {
    // create array items with this propertyName:
    var objects = item.get(propertyName);
    // if it's not an array, make it. Because then we can use another forEach
    // and doesn't matter, if there is only one object, or more objects
    // 1 user of the article VS. many categories of the article
    if (!Ember.isArray(objects)) {
      objects = [objects]
    }
    objects.forEach(function(object){
      // find item with this id:
      var propertyArrayItem = itemsArray.findBy('id', object.get('id'));
      if (!propertyArrayItem)  {  // item with this id not yet included, so add
        propertyArrayItem = object;
        propertyArrayItem.set('distinctObjectsCount', 0);  // number will be counted
        itemsArray.push(propertyArrayItem);
      }
      // increment number of objects:
      propertyArrayItem.incrementProperty('distinctObjectsCount');
    });
  });

  if (sortByProperty) {
    itemsArray = itemsArray.sortBy(sortByProperty);
  } else {
    itemsArray = itemsArray.sortBy('distinctObjectsCount').reverseObjects();
  }

  return itemsArray;
}

export default Ember.Helper.helper(distinctObjects);
