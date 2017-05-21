var app = getApp();

Page({
    onLoad: function(evt){
      var prefix = app.globalData.doubanApiPrefix;
      var inTheatersUrl = prefix + "/v2/movie/in_theaters";
      var comingSoonUrl = prefix + "/v2/movie/coming_soon";
      var top250Url = prefix + "/v2/movie/top250";
      // fetch movie list data
      this.getMovieListData(inTheatersUrl);
      this.getMovieListData(comingSoonUrl);
      this.getMovieListData(top250Url);
    },

    getMovieListData: function(url){
      wx.request({
        url: url,
        method: 'GET',
        header: {
          "content-type": "application/xml"
        },
        success: function(res){
          console.log(res);
        }
      })
    }
});