import Ember from 'ember';

export default Ember.Service.extend({

  show: function () {
    Ember.$('body').addClass('loading');
  },

  hide: function () {
    Ember.$('body').removeClass('loading');
  }

});
