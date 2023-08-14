const plusHelper = {
  /**
   * 获取位置信息
   * @param {*} callbackSuccess 成功回调
   * @param {*} callbackError 失败回调
   */
  getCurrentPosition: (callbackSuccess, callbackError) => {
    plus.geolocation.getCurrentPosition(callbackSuccess, callbackError, {
      geocode: false,
    });
  },
  /**
   * 拍照
   * @param {*} callbackSuccess 成功回调
   * @param {*} callbackError 失败回调
   */
  getCamera: (callbackSuccess, callbackError) => {
    const cmr = plus.camera.getCamera();
    cmr.captureImage(
      function (p) {
        plus.io.resolveLocalFileSystemURL(p, callbackSuccess, callbackError);
      },
      callbackError,
      { filename: '_doc/camera/', index: 1 },
    );
  },
  /**
   * 从相册中选择图片
   * @param {*} callbackSuccess 成功回调
   * @param {*} callbackError 失败回调
   * @param {*} options {filter:'image',multiple:true,maximum:3,system:false,onmaxed:(){}} 选择照片的配置参数: 是否能多选，最多选多少张，达到最大时触发回调信息
   */
  chooseImage: (callbackSuccess, callbackError, options = {}) => {
    plus.gallery.pick(callbackSuccess, callbackError, {
      filter: 'image',
      multiple: true,
      system: false,
      ...options,
    });
  },
  /**
   * 拨打电话
   * @param {*} phoneNumber 电话号码
   */
  callPhone: (phoneNumber) => {
    plus.device.dial(phoneNumber, false);
  },
  /**
   * 调用系统地图显示
   * @param {*} targetPoint 目标位置经纬度
   * @param {*} srcPoint 起点经纬度
   * @param {*} targetName 目标位置经纬度名称
   */
  navigateWithMap: (targetPoint, srcPoint, targetName) => {
    const dst = new plus.maps.Point(...targetPoint);
    const src = new plus.maps.Point(...srcPoint);
    plus.maps.openSysMap(dst, targetName, src);
  },
  /**
   * 获取分享列表
   * @param {*} callbackSuccess 成功回调
   * @param {*} callbackError 失败回调
   */
  getShareServices: (callbackSuccess, callbackError) => {
    plus.share.getServices(callbackSuccess, callbackError);
  },
  /**
   * 微信分享
   * @param {*} options 微信分享的配置 { id: 'gh_33446d7f7a26', type: 0 // 正式版 }
   */
  launchMiniProgram: (options) => {
    plusHelper.getShareServices((services) => {
      const wxShare = services.find((sv) => sv.id === 'weixin');
      if (wxShare) {
        wxShare.launchMiniProgram(options);
      } else {
        plus.nativeUI.toast('未配置微信分享模块!');
        return;
      }
    });
  },
  /**
   * 视频播放
   * @param {*} options 播放配置 {src,id}
   */
  playVideo: (options) => {
    const { src, id } = options;
    const currentPlayer = window[`plusVideoPlayer_${id}`];
    if (currentPlayer) {
      currentPlayer.setOptions({ src });
      currentPlayer.play();
    } else {
      window[`plusVideoPlayer_${id}`] = new plus.video.VideoPlayer(id, { src });
    }
  },
  openWindow: (path, title) => {
    var as = 'pop-in';
    var absoluteUrl = path;
    var ws = {
      scrollIndicator: 'none',
      scalable: false,
      popGesture: 'close',
      backButtonAutoControl: 'close',
      titleNView: {
        autoBackButton: true,
        backgroundColor: '#000000',
        titleColor: '#CCCCCC',
      },
    };
    ws.titleNView.titleText = title;
    var _openw = plus.webview.create(absoluteUrl, path, ws);
    _openw.addEventListener(
      'loaded',
      function () {
        //页面加载完成后才显示
        _openw &&
          _openw.show(as, null, function () {
            _openw = null; //避免快速点击打开多个页面
          });
      },
      false,
    );
    _openw.addEventListener(
      'hide',
      function () {
        _openw = null;
      },
      false,
    );
    _openw.addEventListener(
      'close',
      function () {
        //页面关闭后可再次打开
        _openw = null;
      },
      false,
    );
  },
};

window.plusHelper = plusHelper;

// document.write('<script src="https://cdn.bootcdn.net/ajax/libs/vConsole/3.15.0/vconsole.min.js?d=' + new Date().getTime() + '"><\/script>')

// setTimeout(() => {
//     var vConsole = new VConsole();
//     console.log(document.location)
//     window.plusHelper.openWindow('detail?id=1001', '测试')
// }, 5000)
