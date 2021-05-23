import Service from '@ember/service';
import $ from 'jquery';

export default Service.extend({
  message : '',
  
  show: function () {
    $('body').addClass('loading');
  },

  hide: function () {
    $('body').removeClass('loading');
    this.set('message', '');
  },
});
