//index.js
//获取应用实例
const app = getApp();

import regeneratorRuntime from '../../utils/runtime'
import Promise from '../../utils/es6-promise';
import { wxGetImageInfo } from '../../utils/wxApi'

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse("button.open-type.getUserInfo")
    },
    onLoad() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            });
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                });
            };
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo;
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    });
                }
            });
        }
	},
	onShow(){
        // this.test();
        this.handleDrawCanvas();
    },
    handleDrawCanvas(){
        const bkImgPromise = wxGetImageInfo('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1122803715,1770953277&fm=27&gp=0.jpg');
        const conImgPromise = wxGetImageInfo('https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2181180820,644263992&fm=27&gp=0.jpg')
        Promise.all([bkImgPromise,conImgPromise]).then(([bk,con])=>{
            console.log(11);
            const ctx = wx.createCanvasContext("shareCanvas");
            const canvasWidth = 300
            const canvasHeight = 400

            ctx.save();
            ctx.drawImage(bk.path,0,0,canvasWidth,canvasHeight)
            ctx.restore();

            ctx.save();
            ctx.drawImage(con.path,0,0,100,100)
            ctx.restore();

            ctx.draw();
        })
    },
	doubleNum(num){
		return new Promise((resolve,reject)=>{
			setTimeout(() => {
				resolve(num*2);
			}, 2000);
		})
	},
	async test(){
		let result1 = await this.doubleNum(1);
		console.log(result1);
		console.log(1111);
		// let result2 = await this.doubleNum(2);
		// console.log(2222);
		// let result4 = await this.doubleNum(4);
		// console.log(3333);
		// console.log(result1,result2,result4);
	},
    getUserInfo(e) {
        console.log(e);
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        });
    }
});
