import Ember from 'ember';

export default Ember.Mixin.create({

  // Handle cacheable models, 
  // see adapter/abstract/cacheable.js

  shouldReloadRecord(store, snapshot) {
    return this.testCacheableRecord(store, snapshot, 'cacheableReload');
  },

  shouldBackgroundReloadRecord(store, snapshot) {
    return this.testCacheableRecord(store, snapshot, 'cacheableBackgroundReload');
  },

  // Tests if the record should be reloaded.
  // Possible is true/false or time in seconds which
  // represents the "freshness" of the record,
  // if it is older then XX seconds, reload.
  testCacheableRecord(store, snapshot, variableName) {
    const reload    = snapshot.record.get(variableName);
    const timestamp = snapshot.record.get('cacheableLastReload');
    // If it is boolean, use it.
    if (typeof(reload) === "boolean") {
      return Boolean(reload);
    }
    // If the model was loaded more then timeout ago, reload it.
    if (Date.now() - timestamp > reload * 1000) {
      snapshot.record.set('cacheableLastReload', Date.now());
      return true;
    }
    return false;
  },

});
