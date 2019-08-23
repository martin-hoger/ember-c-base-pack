/*
  Example usage:
   
  {{#c-tab as |tab|}}
    {{#tab.pane title="Main" icon="image icon"}}
      Main content here
    {{/tab.pane}}
    {{#tab.pane title="Pregnancy" icon="home icon"}}
      Pregnancy content here
    {{/tab.pane}}
  {{/c-tab}}

  Or with fired action:

  {{#c-tab openTab=(action "openTab") as |tab|}}
    {{#each elementSet.tabElements as |contentElement|}}
       {{tab.pane title=contentElement.name icon="image icon" value=contentElement}}
    {{/each}}
  {{/c-tab}}

  In action function openTab is attribute value.

 */

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
    select(id, value) {
      this.set('isActiveId', id);
      //If open value is defined.
      if (value) {
        this.attrs.openTab(value);
      }
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

