import Ember from 'ember';

export default Ember.Mixin.create({
  
  //Should reload record
  //http://emberigniter.com/building-user-interface-around-ember-data-app/

  // Should be model reloaded instantly when fetched again.
  // If int passed, time in seconds is counted.
  // @param bool|int
  cacheableReload : false,

  // Should be model reloaded in the background when fetched again.
  // If int passed, time in seconds is counted.
  // @param bool|int
  cacheableBackgroundReload : true,

  // Generates timestamp once record is loaded from the DB.
  // Runs only first time, when record is updated,
  // this variable is updated by the adapter.
  cacheableLastReload : function() {
    this.set('cacheableLastReload', Date.now());
  }.on('didLoad')

});
