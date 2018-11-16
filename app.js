//app.js
App({
    onLaunch() {
        // 登录
        wx.login({
            success: res => {
				console.log('登录信息',res);
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        });
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting["scope.userInfo"]) {
                    wx.getUserInfo({
                        success: res => {
                            this.globalData.userInfo = res.userInfo;

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res);
                            }
                        }
                    });
                }
            }
        });
    },
    globalData: {
        userInfo: null
    }
});
