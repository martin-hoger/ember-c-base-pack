import Ember from 'ember';
import { convertAccentedCharacters } from 'ember-c-base-pack/helpers/convert-accented-characters';

export default Ember.Mixin.create({

  rows           : [],
  query          : '',
  sortBy         : '',
  sortReverse    : false,
  filterProperty : 'fulltext',

  init() {
    this._super(...arguments);

    // Define computed property dynamically.
    // It is not possible to define computed property with variable in it.
    // If sort by is defined, we can sort.
    Ember.defineProperty(this, 'rowsSorted', 
      Ember.computed("rows.@each." + this.get("sortBy"), 'rows.length', 'sortBy', function(){
        var sortBy = this.get("sortBy");
        var rows = sortBy ? this.get("rows").sortBy(sortBy) : this.get("rows");
        if (this.get("sortReverse")) {
          rows.reverse();
        }
        return rows;
      })
    );

  },

  // Filtr rows.
  rowsFiltered: Ember.computed('query', 'rowsSorted.length', function() {
    var searchQuery = this.get("query");
    if (searchQuery === "" || searchQuery === undefined) {
      return this.get("rowsSorted");
    }
    searchQuery        = convertAccentedCharacters([ searchQuery ]);
    searchQuery        = searchQuery.replace(" ", ".*");
    var regExPattern   = '\\b.*' + searchQuery + '.*\\b';
    var regexp         = new RegExp(regExPattern,'gi');
    var filterProperty = this.get("filterProperty");
    return this.get('rowsSorted').filter(function(row){
      return row.get(filterProperty).match(regexp);
    });
  }),

});




