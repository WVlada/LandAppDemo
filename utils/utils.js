export const formatNumber = (number) => {
  const x = String(number);
  if (number > 10000000) {
    let y = x.split("");
    y.splice(y.length - 7, 0, ".");
    y.splice(y.length - 4, 0, "h ");
    y.splice(y.length - 2, 0, "a ");
    y.splice(y.length, 0, "m ");
    return y;
  } else if (number > 9999) {
    let y = x.split("");
    y.splice(y.length - 4, 0, "h ");
    y.splice(y.length - 2, 0, "a ");
    y.splice(y.length, 0, "m ");
    return y;
  } else if (number > 99) {
    let y = x.split("");
    y.splice(y.length - 2, 0, "a ");
    y.splice(y.length, 0, "m ");
    return y;
  } else {
    let y = x.split("");
    y.splice(y.length, 0, "m ");
    return y;
  }
};

export const makeOpstineFromFirme = (firme, opstine) => {
  console.log(opstine)
  // opstine: [
  //  { _id: { opstina: 'Sečanj', vlasnistvo: 'Đ.N.' }, sum: 116094 },
  //  { _id: { opstina: 'Sečanj', vlasnistvo: 'Ribnjak Sutjeska' },
  //  sum: 9202252
  //} Vlsnisto sum: [
  // { _id: 'Đ.N.', sum: 975848, selected: true },
  // { _id: 'Greenco Eko Park', sum: 902694, selected: true },
  let firmeArray = Object.keys(firme);
  let opstineSrednjeno = {};
  opstine.map((o, index) => {
    if (firme[o._id["vlasnistvo"]]["active"]) {
      if (opstineSrednjeno[o._id["opstina"]]) {
        if (opstineSrednjeno[o._id["opstina"]]["vlasnici"][o._id]) {
          opstineSrednjeno[o._id["opstina"]].sum += o.sum;
          opstineSrednjeno[o._id["opstina"]]["vlasnici"][o._id.vlasnistvo] +=
            o.sum;
        } else {
          opstineSrednjeno[o._id["opstina"]]["vlasnici"][o._id.vlasnistvo] =
            o.sum;
          opstineSrednjeno[o._id["opstina"]].sum += o.sum;
        }
      } else {
        opstineSrednjeno[o._id["opstina"]] = {
          sum: o.sum,
          vlasnici: { [`${o._id.vlasnistvo}`]: o.sum },
        };
      }
    } else {
    }
  });
  return opstineSrednjeno;
};
