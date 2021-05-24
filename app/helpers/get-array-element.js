import { helper } from '@ember/component/helper';

//Check if is number and if is bigger then 0.
export function getArrayElement(params) {
  var array = params[0];
  var index = Number(params[1]);
  
  return array[index];
}

export default helper(getArrayElement);
