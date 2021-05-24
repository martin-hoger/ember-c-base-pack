import Component from '@ember/component';
import { later } from '@ember/runloop';
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';

/**
 * This component waits for timeout to show content.
 *
 * Example usage:
 * Sometimes I want to wait until a transition is over to load some content.
 *
 *  {{#c-wait-block timeout=1000 minHeight=400}}
 *    {{s-admin-stats-basic-chart statData=model}}
 *  {{/c-wait-block}}
 */
export default Component.extend({

  timeout           : 500,
  minHeight         : 150,

  classNames        : ['wait-block'],
  classNameBindings : ['loaded:loaded:'],
  loaded            : false,
  attributeBindings : ['style'],

  style: computed('minHeight', function() {
    return htmlSafe('min-height: ' + this.get('minHeight') + 'px'); 
  }),

  didInsertElement() {
    this._super(...arguments);

    later(() => {
      this.set('loaded', true);
    }, this.get('timeout'));

  },


});



