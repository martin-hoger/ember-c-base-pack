/*
  Tooltip - popup text
  ====================
  Component wraps: https://semantic-ui.com/modules/popup.html

  Usage in .hbs:
  {{#c-tooltip text="The text of the tooltip" inverted=true position="bottom left"}}
    user text / button / icon or other element
  {{/c-tooltip}}

  Result:
  <i class="ui" data-tooltip="The text of the tooltip" data-inverted="true" data-position="bottom left">
*/

import Ember from 'ember';

export default Ember.Component.extend({

  classNames        : ['ui'],
  tagName           : 'i',
  attributeBindings : ['tooltip:data-tooltip',
                       'inverted:data-inverted',
                       'position:data-position',
                      ],
  // default tooltip values:
  inverted          : false,
  // top left / bottom right / ... right center / left center ... and other possibilities
  position          : 'top center',

  tooltip: Ember.computed('text', function() {
    return Ember.String.htmlSafe(this.get('text')); //this returns the safe html text
  }),

});
