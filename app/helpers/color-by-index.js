/*
Helper returns the color number from the pallete. If no pallete is mentioned,
or the pallete is not called well, the defaul pallete is used.

If the color index is greater than the number of the elements, it returns
the color using modulo (colors are allways different)

Usage in .hbs:
{{color-by-index 0}}              =>#7A0026 defaul pallete used
{{color-by-index 0 "special"}}    =>#7A0000 special pallete used
{{color-by-index 0 "mistake"}}    =>#7A0026 defaul pallete used
*/

import { helper } from "@ember/component/helper";

export function colorByIndex([index, pallete, seed]) {
  const palleteDefinitions = {
    "default" : [
      '#7D4900',
      '#7B2E00',
      '#005B7F',
      '#002157',
      '#827B00',
      '#0D004C',
      '#7A0026',
      '#32004B',
      '#005826',
      '#790000',
      '#7B0046',
      '#005E20',
      '#406618',
      '#003663',
      '#005952',
      '#4B0049',
    ]
  };

  seed = !seed ? 0 : seed;

  var colors;
  if (palleteDefinitions[pallete] === undefined) {
    // If pallete is not defined or is not defined right => use default
    colors = palleteDefinitions.default;
  } else {
    // if other pallete is used:
    colors = palleteDefinitions[pallete];
  }
  /*
  if index is greater then the array lenght,
  return modulo of the index. Examples:
    index==1  => color[1]
    index==15 => color[15]
    index==16 => color[0]
    index==17 => color[1]
  */
  return colors[(index + seed) % colors.length];
}

export default helper(colorByIndex);
