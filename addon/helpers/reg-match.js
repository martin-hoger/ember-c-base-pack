import { helper } from '@ember/component/helper';

export default helper(params => {
  var sourceString = params[0];
  var matchString  = params[1];

  if (sourceString.match(matchString)) {
    return true;
  } else {
    return false;
  }
});
