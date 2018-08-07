import Component from '@ember/component';
import RSVP from 'rsvp';

export default Component.extend({

  isLoaded : false,

  /**
   * This component waits (shows loaded) until the data are resolved.
   * Better way is to use RSVP hash at the router at the model().
   *
   * {{#c-loading-block model=model}}
   *    {{model.client.name}}
   * {{/c-loading-block}}
   */
  init() {
    this._super(...arguments);

    RSVP.hash(this.get('model')).then((resolvedModel) => {
      this.set('model', resolvedModel);
      this.set('isLoaded', true);
    });
  },


});



