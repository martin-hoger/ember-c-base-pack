import Component from '@ember/component';

export default Component.extend({
  didRegister : false,

  //Register pane.
  registerWithParent() {
    if (!(this.didRegister)) {
      let parent = this.get('parent');
      if (parent) {
	parent.registerPane(this);
	this.didRegister = true;
      }
    }
  },

  //Register pane with parents - all life cykle hooks.
  didReceiveAttrs() {
    this._super(...arguments);
    this.registerWithParent();
  },

  willRender() {
    this._super(...arguments);
    this.registerWithParent();
  },

  //Unregister pane with parent - destroy hook.
  willDestroyElement() {
    this._super(...arguments);
    let parent = this.get('parent');
    if(this.didRegister && parent) {
      parent.removePane(this);
      this.didRegister = false;
    }
  }
 
});

