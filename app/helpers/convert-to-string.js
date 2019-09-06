import Ember from 'ember';

export function convertToString(params) {
  return String(params[0]);
}

export default Ember.Helper.helper(convertToString);
