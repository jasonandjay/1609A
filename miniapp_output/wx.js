/*
 * wx api 桥接文件，主要是为了降低迁移成本；
 * 如果觉得使用桥接版本的 api 不符合期望或期望更精细化提升体验，
 * 请前往 https://docs.alipay.com/mini/api 使用原生 api（my.{api_name}）
 */
// helper util
function convertDeviceStructs(devices) {
    var realDevices = [];
    if (devices && devices.length > 0) {
        for (var i in devices) {
            var {deviceName, localName, deviceId, RSSI, advertisData} = devices[i];
            realDevices.push({'name': deviceName || localName, 'deviceId': deviceId, rssi: RSSI, advertisData });
        }
    }
    return realDevices;
}

function convertCharacteristics(characteristics) {
    var realCharacteristics = [];
    if (characteristics && characteristics.length > 0) {
        for (var i in characteristics) {
            var {characteristicId, unused_serviceId, unused_value, properties} = characteristics[i];
            realCharacteristics.push({'uuid': characteristicId, 'properties': properties });
        }
    }
    return realCharacteristics;
}

var wx = {
    chooseImage({ count, unused_sizeType, sourceType, success, fail, complete }) {
        my.chooseImage({
            'count': count, 'sourceType': sourceType, 'success': ({ apFilePaths, unused_tempFiles }) => {
                success && success({ tempFilePaths: apFilePaths });
            }, 'fail': fail, 'complete': ({ apFilePaths, unused_tempFiles }) => {
                complete && complete({ tempFilePaths : apFilePaths });
            }
        });
    },

    saveImageToPhotosAlbum({ filePath, success, fail, complete }) {
        my.saveImage({ 'url': filePath, 'showActionSheet': true, 'success': success, 'fail': fail, 'complete': complete });
        console.warn('是否显示图片操作菜单，默认 true，详见：https://docs.alipay.com/mini/api/media-image#%23mysaveimage');
    },

    startRecord({ success, fail, complete }) {
        my.startRecord({
            'maxDuration': 60, 'minDuration': 1, 'success': ({ tempFilePath }) => {
                success && success({ apFilePath: tempFilePath });
            }, fail, 'complete': ({ tempFilePath }) => {
                complete && complete({ apFilePath: tempFilePath });
            }
        });
        console.warn('最大录制时长，单位秒，默认 60 s，最小录制时长，单位秒，默认 1 s，详见：https://docs.alipay.com/mini/api/media-record#%23mystartrecord');
    },

    getBackgroundAudioPlayerState({ success, fail, complete }) {
        my.getBackgroundAudioPlayerState({ 'success': success });
        if (fail || complete) {
            console.warn('getBackgroundAudioPlayerState() ，传入 fail/complete 回调是无效的，会被忽略，详见：https://docs.alipay.com/mini/api/media-audio-play#%23mygetbackgroundaudioplayerstate');
        }
    },

    playBackgroundAudio({ dataUrl, title, coverImgUrl, success, fail, complete }) {
        my.playBackgroundAudio({
            'dataUrl': dataUrl, 'title': title, 'singer': null,
            'describe': null, 'logo': null, 'cover': coverImgUrl, 'success': success,
            'fail': fail,
            'complete': complete
        });
        console.warn('默认情况没有演唱者、描述、logo信息，详见：https://docs.alipay.com/mini/api/media-audio-play');
    },

    chooseVideo({ sourceType, maxDuration, camera, success, fail, complete }) {
        my.chooseVideo({
            'maxDuration': maxDuration, 'sourceType': sourceType, 'camera': camera, 'success': ({ tempFilePath, duration, size, height, width }) => {
                success && success(tempFilePath, duration, size, width, height);
            }, 'fail': fail, 'complete': complete
        });
    },

    createVideoContext(videoId) {
        var videoContext = {
            _delegate: my.createVideoContext(videoId),
            play: function () {
                this._delegate.play();
            },
            pause: function () {
                this._delegate.pause();
            },
            seek: function (position) {
                this._delegate.seek(position);
            },
            sendDanmu: function ({ unused_text, unused_color }) {
                console.error('my.createVideoContext().sendDanmu() 不能被支持，详见：https://docs.alipay.com/mini/api/media-video#%23mycreatevideocontextvideoid');
            },
            playbackRate: function (unused_rate) {
                console.error('my.createVideoContext().playbackRate() 不能被支持，详见：https://docs.alipay.com/mini/api/media-video#%23mycreatevideocontextvideoid');
            },
            requestFullScreen: function () {
                console.error('my.createVideoContext().requestFullScreen() 不能被支持，详见：https://docs.alipay.com/mini/api/media-video#%23mycreatevideocontextvideoid');
            },
            exitFullScreen: function () {
                console.error('my.createVideoContext().exitFullScreen() 不能被支持，详见：https://docs.alipay.com/mini/api/media-video#%23mycreatevideocontextvideoid');
            }
        };
        return videoContext;
    },

    uploadFile({ url, filePath, name, header, formData, success, fail, complete }) {
        my.uploadFile({
            'url': url, 'filePath': filePath, 'fileName': name,
            'fileType': 'image/video', 'headers': header, 'formData': formData, 'success': ({ data, statusCode }) => {
                success && success(data, statusCode);
            }, 'fail': fail, 'complete': complete
        });
        console.warn('my.uploadFile() 文件类型默认为 image/video，详见：https://docs.alipay.com/mini/api/media-file#%23myuploadfile');
    },

    downloadFile({ url, header, success, fail, complete }) {
        my.downloadFile({ 'url': url, 'headers': header }, ({ tempFilePath }) => {
            success && success({ apFilePath: tempFilePath });
        });
        if (fail || complete) {
            console.warn('downloadFile() fail/complete 回调不支持，会被忽略，详见：https://docs.alipay.com/mini/api/media-file#%23mydownloadfile');
        }
    },

    createMapContext(mapId) {
        var mapContext = {
            _delegate: my.createMapContext(mapId),
            getCenterLocation: function (options) {
                return this._delegate.getCenterLocation(options);
            },
            moveToLocation: function () {
                this._delegate.moveToLocation();
            },
            translateMarker: function (unused_param) {
                console.error('目前不支持 mapContext.translateMarker()，详见：https://docs.alipay.com/mini/api/ui-map#%23mycreatemapcontextmapid');
            },
            includePoints: function (unused_param) {
                console.error('目前不支持 mapContext.includePoints()，详见：https://docs.alipay.com/mini/api/ui-map#%23mycreatemapcontextmapid');
            },
            getRegion: function (unused_param) {
                console.error('目前不支持 mapContext.getRegion()，详见：https://docs.alipay.com/mini/api/ui-map#%23mycreatemapcontextmapid');
            },
            getScale: function (unused_param) {
                console.error('目前不支持 mapContext.getScale()，详见：https://docs.alipay.com/mini/api/ui-map#%23mycreatemapcontextmapid');
            }
        };
        return mapContext;
    },

    getSystemInfo({ success, fail, complete }) {
        my.getSystemInfo({
            'success': ({ model, pixelRadio, windowWidth, windowHeight, language, version,
            }) => {
                success && success({
                    'model': model, 'pixelRatio': pixelRadio,
                    'screenWidth': undefined, 'screenHeight': undefined, 'windowWidth': windowWidth, 'windowHeight': windowHeight, 'language': language, 'version': version
                });
            }, 'fail': fail, 'complete': complete
        });
        console.warn('my.getSystemInfo() 返回的信息不包括：screenWidth、screenHeight、system、platform、SDKVersion，详见：https://docs.alipay.com/mini/api/device#%23mygetsysteminfo');
    },

    getNetworkType({ success, fail, complete }) {
        my.getNetworkType({
            'success': ({ unused_networkAvailable, networkType }) => {
                success && success({ 'networkType': networkType });
            }, 'fail': fail, 'complete': complete
        });
    },

    onAccelerometerChange(callback) {
        my.onAccelerometerChange({'success': callback});
    },

    onCompassChange(callback) {
        my.onCompassChange({'success': callback});
    },

    scanCode({onlyFromCamera, success, fail, complete}) {
        if (onlyFromCamera) {
             console.warn('onlyFromCamera 参数不受支持，详见：https://docs.alipay.com/mini/api/device');
        }
        my.scan({'type': 'qr', 'success': ({result, unused_canType, unused_charSet, unused_path }) => {
            success && success(result);
        }, 'fail': fail, 'complete': complete});
        console.warn('扫描目标类型，支持 qr / bar，相应扫码选框会不同，默认 qr，详见：https://docs.alipay.com/mini/api/device');
    },

    // getBluetoothAdapterState 差异很小，不做桥接

    onBluetoothAdapterStateChange(callback) {
        my.onBluetoothAdapterStateChange({'success': ({available, connected}) => {
           callback && callback({'available': available, 'discovering': !connected});
        }});
    },

    startBluetoothDevicesDiscovery({services, allowDuplicatesKey, interval, success, fail, complete }) {
        // TODO: 微信回调为errMsg/isDiscovering 支付宝回调为devices
        my.startBluetoothDevicesDiscovery({'services': services, 'success': ({services}) => {
            success && success({'errMsg': services});
        }, fail, complete}); 
        console.warn('请通过 my.onBluetoothDeviceFound(cb) 来接收设备发现结果');
    },

    getBluetoothDevices({ success, fail, complete }) {
        my.getBluetoothDevices({'services':[], 'success': ({devices}) => {
                var realDevices = convertDeviceStructs(devices);
                success && success({'devices': realDevices});
            }, 
            'fail': fail, 'complete': complete });
        console.warn('请迁移至：my.getBluetoothDevices() 来接收设备发现结果，参见：https://docs.alipay.com/mini/api/bluetooth#my.getBluetoothDevices');
    },

    getConnectedBluetoothDevices({ services, success, fail, complete }) {
        my.getConnectedBluetoothDevices({'services': services, 'success': ({ devices, errMsg }) => {
            var realDevices = convertDeviceStructs(devices);
            success && success({'devices': realDevices});
        }, 'fail': fail, 'complete': complete});   // devices的参数name内部不同
        console.warn('请迁移至：my.getConnectedBluetoothDevices() 来接收设备发现结果，参见：https://docs.alipay.com/mini/api/bluetooth#my.getConnectedBluetoothDevices');
    },

    onBluetoothDeviceFound(callback) {
        my.onBluetoothDeviceFound({'success': callback});
    },

    getBLEDeviceCharacteristics({ deviceId, serviceId, success, fail, complete }) {
        my.getBLEDeviceCharacteristics(deviceId, serviceId, ({ characteristics }) => {
            success(convertCharacteristics(characteristics));
        }, fail, complete);  //回调characteristics的id名不同
    },

    readBLECharacteristicValue({ deviceId, serviceId, characteristicsId, success, fail, complete }) {
        my.readBLECharacteristicValue({'deviceId': deviceId, 'serviceId': serviceId, 
            'characteristicsId': characteristicsId, 'descriptorId': '00002902-0000-1000-8000-00805f9b34fb',
            'success': ({ characteristic }) => {
                success && success({'characteristic': characteristic }); // 这里缺少 value
            }, fail, complete}); //微信characteristics里有value 支付宝没有 value
        console.warn('readBLECharacteristicValue 的 descriptor 的 uuid （只有android 会用到，非必填，默认值00002902-0000-1000-8000-00805f9b34fb）,详见：https://docs.alipay.com/mini/api/bluetooth');
    },

    writeBLECharacteristicValue({ deviceId, serviceId, characteristicId, value, success, fail, complete }) {
        my.writeBLECharacteristicValue({'deviceId': deviceId, 'serviceId': serviceId, 'characteristicId': characteristicId, 'descriptorId': '00002902-0000-1000-8000-00805f9b34fb',
            'value': value, 'success': success, 'fail': fail, 'complete': complete});
        console.warn('writeBLECharacteristicValue 的 descriptor 的 uuid （只有android 会用到，非必填，默认值00002902-0000-1000-8000-00805f9b34fb）,详见：https://docs.alipay.com/mini/api/bluetooth');
    },

    notifyBLECharacteristicValueChange({ deviceId, serviceId, characteristicId, state, success, fail, complete }) {
        my.notifyBLECharacteristicValueChange({'deviceId': deviceId, 'serviceId': serviceId, 'characteristicId':characteristicId, 'descriptorId': '00002902-0000-1000-8000-00805f9b34fb',
            'success': success, 'fail': fail, 'complete': complete});
        console.warn('notifyBLECharacteristicValueChange 的 descriptor 的 uuid （只有android 会用到，非必填，默认值00002902-0000-1000-8000-00805f9b34fb）,详见：https://docs.alipay.com/mini/api/bluetooth');
    },

    getStorageSync(key) {
        var value = my.getStorageSync({'key': key});
        return value ? value.data : null;
    },

    onBLEConnectionStateChange(callback) {
        my.onBLEConnectionStateChanged({'success': callback});
    },

    vibrateLong(object) {
        my.vibrate(object);
        console.warn('wx.vibrateLong、wx.vibrateShort 都委托给了统一的震动 api: my.vibrate，详见：https://docs.alipay.com/mini/api/device#%23myvibrate');
    },

    setStorageSync(key, value) {
        my.setStorageSync({
            'key': key,
            'data': value
        });
    },

    vibrateShort(object) {
        my.vibrate(object);
        console.warn('wx.vibrateLong、wx.vibrateShort 都委托给了统一的震动 api: my.vibrate，详见：https://docs.alipay.com/mini/api/device#%23myvibrate');
    },

    showToast({ title, icon, image, duration, mask, success, fail, complete }) {
        var type = icon === 'success' ? 'success' : 'none';
        my.showToast({'content': title, 'type': type, 'duration': duration, 'success': success, 'fail': fail, 'complete': complete});
        console.warn('toast 类型，展示相应图标，默认 none，支持 success / fail / exception / none’。其中 exception 类型必须传文字信息，详见：https://docs.alipay.com/mini/api/ui-feedback');
    },

    showLoading({ title, mask, success, fail, complete }) {
        my.showLoading({'content': title, 'delay': 0, 'success': success, 'fail': fail, 'complete': complete});
        console.warn('延迟显示，单位 ms，默认 0。如果在此时间之前调用了 ap.hideLoading 则不会显示，详见：https://docs.alipay.com/mini/api/ui-feedback');
    },

    showActionSheet({ itemList, itemColor, success, fail, complete }) {
        my.showActionSheet({'title':'', 'items': itemList, 'cancelButtonText':'取消', destructiveBtnIndex: 0, success: ({ index }) => {
            success({tapIndex: index});
        }, fail: fail, complete: complete});
        console.warn('菜单标题默认为空，取消按钮文字默认为取消，指定按钮的索引号，从0开始，详见：https://docs.alipay.com/mini/api/ui-feedback');
    },

    setNavigationBarTitle({ title, success, fail, complete }) {
        my.setNavigationBar({title:title, image: null, backgroundColor: null, borderBottomColor: null,     reset: false, success: success, fail: fail, complete: complete});
        console.warn('图片、背景色、边框颜色为空，是否重置导航栏为支付宝默认配色，默认 false，详见：https://docs.alipay.com/mini/api/ui-navigate');
    },

    canvasToTempFilePath({ x, y, width, height, destWidth, destHeight, canvasId, success, fail, complete }) {
        const ctx = my.createCanvasContext(canvasId)
        ctx.toTempFilePath({
            success: success
        });
    },

    request({ url, data, header, method, dataType, success, fail, complete }) {
        my.httpRequest({url: url, headers: header, method: method, data: JSON.stringify(data), timeout: 30000, dataType: dataType, success: ({ data, status, headers }) => {
            success && success({data:data, statusCode: status, header: headers});
        }, fail: fail, complete: complete});
        console.warn('超时时间，单位为 ms，默认 30000，详见：https://docs.alipay.com/mini/api/network');
    },

    connectSocket({ url, data, header, method, protocols, success, fail, complete }) {
        my.connectSocket({url: url, data:data, header: header, method:method, success: success});
    },

    sendSocketMessage({ data, success, fail, complete }) {
        my.sendSocketMessage({data: data, success: success});
    }
};
module.exports = wx;