const formatDate = (_date) =>{
   if(_date.length === 10) {
    return _date.substring(8,10) + "/" + _date.substring(5,7) + "/" + _date.substring(0,4);
   } else {
    return _date;
   }
}
module.exports = {formatDate};