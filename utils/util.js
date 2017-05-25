function convertToStarsArray(stars){
  // stars: 3.5
  var num = stars.toString().substring(0,1); // get integer part
  var arr = [];
  for(var i=1; i<=5;i++){
    if(i<=parseInt(num)){
      arr.push(1);
    }
    else{
      arr.push(0);
    }
  }
  return arr;
}

function http(url,cb){
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "application/xml"
    },
    success: function(res){
      cb(res);
    },
    fail: function(error){
      // error handling...
    }
  });
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http
}