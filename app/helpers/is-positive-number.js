import Ember from 'ember';

//Check if is number and if is bigger then 0.
export function isPositiveNumber(params) {
  return !isNaN(params[0]) && Number(params[0]) > 0;
}

export default Ember.Helper.helper(isPositiveNumber);
