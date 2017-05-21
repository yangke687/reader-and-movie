var app = getApp();

Page({
    onLoad: function(evt){
      var prefix = app.globalData.doubanApiPrefix;
      var suffix = '?start=0&count=3';
      var inTheatersUrl = prefix + "/v2/movie/in_theaters" + suffix;
      var comingSoonUrl = prefix + "/v2/movie/coming_soon" + suffix;
      var top250Url = prefix + "/v2/movie/top250" + suffix;
      // fetch movie list data
      this.getMovieListData(inTheatersUrl);
     // this.getMovieListData(comingSoonUrl);
     // this.getMovieListData(top250Url);
    },

    getMovieListData: function(url){
      wx.request({
        url: url,
        method: 'GET',
        header: {
          "content-type": "application/xml"
        },
        success: function(res){
         this.processDoubanFunc(res.data); 
        }.bind(this)
      })
    },

    processDoubanFunc: function(doubanMovies){
      var movies = [];
      for(var idx in doubanMovies.subjects){
        var sub = doubanMovies.subjects[idx];
        var title = sub.title;
        if(title.length>6){
          title = title.substr(0,6) + '...';
        }
        var temp = {
          title: title,
          average: sub.rating.average,
          coverageUrl: sub.images.large,
          movieId: sub.id,
        };
        movies.push(temp);
        console.log(movies);
        this.setData({
          movies: movies
        });
      }
    }
});