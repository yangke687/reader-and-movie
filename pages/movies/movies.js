var app = getApp();
var util = require('../../utils/util.js');
Page({
    data: {
      inTheatersMovies: {},
      comingSoonMovies: {},
      top250Movies: {}
    },
    onLoad: function(evt){
      var prefix = app.globalData.doubanApiPrefix;
      var suffix = '?start=0&count=3';
      var inTheatersUrl = prefix + "/v2/movie/in_theaters" + suffix;
      var comingSoonUrl = prefix + "/v2/movie/coming_soon" + suffix;
      var top250Url = prefix + "/v2/movie/top250" + suffix;
      // fetch movie list data
      this.getMovieListData(inTheatersUrl,'inTheatersMovies');
      this.getMovieListData(comingSoonUrl,'comingSoonMovies');
      this.getMovieListData(top250Url,'top250Movies');
    },

    getMovieListData: function(url,settedKey){
      util.http(url,function(res){
        this.processDoubanFunc(res.data, settedKey); 
      }.bind(this));
    },

    processDoubanFunc: function(doubanMovies,settedKey){
      //console.log(doubanMovies);
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
          // stars
          stars: util.convertToStarsArray(doubanMovies.subjects[idx].rating.stars),
        };
        movies.push(temp);
        var readyData = {};
        readyData[settedKey] = {movies: movies,grpTitle: doubanMovies.title };
        this.setData(readyData);
      }
    },

    onMoreTap: function(evt){
      //console.log('more');
      var grpTitle = evt.currentTarget.dataset.category;
      //console.log(grpTitle);
      wx.navigateTo({
        // 传参 电影分类名称 
        url: 'more-movie/more-movie?category='+grpTitle,
      });
    }
});

