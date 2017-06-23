//公共方法集
var utils=(function(){
	//下载根目录
	var downloadRoot="_downloads/";
	//下载文件目录
	var downloadDictionary={
		image:"images/",
		doc:"doc/"
	};
	//默认图片
	var defaultImages={
		user:"assets/img/message/message-userImg1.png"
	};
	//图片上传接口
	var IMAGE_UPLOAD_URL=njyy_config_host+"/client/pictures/save";
	//缓存图片
	function fetchImage(picUrl,element,defalutPic){
		//获取文件类型
		var fileType=picUrl.substring(picUrl.lastIndexOf('.'));
		//本地文件路径
		var fileName=downloadRoot+downloadDictionary.image+hex_md5(picUrl)+fileType;
		//设置默认加载图片
		if(defalutPic){
			element.setAttribute('src',defaultImages[defalutPic]);
		}
		plus.io.resolveLocalFileSystemURL(fileName,function(entry){
			entry.file(function(file){
				if(file.size==0&&defalutPic){
					fileName=defaultImages[defalutPic];
				}else{
					fileName=plus.io.convertLocalFileSystemURL(fileName);			
				}
				element.setAttribute('src',fileName);
			});
		},function(e){
			//下载图片
			var task=plus.downloader.createDownload(njyy_config_picture+picUrl,{
				filename:fileName
			},function(task,status){
				if(status==200){
					if(task.downloadedSize==0&&defalutPic){
						fileName=defaultImages[defalutPic];
					}else{
						fileName=plus.io.convertLocalFileSystemURL(fileName);						
					}
					element.setAttribute('src',fileName);
				}
			});
			task.start();
		});
	}
	
	//清除缓存
	function cleanCache(){
		var w=plus.nativeUI.showWaiting('清除中...');
		plus.io.resolveLocalFileSystemURL(downloadRoot,function(entry){
			entry.removeRecursively(function(){
				w.close();
				plus.nativeUI.toast('清除成功！');
			},function(){
				w.close();
				plus.nativeUI.toast('清除失败！');
			});
		});
	}
	
	//获取缓存大小
	function getCacheSize(){
		plus.io.resolveLocalFileSystemURL(downloadRoot,function(entry){
			entry.getMetadata(function(metadata){
				var size = bytesToSize(metadata.size);
				callBack(size);
			},function(){
				var size = '0 B';
				callBack(size);
			},true);
		});
	}
	
	//字节转换
	function bytesToSize(bytes) {
	    if (bytes === 0) return '0 B';
	    var k = 1024,
	        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
	        i = Math.floor(Math.log(bytes) / Math.log(k));
	   return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
	}
	//获取时间差
	function getTimeTip(createTime) {
		var nowTimeStamp = $.now() / 1000;
		var createTimeStamp = new Date(createTime).getTime() / 1000;
		var timeInterval = Math.abs(nowTimeStamp - createTimeStamp);
		var result = "";
		if(timeInterval < 60) {
			result = Math.floor(timeInterval) + "秒前";
		} else if(timeInterval < 3600 && timeInterval >= 60) {
			result = Math.floor(timeInterval / 60) + "分钟前";
		} else if(timeInterval >= 3600 && timeInterval < 86400) {
			result = Math.floor(timeInterval / 3600) + "小时前";
		} else if(timeInterval >= 86400 && timeInterval < 2592000) {
			result = Math.floor(timeInterval / 86400) + "天前";
		} else {
			result = createTime;
		}
		return result;
		
	}
	//调用相机
	function getCamera(callBack){
		var camera=plus.camera.getCamera();
		camera.captureImage(function(path){
			callBack(path);
		},function(error){
			console.log(error.message);
		},{
			filename:"_doc/camera/",
			index:1
		})
	}
	
	/**
	 *页面：公共方法
	 *事件：在跳转页面获取id值
	 *创建/修改：李路丹
	 *时间：2016/6/16 9:02
	 */
	function getId() {
		var url = location.search;
		var Request = new Object();
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);　 //去掉?号
		　　 var strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {　
				Request[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		var id = Request["id"]; //获取活动Id
		return id;
	}
	//比较时间大小
	function getUnixTime(starStr, endStr) {
	var newstrStar = starStr.replace(/-/g, '/');
	var dateStar = new Date(newstrStar);
	var time_str_star = dateStar.getTime().toString();
	var starStr = time_str_star.substr(0, 10);
	var newstrEnd = endStr.replace(/-/g, '/');
	var dateEnd = new Date(newstrEnd);
	var time_str_end = dateEnd.getTime().toString();
	var starEnd = time_str_end.substr(0, 10);
	if(starEnd > starStr) {
		return true;
	} else if( starStr>=starEnd ) {
		return false;
	}
	}
	//比较时间大小
	function getUnixTimeDetail(starStr, endStr) {
		console.log("starStr="+starStr+"endStr="+endStr)
	var newstrStar = starStr.replace(/-/g, '/');
	var dateStar = new Date(newstrStar);
	var time_str_star = dateStar.getTime().toString();
	var starStr = time_str_star.substr(0, 10);
	var newstrEnd = endStr.replace(/-/g, '/');
	var dateEnd = new Date(newstrEnd);
	var time_str_end = dateEnd.getTime().toString();
	var starEnd = time_str_end.substr(0, 10);
	if(starEnd > starStr) {
		return true;
	} else if(starEnd < starStr) {
		return false;
	}else{
		return 1001;
	}
	}
	//上传图片
	function uploadImage(userId,path,callBack){
		var task = plus.uploader.createUpload(IMAGE_UPLOAD_URL, {
				method:"POST"
			},
			function ( t, status ) {
				if ( status == 200 ) {
					var result = JSON.parse(t.responseText);
					callBack(result);
				} else {
					plus.nativeUI.toast('图片上传失败');
				}
			}
		);
		task.addFile(path, {
			key: "file"
		});
		task.addData('userId',userId);
		task.start();
	}
	
	//获取querystring
	function getQueryString(name) {
		var url =decodeURI(location.search);
		var Request = new Object();
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);　 //去掉?号
		　　 var strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {　
				Request[strs[i].split("=")[0]] =strs[i].split("=")[1];
			}
		}
		
		return Request[name];
	}
	function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
   }
	function getNowFormatTime() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hour=date.getHours();
        var Minutes=date.getMinutes();
    var Seconds=date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
	    }
    if (hour >= 0 && hour <= 9) {
    hour = "0" + hour;
    }
    if (Minutes >= 0 && Minutes <= 9) {
    Minutes = "0" + Minutes;
    }
    if (Seconds >= 0 && Seconds <= 9) {
    Seconds = "0" + Seconds;
    }
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + hour+ seperator2 + Minutes
	            + seperator2 + Seconds;
	    return currentdate;
	}
	return {
		fetchImage:fetchImage,
		cleanCache:cleanCache,
		getCacheSize:getCacheSize,
		getTimeTip:getTimeTip,
		getCamera:getCamera,
		getId:getId,
		getUnixTime:getUnixTime,
		uploadImage:uploadImage,
		getQueryString:getQueryString,
		getNowFormatDate:getNowFormatDate,
		getUnixTimeDetail:getUnixTimeDetail,
		getNowFormatTime:getNowFormatTime
	};
}());
