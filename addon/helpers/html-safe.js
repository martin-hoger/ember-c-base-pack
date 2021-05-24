import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export default helper( params => {
  return htmlSafe(params.join(''));
});
