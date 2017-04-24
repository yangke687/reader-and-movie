Page({
  data:{
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
   var posts = [
       {
            date: "Sep 18 2016",
            title: "正是虾肥蟹壮时",
            post_img: "/images/post/crab.png",
            author_img: "/images/avatar/1.png",
            content: "菊黄蟹正肥，品尝秋之味。徐志摩把,“看初花的荻芦”和“到楼外楼吃蟹”,并列为秋天来杭州不能错过的风雅之事；用林妹妹的话讲是“螯封嫩玉双双满，",
            view_num: "112",
            collect_num: "96"
       },
       {
            date: "Nov 20 2016",
            title: "比利·林恩的中场故事",
            post_img: "/images/post/bl.png",
            author_img: "/images/avatar/2.png",
            content: "一 “李安是一位绝不会重复自己的导演，本片将极富原创性李安众所瞩目的新片《比利林恩漫长的中场休息》，正式更名《半场无战事》。",
            view_num: "62",
            collect_num: "96"
       }
   ];
this.setData({posts});
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
  }
})