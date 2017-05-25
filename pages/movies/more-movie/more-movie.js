// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: '',
    movies: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cat = options.category;
    var prefix = app.globalData.doubanApiPrefix;
    this.data.category = cat;
    // load more movies list
    switch(cat){
      case '正在上映的电影-北京':
        var url = prefix + "/v2/movie/in_theaters";
        break;
      case '即将上映的电影':
        var url = prefix + "/v2/movie/coming_soon";
        break;
      case '豆瓣电影Top250':
        var url = prefix + "/v2/movie/top250";
        break;
    }
    // 获取更多电影
    util.http(url,function(res){
      var doubanMovies = res.data;
      var movies = [];
      for (var idx in doubanMovies.subjects) {
        var sub = doubanMovies.subjects[idx];
        var title = sub.title;
        if (title.length > 6) {
          title = title.substr(0, 6) + '...';
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
        this.setData({
          movies: movies
        });
      }
    }.bind(this));
  },

  onReady: function(evt){
    wx.setNavigationBarTitle({
      title: this.data.category
    });
  }
})