/*
  Shows given text with labeled color
  ===================================
  result of the component:
  <span class="c-label-colored" style="background: #fff; color: #000;">
    any text you want to display
  </span>

  use in .hbs:
  {{#c-label-colored bgColor="#fff" textColor="#000"}}
    any text you want to display
  {{/c-label-colored}}
*/

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['ui', 'label'],  //ui nice classes from: https://semantic-ui.com/elements/label.html
  bgColor: "#777",
  textColor: "#ffffff",         //white
  attributeBindings: ['style'],

  style: Ember.computed('bgColor', 'textColor', function() {
    var bgColor = this.get('bgColor');
    var textColor = this.get('textColor');
    var styleStr = `color: ${textColor}; background-color: ${bgColor}`;
    return Ember.String.htmlSafe(styleStr); //this returns the safe html text
  })

});
