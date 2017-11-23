import DS from 'ember-data';

export default DS.Transform.extend({

  // Transform from DB to Ember. 
  // In DB we store 004201234567989
  // here we transform it to +420 123 456 789.
  deserialize(serialized) {
    if (!serialized) {
      return serialized;
    }

    serialized = serialized.replace(/^\s*/, '').replace(/ *$/, '').replace(/[^0-9]/g, '');
    // In case we deal with short CZ number,
    // add international prefix.
    if (serialized.length === 9) {
      serialized = "+420 " + serialized.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    }
    // For the international format.
    if (serialized.length > 9) {
      serialized = serialized.replace(/^(.*)(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3 $4').replace(/^00/, '+');
    }

    return serialized;
  },

  // Transform from Ember to DB.
  serialize(deserialized) {
    if (!deserialized) {
      return deserialized;
    }
    deserialized = deserialized.replace(/^\+/, '00').replace(/[^0-9]/g, '');
    // For short CZ format add international prefix.
    if (deserialized.length === 9) {
      deserialized = "00420" + deserialized;
    }

    return deserialized;
  }

});
