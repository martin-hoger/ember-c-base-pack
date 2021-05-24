import moment from 'moment';
import Ember from 'ember';

export function dateDisplay(params) {
    var date   = params[0];
    var format = params[1];

    if (!date) {
      return '';
    }

    if (format === 'short') {
      return moment(date).format('DD.MM.YYYY');
    }
    if (format === 'long') {
      return moment(date).format('DD.MM.YYYY - HH:mm');
    }
    if (format === 'time') {
      return moment(date).format('HH:mm');
    }

}

export default Ember.Helper.helper(dateDisplay);
