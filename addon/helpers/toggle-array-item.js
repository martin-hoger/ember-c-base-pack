import Ember from 'ember';

export function toggleArrayItem(params/*, hash*/) {
    var object       = params[0];
    var propertyName = params[1];
    var value        = params[2];
    // If there is nothing defined, start empty array.
    if (object.get(propertyName) === undefined) {
      object.set(propertyName, []);
    }
    // Toggle items in the array.
    if (object.get(propertyName).includes(value)) {
      object.get(propertyName).removeObject(value);
    } else {
      object.get(propertyName).addObject(value);
    }
    return object;
}

export default Ember.Helper.helper(toggleArrayItem);
