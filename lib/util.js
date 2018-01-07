const _ = require('lodash')
const moment = require('moment');

exports.toMilliseconds = interval => {
  const hhmmss = interval.match(/.{1,2}/g);
  let [hh,mm,ss] = hhmmss;

  hh = _.toNumber(hh);
  mm = _.toNumber(mm);
  ss = _.toNumber(ss);

  return moment.duration({hours:hh,minutes:mm,seconds:ss}).asMilliseconds();
}
