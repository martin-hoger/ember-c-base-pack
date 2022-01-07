import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export default helper( params => {
  var textString = params[0];
  
  if (textString) {
    if (typeof textString.replace === 'function') {
      return htmlSafe(textString.replace(/\n/g, '<br>'));
    }
  }
});
