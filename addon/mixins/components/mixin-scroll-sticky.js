/*
  Mixin - scroll sticky
  Detect scroll position and set css fixed class for component.
  Params: scrollSelector, scrollTopLimit.
*/

import Mixin from '@ember/object/mixin';
import $ from 'jquery';

export default Mixin.create({
  classNameBindings : ['isInLimit:element-position-relative', 'isOverLimit:element-position-fixed'],
  scrollSelector    : '',
  scrollTopLimit    : 0,

  didInsertElement() {
    this._super(...arguments)
    var context = this;
    $(context.get('scrollSelector')).scroll(function() {	
      var element = document.querySelectorAll(context.get('scrollSelector'))[0];
      if (element) {
        if (element.scrollTop <= context.get('scrollTopLimit')) {
          //Position of element is in limit.
          context.set('isInLimit', true);
          context.set('isOverLimit', false);
        } else {
          //Position of element is over limit.
          context.set('isInLimit', false);
          context.set('isOverLimit', true);
        }
      }
    });
  },
});
