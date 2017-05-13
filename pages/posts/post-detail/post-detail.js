var postsData = require('../../../data/posts-data.js');

Page({
    onLoad: function(option){
        var postId = parseInt(option.id);
        var postDataIndex = postsData.postList.findIndex(function(post){
           // console.log(post,post.postId,postId);
            return post.postId == postId;
        });

        var postData = postsData.postList[postDataIndex];
       // console.log(postData);
        // binding data
        this.setData({
            postData: postData
        });
    }
});