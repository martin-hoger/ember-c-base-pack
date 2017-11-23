import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const Validator = BaseValidator.extend({
  store : Ember.inject.service(),

  validate(value, options, model) {
    var modelName = model.constructor.modelName;
    var fieldName = options.field;
    var allModels = this.get("store").peekAll(modelName);
    var isUniq    = true;
    allModels.forEach(function (row) {
      var field = row.get(fieldName);
      // If the field matches and it is not the same row.
      if (field === value && model.id != row.id) {
        isUniq = false;
      }
    });

    return isUniq ? true : 'Záznam musí být unikátní, hodnota "' + value + '" již v databázi exituje';
  }

});

export default Validator;

