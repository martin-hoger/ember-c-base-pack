import Ember from 'ember';
export default Ember.Mixin.create({

  serializeAttribute(snapshot, json, key, attributes) {    
    if (snapshot.record.get('isNew') || snapshot.changedAttributes()[key]) {
      this._super(snapshot, json, key, attributes);
    }
  }

});
