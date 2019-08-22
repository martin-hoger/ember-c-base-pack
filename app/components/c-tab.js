import Component from '@ember/component';
import TabPane from './c-tab-pane';
import { computed } from '@ember/object';
import { filter } from '@ember/object/computed';
import { next } from '@ember/runloop';

export default Component.extend({
  classNames : ['tabs'],
  panes      : [],

  didRender() {
    this._super(...arguments);
    
    //Set first tab as active.
    if (!this.get('isActiveId')) {
      var defaultPane = this.get('allPanes')[0];
      if (defaultPane) {
	this.set('isActiveId', defaultPane.get('elementId'));
      }
    }
  },

  allPanes: filter('panes', function(view) {
    return view instanceof TabPane;
  }),

  navItems: computed('allPanes.[]', function() {
    var items = [];
    this.get('allPanes').forEach((pane) => {
      let item = pane;
      items.pushObject(item);
    });
    return items;
  }),

  actions: {
    select(id) {
      this.set('isActiveId', id);
    }
  },

  //Register pane with tab component.
  registerPane(pane) {
    next(this, function() {
      this.get('panes').addObject(pane);
    });
  },
  //Unregister pane with tab component.
  removePane(pane) {
    this.get('panes').removeObject(pane);
  }
});

