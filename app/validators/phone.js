import Ember from 'ember';
import BaseValidator from 'ember-cp-validations/validators/base';

const Validator = BaseValidator.extend({

  validate(value, options, model) {
    if (!value) {
      return true;
    }
    if (/^(\+[0-9]{1,6} )?[0-9]{3} [0-9]{3} [0-9]{3}$/.test(value)) {
      return true;
    }

    return 'Číslo musí být ve tvaru XXX XXX XXX nebo v mezinárodním formátu +XXX XXX XXX XXX';
  }

});

export default Validator;

