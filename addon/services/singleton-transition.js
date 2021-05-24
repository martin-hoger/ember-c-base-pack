import Service from '@ember/service';
import { inject } from '@ember/service';

export default Service.extend({

  storage : inject('local-storage-wrapper'),
  router  : inject(),

  /**
   * Check if there is an instance already running.
   */
  startServer() {
    window.addEventListener('storage', this._handleEvent.bind(this), false);
  },

  /**
   * Handle storage events.
   * https://emberway.io/metaprogramming-in-emberjs-627921395299
   * https://gist.github.com/catkins/3145bee11b76f4e4e907
   */
  _handleEvent(event) {
    var key = event.key.replace(/^[^:]+:/, '')
    if (key == 'singleton:open-link') {
      var link = this.storage.getItem('singleton:open-link');
      if (link.targetName) {
        this._handleLink(link);
      }
      this.storage.setItem('singleton:open-link', '');
    }
  },

  /**
   * Handle link (open route).
   */
  _handleLink(link) {
    var param = link.url.replace(/^[^0-9]+([0-9]+)[^0-9]?.*$/, '$1');
    if (isNaN(param)) {
      this.get('router').transitionTo(link.targetName);
    } else {
      this.get('router').transitionTo(link.targetName, param);
    }
  },

});
