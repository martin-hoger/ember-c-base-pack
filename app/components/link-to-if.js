/* link-to-if
Changed {{link-to}}:
If condition==true, enable a link
if show==true, show the text, even if condition is false
========================================================

According to:
https://medium.com/weareevermore/conditional-links-with-ember-js-47121cfd2d80

Usage:

{{#link-to-if condition=true show=true params=(array "application.admin.practices")}}
 this text will be visible and link active <br/>
{{/link-to-if}}

{{#link-to-if condition=false show=true params=(array "application.admin.stats.stat" "videos") }}
  this text will be visible, but without link<br/>
{{/link-to-if}}

{{#link-to-if condition=false show=false params=(array "application.admin.stats.stat" "videos") }}
  this text will not be visible <br/>
{{/link-to-if}}

*/

import Component from '@ember/component';

export default Component.extend({
  tagName  : '',
  show     : false,
  condition: false,
  params   : ''

})
