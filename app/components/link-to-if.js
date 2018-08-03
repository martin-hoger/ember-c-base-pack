/* link-to-if-enabled
Show the text. If condition==true, enable a link
================================================

https://medium.com/weareevermore/conditional-links-with-ember-js-47121cfd2d80

Usage:

{{#link-to-if-enabled true "application.admin.practices"}}
  This text will be allways visible,<br/>
  if param==true, the link is active<br/>
  if param==false, no link, only this text is show
{{/link-to-if-enabled}}

*/


///// !!! nějak vyřešit, že potřebuji předat condition, jestli má show a pak parametry kam link

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
