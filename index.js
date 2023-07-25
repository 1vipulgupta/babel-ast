import {vipul} from './index_for_import.js';

var func = function (a) {
  return function (b) {
      return 5 - a | 0;
  };
};

console.log(vipul);

func(1)("work")