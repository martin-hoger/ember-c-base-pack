/*
  link-to-new-window: same as link-to,
  plus adding target="_blank".
  (Redefine official link-to app/components/link-to.js component, no new template defined!)

  Usage - same as link-to:
  {{#link-to-new-window "application.admin.developers"}}
    After click, this will be opened in new window / tab
  {{/link-to-new-window}}

*/

import LinkComponent from '@ember/routing/link-component';

export default LinkComponent.extend({

  target: '_blank',

})
