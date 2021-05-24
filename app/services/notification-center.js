import Service from '@ember/service';
import $ from 'jquery';

export default Service.extend({
  params          : {},
  itemTypeDefault : 'message', //Default item type.
  
  //- pryc jquery
  //
  show: function (params) {
    $('#notification-center').addClass('show');
    if (!params.itemType) {
      params.itemType = this.get('itemTypeDefault');
    }
    this.set('params', params);
  },

  hide: function () {
    $('#notification-center').removeClass('show');
    this.set('params', {});
  },
});
