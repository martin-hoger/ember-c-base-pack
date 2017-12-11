/*
  Shows given BOOLEAN value as labeled color text
  ===============================================
  There are default values for text, font color and background color. Or you can define your value.

  result of the component:
  <div style="color: textColor; background-color: colorTrue/False" class="ui label">
    textTrue or textFalse
  </div>

  use in .hbs:
  use default text and colors:
  {{c-status-label value=model.status}}

  define your own colors and texts for true or false
  {{c-status-label value=model.status colorTrue="#006070" colorFalse="#00ff00" textTrue="" textFalse="very BAD" trueTextColor="#58ac00" falseTextColor="#123456"}}
*/

import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['ui', 'label'],  //ui nice classes from: https://semantic-ui.com/elements/label.html
  // default values:
  colorTrue         : '#58ac43',   // semntic ui green
  colorFalse        : '#e8e8e8',   // semantic ui gray
  // textColor         : "#ffffff",   // white
  textTrue          : 'Aktivní',
  textFalse         : 'Pasivní',
  trueTextColor     : '#ffffff',   // white
  falseTextColor    : 'rgba(0, 0, 0, 0.6)',
  attributeBindings : ['style'],

  style: Ember.computed('value', 'colorTrue', 'colorFalse', 'textTrue', 'textFalse', 'trueTextColor', 'falseTextColor', function() {
    var value = this.get('value');
    var colorTrue = this.get('colorTrue');
    var colorFalse = this.get('colorFalse');
    var textTrue = this.get('textTrue');
    var textFalse = this.get('textFalse');
    var textColor = this.get('textColor');
    var trueTextColor = this.get('trueTextColor');
    var falseTextColor = this.get('falseTextColor');
    var styleStr;

    if (value) { //true
      styleStr = `color: ${trueTextColor}; background-color: ${colorTrue}`;
    } else {     //false
      styleStr = `color: ${falseTextColor}; background-color: ${colorFalse}`;
    }

    return Ember.String.htmlSafe(styleStr); //this returns the safe html text
  })

});
