//https://stackoverflow.com/questions/7763327/how-to-calculate-date-difference-in-javascript/7763335
function dateBuilder(year, month, day) {
  let dt1 = new Date(year, month -1, day);
  let dt2 = new Date();
  return Math.floor((Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) - 
  Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate())) / (1000 * 60 * 60 * 24));
};


export { dateBuilder }