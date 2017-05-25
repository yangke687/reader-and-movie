// pages/movies/more-movie/more-movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.category);
    this.data.category = options.category;
  },

  onReady: function(evt){
    wx.setNavigationBarTitle({
      title: this.data.category
    });
  }
})