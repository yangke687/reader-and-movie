var postsData = require('../../../data/posts-data.js');

Page({
    onLoad: function(option){
        
        var postData = 
            this.fetchPostData(option.id,postsData.postList);

        // binding data
        this.setData({
            postData: postData
        });

        // set post collected
        if( !wx.getStorageSync('postsCollected') ){
            wx.setStorageSync('postsCollected', []);
        }

        // postIsCollected
        //console.log(wx.getStorageSync('postsCollected'))
        var postIsCollected = this.fetchPostData(option.id,wx.getStorageSync('postsCollected'))!=null;
        this.setData({
            postIsCollected: postIsCollected
        });

       // console.log('is collected',postIsCollected);
       // wx.clearStorageSync();
    },

    fetchPostData: function(postId,postsList){
        // exit 0
        if( postsList.length==0 ) return null;
        var postId = parseInt(postId);
        var postDataIndex = postsList.findIndex(function(post){
            if(!post) return null;
            return post.postId == postId;
        });

        if(postDataIndex>-1){
            return postsList[postDataIndex];
        }
    
        return null;
    },

    // 收藏
    onCollectionTap: function(evt){
        var post = evt.currentTarget.dataset.post;
        var postId = post.postId;
        var postsCollected = wx.getStorageSync('postsCollected');
        console.log("postsCollected",postsCollected);

        // add current post into local storage
       if( this.fetchPostData(postId,postsCollected)===null){
           postsCollected.push(post);
           wx.setStorageSync('postsCollected', postsCollected);
            this.setData({
                postIsCollected: true
            });
            wx.showToast({
               title: "收藏成功",
               mask: true,
               icon: 'success'
           });
       }
    },

    // 取消收藏
    onUnCollectionTap: function(evt){
        var postId = evt.currentTarget.dataset.postid;
       
       // remove current post from local storage
       var postsCollected = wx.getStorageSync("postsCollected");
       var idx = postsCollected.findIndex(function(post){
         return post.postId == postId
       });
       //console.log('here',idx);
       if(idx>-1){
           postsCollected.splice(idx,1);
           wx.setStorageSync('postsCollected', postsCollected);
           this.setData({
               postIsCollected: false
           });
           wx.showToast({
               title: "取消收藏",
               mask: true,
               icon: 'success'
           });
       }
    }
});