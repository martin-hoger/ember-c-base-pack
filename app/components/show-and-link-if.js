/* show-and-link-if
Show the text and link, if conditon is true
===========================================

https://medium.com/weareevermore/conditional-links-with-ember-js-47121cfd2d80

Usage:

{{#show-and-link-if condition "your.link.to"}}
  This text is not allways visible,<br/>
  if param==true, the text is visible and link is active<br/>
  if param==false, no text visible (and no link)
{{/show-and-link-if}}

*/

import Component from '@ember/component';
import { computed } from '@ember/object';

const LinkToIf = Component.extend({
  tagName: '', // We do not need a surrounding tag

  _params: computed('params.[]', function () {
    let condition = this.get('params')[0];
    let linkToParams = this.get('params').slice(1);

    return { condition, linkToParams };
  })
});

LinkToIf.reopenClass({
  positionalParams: 'params'
});

export default LinkToIf;
