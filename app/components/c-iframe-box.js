import Ember from 'ember';

export default Ember.Component.extend({
  tagName           : "iframe",
  classNames        : ["iframe-box"],
  attributeBindings : ['src'],

  // When the component is inserted, add listener for the messages.
  didInsertElement() {
    this._super(...arguments);
    // On message fire event.
    var thisClass = this;
    this.$().on("emberIframeMessage", function(event, actionName, actionValue) {
      if (thisClass.get("onMessage")) {
	thisClass.attrs.onMessage(actionName, actionValue);
      }
    });
  }

});
