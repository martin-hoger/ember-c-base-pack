import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  elementId  : 'loading-bar',
  loadingBar : inject(),
});



