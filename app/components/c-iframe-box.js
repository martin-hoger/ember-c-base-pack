import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import { schedule } from '@ember/runloop';

export default Component.extend({

  tagName           : 'iframe',
  classNames        : ['iframe-box'],
  attributeBindings : ['src', 'scrolling'],
  scrolling         : 'no',

  // When the component is inserted, add listener for the messages.
  didInsertElement() {
    this._super(...arguments);
    var thisClass = this;
    var $iframe   = this.$();
    scheduleOnce('afterRender', this, function() {

      // On message fire event.
      $iframe.on('emberIframeMessage', function(event, actionName, actionValue) {
        if (thisClass.get('onMessage')) {
          thisClass.attrs.onMessage(actionName, actionValue);
        }
      });

      // Adjust the width of iframe.
      $iframe.on('DOMContentLoaded load', function(){
        var $body = $iframe.contents().find('body');
        // First resize on load.
        thisClass.resizeIframe($iframe, $body);
        // Fire when tree is modified.
        var skipEvent = false;
        $body.on('DOMSubtreeModified click keydown mousemove', function() {
          //We use timeout here not to perform all the time
          //when the event is fired.
          if (skipEvent == true) {
            return true;
          }
          skipEvent = true;
          setTimeout(function() {
            thisClass.resizeIframe($iframe, $body);
            skipEvent = false;
          }, 200);
        });
      });

    });
  },

  // Resizes the iframe.
  resizeIframe($iframe, $body) {
    // https://stackoverflow.com/questions/49055400/use-of-ember-run-loop
    schedule('afterRender', () => {
      var bodyHeight = $body.height();
      var minHeight  = $iframe.data('min-height');
      // If there is set some min height,
      // force the iframe to be at least min height.
      if (!isNaN(minHeight) && bodyHeight < minHeight) {
        bodyHeight = minHeight;
      }
      $iframe.height(bodyHeight);
    });
  }


});
