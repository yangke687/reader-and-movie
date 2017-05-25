// pages/movies/more-movie/more-movie.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: '',
    movies: []
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
  },

  onReady: function(evt){
    wx.setNavigationBarTitle({
      title: this.data.category
    });
  }
})