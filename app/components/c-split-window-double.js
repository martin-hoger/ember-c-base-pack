import Ember from 'ember';

export default Ember.Component.extend({

  classNames        : ['split-window-double'],
  classNameBindings : [],
  size              : 70,
  top               : 0,
  hideFirstWindow   : false,
  hideSecondWindow  : false,

  attributeBindings : ['style'],

  style: Ember.computed('top', function() {
    var top = this.get('top');
    var styleStr = `top: ${top}px`;
    return Ember.String.htmlSafe(styleStr); //this returns the safe html text
  }),

  win1Style: Ember.computed('size', 'hideFirstWindow', 'hideSecondWindow', function() {
    if (!this.get('hideSecondWindow')) {
      //If window is split to double window.
      var size = 100 - this.get('size');
      return new Ember.String.htmlSafe(`left: 0; padding-right: 15px; right: ${size}%; margin-right: 40px;`);
    } else {
      //If second window is hidden => first window will with width 100%.
      return new Ember.String.htmlSafe(`left: 0; padding-right: 15px; right: 0; width: 100%`);
    }
  }),

  win2Style: Ember.computed('size', 'hideFirstWindow', 'hideSecondWindow', function() {
    if (!this.get('hideFirstWindow')) {
      //If window is split to double window.
      var size = this.get('size');
      return new Ember.String.htmlSafe(`right: 0; padding-right: 15px; left: ${size}%`);
    } else {
      //If first window is hidden => second window will with width 100%.
      return new Ember.String.htmlSafe(`right: 0; padding-right: 15px; left: 0; width: 100%`);
    }
  }),

});


