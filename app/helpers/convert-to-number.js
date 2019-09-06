import Ember from 'ember';

export function convertToNumber(params) {
  return Number(params[0]);
}

export default Ember.Helper.helper(convertToNumber);
