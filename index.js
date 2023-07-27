var testThis = function (a) {
  return function (b) {
    var s = 2;
    console.log("Test")
      return 5 - a | 0;
  };
};


testThis(1)("work")