/*
  Shows flag of the country and country name
  ==========================================
  If the name of the country is not defined or not found, no flag is showed
  and only passed 'country' parameter is written.

  use in .hbs:
  {{c-country-label country=practice.country}}
  {{c-country-label country="ES"}}
*/

import Ember from 'ember';
import { getNames } from 'ember-i18n-iso-countries';

export default Ember.Component.extend({

  classNames        : ['pokusak', 'dalsi'],
  language  : 'en',
  country   : null, //inserted by user as a component imput
  // classNames: ['country-label'],

  countryName: Ember.computed('language', 'country', function() {
    console.log('kuk', this.get('classNames'));
    return getNames('en')[this.get('country')];
  }),

});
