var postData = require('../../data/posts-data.js')

Page({
  data:{
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.setData({
      posts: postData.postList
    });
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    console.log('on show');
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    console.log('on hide');
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    console.log('on unload');
  },
  onPostTap: function(evt){
    var postId = evt.currentTarget.dataset.postId;
    console.log(postId);
    //console.log('here');

    wx.navigateTo({
      url: "post-detail/post-detail"
    });
  }
})