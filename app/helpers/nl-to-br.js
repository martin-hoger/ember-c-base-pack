import Ember from 'ember';

export function nlToBr(params) {
  var breakTag = '<br />';
  //Replace \n to break tag.
  return params[0].split('\n').join(breakTag);
}

export default Ember.Helper.helper(nlToBr);
