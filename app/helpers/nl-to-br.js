import Ember from 'ember';

export function nlToBr(params) {
  var text = params[0];
  text = Ember.Handlebars.Utils.escapeExpression(text);
  text = text.replace(/(\r\n|\n|\r)/gm, '<br />');
  return new Ember.String.htmlSafe(text);
}

export default Ember.Helper.helper(nlToBr);
