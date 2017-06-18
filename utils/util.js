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

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}