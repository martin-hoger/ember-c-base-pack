/*
  Dropdown menu:
 
  Example usage:
  {{#c-dropdown-menu
      icon="ellipsis horizontal"
      textAlign="left"
      menuAlign="left" 
      fontSize=13

  }}
    <div class="item">
      <div class="header">Products</div>
      <div class="menu">
	<a class="item">Enterprise</a>
	<a class="item">Consumer</a>
	<a class="item">Marketing</a>
      </div>
    </div>
    <div class="item">
      <div class="header">Locations</div>
	<div class="menu">
	<a class="item">Prague</a>
	<a class="item">London</a>
	<a class="item">New York</a>
      </div>
    </div>
  {{/c-dropdown-menu}}

*/

import Component from '@ember/component';
import $ from 'jquery';
import { computed } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  classNames        : 'menu-dropdown-wrapper',
  attributeBindings : ['style'],
  classNameBindings : ['button:menu-dropdown-wrapper-button'],

  displayMenu       : false,
  isMouseOver       : false,
  taskTimeout       : 1200,
  fontSize          : 13,
  textAlign         : 'left',
  menuAlign         : 'right',
  icon              : 'ellipsis vertical',

  didInsertElement() {
    this._super(...arguments)
    var context = this;
    $('body').click(function() {	
      //If actual dropdown menu is opened.
      if (context.get('displayMenu')) {
        //If mouse is not on active dropdown menu.
        if (!context.get('isMouseOver')) {
          //If dropdown menu object is not destroyed yet.
          if (!(context.get('isDestroyed') || context.get('isDestroying'))) {
            context.set('displayMenu', false);
          }
        }
      }
    });
  },

  style: computed('textAlign', 'menuAlign', function() {
    var textAlign = this.get('textAlign');
    var menuAlign = this.get('menuAlign');
    var style     = `text-align: ${textAlign}; float: ${menuAlign};`;
    return htmlSafe(style);
  }),

  buttonStyle: computed('fontSize', function() {
    var fontSize = this.get('fontSize');
    var style    = `font-size: ${fontSize}px;`;
    return htmlSafe(style);
  }),

  menuClass: computed('menuAlign', function() {
    if (this.get('menuAlign') === 'left' ) {
      return 'menu-dropdown-left';
    } else {
      return 'menu-dropdown-right';
    }
  }),

  actions: {
    onFocus() {
      this.set('isMouseOver', false);
      this.get('closeMenu').perform();
    },
    overFocus() {
      this.set('isMouseOver', true);
    },
  },

  //Close menu (Ember concurrency).
  closeMenu: task(function * () {
    //Timeout.
    yield timeout(this.get('taskTimeout'));
    if (!this.get('isMouseOver')) {
      this.set('displayMenu', false);
    }
  }).restartable(),

});
