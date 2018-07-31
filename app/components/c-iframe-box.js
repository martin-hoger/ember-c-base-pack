import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';

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
      $iframe.on('load', function(){
        var $body      = $iframe.contents().find('body');
        var skipEvent = false;
        // Fire when tree is modified.
        $body.on('DOMSubtreeModified click keydown mousemove', function() {
          //We use timeout here not to perform all the time
          //when the event is fired.
          if (skipEvent == true) {
            return true;
          }
          skipEvent = true;
          setTimeout(function() {
            var bodyHeight = $body.height();
            var minHeight  = $iframe.data('min-height');
            // If there is set some min height,
            // force the iframe to be at least min height.
            if (!isNaN(minHeight) && bodyHeight < minHeight) {
              bodyHeight = minHeight;
            }
            $iframe.height(bodyHeight + 5);
            skipEvent = false;
          }, 200);
        });
        $body.trigger('DOMSubtreeModified');
      });

    });
  }

});
