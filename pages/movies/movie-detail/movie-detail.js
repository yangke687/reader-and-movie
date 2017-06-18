// pages/movies/movie-detail/movie-detail.js
var app = getApp();
var utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.id;
    var url = app.globalData.doubanApiPrefix + '/v2/movie/subject/' + movieId;
    utils.http(url,function(res){
      var data = res.data;
      // director
      var director = {
        avatar: "",
        name: "",
        id: ""
      };
      if( data.directors[0] !== null){
        if(data.directors[0].avatars!==null){
          director.avatar = data.directors[0].avatars.large;
        }
        director.name = data.directors[0].name;
        director.id = data.directors[0].id;
      }
      // movie data  
      var movie = {
        movieImg: data.images ? data.images.large : '',
        country: data.countries.join(' '),
        title: data.title,
        origTitle: data.original_title,
        wishCount: data.wish_count,
        commentCount: data.comment_count,
        year: data.year,
        genres: data.genres.join(', '),
        stars: utils.convertToStarsArray(data.rating.stars),
        score: data.rating.average,
        director: director,
        casts: utils.convertToCastString(data.casts),
        castsInfo: utils.convertToCastInfos(data.casts),
        summary: data.summary
      };
      this.setData({
        movie: movie
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})