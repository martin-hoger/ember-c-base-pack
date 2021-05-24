import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  elementId          : 'notification-center-item-message',
  notificationCenter : inject(),
});



