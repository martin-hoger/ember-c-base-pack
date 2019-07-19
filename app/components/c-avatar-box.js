/*
  Avatar - initials from 'name' or user image if passed.
  Title - 'name' or can be overwriten like this:
    {{c-avatar-box title="my special title"}}
*/

import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  classNames        : ['avatar-box'],
  classNameBindings : ['rounded'],
  fontSize          : 35,
  fontWeight        : 35,
  size              : 75,
  rounded           : true,

  title: computed('name', function() {
    return this.get('name');
  }),

});
