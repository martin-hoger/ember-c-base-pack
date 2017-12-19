import Ember from 'ember';

export default Ember.Component.extend({

  classNames        : ['split-window-double'],
  classNameBindings : [],
  size              : 70,
  top               : 0,

  attributeBindings: ['style'],

  style: Ember.computed('top', function() {
    var top = this.get('top');
    var styleStr = `top: ${top}px`;
    return Ember.String.htmlSafe(styleStr); //this returns the safe html text
  }),

  win1Style: Ember.computed('size', function() {
    var size = 100 - this.get('size');
    return new Ember.String.htmlSafe(`left: 0; padding-right: 15px; right: ${size}%; margin-right: 40px;`);
  }),

  win2Style: Ember.computed('size', function() {
    var size = this.get('size');
    return new Ember.String.htmlSafe(`right: 0; padding-right: 15px; left: ${size}%`);
  }),

});


