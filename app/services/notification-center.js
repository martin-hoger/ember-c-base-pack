import { task, timeout } from 'ember-concurrency';
import Service from '@ember/service';

export default Service.extend({
  params           : {},
  itemTypeDefault  : 'message', //Default item type.
  delayTimeDefault : 3000,
  
  //Show notification.
  show: function (params) {
    document.querySelector('#notification-center').classList.add("show");
    this.set('params', params);

    //Set default item type - for factory methods.
    if (!this.get('params.itemType')) {
      this.set('params.itemType', this.get('itemTypeDefault'));
    }
    
    //Set display progress of notification.
    this.set('params.displayProgess', true);

    //Set default delay time.
    if (this.get('params.autoHide') || (this.get('params.titleFinal'))) {
      if (!this.get('params.delayTime')) {
        this.set('params.delayTime', this.get('delayTimeDefault'));
      }
    }

    //Automatic hide after defined delay time.
    if (this.get('params.autoHide')) {
      this.get('processHide').perform();
    }
  },

  //Hide notification.
  hide: function () {
    this.get('processHide').perform();
  },

  //Process hide.
  processHide: task(function * () {

    //With delay.
    if (this.get('params.delayTime')) {
      if (!this.get('params.autoHide')) {
        //Start final title content.
        this.set('params.displayProgess', false);
      }
      yield timeout(this.get('params.delayTime'));
    }

    document.querySelector('#notification-center').classList.remove("show");
    this.set('params', {});

  }).restartable(),

});
