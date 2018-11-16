import Promise from "../utils/es6-promise"
const wxGetImageInfo = (url) => {
    return new Promise((resolve, reject) => {
        wx.getImageInfo({
            src: url,
            success: resolve,
            fail: reject
        });
    });
};

module.exports = {
    wxGetImageInfo: wxGetImageInfo
};
