import Mixin from '@ember/object/mixin';
import { convertAccentedCharacters } from 'ember-c-base-pack/helpers/convert-accented-characters';
import { computed } from '@ember/object';
import { defineProperty } from '@ember/object';

export default Mixin.create({

  // Inputs:
  rows           : [],         // Must contain the input collection.
  query          : '',         // Must contain the filter query.
  filterProperty : 'fulltext', // Must contain the name of the property which we use for filtering.
  sortBy         : '',         // Can contain the name of the property we will use for sorting.
  sortReverse    : false,      // Sort reverse?

  // Output:
  // rowsFiltered

  init() {
    this._super(...arguments);

    // Define computed property dynamically.
    // It is not possible to define computed property with variable in it.
    // If sort by is defined, we can sort.
    if (this.get('sortBy')) {
      defineProperty(this, 'rowsSorted',
        computed('rows.@each.' + this.get('sortBy'), 'rows.[]', 'sortBy', function(){
          var sortBy = this.get('sortBy');
          var rows = sortBy ? this.get('rows').sortBy(sortBy) : this.get('rows');
          if (this.get('sortReverse')) {
            rows.reverseObjects();
          }
          return rows;
        })
      );
    } else {
      defineProperty(this, 'rowsSorted',
        computed('rows.[]', function(){ return this.get('rows'); })
      );
    }
  },

  // Filtr rows.
  // matches all words or parts in any order!!
  // https://stackoverflow.com/questions/13911053/regular-expression-to-match-all-words-in-a-query-in-any-order
  rowsFiltered: computed('query', 'rowsSorted.[]', function() {
    var searchQuery = this.get('query');
    if (searchQuery === '' || searchQuery === undefined) {
      return this.get('rowsSorted');
    }
    searchQuery        = convertAccentedCharacters([ searchQuery ]);
    // escape special characters:
    searchQuery        = searchQuery.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    searchQuery        = searchQuery.replace(/ /g, ')(?=.*');  // g=replace all spaces
    var regExPattern   = '(?=.*' + searchQuery + ').+';
    var regExp         = new RegExp(regExPattern,'gi');
    var filterProperty = this.get('filterProperty');
    return this.get('rowsSorted').filter(function(row){
      return row.get(filterProperty).match(regExp);
    });
  }),

});
