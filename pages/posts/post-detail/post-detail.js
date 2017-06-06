var postsData = require('../../../data/posts-data.js');
var app = getApp();

Page({
    data: {
        isPlaying: false
    },
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
        var postIsCollected = this.fetchPostData(option.id,wx.getStorageSync('postsCollected'))!=null;
        this.setData({
            postIsCollected: postIsCollected
        });

       // 初始化 
       if( option.id === app.globalData.currentMusicPlayingPostId ){
        this.setData({
            isPlaying: app.globalData.isPlaying
        });
       }

       // 监听音乐总开关
       var that = this;
       wx.onBackgroundAudioPlay(function() {
         that.setData({
             isPlaying: true
         });
         console.log("switch on",option.id, app.globalData.currentMusicPlayingPostId);
        
        app.globalData.currentMusicPlayingPostId = option.id;
        app.globalData.isPlaying = true;
         
       });
       wx.onBackgroundAudioPause(function() {
         that.setData({
             isPlaying: false
         });
         console.log("switch off",option.id, app.globalData.currentMusicPlayingPostId);
         
         app.globalData.isPlaying = false;
         app.globalData.currentMusicPlayingPostId = null;

         // 如果当前播放的音乐与不是当前文章对应的音乐，直接停止播放
         if( app.globalData.currentMusicPlayingPostId!==null && option.id != app.globalData.currentMusicPlayingPostId ){
            wx.stopBackgroundAudio();
         }
         
       });
       // 监听音乐播放完毕，更新 "播放" 图标为 "暂停" 图标
       wx.onBackgroundAudioStop(function(){
          that.setData({
            isPlaying: false
          });
          app.globalData.isPlaying = false;
          app.globalData.currentMusicPlayingPostId = null;
       });
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
    },

    onShareTap: function(evt){
        wx.showActionSheet({
            itemList: [
                "分享给微信好友",
                "分享到朋友圈",
                "分享到QQ",
                "分享到微博"
            ],
            success: function(res){
                console.log(res.tapIndex);
            }
        });
    },

    onMusicTap: function(evt){
        //console.log('play music');
        var postId = evt.currentTarget.dataset.postid;
        console.log(postId);
        var postData = this.fetchPostData(postId,postsData.postList);

        var isPlaying = this.data.isPlaying;

        // turn on music
        if( !isPlaying ){
            wx.playBackgroundAudio({
            dataUrl: postData.music.url,
            title: postData.music.title,
            coverImgUrl: postData.music.coverImg,
            success: function(res){
                
            },
            fail: function(res) {
                // fail
            },
            complete: function(res) {
                // complete
            }
            });
            app.globalData.isPlaying = true;
            this.data.isPlaying = true;
            this.setData({
                isPlaying: true
            });
        }
        else{ // turn off music
            wx.pauseBackgroundAudio({
              success: function(res){
                // success
              },
              fail: function(res) {
                // fail
              },
              complete: function(res) {
                // complete
              }
            });
            //isPlaying = false;
            app.globalData.isPlaying = false;
            this.data.isPlaying =false;
            this.setData({
                isPlaying: false
            });
        }
    }
});