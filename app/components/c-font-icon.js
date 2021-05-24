/* Display icon with semantic ui mapping.
 */

import Component from '@ember/component';

export default Component.extend({
  tagName : '',
  init() {
    this._super(...arguments);
    this.set('iconClass', this.get('type'));
  }
});
