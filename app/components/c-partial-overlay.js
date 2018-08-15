import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({

  visible    : true,
  tagName: 'div',
  classNames: ['partial-overlay'],
  attributeBindings: ['style'],
  // overlayIdG: 0,

  // didInsertElement() {
  init() {
    this._super(...arguments);
    // debugger;
    // console.log('overlay id:', this.get('id'));
    var overlayId = this.set('overlayId', Math.random() );
    // this.set('overlayIdG', overlayId);
    // console.log('overlay id:', this.get('elementId'));
    console.log('overlay id:', this.get('overlayId'));
    // console.log('overlayIdG:', this.get('overlayIdG'));
    // this.set('session.cPartialoverlayIds', Math.random());
    if (!this.get('session.cPartialoverlayIds') ) {
      this.set('session.cPartialoverlayIds', []);
      console.log('session.cPartialoverlayIds', this.get('session.cPartialoverlayIds') );
    }
    var overlayIds = this.get('session.cPartialoverlayIds');
    // overlayIds.pushObject(this.get('elementId'));
    overlayIds.pushObject(overlayId);
    console.log('overlayIds', overlayIds);

  },

  willDestroyElement() {
    // debugger;
    console.log('destroy session.cPartialoverlayIds', this.get('session.cPartialoverlayIds') );
    // var overlayId = this.get('id');
    console.log('toto id', this.get('overlayId'));

    var overlayIds = this.get('session.cPartialoverlayIds');
    // overlayIds.removeObject(this.get('elementId'));
    overlayIds.removeObject(this.get('overlayId') );

    console.log('destroy na konci session.cPartialoverlayIds', this.get('session.cPartialoverlayIds') );
    // má tam tohle být ?????????????????
    this._super(...arguments);
  },

  style: computed('session.cPartialoverlayIds.[]', function() {
    // var id = this.get('elementId');
    var overlayId = this.get('overlayId');
    debugger;
    console.log('computed, id:', overlayId);
    var overlayIds = this.get('session.cPartialoverlayIds');
    var index = overlayIds.indexOf(overlayId);
    var left = 300 / (overlayIds.length - index)

    var styleStr = `left: ${left}px`;

    return htmlSafe(styleStr);

  }),

  actions: {
    close() {
      // If there is onClose action, fire the function.
      if (this.get('onClose')) {
        this.get('onClose')();
      }
    }
  }

});
