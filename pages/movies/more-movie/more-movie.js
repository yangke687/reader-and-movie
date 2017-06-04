// pages/movies/more-movie/more-movie.js
var app = getApp();
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestUrl: '',
    totalCount: 0,
    category: '',
    movies: {},
    isEmpty: true,
    nextPageIsLoading: false,
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
    this.data.requestUrl = url;
    // 获取更多电影
    util.http(url,this.processDoubanData.bind(this));
  },

  processDoubanData: function(res){
    // set on data loading mark
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
    }
    var totalMovies = {};
    if(!this.data.isEmpty){
      totalMovies = this.data.movies.concat(movies);
    }
    else{
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });
    // set off data loading mark
    this.data.nextPageIsLoading = false;
    this.data.totalCount += 20;
  },

  onReady: function(evt){
    wx.setNavigationBarTitle({
      title: this.data.category
    });
  },

  onScrollLower: function(evt){
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    if (!this.data.nextPageIsLoading){
      this.data.nextPageIsLoading = true;
      util.http(nextUrl,this.processDoubanData.bind(this));
    }
  }
})