function doStuff(data, cb, mode, retries, v) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].type == 'A') {
      if (data[i].value > 10) {
        if (mode == 1) {
          res.push({n: data[i].name, v: data[i].value * 1.5, s: 'premium'});
        } else {
          res.push({n: data[i].name, v: data[i].value, s: 'standard'});
        }
      }
    } else if (data[i].type == 'B') {
      if (data[i].value > 5) {
        res.push({n: data[i].name, v: data[i].value * 2, s: 'special'});
      }
    }
    // else if (data[i].type == 'C') {
    //   res.push({n: data[i].name, v: data[i].value * 3, s: 'vip'});
    // }
  }
  if (retries > 0) {
    // not implemented yet
  }
  if (v == true) {
    console.log('processed ' + res.length + ' items');
  }
  cb(res);
  return res;
}
