/**
 *页面：公共方法
 *事件：监听卓手机返回按钮
 *创建/修改：李路丹
 *时间：2016/7/13 9:02
 */
document.addEventListener("plusready", onPlusReady, false);

function onPlusReady() {
	//判断应用退出
	var BACKBTN_FIRST = null;
	//网络状态
	var NET_STATUS;
	//应用前后台切换计时器
	var PASUE_TIMER = null;
	//监听返回按钮
//	FastClick.attach(document.body);/*解决移动端点击延迟300ms问题*/
//	plus.key.addEventListener('backbutton', function() {
//		console.log("点击返回按钮")
//		var currentPageId = document.querySelector('.page-current').getAttribute('id');
//		console.log(currentPageId)
//		if(currentPageId != "yy-circle" && currentPageId != "circles-index"&&currentPageId !="login-index") {
//			console.log("2222")
//			$.router.back();
//		} else {
//			console.log("11111")
//			//2秒内连按2次退出应用
//			if(BACKBTN_FIRST == null) {
//				console.log("3333")
//				BACKBTN_FIRST = 1;
//				plus.nativeUI.toast('再按一次退出应用');
//				setTimeout(function() {
//					BACKBTN_FIRST = null;
//				}, 2000);
//			} else {
//				//退出应用
//				plus.runtime.quit();
//			}
//		}
//	}, false);
//	mui.back = function() {
//		return
//	}
	plus.key.addEventListener('backbutton', function() {
		var currentPageId = document.querySelector('.page-current').getAttribute('id');
		/*if(currentPageId == "page-barcode") {
			scan = new plus.barcode.Barcode('bcid');
			scan.close();
			$.router.back();
		}*/
		console.log(currentPageId)
		if ($("#lightbox").is(':hidden')) {
			
		} else {
			console.log("隐藏大图")
			$("#lightbox").hide();
			$("#lightboxOverlay").hide();
			return
		}
		if (currentPageId == 'page-vacation' && $("#page-vacation-selectTeacher").is(':hidden')) {
			
		} else {
			if (currentPageId == 'page-vacation') {
				console.log("隐藏选择人员")
				$("#page-vacation-selectTeacher").hide();
				return
			}
		}
		if(currentPageId != "yy-circle" && currentPageId != "circles-index"&&currentPageId !="login-index"&&currentPageId !="page-roster"&&currentPageId !="page-main"&&currentPageId !="page-message"&&currentPageId !="mine-index") {
			$.router.back();
		} else {
			//2秒内连按2次退出应用
			if(BACKBTN_FIRST == null) {
				BACKBTN_FIRST = 1;
				plus.nativeUI.toast('再按一次退出应用');
				setTimeout(function() {
					BACKBTN_FIRST = null;
				}, 2000);
			} else {
				//退出应用
				plus.runtime.quit();
			}
		}
	}, false);
	
 	function checkInternetConnect() {
		plus.nativeUI.toast("请手动设置网络允许!");
		if(navigator.onLine == true) {
			clearInterval(timer); // 清除定时任务
			plus.runtime.restart();
		}
	}
	if(navigator.onLine == false) {
		plus.nativeUI.toast("请手动设置网络允许!");
		var timer = setInterval(checkInternetConnect, 2000); // 每隔1秒钟调用checkInternetConnect函数
	}
	//网络变化
	document.addEventListener('netchange', function() {
		var network = plus.networkinfo.getCurrentType();
		if(network < 2) {
			if(NET_STATUS > 1) {
				plus.nativeUI.toast('您的网络已断开');
			}
		}
		if(NET_STATUS == 3 && network > 3) {
			plus.nativeUI.toast('无线网已断开，浏览会产生流量');
		}
		NET_STATUS = network;
	});

	//应用切到后台1分钟后关闭应用
	document.addEventListener("pause", function() {
		PASUE_TIMER = setTimeout(function() {
			plus.runtime.quit();
		}, 60000);
	}, false);

	//1分钟内从后台切回前台 取消定时器
	document.addEventListener("resume", function() {
		if(PASUE_TIMER != null) {
			clearTimeout(PASUE_TIMER);
		}
	}, false);
	var url = njyy_config_host;
	var NGINX_PATH = njyy_config_picture;
	//文件下载路径
	var FILE_PATH = '_downloads/doc/';
	//服务器文件下载路径
	var SERVER_DOWNLOAD_PATH = njyy_config_picture;
	//用户头像上传路径
	var USERIMAGE_UPLOAD_PATH = njyy_config_host+"/client/pictures/save";
	// 上传聊天语音文件
	var AUDIO_UPLOAD_PATH = njyy_config_host+"/client/file/save";

	//当前用户
	CURRENT_USER = {};
	//手势密码行列数
	var CHOOSE_TYPE = 3;
	//手势设置
	GESTURE_SETTING = {};
	//加载手势配置
	if(plus.storage.getItem('GESTURE_SETTING') != null) {
		GESTURE_SETTING = JSON.parse(plus.storage.getItem('GESTURE_SETTING'));
	}

	//document jQuery对象
	var $DOCUMENT = $(document);
	//轮询间隔时间
	var INTERVAL_TIME = 100000;
	//消息定时器
	var MESSAGE_TIMER = null;

	//采用严格模式
	'use strict';
	$(function() {
		/**
		 *页面：集团介绍
		 *事件：页面加载
		 *创建/修改：左武洲
		 *时间：2016/5/31 9:02
		 */

		$DOCUMENT.on('pageInit', '#circles-introduction', function(e, id, page) {
			new Vue({
				el: '#circles-introduction',
				components: {
					'v-bar': vBar,
					'v-nav': vNav
				}
			});
		});

		/**
		 *页面：首页
		 *事件：页面加载
		 *创建/修改：左武洲
		 *时间：2016/5/31 9:02
		 */

		$DOCUMENT.on('pageInit', '#page-main', function(e, id, page) {
			//轮播图
	        
	        
			var appSwiper = new Swiper('#app-swiper-container', {
		        direction: 'horizontal',
		        autoplay: 2000,
		        autoplayDisableOnInteraction: false,
		        loop: true
			});
			var roleId = CURRENT_USER.ROLE;
			var name = CURRENT_USER.NAME;
			if( roleId==1) {
				greeting = true;
			} else {
				greeting = false;
			}
			new Vue({
				el: '#page-main',
				data: {
					greeting: greeting,
					loginName: name
				},
				methods: {
					waitting: function() {
						plus.nativeUI.toast('敬请期待~');
					}
				},
				components: {
					'v-bar': vBar,
					'v-nav': vNav
				}
			});
		});

		/**
		 *页面：校园风光
		 *事件：页面加载
		 *创建/修改：刘有
		 *时间：2016/6/14 11:03
		 */
		$DOCUMENT.on("pageInit", "#yy-surroundings", function(e, pageId, page) {
			var vm = new Vue({
				el: '#yy-surroundings',
				data: {
					items: {}
				},
				components: {
					'v-bar': vBar
				}
			});
			njyy_data.getSurroundings(function(data) {
				vm.items = data;
				vm.$nextTick(function() {
					//缓存并显示图片
					$('#surroundingsList').find('img').each(function() {
						var path = NGINX_PATH + this.dataset.src;
						utils.fetchImage(path, this);
					});
				});
			});
		});
		/*
		 *页面：社会版主界面
		 *事件：页面加载
		 *创建/修改：刘有
		 *时间：2016/6/14 11:04
		 */
		$DOCUMENT.on('pageInit', '#circles-index', function(e, id, page) {
			targetUrlTag = "school";
			var code;
			var currentLength = 0; //当前记录条数
			var loading = false;
			var nextUrl = 10001;
			var nextUrl1 = 10001;
			var vm = new Vue({
				el: '#circles-index',
				data: {
					items: [],
					items1: []
				},
				methods: {
					href: function(item) {
						var pp = item.ACT_ID;
						$.router.loadPage({
							url: "activity-detail.html?actId=" + pp,
							noAnimation: true,
							replace: false
						});
					}
				},
				components: {
					'v-bar': vBar,
					'v-nav': vNavPublic
				}
			});
			getSchoolCircles(); //校园
			//getActivityLists(); //活动

			$('#tab1').bind('refresh', '.pull-to-refresh-content', function(e) {
				getSchoolCircles(true);
			});
			$('#tab2').bind('refresh', '.pull-to-refresh-content', function(e) {
				getActivityLists(true);
			});

			/*校园圈上拉加载*/
			$('#circles-index').on('infinite', '#tab1', function() {
				// 如果正在加载，则退出
				if(loading) {
					return;
				}
				// 设置flag
				loading = true;
				if(nextUrl == 10001) {
					loading = false;
					$('#circles-index .infinite-scroll-preloader').html("已经到底了...");
				} else {
					$('#circles-index .infinite-scroll-preloader').html('<div class="preloader"></div>');
					njyy_data.getSchool(function(data) {
						if(data.SystemCode == 1) {
							nextUrl = data.nextUrl;
							vm.items = vm.items.concat(data.messageList);
						} else if(data.SystemCode > 1) {
							plus.nativeUI.toast("请求出错");
						}
						loading = false;
					}, nextUrl);

				}
			});
			/*活动圈上拉加载*/
			$('#circles-index').on('infinite', '#tab2', function() {
				// 如果正在加载，则退出
				if(loading) {
					return;
				}
				// 设置flag
				loading = true;
				if(nextUrl1 == 10001) {
					loading = false;
					$('#circles-index .infinite-scroll-preloader').html("已经到底了...");
				} else {
					$('#circles-index .infinite-scroll-preloader').html('<div class="preloader"></div>');
					njyy_data.getActivity(function(data) {
						if(data.SystemCode == 1) {
							nextUrl1 = data.nextUrl;
							vm.items1 = vm.items1.concat(data.actList);
						} else {
							plus.nativeUI.toast("请求出错");
						}
						loading = false;
					}, nextUrl1);
				}
			});

			/*
			 *初始化校园区数据,刷新
			 * */
			//1.校园圈数据
			function getSchoolCircles(isRefresh) {
				isRefresh = isRefresh || false;
				njyy_data.getSchool(function(data) {
					if(data.SystemCode == 1) {
						nextUrl = data.nextUrl;
						vm.items = data.messageList;
						$('#circles-index .infinite-scroll-preloader').html('');
						if(isRefresh) {
							$.pullToRefreshDone('#circles-index .pull-to-refresh-content');
						}
					} else {
						plus.nativeUI.toast("请求出错");
					}
				});
			}
			//初始化活动数据,下拉刷新
			function getActivityLists(isRefresh) {
				isRefresh = isRefresh || false;
				njyy_data.getActivity(function(data) {
					if(data.SystemCode == 1) {
						nextUrl1 = data.nextUrl;
						vm.items1 = data.actList;
						$('#circles-index .infinite-scroll-preloader').html('');
						if(isRefresh) {
							$.pullToRefreshDone('#circles-index .pull-to-refresh-content');
						}
					} else {
						plus.nativeUI.toast("请求出错");
					}
				});
			}
			//点击报名跳转详情界面
			$DOCUMENT.on('click', '.activity-btn-apply', function() {
				var pp = $(this).attr("id"); //获取查询到的id值
				$.router.loadPage({
					url: "activity-detail.html?actId=" + pp,
					noAnimation: true,
					replace: false
				});
			});
		});
		/**
		 *页面：社会版活动详情界面
		 *事件：页面加载
		 *创建/修改：刘有
		 *时间：2016/6/14 11：42
		 */
		$DOCUMENT.on("pageInit", "#active-detail", function(e, pageId, $page) {
			var url = location.search;
			var Request = new Object();
			if(url.indexOf("?") != -1) {
				var str = url.substr(1)　 //去掉?号
				var strs = str.split("&");
				for(var i = 0; i < strs.length; i++) {　
					Request[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
				}
			}
			var id = Request["actId"]; //获取活动Id
			var data = {};
			var example = new Vue({
				el: '#active-detail',
				data: {
					items: data,
				},
				methods: {
					activityApply: function() {
						var id1 = 1;
						$.ajax({
							type: "post",
							url: "http://58.213.75.39:8092/NJYY/client/activity/add",
							data: {
								'id1': id1,
								'ACT_ID': id
							},
							error: function() {
								plus.nativeUI.toast("请求出错");
							},
							success: function(data) {
								plus.nativeUI.toast("报名成功");
								$.router.loadPage({
									url: "yy-public.html",
									noAnimation: true,
									replace: false
								});

							}
						});
					}
				},
				components: {
					'v-bar': vBar,
					'v-nav': vNav
				}

			})
			njyy_data.getActivityListDetail(id, function(data) {
				example.items = data;
			});

			//点击报名
			$DOCUMENT.on('click', '#activity-detail-apply', function() {
				var id1 = 1;
				$.ajax({
					type: "GET",
					url: url + "/client/activity/add",
					data: {
						'id1': id1,
						'ACT_ID': id
					},
					error: function() {
						plus.nativeUI.toast("请求出错");
					},
					success: function(data) {
						plus.nativeUI.toast("报名成功");
						$.router.loadPage({
							url: "yy-public.html",
							noAnimation: true,
							replace: false
						});

					}
				});
			});

		});
		/**
		 *页面：校园版一幼圈
		 *事件：页面加载
		 *创建/修改：刘有
		 *时间：2016/6/14 11:03
		 */
		$DOCUMENT.on("pageInit", "#yy-circle", function(e, pageId, page) {
			var indexSwiper = new Swiper('#index-swiper-container', {
				direction: 'horizontal',
		        autoplay: 2000,
		        autoplayDisableOnInteraction: false,
		        loop: true
			})
			//班级id
			var classId;
			if(CURRENT_USER.ROLE==1) {
				//教师
				classId = CURRENT_USER.CLASS_ID;
			} else {
				//家长
				classId = CURRENT_USER.SELECTED_CHILD.CLASS_ID;
			}
			var schoolLoading = false;
			var classLoading = false;
			var schoolNextUrl = 10001;
			var classNextUrl = 10001;
			var userName=CURRENT_USER.NAME;
			var vm = new Vue({
				el: '#yy-circle',
				data: {
					schoolCircleList: [], //校园圈数据
					classCircleList: [], //班级圈数据
					nginx: NGINX_PATH,
					currentCircleIndex: 0,
					show: false,
					userName:userName,
					qwerqwre:"0",
					activeName: '',
					activeNameClass:'',
					activeNameComment:'',
					imgPath: njyy_config_picture,
					selectedPicsSrc: [],
					showPicSrc: '',
					bigPic: false,
					nowShowComment: ''
				},
				components: {
					'v-bar': vBar,
					'v-nav': vNav
				},
				methods: {
					//显示大图
					showBigPic: function(picsSrc) {
						this.selectedPicsSrc = [];
						if(picsSrc.length > 0 && picsSrc.indexOf(',') > -1) {
							var tmp = picsSrc.split(',');
							for (var i=0; i<tmp.length; i++) {
								this.selectedPicsSrc.push(this.imgPath + tmp[i])
							}
						} else {
							this.selectedPicsSrc.push(this.imgPath + picsSrc);
						}
						console.log(JSON.stringify(this.selectedPicsSrc))
						this.bigPic = true
					},
					hiddenBigPic: function() {
						this.bigPic = false
					},
					//点赞
					pushCircle: function(circleId, ROW_ID) {
						plus.nativeUI.showWaiting();
						njyy_data.pushCircle(CURRENT_USER.USER_ID, circleId, function(data) {
							plus.nativeUI.closeWaiting();
							if(data.result == 1) {
								plus.nativeUI.toast("点赞成功");
								$("#like" + ROW_ID).attr("src", "assets/img/btn_heart_pressed.png");
							} else if(data.result == 0) {
								$("#like" + ROW_ID).attr("src", "assets/img/btn_heart_normal.png");
								plus.nativeUI.toast("取消点赞");
							}
						});
					},
					//评论弹窗
					contact: function(index) {
						vm.currentCircleIndex = index;
						$(".custom-dialog").show();
						vm.nowShowComment = index
					},
					//获取评论列表
					checkContact: function(circleId, index) {
						if(this.activeNameComment==""){
							this.activeNameComment = circleId;
						}else{
							this.activeNameComment = "";
						}
						njyy_data.getCommentList(circleId, function(data) {
							if(data.SystemCode == 1) {
								vm.classCircleList[index].commentsList = data.comList;
							} else {
								plus.nativeUI.toast('评论列表获取失败');
							}
						});
					},
					//返回图片地址数组
					getImagePath: function(path) {
						var arr = [];
						if(path.length > 0 && path.indexOf(',') > -1) {
							arr = path.split(',');
						} else {
							arr.push(path);
						}
						return arr;	
					},
					collect: function(circleId, content) {
						var url = "yy-circle-detail.html?id=" + circleId;
						content = content.length > 10 ? content.substring(0, 10) + "..." : content;
						njyy_data.addFavorite(CURRENT_USER.USER_ID, encodeURI(content), url, function(data) {
							if(data.SystemCode == 1) {
								plus.nativeUI.toast('收藏成功');
							} else {
								plus.nativeUI.toast('收藏失败');
							}
						});
					},
					isSelf: function(nameId) {
						return nameId !== CURRENT_USER.USER_ID ? {
							display: 'none'
						} : {};
					},
					//删除圈子
					deleteClassCircle: function(item, index) {
						plus.nativeUI.confirm("确定删除吗?", function(e) {
							if(e.index == 0) {
								njyy_data.DeleteClassCircle(item.CLA_ID, function(data) {
									vm.classCircleList.splice(index, 1);
								});
							}
						}, "删除", ["确定", "取消"]);
					},
					addClassFun: function(index){
						this.qwerqwre = index; 
					},
					chooseMe: function(item){
						if(this.activeName==""){
							this.activeName = item.ANN_ID;
						}else{
							this.activeName = "";
						}
						
					},
					chooseClass: function(item){
						if(this.activeNameClass==""){
							this.activeNameClass = item.CLA_ID;
						}else{
							this.activeNameClass = "";
						}
					}
				},
				watch: {
					schoolCircleList: function() {
						console.log("school:"+JSON.stringify(this.schoolCircleList))
					},
					classCircleList: function() {
						console.log(JSON.stringify(this.classCircleList))
					}
				}
			});
			vm.$nextTick(function(){
				if(utils.getQueryString('isRealse')){//发布班级圈后显示班级圈
					$('#tab2Btn').trigger('click');
				}
			});
			getSchoolCircles(); //校园圈
			
			document.getElementById("tab2Btn").addEventListener("click", function() {
				console.log("点击tab2")
				getClassCircles()
			}); //班级圈
			$('#yy-circle').on('refresh', '#tab1', function(e) {	
				getSchoolCircles(true);
			});
			$('#yy-circle').on('refresh', '#tab2', function(e) {
				getClassCircles(true);
			});

			//缓存图片
			function loadImage() {
				//缓存并显示图片
				$('.yy-circle-item-image[src=""]').each(function() {
					var path = this.dataset.src;
					utils.fetchImage(path, this);
				});
			}
			/*校园圈上拉加载*/
			$DOCUMENT.on('infinite', '#tab1', function() {
				// 如果正在加载，则退出
				if(schoolLoading) {
					return;
				}
				// 设置flag
				schoolLoading = true;
				if(schoolNextUrl == 10001) {
					schoolLoading = false;
					$('#tab1 .infinite-scroll-preloader').html("已经到底了...");
				} else {
					$('#yy-circle .infinite-scroll-preloader').html('<div class="preloader"></div>');
					njyy_data.getSchool(function(data) {
						if(data.SystemCode == 1) {
							schoolNextUrl = data.nextUrl;
							vm.schoolCircleList = vm.schoolCircleList.concat(data.messageList);
						} else {
							plus.nativeUI.toast("请求出错");
						}
						schoolLoading = false;
					}, schoolNextUrl);

				}
			});
			/*班级圈上拉加载*/
			$DOCUMENT.on('infinite', '#tab2', function() {
				// 如果正在加载，则退出
				if(classLoading) {
					return;
				}
				// 设置flag
				classLoading = true;
				if(classNextUrl == 10001) {
					classLoading = true;
					$('#tab2 .infinite-scroll-preloader').html("已经到底了...");
				} else {
					$('#yy-circle .infinite-scroll-preloader').html('<div class="preloader"></div>');
					njyy_data.getClassCircleList(CURRENT_USER.USER_ID,classId, function(data) {
						console.log(JSON.stringify(data))
						if(data.SystemCode == 1) {
							classNextUrl = data.nextUrl;
							$.each(data.mesList, function(idx, obj) {
								obj.isPushed = false;
								obj.commentsList = [];
							});
							vm.classCircleList = vm.classCircleList.concat(data.mesList);
							vm.$nextTick(function() {
								loadImage();
							});
							classLoading = false;
						} else {
							plus.nativeUI.toast("请求出错");
						}
						classLoading = false;
					}, classNextUrl);
				}
			});
			//校园圈数据下拉刷新
			function getSchoolCircles(isRefresh) {
				
				isRefresh = isRefresh || false;
				njyy_data.getSchool(function(data) {
					if(data.SystemCode == 1) {
						schoolNextUrl = data.nextUrl;
						vm.schoolCircleList = data.messageList;
						$('#tab1 .infinite-scroll-preloader').html("");
					} else if(data.SystemCode == 30001) {
						plus.nativeUI.toast("没有校园圈数据哦!");
					} else {
						plus.nativeUI.toast("请求出错!");
					}
					if(isRefresh) {
						$.pullToRefreshDone('#yy-circle .pull-to-refresh-content');
					}
				});
			}

			//班级圈数据下拉刷新
			function getClassCircles(isRefresh) {
				console.log("hahahaha")
				isRefresh = isRefresh || false;
				njyy_data.getClassCircleList(CURRENT_USER.USER_ID, classId, function(data) {
					console.log(JSON.stringify(data))
					if(data.SystemCode == 1) {
						classNextUrl = data.nextUrl;
						$.each(data.mesList, function(idx, obj) {
							obj.isPushed = false;
							obj.commentsList = [];
						});
						vm.classCircleList = data.mesList;
						vm.$nextTick(function() {
							loadImage();
						});
						classLoading = false;
						$('#tab2 .infinite-scroll-preloader').html("");
					} else if(data.SystemCode == 30002) {
						plus.nativeUI.toast("没有班级圈记录!");
					} else {
						plus.nativeUI.toast("请求出错");
					}
					if(isRefresh) {
						$.pullToRefreshDone('#yy-circle .pull-to-refresh-content');
					}
				});

			}
			//点击发表评论
			$(".ok").on('click', function() {
				var content = $("#comment-content").val();
				for ( var i = 0; i < content.length; i++) {  
			        var hs = content.charCodeAt(i);  
			        if (0xd800 <= hs && hs <= 0xdbff) {  
			            if (content.length > 1) {  
			                var ls = content.charCodeAt(i + 1);  
			                var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;  
			                if (0x1d000 <= uc && uc <= 0x1f77f) {  
			                	plus.nativeUI.toast("不能输入emoji表情!");
			                    return;  
			                }  
			            }  
			        } else if (content.length > 1) {  
			            var ls = content.charCodeAt(i + 1);  
			            if (ls == 0x20e3) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            }  
			        } else {  
			            if (0x2100 <= hs && hs <= 0x27ff) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x2B05 <= hs && hs <= 0x2b07) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x2934 <= hs && hs <= 0x2935) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x3297 <= hs && hs <= 0x3299) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030  
			                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b  
			                    || hs == 0x2b50) {  
			                    	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            }  
			        }  
			    }
				if(content == "") {
					plus.nativeUI.toast("评论内容不能为空!");
					return;
				}
				//圈子id
				var circleId = vm.classCircleList[vm.currentCircleIndex].CLA_ID;
				njyy_data.makeComment(CURRENT_USER.USER_ID, circleId, content, function(data) {
					if(data.SystemCode == 1) {
						plus.nativeUI.toast("评论成功");
						$("#comment-content").val("");
						$(".custom-dialog").hide();
						vm.classCircleList[vm.currentCircleIndex].COMNUM++; //评论数+1
						njyy_data.getCommentList(circleId, function(data) {
							if(data.SystemCode == 1) {
								vm.classCircleList[vm.nowShowComment].commentsList = data.comList;
							} else {
								plus.nativeUI.toast('评论列表获取失败');
							}
						});
					} else {
						plus.nativeUI.toast('评论失败');
					}
				});
			});
			//取消评论
			$("#dialog-button-cancel").on('click', function() {
				$("#comment-content").val("");
				$(".custom-dialog").hide();
			});
			$("#img-button-cancel").on('click', function() {
				$("#comment-content").val("");
				$(".custom-dialog").hide();
			});
			//发布班级圈按钮显示
			var $pubCircleBtn = $('#pubCircleBtn');
			$('#yy-circle .com-tab').find('#tab1Btn').click(function() {
				$pubCircleBtn.hide();
			}).end().find('#tab2Btn').click(function() {
				$pubCircleBtn.show();
			});
		});

		/**
		 *页面：发布班级圈
		 *事件：页面加载
		 *创建/修改：刘有
		 *时间：2016/6/14 13:41
		 */
		$DOCUMENT.on("pageInit", "#publish-circle", function(e, pageId, $page) {
			var vm = new Vue({
				el: '#publish-circle',
				components: {
					'v-bar': vBar
				}
			});
			//添加图片
			var photosCount = 0;
			$("#addCirclePhotoBtn").click(function() {
				if(photosCount>=9){
					plus.nativeUI.toast('最多只能选取9张图片');
					return;
				}
				plus.nativeUI.actionSheet({
					cancel: "取消",
					buttons: [{
						title: "从相册选择"
					}, {
						title: "拍照"
					}]
				}, function(event) {
					if(event.index == 1) {
						var maximum = 9 - photosCount;
						plus.gallery.pick(function(e) {
							for(var i in e.files) {
								var path = e.files[i];
								plus.zip.compressImage({
									src: path,
									dst: "_downloads/camera/" + path.substring(path.lastIndexOf('/')),
									overwrite: true,
									quality: 20
								}, function(event) {
									if(photosCount < 9) {
										$("#addCirclePhotoBtn").before('<li><img id="public_cancel" class="icon-remove" src="assets/img/cancel.png" /><img class="circle-photo-item" src="' +
											event.target +
											'" /></li>');
										photosCount++;
									} else {
										plus.nativeUI.toast("最多选取9张图片");
									}
								}, function() {
									plus.nativeUI.toast("操作失败");
								});
							}
						}, function() {
							plus.nativeUI.toast('取消选择图片');
						}, {
							filter: 'image',
							multiple: true,
							maximum: maximum,
							system: false,
							onmaxed: function() {
								plus.nativeUI.toast('最多只能选取'+maximum+'张图片');
							}
						});
					} else if(event.index == 2) {
//						if(photosCount>=9){
//							plus.nativeUI.toast('最多只能选取9张图片');
//							return;
//						}
						utils.getCamera(function(path) {
							plus.zip.compressImage({
								src: path,
								dst: "_downloads/camera/" + path.substring(path.lastIndexOf('/')),
								overwrite: true,
								quality: 20
							}, function(event) {
								$("#addCirclePhotoBtn").before('<li><img id="public_cancel" class="icon-remove" src="assets/img/cancel.png" /><img class="circle-photo-item" src="' +
									event.target +
									'" /></li>');
								photosCount++;
							}, function() {
								plus.nativeUI.closeWaiting();
								plus.nativeUI.toast("请求出错");
							});
						});
					}
				});
			});
			//删除图片
			$("#publishPhotoList").on('click', '.icon-remove', function() {
				$(this).parent().remove();
				photosCount--;
			});
			//发布班级圈
			$('#publishCircleBtn').on('click', function() {
				var content = $('#pubCircleContent').val();
				//上传图片地址
				var photos = [];
				//返回图片id
				var photosId = [];
				//返回图片地址
				var photosPath = [];
				$('.circle-photo-item').each(function() {
					photos.push($(this).attr('src'));
				});
				var i = 0,
					length = photos.length;
				//递归上传图片
				var loop = function(i, callBack) {
					if(i < length) {
						plus.nativeUI.showWaiting('上传中...');
						utils.uploadImage(CURRENT_USER.USER_ID, photos[i], function(data) {
							console.log(data);
							photosId.push(data.pictureId);
							photosPath.push(data.path);
							i++;
							loop(i, callBack);
						});
					} else {
						callBack();
					}
				};
				loop(i, function() {
					var classId;
					//班级id
					if(CURRENT_USER.ROLE == 1) {
						classId = CURRENT_USER.CLASS_ID;
					} else {
						classId = CURRENT_USER.SELECTED_CHILD.CLASS_ID;
					}
					//图片路径
					var paths = photosPath.length > 0 ? photosPath.toString() : "";
					//图片id
					var imgIds = photosId.length > 0 ? photosId.toString() : "";
					//上传班级圈
					//等待窗口
					if ($.trim(content) == "") {
						if (paths=="") {
							plus.nativeUI.toast('发布内容不能为空');
							return;
						}
					}
					for ( var i = 0; i < content.length; i++) {  
				        var hs = content.charCodeAt(i);  
				        if (0xd800 <= hs && hs <= 0xdbff) {  
				            if (content.length > 1) {  
				                var ls = content.charCodeAt(i + 1);  
				                var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;  
				                if (0x1d000 <= uc && uc <= 0x1f77f) {  
				                	plus.nativeUI.toast("不能输入emoji表情!");
				                    return;  
				                }  
				            }  
				        } else if (content.length > 1) {  
				            var ls = content.charCodeAt(i + 1);  
				            if (ls == 0x20e3) {  
				            	plus.nativeUI.toast("不能输入emoji表情!");
				                return;  
				            }  
				        } else {  
				            if (0x2100 <= hs && hs <= 0x27ff) {  
				            	plus.nativeUI.toast("不能输入emoji表情!");
				                return;  
				            } else if (0x2B05 <= hs && hs <= 0x2b07) {  
				            	plus.nativeUI.toast("不能输入emoji表情!");
				                return;  
				            } else if (0x2934 <= hs && hs <= 0x2935) {  
				            	plus.nativeUI.toast("不能输入emoji表情!");
				                return;  
				            } else if (0x3297 <= hs && hs <= 0x3299) {  
				            	plus.nativeUI.toast("不能输入emoji表情!");
				                return;  
				            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030  
				                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b  
				                    || hs == 0x2b50) {  
				                    	plus.nativeUI.toast("不能输入emoji表情!");
				                return;  
				            }  
				        }  
				    }
					if(content=="" && paths==""){
					 plus.nativeUI.toast('发布内容不能为空');
					 return;
				    }
					njyy_data.addClassMessage(content, CURRENT_USER.USER_ID, classId, paths, imgIds, function(data) {
						plus.nativeUI.closeWaiting();
						if(data.SystemCode == 1) {
							plus.nativeUI.toast('发布成功');
							$.router.back();
						} else {
							plus.nativeUI.toast('发布失败,请稍后再试');
						}
					});
				});
			});
		});
		/**
		 *页面：食堂菜谱查询
		 *事件：页面加载
		 *创建/修改：wll
		 *时间：2017/1/15 13:41
		 */
		$DOCUMENT.on("pageInit", "#canteen", function(e, pageId, $page) {
			var userId = CURRENT_USER.USER_ID;
			var ORG_ID = CURRENT_USER.ORG_ID;
			var role = CURRENT_USER.ROLE;
			var recipesDate=utils.getNowFormatDate();//获取当前日期
			if(role == 1) {
				studentId = 0
			} else {
				studentId = CURRENT_USER.SELECTED_CHILD.STUDENT_ID;
			}
			var calData = {
				work: [],
				personal: []
			}; 
			var selectDate;
			var vm = new Vue({
				el: '#canteen',
				data: {
				show:false,
				showTop:true,
				items:[],
				selecttime:{},
				showContent:false
				},
				methods: {
					choose: function(){
						this.show ? this.show = false : this.show = true;
						this.showTop ? this.showTop = false : this.showTop = true;
					},
					chooseLike:function(item){
						var STATUS = item.status;
					    njyy_data.thumbsUp(CURRENT_USER.USER_ID,item.recipes_INFO_ID,STATUS,selectDate,function(data) { 
					     item.status = data.result;
						 if(data.result == 1) {
								plus.nativeUI.toast("点赞成功");
								$("#like" + item.recipes_INFO_ID).attr("src", "assets/img/canteen/Like.png");
							} else if(data.result == 0) {
								$("#like" + item.recipes_INFO_ID).attr("src", "assets/img/canteen/unLike.png");
								plus.nativeUI.toast("取消点赞");
						}
						});
					}
				}
				,
				components: {
					'v-bar': vBar1
				}
			});
			var calendar = $("#calentime").zcalendar({
				onCompleted: function() { //初始化
				 njyy_data.getCanteenList(role,recipesDate,studentId,function(data) {
				 	console.log(JSON.stringify(data))
				 	 if(data.SystemCode && data.SystemCode==1){
					 	vm.items=data.recipesList;
					 }
					});
				},
				onSwipeLeft: function() { //左滑滑动
					
				},
				onSwipeRight: function() {//向右滑动
					
				},
				onSelected: function(date) {
					var selectedtime = [];
					selectedtime.push((new Date(date)).getFullYear())
					selectedtime.push((new Date(date)).getMonth()+1)
					selectedtime.push((new Date(date)).getDate())
					if(selectedtime[1] < 10) {
						var month = "0" + selectedtime[1];
					} else {
						var month = selectedtime[1];
					}
					if(selectedtime[2] < 10) {
						var day = "0" + selectedtime[2];
					} else {
						var day = selectedtime[2];
					}
				    var selectT = selectedtime[0] + "-" + month + "-" + day;
				    selectDate=selectT;
				    vm.selecttime = selectT;
					njyy_data.getCanteenList(role,selectT,userId,studentId,function(data) {
						console.log(JSON.stringify(data))
					 if(data.SystemCode==1){
					 	vm.showContent=true;
					 	vm.items=data.recipesList;
					 }else if(data.SystemCode==10001){
					 	vm.items="";
					 	vm.showContent=false;
					 	plus.nativeUI.toast('没有今日食谱');
					 }else{
					 	plus.nativeUI.toast('请求出错');
					 }
					 
					});
				}
			});
		});

		/**
		 *页面：公告查询界面
		 *事件：页面加载
		 *创建/修改：李路丹
		 *时间：2016/6/13 10：24
		 */
		$DOCUMENT.on("pageInit", "#notice", function(e, pageId, $page) {
			var role = CURRENT_USER.ROLE;
			var nextUrl = 10001;
			var loading = false;
			var vm = new Vue({
				el: '#notice',
				data: {
					messageList: [],
					nginx: NGINX_PATH,
					imgPath: njyy_config_picture
				},
				methods: {
					getTimeTip: utils.getTimeTip,
					href: function(item) {
						var pp = item.NO_ID;
						$.router.loadPage({
							url: "notice-detail.html?id=" + pp,
							noAnimation: true,
							replace: false
						});
					}
				},
				components: {
					'v-bar': vBar,
					'v-nav': vNav
				}
			});
			getNoticeList();
			//下拉刷新
			$('#notice').on('refresh', '.pull-to-refresh-content', function(e) {
				getNoticeList(true);
			});

			//上拉加载
			$('#notice').on('infinite', '.infinite-scroll', function() {
				// 如果正在加载，则退出
				if(loading) return;
				loading = true;
//				$('#notice .infinite-scroll-preloader').html('已经到底了...');
				if(nextUrl == 10001) {
					loading = false;
					$('#notice .infinite-scroll-preloader').html('已经到底了...');
				} else {
					$('#notice .infinite-scroll-preloader').html('<div class="preloader"></div>');
					njyy_data.getNotice(role, function(data) {
						console.log(JSON.stringify(data))
						if(data.SystemCode == 1) {
							nextUrl = data.nextUrl;
							vm.messageList = vm.messageList.concat(data.messageList);
						} else {
							plus.nativeUI.toast('请求出错');
						}
						loading = false;
					}, nextUrl);
				}
			});

			//初始化消息列表
			function getNoticeList(isRefresh) {
				isRefresh = isRefresh || false;
				njyy_data.getNotice(role, function(data) {
					if(data.SystemCode == 1) {
						nextUrl = data.nextUrl;
						vm.messageList = data.messageList;
						$('#notice .infinite-scroll-preloader').html('');
					} else if(data.SystemCode == 30003) {
						vm.messageList = []
						plus.nativeUI.toast('没有公告记录');
					} else {
						plus.nativeUI.toast("请求出错");
					}
					$.pullToRefreshDone('#notice .pull-to-refresh-content');
				});
			}
			
			
			

			
			
			
			
			
			
			
			
			
			
			
			
			
		});
		/**
		 *页面：公告详情页面
		 *事件：页面加载
		 *创建/修改：李路丹
		 *时间：2016/6/13 10：24
		 */
		$DOCUMENT.on("pageInit", "#notice-detail", function(e, pageId, $page) {
			var id = utils.getId();
			var data = {};
			var example1 = new Vue({
				el: '#notice-detail',
				data: {

					pp: data,
					imgPath: njyy_config_picture
				},
				methods: {
					getTimeTip: utils.getTimeTip
				},
				components: {
					'v-bar': vBar,
					'v-nav': vNav
				}
			})
			njyy_data.getNoticeDetail(id, function(data) {
				console.log(JSON.stringify(data))
				example1.pp = data;
				example1.pp.no_CONTENT = example1.pp.no_CONTENT.replace(/\n/g, '<br />')
			});

		});

		/**
		 *页面：工作日历
		 *事件：页面加载
		 *创建/修改：wll
		 *时间：2017/1/19
		 */
		$DOCUMENT.on('pageInit', '#page-calendar', function(e, id, page) {
			var userId = CURRENT_USER.USER_ID;
			var ORG_ID = CURRENT_USER.ORG_ID;
			var calData = {
				work: [],
				personal: []
			};
			var vm = new Vue({
				el: '#page-calendar',
				data: {
					contents: calData,
					nowtime: utils.getNowFormatDate,
					selecttime: {},
					timelist: [],
					workDate:"",
					show:''
				},
				components: {
					'v-bar': vBar1
				}
			});
			var calendar = $("#calentime").zcalendar({
				onCompleted: function() { //初始化
					njyy_data.Calendarlist(vm.selecttime, userId, ORG_ID,function(data) {
						if (data.calList == undefined) {
							return
						}
						for(var i = 0; i < data.calList.length; i++) {
							calendar.changeTag(data.calList[i].timeStemp, data.calList[i].content);
						}
					});
				},
				onSwipeLeft: function() { //左滑滑动
					njyy_data.Calendarlist(vm.selecttime, userId, ORG_ID,function(data) {
						if (data.calList == undefined) {
							return
						}
						for(var i = 0; i < data.calList.length; i++) {
							calendar.changeTag(data.calList[i].timeStemp, data.calList[i].content);
						}
					});
				},
				onSwipeRight: function() {//向右滑动
					njyy_data.Calendarlist(vm.selecttime, userId, ORG_ID,function(data) {
						if (data.calList == undefined) {
							return
						}
						for(var i = 0; i < data.calList.length; i++) {
							calendar.changeTag(data.calList[i].timeStemp, data.calList[i].content);
						}
					});
				},
				onSelected: function(date) {
					console.log(date)
					var selectedtime = date.toLocaleDateString().split("/");
					console.log(JSON.stringify(selectedtime))
					
					
					var selectedtime = [];
					selectedtime.push((new Date(date)).getFullYear())
					selectedtime.push((new Date(date)).getMonth()+1)
					selectedtime.push((new Date(date)).getDate())
					vm.show=false;
					if(selectedtime[1] < 10) {
						var month = "0" + selectedtime[1];
					} else {
						var month = selectedtime[1];
					}
					if(selectedtime[2] < 10) {
						var day = "0" + selectedtime[2];
					} else {
						var day = selectedtime[2];
					}
				    var selectT = selectedtime[0] + "-" + month + "-" + day;
//				    var selectT = selectedtime[0];
					vm.selecttime = selectT;
					vm.workDate = getDate(selectT);
					njyy_data.Calendarlist(vm.selecttime, userId,ORG_ID, function(data) {
						console.log(JSON.stringify(data))
						vm.contents.personal = [];
						if (data.calList == undefined) {
							return
						}
						for(var i = 0; i < data.calList.length; i++) {
							if(data.calList[i].plan_DATE == selectT) {
								vm.show=true;
								calData.personal.push(data.calList[i]);

							}
							calendar.changeTag(data.calList[i].timeStemp, data.calList[i].content);
						}
						vm.contents = calData;
					});
				}
			});
			$("#addmeno").on("click", function() {
				$.router.loadPage({
					url: "scheduleAdd.html?time=" + vm.selecttime,
					noAnimation: true,
					replace: false
				});

			});
			function getDate(date) {//截取时间控件
		        var workMonth=date.substring(5,7);
		         var workData=date.substring(8,10);
		        var seperator = "月";
		        var seperator1 = "日";
		        var currentdate = workMonth + seperator + workData+seperator1;
		        return currentdate;
		   }
		});

		/**
		 *页面：新增个人事件
		 *事件：页面加载
		 *创建/修改：王为娟
		 *时间：2016/6/6 11：00
		 */
		$DOCUMENT.on('pageInit', '#add-schedule', function(e, id, page) {
			var nowtime = utils.getQueryString('time');
			new Vue({
				el: '#add-schedule',
				components: {
					'v-bar': vBar
				}
			});
			var USER_ID = CURRENT_USER.USER_ID;
			$("#USER_ID").val(USER_ID);
			$('#sched-add-complete').click(function() {
				var options = $("#CALENDAR_TYPE option:selected"); //获取选中的项
				var CALENDAR_TYPE = options.val(); //拿到选中项的值 
				var TITLE = $("#TITLE").val();
				var MEN_TIME = $("#MEN_TIME").val();
				var contentmeno = $("#contentmeno").val();
				if (TITLE == "") {
					plus.nativeUI.toast("请填写标题");
					return;
				}
				if(contentmeno == "") {
					plus.nativeUI.toast("请填写备注");
					return;
				}
				if (MEN_TIME == "") {
					plus.nativeUI.toast("请选择时间");
					return;
				}
				if ($.trim(contentmeno) == "") {
					plus.nativeUI.toast("请填写备注");
					return;
				}
				if($.trim(TITLE) == "") {//判断是空格
					plus.nativeUI.toast("请填写标题");
					return;
				}
				njyy_data.addCalendar(TITLE,MEN_TIME, contentmeno, nowtime, USER_ID, CALENDAR_TYPE, function(data) {
					console.log(JSON.stringify(data))
					if (data.SystemCode == 1) {
						$.router.back();
					}
				});
			});

		});
		/**
		 *页面：活动展示
		 *事件：页面加载
		 *创建/修改：刘有
		 *时间：2016/6/13 14:37
		 */
		$DOCUMENT.on('pageInit', '#page-timetable', function(e, id, page) {
			var schoolTimeable = [];
			var classId = CURRENT_USER.SELECTED_CHILD.CLASS_ID;
			var vm = new Vue({
				el: '#page-timetable',
				data: {
					schoolTimeable: schoolTimeable,
					items: {}
				},
				components: {
					'v-bar': vBar,
					'v-nav': vNav
				}
			});
			njyy_data.selectTimetable(classId, function(data) {
					console.log(JSON.stringify(data))
					if(JSON.stringify(data.detailList) == "{}") {
						plus.nativeUI.toast('暂无活动内容');
					}
					vm.items = data.detailList
			});

		});
		/**
		 *页面：请假列表
		 *事件：页面加载
		 *创建/修改：LILUDAN
		 *时间：2016/6/13 14:37
		 */
		$DOCUMENT.on('pageInit', '#page-list-vacate', function(e, id, page) {
			var roleId = CURRENT_USER.ROLE
			var classId;
			if(roleId == 1) {
				classId = CURRENT_USER.CLASS_ID
			} else {
				classId = CURRENT_USER.SELECTED_CHILD.CLASS_ID;
			}
			var userId = CURRENT_USER.USER_ID;
			var nextUrl = 10001;
			var loading = false;
			var vm = new Vue({
				el: '#page-list-vacate',
				data: {
					vacatList: [],
					nginx: NGINX_PATH
				},
				methods: {
					getTimeTip: utils.getTimeTip,
					vacationMd5: function(code) {
						console.log("code:"+code)
						$.router.loadPage({
							url: "vacation-detail.html?id=" + code,
							noAnimation: true,
							replace: false
						})
					}
				},
				components: {
					'v-bar': vBar,
					'v-nav': vNav
				}
			});
			getVacationList();
			//下拉刷新
			$('#page-list-vacate').on('refresh', '.pull-to-refresh-content', function(e) {
				setTimeout(function() {
				    getVacationList(true);
				    $.pullToRefreshDone('.pull-to-refresh-content');
				}, 2000);
			});

			//上拉加载
			$('#page-list-vacate').on('infinite', '.infinite-scroll', function() {
				// 如果正在加载，则退出
				if(loading) return;
				loading = true;
				if(nextUrl == 10001) {
					loading = false;
					$('#page-list-vacate .infinite-scroll-preloader').html('已经到底了...');
				} else {
					$('#page-list-vacate .infinite-scroll-preloader').html('<div class="preloader"></div>');
					njyy_data.getVacationStudentList(userId, classId, roleId, function(data) {
						if(data.SystemCode == 1) {
							nextUrl = data.nextUrl;
							vm.vacatList = vm.vacatList.concat(data.vacateList);
						} else {
							plus.nativeUI.toast('请求出错');
						}
						loading = false;
					}, nextUrl);
				}
			});

			//初始化消息列表
			function getVacationList(isRefresh) {
				isRefresh = isRefresh || false;
				njyy_data.getVacationStudentList(userId, classId, roleId, function(data) {
					console.log("请假列表"+JSON.stringify(data))
					if(data.SystemCode == 1) {
						nextUrl = data.nextUrl;
						vm.vacatList = data.vacateList;
						$('#page-list-vacate .infinite-scroll-preloader').html('');
					} else if(data.SystemCode == 10001) {
						plus.nativeUI.toast('没有请假记录');
						vm.vacatList = [];
					} else {
						plus.nativeUI.toast("请求出错");
					}
					$.pullToRefreshDone('#page-list-vacate .pull-to-refresh-content');
				});
			}
		});
		/**
		 *页面：请假申请页面
		 *事件：页面加载
		 *创建/修改：王乐乐
		 *时间：2016/6/13 14:37
		 */
		$DOCUMENT.on('pageInit', '#page-vacation', function(e, id, page) {
			var checked = [];
			$("#vacatename").val(CURRENT_USER.NAME);
			$("#personname").val(CURRENT_USER.NAME);
			var role = CURRENT_USER.ROLE;
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours();
			var minute = date.getMinutes();
			var chooseDate = year + '-' + p(month) + '-' + p(day) + " " + p(hour) + ':' + p(minute)
			$("#startime").val(chooseDate);
			$("#endtime").val(chooseDate);

			function p(s) {
				return s < 10 ? '0' + s : s;
			}
			//开始时间选择
			$("#startime").datetimePicker({
				toolbarTemplate: '<header class="bar bar-nav">\
		      <button class="button button-link pull-right close-picker">确定</button>\
		      <h1 class="title">请选择时间</h1>\
		      </header>'
			});
			//结束时间
			$("#endtime").datetimePicker({
				toolbarTemplate: '<header class="bar bar-nav">\
		      <button class="button button-link pull-right close-picker">确定</button>\
		      <h1 class="title">请选择时间</h1>\
		      </header>'
			});
			var data = {};
			var inputtype = $("#vacat-t").data('type');
			var flag;
			var vm = new Vue({
				el: '#page-vacation',
				data: {
					vacatetype: data,
					greeting: greeting,
					acttype: {},
					nodeList: [],
					actList: [],
					leaveList: [],
					name: '',
					chooseindex: 0,
					actId: [],
					uploadPics: []
				},
				methods: {
					vacatherf: function() {
						this.name = '';
						$(".custom-dialog").show();

					},
					chooseherf: function(name, id) {
						$(".custom-dialog").hide();
						var checkbox = $(".vacat-choose li");
						var chindex = vm.chooseindex + 1;
						if(checkbox.length === chindex) {
							checkbox[vm.chooseindex].innerHTML = '<div class="accept-bg">' + '<span>' + name.substring(0, 1) + '</span>' + '</div>' + '<a text="1" id="' + vm.actId + '" class="' + id + '">' + name + '</a>';
						} else {
							checkbox[vm.chooseindex].innerHTML = '<div class="accept-bg">' + '<span>' + name.substring(0, 1) + '</span>' + '</div>' + '<a text="0" id="' + vm.actId + '" class="' + id + '">' + name + '</a>';
						}

					},
					removeThisPic: function(picPosition) {
						this.uploadPics.splice(picPosition, 1)
						photosCount--;
					}
				},
				components: {
					'v-bar': vBar
				}
			});
			/*选择请假类型*/
			//调请假类型枚举接口
			vacateType();
			$("#vacat-t").click(function(event) { //传递参数event时间防止时间冒泡
				if ($("#vacation-cho").is(":hidden")) {
					$("#vacation-cho").slideDown("show");
				} else {
					$("#vacation-cho").slideUp("hide");
				}
				event.stopPropagation();
			});
			$("#page-vacation").bind("click", function(event) {
				$("#vacation-cho").slideUp("hide");
				$("#repair-cho").slideUp("hide");

			});
			$DOCUMENT.on('click', '.vacation-type li', function() {
				var inputvalue = $("#vacat-t").val();
				var flag = $(this).children().data("type");
				inputvalue = $(this).children().html();
				$("#vacat-t").val(inputvalue);
				$("#vacat-t").attr("data-type", flag);
				$("#vacation-cho").slideUp("hide");
			});
			//受理人选择ajax调用
			leaveType();
			actType();
			$("#acceptname").click(function(event) { //传递参数event时间防止时间冒泡
				$("#accept-cho").slideDown("show");
				event.stopPropagation();
			});

			$DOCUMENT.on('click', '.accept-type li', function() {
				var inputvalue = $("#acceptname").val();
				var flag = $(this).children().data("type");
				inputvalue = $(this).children().html();
				$("#acceptname").val(inputvalue);
				$("#acceptname").attr("data-type", flag);
				$("#accept-cho").slideUp("hide");
				var acttype = $("#acceptname").val();
				acttype = parseInt($("#acceptname").data('type'), 10);
				//选择受理人
				njyy_data.addnodeQuery(acttype, function(data) {
					if(data.SystemCode == 1) {
						vm.nodeList = data.nodeList;
					}
				});
			});

			//取消选择联系人
			$("#choosecancel").on('click', function() {
				$(".custom-dialog").hide();
			});
			

			//上传请假图片
			var photosCount = 0;
			$('#vacation-upload').click(function() {
				plus.nativeUI.actionSheet({
					cancel: "取消",
					buttons: [{
						title: "从相册选择"
					}, {
						title: "拍照"
					}]
				}, function(event) {
					if(event.index == 1) {

						//调用系统相册
						plus.gallery.pick(function(e) {
							for(var i in e.files) {
								var path = e.files[i];
								plus.zip.compressImage({
									src: path,
									dst: "_downloads/camera/" + path.substring(path.lastIndexOf('/')),
									overwrite: true,
									quality: 20
								}, function(event) {
									if(photosCount < 9) {
										vm.uploadPics.push({ picSrc: event.target })
										photosCount++;
									} else {
										plus.nativeUI.toast("最多选取9张图片");
									}
								}, function() {
									plus.nativeUI.toast("操作失败");
								});
							}
						}, function() {
							plus.nativeUI.toast('取消选择图片');
						}, {
							filter: 'image',
							multiple: true,
							maximum: 9,
							system: false,
							onmaxed: function() {
								plus.nativeUI.toast('最多只能选取9张图片');
							}
						});
					} else if(event.index == 2) {
						utils.getCamera(function(path) {
							plus.zip.compressImage({
								src: path,
								dst: "_downloads/camera/" + path.substring(path.lastIndexOf('/')),
								overwrite: true,
								quality: 20
							}, function(event) {
								if(photosCount < 9) {
									vm.uploadPics.push({ picSrc: event.target })
									photosCount++;
								} else {
									plus.nativeUI.toast("最多选取9张图片");
								}
							}, function() {
								plus.nativeUI.closeWaiting();
								plus.nativeUI.toast("请求出错");
							});
						});
					}
				});
			});
			//删除图片
//			$(".repair-pic").on('click', '.icon-remove', function() {
//
//				$(this).parent().remove();
//				photosCount--;
//			});
			//点击请假提交按钮事件

			$DOCUMENT.off('click', '.confirm-ok').on('click', '.confirm-ok', function() {
				
//				$(".vacat-choose li").each(function(i) {
//					console.log($(this).children("a").attr("class"))
//					return
//					
//					var atcid = $(this).children("a").attr("class");
//					var nodeid = $(this).children("a").attr("id");
//					var isend = $(this).children("a").attr("text");
//					checked.push({
//						ACT_ID: atcid,
//						NODE_ID: nodeid,
//						IS_END: isend
//					});
//				});
				
				if (checked.length<=0) {
					checked.push({
						ACT_ID: $(".vacat-choose li").children("a").attr("class"),
						NODE_ID: $(".vacat-choose li").children("a").attr("id"),
						IS_END: $(".vacat-choose li").children("a").attr("text")
					});
				} else {
					checked[0].ACT_ID = $(".vacat-choose li").children("a").attr("class");
					checked[0].NODE_ID = $(".vacat-choose li").children("a").attr("id");
					checked[0].IS_END = $(".vacat-choose li").children("a").attr("text");
				}
				
				if (!checked[0].ACT_ID) {
					plus.nativeUI.toast('请选择受理人');
					return
				}
				
				for(var i in checked) {
					if(checked[i].ACT_ID == "") {
						var actchecked = "";
						plus.nativeUI.toast('请选择受理人');
						return
					}
				}
				
				var reason = $("#reason").val();
				if ($.trim(reason) == "") {
					plus.nativeUI.toast('请填写请假原因');
					return
				}
				if (reason == "") {
					plus.nativeUI.toast('请填写请假原因');
					return
				}
				for ( var i = 0; i < reason.length; i++) {  
			        var hs = reason.charCodeAt(i);  
			        if (0xd800 <= hs && hs <= 0xdbff) {  
			            if (reason.length > 1) {  
			                var ls = reason.charCodeAt(i + 1);  
			                var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;  
			                if (0x1d000 <= uc && uc <= 0x1f77f) {  
			                	plus.nativeUI.toast("不能输入emoji表情!");
			                    return;  
			                }  
			            }  
			        } else if (reason.length > 1) {  
			            var ls = reason.charCodeAt(i + 1);  
			            if (ls == 0x20e3) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            }  
			        } else {  
			            if (0x2100 <= hs && hs <= 0x27ff) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x2B05 <= hs && hs <= 0x2b07) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x2934 <= hs && hs <= 0x2935) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x3297 <= hs && hs <= 0x3299) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030  
			                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b  
			                    || hs == 0x2b50) {  
			                    	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            }  
			        }  
			    }
				var name = $("#vacatename").val();
				var type = $("#vacat-t").val();
				if(type == '') {
					plus.nativeUI.toast("请选择请假类别");
					return
				}
				//var acttype = $("#acceptname").val();
				var str1 = $("#startime").val();
				var str2 = $("#endtime").val();
				var result = utils.getUnixTime(str1, str2);
				if(str1 == str2) {
					result = false
				}
				if(result == true) {
					if(name == "" || type == "" || str1 == "" || str2 == "" || reason == "" || actchecked == "") {
						plus.nativeUI.toast("请填全选项");
						return;
					} else {
						plus.nativeUI.confirm("确定提交请假申请?", function(e) {
							if(e.index == 0) {
								//请假类型
								var type = parseInt($("#vacat-t").data('type'), 10);

								//上传图片地址
								var photos = [];
								//返回图片id
								var photosId = [];
								//返回图片地址
								var photosPath = [];
								$('.repair-item').each(function() {
									photos.push($(this).attr('src'));
								});
								var i = 0,
									length = photos.length;
								//递归上传图片
								var loop = function(i, callBack) {
									if(i < length) {
										plus.nativeUI.showWaiting('图片上传中...');
										utils.uploadImage(CURRENT_USER.USER_ID, photos[i], function(data) {
											console.log(JSON.stringify(data))
											photosId.push(data.pictureId);
											photosPath.push(data.path);
											i++;
											loop(i, callBack);
										});
									} else {
										callBack();
									}
								};
								loop(i, function() {
									//图片路径
									var paths = photosPath.length > 0 ? photosPath.toString() : "";
									//图片id
									var imgIds = photosId.length > 0 ? photosId.toString() : "";
									var vacationobj = {
										"DETAIL_URL": "vacation-information.html",
										"VACATE_TYPE": type,
										"START_TIME": $("#startime").val(),
										"END_TIME": $("#endtime").val(),
										"VACATE_REASON": $("#reason").val(),
										"USER_ID": CURRENT_USER.USER_ID,
										"VACATE_PERSON_ID": CURRENT_USER.USER_ID,
										"VACATE_PERSON_ROLE": CURRENT_USER.ROLE,
										"VACATE_PERSON_NAME": $("#vacatename").val(),
										"PATH": paths,
										"clientvacateNode": checked,
										"roleId": role,
										"CLASS_ID":CURRENT_USER.CLASS_ID
									};
									njyy_data.addVacationMessage(vacationobj, function(data) {
										plus.nativeUI.closeWaiting();
										if(data.SystemCode == 1) {
											$(".confirm-ok").unbind("click");
											plus.nativeUI.toast('新增请假成功');
											$.router.back();
										} else if(data.SystemCode == 10002) {
											plus.nativeUI.toast('请假时间已存在');
										} else {
											$(".confirm-ok").unbind("click");
											plus.nativeUI.toast('发布失败');
										}
									});
								});

							}
						}, "提交", ["确定", "取消"]);
					}
				} else {
					plus.nativeUI.toast("开始时间不能大于或等于结束时间");
					return;
				}

			});

			//请假类型
			function vacateType(role) {
				njyy_data.getVacateType(role, function(data) {
					vm.vacatetype = data.enumsList;
				});
			}
			//受理人选择接口
			function leaveType() {
				njyy_data.getLeaveType(function(data) {
					console.log(JSON.stringify(data))
					vm.leaveList = data.leaveList;
				})
			}
			//联系人列表ajax方法
			function actType() {
				$.ajax({
					type: "get",
					url: url + "/client/vacate/toAct",
					async: true,
					success: function(data) {
						vm.actList = data.actList;

					}
				});
			}
		});
		/**
		 *页面：学生请假申请页面
		 *事件：页面加载
		 *创建/修改：李路丹
		 *时间：2016/6/13 14:37
		 */
		$DOCUMENT.on('pageInit', '#page-vacation-student', function(e, id, page) {
			function getUrlVars() {
				var vars = [],
					hash;
				var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
				for(var i = 0; i < hashes.length; i++) {
					hash = hashes[i].split('=');
					vars.push(hash[0]);
					vars[hash[0]] = hash[1];
				}
				return vars;
			}
			var checked = [];
			$("#vacatename").val(CURRENT_USER.SELECTED_CHILD.STUDENT_NAME);
			$("#personname").val(CURRENT_USER.NAME);
			var role = CURRENT_USER.ROLE;
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours();
			var minute = date.getMinutes();
			var chooseDate = year + '-' + p(month) + '-' + p(day) + " " + p(hour) + ':' + p(minute)
			$("#startime").val(chooseDate);
			$("#endtime").val(chooseDate);

			function p(s) {
				return s < 10 ? '0' + s : s;
			}
			//开始时间选择
			$("#startime").datetimePicker({
				toolbarTemplate: '<header class="bar bar-nav">\
		      <button class="button button-link pull-right close-picker">确定</button>\
		      <h1 class="title">请选择时间</h1>\
		      </header>'
			});
			//结束时间
			$("#endtime").datetimePicker({
				toolbarTemplate: '<header class="bar bar-nav">\
		      <button class="button button-link pull-right close-picker">确定</button>\
		      <h1 class="title">请选择时间</h1>\
		      </header>'
			});
			var data = {};
			var inputtype = $("#vacat-t").data('type');
			var flag;
			var vm = new Vue({
				el: '#page-vacation-student',
				data: {
					vacatetype: data,
					greeting: greeting,
					acttype: {},
					nodeList: [],
					actList: [],
					leaveList: [],
					name: '',
					chooseindex: 0,
					actId: [],
				    uploadPics: []
				},
				methods: {
					removeThisPic: function(picPosition) {
						this.uploadPics.splice(picPosition, 1)
						photosCount--;
					}
				},
				components: {
					'v-bar': vBar
				}
			});
			/*选择请假类型*/
			//调请假类型枚举接口
			vacateType();
			$("#vacat-t").click(function(event) { //传递参数event时间防止时间冒泡
				if ($("#vacation-cho").is(":hidden")) {
					$("#vacation-cho").slideDown("show");
				} else {
					$("#vacation-cho").slideUp("hide");
				}
				event.stopPropagation();
			});
			$("#page-vacation").bind("click", function(event) {
				$("#vacation-cho").slideUp("hide");
				$("#repair-cho").slideUp("hide");

			});
			$DOCUMENT.on('click', '.vacation-type li', function() {
				var inputvalue = $("#vacat-t").val();
				var flag = $(this).children().data("type");
				inputvalue = $(this).children().html();
				$("#vacat-t").val(inputvalue);
				$("#vacat-t").attr("data-type", flag);
				$("#vacation-cho").slideUp("hide");
			});
			$("#vacation-cho").click(function(event) {
//				event.stopPropagation();
				$("#vacation-cho").slideUp("hide");
			});
			$("#acceptname").click(function(event) { //传递参数event时间防止时间冒泡
				$("#accept-cho").slideDown("show");
				event.stopPropagation();
			});
			//上传请假图片
			var photosCount = 0;
			$('#vacation-upload').click(function() {
				plus.nativeUI.actionSheet({
					cancel: "取消",
					buttons: [{
						title: "从相册选择"
					}, {
						title: "拍照"
					}]
				}, function(event) {
					if(event.index == 1) {

						//调用系统相册
						plus.gallery.pick(function(e) {
							for(var i in e.files) {
								var path = e.files[i];
								plus.zip.compressImage({
									src: path,
									dst: "_downloads/camera/" + path.substring(path.lastIndexOf('/')),
									overwrite: true,
									quality: 20
								}, function(event) {
								if(photosCount < 9) {
									vm.uploadPics.push({ picSrc: event.target })
									photosCount++;
								} else {
									plus.nativeUI.toast("最多选取9张图片");
								}
								}, function() {
									plus.nativeUI.toast("操作失败");
								});
							}
						}, function() {
							plus.nativeUI.toast('取消选择图片');
						}, {
							filter: 'image',
							multiple: true,
							maximum: 9,
							system: false,
							onmaxed: function() {
								plus.nativeUI.toast('最多只能选取9张图片');
							}
						});
					} else if(event.index == 2) {
						utils.getCamera(function(path) {
							plus.zip.compressImage({
								src: path,
								dst: "_downloads/camera/" + path.substring(path.lastIndexOf('/')),
								overwrite: true,
								quality: 20
							}, function(event) {
								if(photosCount < 9) {
										vm.uploadPics.push({ picSrc: event.target })
										photosCount++;
									} else {
										plus.nativeUI.toast("最多选取9张图片");
									}
							}, function() {
								plus.nativeUI.closeWaiting();
								plus.nativeUI.toast("请求出错");
							});
						});
					}
				});
			});
			//点击请假提交按钮事件

			$DOCUMENT.off('click', '.confirm-ok').on('click', '.confirm-ok', function() {
				$(".vacat-choose li").each(function(i) {
					var atcid = $(this).children("a").attr("class");
					var nodeid = $(this).children("a").attr("id");
					var isend = $(this).children("a").attr("text");
					checked.push({
						ACT_ID: atcid,
						NODE_ID: nodeid,
						IS_END: isend
					});
				});
				for(var i in checked) {
					if(checked[i].ACT_ID == "") {
						var actchecked = "";
					}

				}
				var reason = $("#reason").val();
				if (reason == '') {
					plus.nativeUI.toast("请填写请假原因");
					return
				}
				if ($.trim(reason) == "") {
					plus.nativeUI.toast("请填写请假原因");
					return
				}
				for ( var i = 0; i < reason.length; i++) {  
			        var hs = reason.charCodeAt(i);  
			        if (0xd800 <= hs && hs <= 0xdbff) {  
			            if (reason.length > 1) {  
			                var ls = reason.charCodeAt(i + 1);  
			                var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;  
			                if (0x1d000 <= uc && uc <= 0x1f77f) {  
			                	plus.nativeUI.toast("不能输入emoji表情!");
			                    return;  
			                }  
			            }  
			        } else if (reason.length > 1) {  
			            var ls = reason.charCodeAt(i + 1);  
			            if (ls == 0x20e3) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            }  
			        } else {  
			            if (0x2100 <= hs && hs <= 0x27ff) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x2B05 <= hs && hs <= 0x2b07) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x2934 <= hs && hs <= 0x2935) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x3297 <= hs && hs <= 0x3299) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030  
			                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b  
			                    || hs == 0x2b50) {  
			                    	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            }  
			        }  
			    }
				var name = $("#vacatename").val();
				var type = $("#vacat-t").val();
				if (type == '') {
					plus.nativeUI.toast("请选择请假类别");
					return
				}
				if ( $.trim(type) == "") {
					plus.nativeUI.toast("请选择请假类别");
					return
				}
				//var acttype = $("#acceptname").val();
				var str1 = $("#startime").val();
				var str2 = $("#endtime").val();
				var result = utils.getUnixTime(str1, str2);
				if(result == true) {
					if(name == "" || type == "" || str1 == "" || str2 == "" || reason == "" || actchecked == "") {
						plus.nativeUI.toast("请填全选项");
						return;
					} else {
						plus.nativeUI.confirm("确定提交请假申请?", function(e) {
							if(e.index == 0) {
								//请假类型
								var type = parseInt($("#vacat-t").data('type'), 10);

								//上传图片地址
								var photos = [];
								//返回图片id
								var photosId = [];
								//返回图片地址
								var photosPath = [];
								$('.repair-item').each(function() {
									photos.push($(this).attr('src'));
								});
								var i = 0,
									length = photos.length;
								//递归上传图片
								var loop = function(i, callBack) {
									if(i < length) {
										//等待窗口
								        plus.nativeUI.showWaiting('图片上传中...');
										utils.uploadImage(CURRENT_USER.USER_ID, photos[i], function(data) {
											console.log(JSON.stringify(data));
											photosId.push(data.pictureId);
											photosPath.push(data.path);
											i++;
											loop(i, callBack);
										});
									} else {
										callBack();
									}
								};
								loop(i, function() {
									//图片路径
									var paths = photosPath.length > 0 ? photosPath.toString() : "";
									//图片id
									var imgIds = photosId.length > 0 ? photosId.toString() : "";
									var vacationobj = {
										"DETAIL_URL": "vacation-information.html",
										"VACATE_TYPE": type,
										"START_TIME": $("#startime").val(),
										"END_TIME": $("#endtime").val(),
										"VACATE_REASON": $("#reason").val(),
										"USER_ID": CURRENT_USER.USER_ID,
										"VACATE_PERSON_ID": CURRENT_USER.SELECTED_CHILD.STUDENT_ID,
										"VACATE_PERSON_ROLE": CURRENT_USER.ROLE,
										"VACATE_PERSON_NAME": $("#vacatename").val(),
										"PATH": paths,
										"clientvacateNode": checked,
										"roleId": role,
										"CLASS_ID": CURRENT_USER.SELECTED_CHILD.CLASS_ID,
										"CLASS_NAME": CURRENT_USER.SELECTED_CHILD.CLASS_NAME
									};
									njyy_data.addVacationMessageStudent(vacationobj, function(data) {
										console.log("学生提交请假"+JSON.stringify(data))
										plus.nativeUI.closeWaiting();
										if(data.SystemCode == 1) {
											$(".confirm-ok").unbind("click");
											plus.nativeUI.toast('新增请假成功');
											$.router.back();
										} else if(data.SystemCode == 10002) {
											plus.nativeUI.toast('请假时间已存在');
										} else {
											$(".confirm-ok").unbind("click");
											plus.nativeUI.toast('发布失败');
										}
									});
								});

							}
						}, "提交", ["确定", "取消"]);
					}
				} else {
					plus.nativeUI.toast("开始时间不能大于或等于结束时间");
					return;
				}

			});

			//请假类型
			function vacateType() {
				$.ajax({
					type: "get",
					url: url + "/client/vacate/toVacate",
					data: {
						roleId: role
					},
					async: true,
					success: function(data) {
						vm.vacatetype = data.enumsList;

					}
				});
			}
		});
		/**
		 *页面:报修申请页面
		 *事件：页面加载
		 *创建/修改：王乐乐
		 *时间：2016/6/13 14:37
		 */
		$DOCUMENT.on('pageInit', '#page-repair', function(e, id, page) {
			$("#personname").val(CURRENT_USER.NAME);
			var role = CURRENT_USER.ROLE;
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours();
			var minute = date.getMinutes();
			var chooseDate = year + '-' + p(month) + '-' + p(day) + " " + p(hour) + ':' + p(minute)
			$("#startime").val(chooseDate);
			$("#endtime").val(chooseDate);

			function p(s) {
				return s < 10 ? '0' + s : s;
			}

			var data = {};
			var flag;
			var vm = new Vue({
				el: '#page-repair',
				data: {
					vacatetype: data,
					greeting: greeting
				},
				components: {
					'v-bar': vBar
				}
			});

			/*选择报修类别*/
			$(".repair-type li").click(function() {
				var inputvalue = $("#repair-t").val();
				var flag = $(this).children().data("type");
				inputvalue = $(this).children().html();
				$("#repair-t").val(inputvalue);
				$("#repair-t").attr("data-type", flag);
				$("#repair-cho").slideUp("hide");
			});
			$("#repair-t").click(function(event) {
				if ($("#repair-cho").is(":hidden")) {
					$("#repair-cho").slideDown("show");
				} else {
					$("#repair-cho").slideUp("hide");
				}
				event.stopPropagation(); //阻值时间冒泡
			});
			$("#repair-cho").click(function(event) {
				event.stopPropagation(); //阻值时间冒泡
				$("#repair-cho").slideUp("hide");
			});
			

			//上传报修图片		
			var photosCount = 0;
			$("#repair-upload").click(function() {
				plus.nativeUI.actionSheet({
					cancel: "取消",
					buttons: [{
						title: "从相册选择"
					}, {
						title: "拍照"
					}]
				}, function(event) {
					if(event.index == 1) {

						//调用系统相册
						plus.gallery.pick(function(e) {
							for(var i in e.files) {
								var path = e.files[i];
								plus.zip.compressImage({
									src: path,
									dst: "_downloads/camera/" + path.substring(path.lastIndexOf('/')),
									overwrite: true,
									quality: 20
								}, function(event) {
									if(photosCount < 9) {
										$("#repair-upload").siblings(".repair-pic").append('<li><img id="public_cancel" class="icon-remove" src="assets/img/cancel.png" /><img class="repair-item" src="' +
											event.target +
											'" /></li>');
										photosCount++;
									} else {
										plus.nativeUI.toast("最多选取9张图片");
									}
								}, function() {
									plus.nativeUI.toast("操作失败");
								});
							}
						}, function() {
							plus.nativeUI.toast('取消选择图片');
						}, {
							filter: 'image',
							multiple: true,
							maximum: 9,
							system: false,
							onmaxed: function() {
								plus.nativeUI.toast('最多只能选取9张图片');
							}
						});
					} else if(event.index == 2) {
						utils.getCamera(function(path) {
							plus.zip.compressImage({
								src: path,
								dst: "_downloads/camera/" + path.substring(path.lastIndexOf('/')),
								overwrite: true,
								quality: 20
							}, function(event) {
								$("#repair-upload").siblings(".repair-pic").append('<li><img id="public_cancel" class="icon-remove" src="assets/img/cancel.png" /><img class="repair-item" src="' +
									event.target +
									'" /></li>');
							}, function() {
								plus.nativeUI.closeWaiting();
								plus.nativeUI.toast("请求出错");
							});
						});
					}
				});
			});
			//删除图片
			$(".repair-pic").on('click', '.icon-remove', function() {
				$(this).parent().remove();
				photosCount--;
			});
			//点击报修提交按钮事件
			$DOCUMENT.off('click', '.repair-ok').on('click', '.repair-ok', function() {
				var personname = $("#personname").val();
				var classname = $("#classname").val();
				if ($.trim(classname) == "") {
					plus.nativeUI.toast("请填写维修位置");
					return;
				}
				if (classname == '') {
					plus.nativeUI.toast("请填写维修位置");
					return;
				}
				var type = $("#repair-t").val();
				if (type == '') {
					plus.nativeUI.toast("请选择报修类别");
					return;
				}
				var repaircontent = $("#repaircontent").val();
				if ($.trim(repaircontent) == "") {
					plus.nativeUI.toast("请填写描述");
					return;
				}
				if (repaircontent == '') {
					plus.nativeUI.toast("请填写描述");
					return;
				}
				for ( var i = 0; i < repaircontent.length; i++) {  
			        var hs = repaircontent.charCodeAt(i);  
			        if (0xd800 <= hs && hs <= 0xdbff) {  
			            if (repaircontent.length > 1) {  
			                var ls = repaircontent.charCodeAt(i + 1);  
			                var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;  
			                if (0x1d000 <= uc && uc <= 0x1f77f) {  
			                	plus.nativeUI.toast("不能输入emoji表情!");
			                    return;  
			                }  
			            }  
			        } else if (repaircontent.length > 1) {  
			            var ls = repaircontent.charCodeAt(i + 1);  
			            if (ls == 0x20e3) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            }  
			        } else {  
			            if (0x2100 <= hs && hs <= 0x27ff) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x2B05 <= hs && hs <= 0x2b07) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x2934 <= hs && hs <= 0x2935) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x3297 <= hs && hs <= 0x3299) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030  
			                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b  
			                    || hs == 0x2b50) {  
			                    	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            }  
			        }  
			    }
				if(personname == "" || type == "" || classname == "" || $.trim(classname)=="" || repaircontent == "" || $.trim(repaircontent)=="") {
					plus.nativeUI.toast("请填全选项");
					return;
				} else {
					plus.nativeUI.confirm("确定提交报修申请?", function(e) {
						if(e.index == 0) {
							var typeTitle = parseInt($("#repair-t").data('type'), 10);
							//上传图片地址
							var photos = [];
							//返回图片id
							var photosId = [];
							//返回图片地址
							var photosPath = [];
							$('.repair-item').each(function() {
								photos.push($(this).attr('src'));
							});
							//等待窗口
							if(photos.length > 0) {
								plus.nativeUI.showWaiting('图片上传中...');
							} else {
								plus.nativeUI.showWaiting('正在提交...');
							}
							var i = 0,
								length = photos.length;
							//递归上传图片
							var loop = function(i, callBack) {
								if(i < length) {
									utils.uploadImage(CURRENT_USER.USER_ID, photos[i], function(data) {
										photosId.push(data.pictureId);
										photosPath.push(data.path);
										i++;
										loop(i, callBack);
									});
								} else {
									callBack();
								}
							};
							loop(i, function() {
								//图片路径
								var paths = photosPath.length > 0 ? photosPath.toString() : "";
								//图片id
								var imgIds = photosId.length > 0 ? photosId.toString() : "";
								var repairobj = {
									"DETAIL_URL": "repair-information.html",
									"REPAIR_TYPE": typeTitle,
									"PERSON_NAME": $("#personname").val(),
									"PERSON_ID": CURRENT_USER.USER_ID,
									"CLASS_NAME": $("#classname").val(),
									"REPAIR_REASON": $("#repaircontent").val(),
									"CLASS_ID": CURRENT_USER.CLASS_ID,
									"PATH": paths
								};
								njyy_data.addRepairMessage(repairobj, function(data) {
									plus.nativeUI.closeWaiting();
									if(data.SystemCode == 1) {
										plus.nativeUI.toast('发布报修成功');
										$.router.back();
									} else {
										plus.nativeUI.toast('发布失败,请稍后再试');
									}
								});
							});
						}
					}, "提交", ["确定", "取消"]);
				}

			});

		});

		/*请假申请详情页*/
		$DOCUMENT.on('pageInit', '#page-vacation-information', function(e, id, page) {
			var md5 = utils.getQueryString('id');
			var personid = CURRENT_USER.USER_ID;
			var roleId = CURRENT_USER.ACCEPT_ID;
			var vm = new Vue({
				el: '#page-vacation-information',
				data: {
					vacation: {},
					roleId: roleId,
					flag: {},
					flowList: [],
					flowact: {},
					remark: {},
					bigPic: false,
					bigPicSrc: '',
					nigx:NGINX_PATH
				},
				methods: {
					//返回图片地址数组
					getImagePath: function(path) {
						var arr = [];
						if(path.length > 0 && path.indexOf(',') > -1) {
							arr = path.split(',');
						} else {
							arr.push(path);
						}
						return arr;
					},
					cancleMd5: function(starttime) {
						$.router.back();
					},
					agree: function() {
						njyy_data.getconfEnd(md5, personid, function(data) {
							if(data.SystemCode == 1) {
								plus.nativeUI.toast('确认已阅');
								$.router.back();
							}

						});
					},
					passbtn: function() {
						njyy_data.getcompVacate(md5, personid, function(data) {
							if(data.SystemCode == 1) {
								plus.nativeUI.toast('审核完成');
								$.router.back();
							}
	
						});
					},
					/*
					 * 放大图片
					 */
					enlargePic: function(bigPicSrc) {
						this.bigPicSrc = bigPicSrc;
						this.bigPic = true
					},
					hiddenBigPic: function() {
						this.bigPic = false
					}
				},
				components: {
					'v-bar': vBar
				}
			});
			$("#rebut").click(function() {
				$(".custom-dialog").show();

			});
			$(".cancel").click(function() {
				$(".custom-dialog").hide();
			});

			$("#dialog-ok").click(function() {
				var rebuttext = $("#comment").val();
				if($.trim(rebuttext) == "") {
					plus.nativeUI.toast('请输入驳回理由');
					return;
				}
				if(rebuttext == "") {
					plus.nativeUI.toast('请输入驳回理由');
					return;
				}
				for ( var i = 0; i < rebuttext.length; i++) {  
			        var hs = rebuttext.charCodeAt(i);  
			        if (0xd800 <= hs && hs <= 0xdbff) {  
			            if (rebuttext.length > 1) {  
			                var ls = rebuttext.charCodeAt(i + 1);  
			                var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;  
			                if (0x1d000 <= uc && uc <= 0x1f77f) {  
			                	plus.nativeUI.toast("不能输入emoji表情!");
			                    return;  
			                }  
			            }  
			        } else if (rebuttext.length > 1) {  
			            var ls = rebuttext.charCodeAt(i + 1);  
			            if (ls == 0x20e3) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            }  
			        } else {  
			            if (0x2100 <= hs && hs <= 0x27ff) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x2B05 <= hs && hs <= 0x2b07) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x2934 <= hs && hs <= 0x2935) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x3297 <= hs && hs <= 0x3299) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030  
			                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b  
			                    || hs == 0x2b50) {  
			                    	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            }  
			        }  
			    }
				njyy_data.getrefuse(md5, personid, rebuttext, function(data) {
					if(data.SystemCode == 1) {
						plus.nativeUI.toast('驳回成功');
						$.router.back();
					}
				});
			});
			//获取详情
			njyy_data.getVacationDetail(md5, personid, function(data) {
				console.log(JSON.stringify(data))
				vm.flag = data.flag;
				vm.vacation = data;
				vm.flowList = data.flowList;
				var flowlistlength = data.flowList.length - 1;
				// 这句报错了
				vm.remark = JSON.parse(data.flowList[flowlistlength].REMARK);
				vm.flowact = data.flowList[flowlistlength].ACTION;
				if(data.flowList[flowlistlength].ACTION == 5 && data.flag == 1) {
					$(".canclevat").show();
					$(".repairactbtn").css("display", "none");
				}

			});
			function getclickevent() {
				alert('haha')
			}
			plus.key.addEventListener('backbutton', function() {
				var lightboxmark = $('#lightboxOverlay')
				var lightboxcontent = $('#lightbox')
				if (!lightboxmark.is(':hidden') && !lightboxcontent.is(':hidden')) {
					lightboxmark.hide()
					lightboxcontent.hide()
				}
			}, false)
		});
		/*学生请假详情页*/
		$DOCUMENT.on('pageInit', '#page-vacation-detail', function(e, id, page) {
			var nowData = utils.getNowFormatDate();
			var md5 = utils.getQueryString('id');
			var roleId = CURRENT_USER.ROLE;
			var vm = new Vue({
				el: '#page-vacation-detail',
				data: {
					roleId: roleId,
					vacation: [],
					bigPic: false,
					bigPicSrc: '',
					nginx:NGINX_PATH,
					cancelBtn: true
				},
				methods: {	//返回图片地址数组
					getImagePath: function(path) {
						var arr = [];
						if(path.length > 0 && path.indexOf(',') > -1) {
							arr = path.split(',');
						} else {
							arr.push(path);
						}
						console.log("this.nigx:"+this.nigx+", "+JSON.stringify(arr))
						return arr;
					},
					MD5: function(CODE) {
						njyy_data.getcancelVac(CODE, nowData, function(data) {
							console.log(JSON.stringify(data))
							if(data.SystemCode == 1) {
								plus.nativeUI.toast('撤销成功');
								$.router.back()	
							} else {
								plus.nativeUI.toast('撤销出错');
							}
						});
					},
					/*
					 * 放大图片
					 */
					enlargePic: function(bigPicSrc) {
						this.bigPicSrc = bigPicSrc;
						this.bigPic = true
					},
					hiddenBigPic: function() {
						this.bigPic = false
					}
				},
				components: {
					'v-bar': vBar
				}
			});
			//获取详情
			njyy_data.getVacationDetailStudent(md5, function(data) {
				console.log(JSON.stringify(data))
				if(data.SystemCode == 1) {
					vm.vacation = data;
					if (data.clientVacateDTO.tag && data.clientVacateDTO.tag == '1') {
						vm.cancelBtn = false
					}
					
				} else if(data.SystemCode == 10001) {
					plus.nativeUI.toast('没有记录');
				} else {
					plus.nativeUI.toast('请求出错');
				}
			});
			plus.key.addEventListener('backbutton', function() {
				var lightboxmark = $('#lightboxOverlay')
				var lightboxcontent = $('#lightbox')
				if (!lightboxmark.is(':hidden') && !lightboxcontent.is(':hidden')) {
					lightboxmark.hide()
					lightboxcontent.hide()
				}
			}, false)
		})

		/*报修申请详情页*/
		$DOCUMENT.on('pageInit', '#page-repair-information', function(e, id, page) {
			var md5 = utils.getId();
			var userId = CURRENT_USER.USER_ID;
			var roleId = CURRENT_USER.DETAIL_ROLE_ID;
			var vm = new Vue({
				el: '#page-repair-information',
				data: {
					role: roleId,
					repair: {},
					imgPath: njyy_config_picture,
					bigPic: false,
					bigPicSrc: '',
					action: 0
				},
				ready: function() {
					console.log(this.role)
				},
				methods: {
					//返回图片地址数组
					getImagePath: function(path) {
						var arr = [];
						if(path.length > 0 && path.indexOf(',') > -1) {
							arr = path.split(',');
						} else {
							arr.push(path);
						}
						return arr;
					},
					goBack:function(){
						$.router.replacePage({
							url:"page-myapply.html",
							noAnimation: true,
							replace: false
						}	
						);
					},
					/*
					 * 放大图片
					 */
					enlargePic: function(bigPicSrc) {
						this.bigPicSrc = this.imgPath + bigPicSrc;
						this.bigPic = true
					},
					hiddenBigPic: function() {
						this.bigPic = false
					},
					confirmClick: function() {
						if (vm.action == 1) {
							return
						}
						plus.nativeUI.confirm("确定工人完成报修?", function(e) {
							if(e.index == 0) {
								njyy_data.getconfirm(md5, userId, function(data) {
									if(data.SystemCode == 1) {
										plus.nativeUI.toast('提交成功');
										$('#acceptsubbtn').attr("disabled", true);
										$.router.back();
									} else {
										plus.nativeUI.toast('请求失败');
									}
								});
		
							}
						}, "报修提交", ["确定", "取消"]);
					},
					finishedClick: function() {
						if (vm.action == 2) {
							return
						}
						plus.nativeUI.confirm("确定工人完成报修?", function(e) {
							if(e.index == 0) {
								njyy_data.getcompact(md5, userId, function(data) {
									if(data.SystemCode == 1) {
										plus.nativeUI.toast('提交成功');
										$.router.back();
									} else {
										plus.nativeUI.toast('请求失败');
									}
								});
		
							}
						}, "报修提交", ["确定", "取消"]);
					},
					cuiyicui: function() {
						if (vm.action != 0) {
							return
						}
						njyy_data.getUrge(md5, userId, function(data) {			
							if(data.SystemCode == 60001){
								plus.nativeUI.toast('您已经催促成功');
							}else if(data.SystemCode == 60002) {
								plus.nativeUI.toast('催促过于频繁,两小时以后再催促');
							}
						});
					}
				},
				components: {
					'v-bar': vBar
				}
			});
//			$('#hurrybtn').click(function() {
//				njyy_data.getUrge(md5, userId, function(data) {			
//					if(data.SystemCode == 60001){
//						plus.nativeUI.toast('您已经催促成功');
//					}else if(data.SystemCode == 60002) {
//						plus.nativeUI.toast('催促过于频繁,两小时以后再催促');
//					}
//
//				});
//
//			});
			
			plus.key.addEventListener('backbutton', function() {
				var lightboxmark = $('#lightboxOverlay')
				var lightboxcontent = $('#lightbox')
				if (!lightboxmark.is(':hidden') && !lightboxcontent.is(':hidden')) {
					lightboxmark.hide()
					lightboxcontent.hide()
				}
			}, false)

			njyy_data.getRepairDetail(md5, CURRENT_USER.USER_ID, function(data) {
				console.log(JSON.stringify(data))
				vm.repair = data;
				vm.action = data.flowList[0].ACTION;
				if (data.flowList[0].ACTION == 0) {
					if (CURRENT_USER.USER_ID == data.flowList[0].STAFF_ID) {
						document.getElementById("repairsubbtn").style.display = "block";
						document.getElementById("acceptsubbtn").style.display = "none";
					} else {
						document.getElementById("repairsubbtn").style.display = "none";
						document.getElementById("acceptsubbtn").style.display = "block";
					}
					document.getElementById("waiting").style.backgroundColor = "#eee";
					document.getElementById("acceptsubbtn").style.background = "#eee";
				} else if (data.flowList[0].ACTION == 1) {
					document.getElementById("repairsubbtn").style.display = "none";
					document.getElementById("acceptsubbtn").style.display = "none";
					document.getElementById("waiting").style.backgroundColor = "#74d1d9";
					document.getElementById("laststep").style.backgroundColor = "#74d1d9";
				} else {
					if (vm.role == 1003) {
						document.getElementById("repairsubbtn").style.display = "none";
						document.getElementById("acceptsubbtn").style.display = "block";
					} else {
						document.getElementById("repairsubbtn").style.display = "block";
						document.getElementById("acceptsubbtn").style.display = "none";
					}
					document.getElementById("waiting").style.backgroundColor = "#74d1d9";
					document.getElementById("hurrybtn").style.background = "#eee";
					document.getElementById("repairsubbtn").style.background = "#eee";
				}
//				if(data.flowList[0].ACTION == 0) {
//					$('#waiting').css("background-color", "#eee");
//					$('#acceptsubbtn').css("background", "#eee");
//					$("#acceptsubbtn").unbind("click");
//				} else if(data.flowList[0].ACTION == 1) {
//					$('#waiting').css("background-color", "#74d1d9");
//					$('#laststep').css("background-color", "#74d1d9");
//					
//					$('#acceptsubbtn').hide();
//					$('#hurrybtn').hide();
//					$('#repairsubbtn').hide();
//				} else {
//					$('#waiting').css("background-color", "#74d1d9");
//					$('#hurrybtn').css("background", "#eee");
//					$("#hurrybtn").unbind("click");
//					$('#repairsubbtn').css("background", "#eee");
//					$("#repairsubbtn").unbind("click");
//					$("#acceptsubbtn").bind("click");
//				}
//				console.log(vm.hehe)
			});
			/*申请人点击完成按钮*/
//			$('#repairsubbtn').click(function() {
//				plus.nativeUI.confirm("确定工人完成报修?", function(e) {
//					if(e.index == 0) {
//						njyy_data.getcompact(md5, userId, function(data) {
//							if(data.SystemCode == 1) {
//								plus.nativeUI.toast('提交成功');
//								$.router.back();
//							} else {
//								plus.nativeUI.toast('请求失败');
//							}
//						});
//
//					}
//				}, "报修提交", ["确定", "取消"]);
//			});
//			/*受理人点击完成按钮*/
//			$('#acceptsubbtn').click(function() {
//				return
//				plus.nativeUI.confirm("确定工人完成报修?", function(e) {
//					if(e.index == 0) {
//						njyy_data.getconfirm(md5, userId, function(data) {
//							if(data.SystemCode == 1) {
//								plus.nativeUI.toast('提交成功');
//								$('#acceptsubbtn').attr("disabled", true);
//								$.router.back();
//							} else {
//								plus.nativeUI.toast('请求失败');
//							}
//						});
//
//					}
//				}, "报修提交", ["确定", "取消"]);
//			});

		});
		/*我的报修跟我的待办页面*/
		$DOCUMENT.on('pageInit', '#page-myapply', function(e, id, page) {
			var finishLoading = false;
			var repairLoading = false;
			var finishNextUrl = 10001;
			var repairNextUrl = 10001;
			var userId = CURRENT_USER.USER_ID;
			var roleId = CURRENT_USER.DETAIL_ROLE_ID;
			var vm = new Vue({
				el: '#page-myapply',
				data: {
					repairfinishList: [],
					repairList: [],
					role: roleId,
					urgecount: [],
					show:false
				},
				components: {
					'v-bar': vBar
				},
				methods: {
					getTimeTip: utils.getTimeTip,
					finishMd5: function(code) {
						$.router.loadPage({
							url: "repair-information.html?id=" + code,
							noAnimation: true,
							replace: false
						});
					},
					repairMd5: function(code) {
						$.router.loadPage({
							url: "repair-information.html?id=" + code,
							noAnimation: true,
							replace: false
						});
					},
					urgcount: function(count) {
						if(count == 0) {
							return false;
						} else {
							return true;
						}
					}

				}

			});
			document.getElementById("tab2Btn").addEventListener("click", function() {
				njyy_data.getFinishList(userId, function(data) {
					if (data.repairList == undefined) {
						plus.nativeUI.toast("暂无完成报修");
					}
					finishNextUrl = data.nextUrl;
					vm.repairfinishList = data.repairList;
					console.log("tab2刷新"+JSON.stringify(data))
				});
			})
			njyy_data.getRepairList(userId, function(data) {
				if (data.repairList == undefined) {
					plus.nativeUI.toast("暂无待办报修");
				}
				repairNextUrl = data.nextUrl;
				vm.repairList = data.repairList;
				console.log("tab1刷新"+JSON.stringify(data))
			});
			//我的报修完成页面下拉刷新
			$('#icain-refresh').on('refresh', '#tab1', function(e) {
				njyy_data.getRepairList(userId, function(data) {
					repairNextUrl = data.nextUrl;
					if (data.repairList == undefined) {
						plus.nativeUI.toast("暂无待办报修");
					}
					vm.repairList = data.repairList;
				    $.pullToRefreshDone('.pull-to-refresh-content');
				    console.log("tab1刷新"+JSON.stringify(data))
				});
			});
			//我的报修待处理下拉刷新
			$('#icain-refresh').on('refresh', '#tab2', function(e) {
				njyy_data.getFinishList(userId, function(data) {
					finishNextUrl = data.nextUrl;
					if (data.repairList == undefined) {
						plus.nativeUI.toast("暂无完成报修");
					}
					vm.repairfinishList = data.repairList;
				    $.pullToRefreshDone('.pull-to-refresh-content');
				    console.log("tab2刷新"+JSON.stringify(data))
				});	
			});
			//我的报修完成页面上拉加载
			$('#page-myapply').on('infinite', '#tab2', function() {
				// 如果正在加载，则退出
				if(finishLoading) {
					return;
				}
				finishLoading = true;
				if(finishNextUrl !== 10001) {
//					$('#tab2 .infinite-scroll-preloader').html('<div class="preloader"></div>');
					document.getElementById("icain-tab2-loading-more").innerHTML = "正在加载..."
					njyy_data.getFinishList(userId, function(data) {
						console.log(JSON.stringify(data))
						finishNextUrl = data.nextUrl;
						vm.repairfinishList = vm.repairfinishList.concat(data.repairList);
						finishLoading = false;
					}, finishNextUrl);
				} else {
					finishLoading = false;
//					$('#tab2 .infinite-scroll-preloader').html('已经到底了...');
					document.getElementById("icain-tab2-loading-more").innerHTML = "已经到底了..."
				}
			});
			//我的报修待处理上拉加载
			$('#page-myapply').on('infinite', '#tab1', function() {
				// 如果正在加载，则退出
				if(repairLoading) {
					return;
				}
				repairLoading = true;
				if(repairNextUrl !== 10001) {
//					$('#tab1 .infinite-scroll-preloader').html('正在加载...');
					document.getElementById("icain-tab1-loading-more").innerHTML = "正在加载..."
					njyy_data.getRepairList(userId, function(data) {
						repairNextUrl = data.nextUrl;
						vm.repairList = vm.repairList.concat(data.repairList);
						repairLoading = false;
					}, repairNextUrl);
				} else {
					repairLoading = false;
//					$('#tab1 .infinite-scroll-preloader').html('已经到底了...');
					document.getElementById("icain-tab1-loading-more").innerHTML = "已经到底了..."
				}
			});
			var $pubCircleBtn = $('#pubCircleBtn');
			$('#page-myapply .com-tab').find('#tab1Btn').click(function() {
				$pubCircleBtn.show();
			}).end().find('#tab2Btn').click(function() {
				$pubCircleBtn.hide();
			});
		});
		/*请假完成跟我的待办列表页*/
		$DOCUMENT.on('pageInit', '#page-myvacationlist', function(e, id, page) {
			var vacationLoading = false;
			var waitLoading = false;
			var vacationNextUrl = 10001;
			var waitNextUrl = 10001;
			var userId = CURRENT_USER.USER_ID;
			var roleId = CURRENT_USER.ACCEPT_ID;
			var vm = new Vue({
				el: '#page-myvacationlist',
				data: {
					vacationList: [],
					waitList: [],
					role: roleId,
					urgecount: []
				},
				components: {
					'v-bar': vBar
				},
				methods: {
					getTimeTip: utils.getTimeTip,
					waitMd5: function(code) {
						$.router.loadPage({
							url: "vacation-information.html?id=" + code,
							noAnimation: true,
							replace: false
						});
					},
					vacateMd5: function(code) {
						$.router.loadPage({
							url: "vacation-information.html?id=" + code,
							noAnimation: true,
							replace: false
						});
					},
					urgcount: function(count) {
						if(count == 0) {
							return false;
						} else {
							return true;
						}
					}

				}

			});
			njyy_data.getwaitList(userId, function(data) {
					if (data.vacateList == undefined) {
						plus.nativeUI.toast("暂无待办请假");
					}
					waitNextUrl = data.nextUrl;
					vm.waitList = data.vacateList;

				});
			document.getElementById("tab2Btn").addEventListener("click", function() {
				njyy_data.getVacationList(userId, function(data) {
					if (data.vacateList == undefined) {
						plus.nativeUI.toast("暂无完成请假");
					}
					vacationNextUrl = data.nextUrl;
					vm.vacationList = data.vacateList;
	
				});
				
			})
			$('#page-myvacationlist').on('refresh', '#tab1', function() {
				njyy_data.getwaitList(userId, function(data) {
					console.log(JSON.stringify(data))
					if (data.vacateList == undefined) {
						plus.nativeUI.toast("暂无待办请假");
					}
					waitNextUrl = data.nextUrl;
					vm.waitList = data.vacateList;
					$.pullToRefreshDone('.pull-to-refresh-content');
				});
			});
			$('#page-myvacationlist').on('refresh', '#tab2', function() {
				njyy_data.getVacationList(userId, function(data) {
					console.log(JSON.stringify(data))
					if (data.vacateList == undefined) {
						plus.nativeUI.toast("暂无完成请假");
					}
					vacationNextUrl = data.nextUrl;
					vm.vacationList = data.vacateList;
					$.pullToRefreshDone('.pull-to-refresh-content');
				});
			});
			//请假完成页面上拉加载
			$('#page-myvacationlist').on('infinite', '#tab2', function() {
				// 如果正在加载，则退出
				if(vacationLoading) {
					return;
				}
				vacationLoading = true;
				if(vacationNextUrl !== 10001) {
					$('#tab2 .infinite-scroll-preloader').html('<div class="preloader"></div>');
					njyy_data.getVacationList(userId, function(data) {
						vacationNextUrl = data.nextUrl;
						if (data.SystemCode == 10001) {
							vacationNextUrl = 10001
						}
						vm.vacationList = vm.vacationList.concat(data.vacateList);
						vacationLoading = false;
					}, vacationNextUrl);
				} else {
					vacationLoading = false;
					$('#tab2 .infinite-scroll-preloader').html('已经到底了...');
				}
			});
			//我的待办上拉加载
			$('#page-myvacationlist').on('infinite', '#tab1', function() {
				// 如果正在加载，则退出
				if(waitLoading) {
					return;
				}
				waitLoading = true;
				if(waitNextUrl !== 10001) {
					$('#tab1 .infinite-scroll-preloader').html('<div class="preloader"></div>');
					njyy_data.getwaitList(userId, function(data) {
						waitNextUrl = data.nextUrl;
						vm.waitList = vm.waitList.concat(data.vacateList);
						waitLoading = false;
					}, waitNextUrl);
				} else {
					waitLoading = false;
					$('#tab1 .infinite-scroll-preloader').html('已经到底了...');
				}
			});
			var $pubCircleBtn = $('#pubCircleBtn');
			$('#page-myvacationlist .com-tab').find('#tab1Btn').click(function() {
				$pubCircleBtn.show();
			}).end().find('#tab2Btn').click(function() {
				$pubCircleBtn.hide();
			});
		});
			/**
		 *页面：班级点名
		 *事件：页面加载
		 *创建/修改：王乐乐
		 *时间：2016/6/13 14:37
		 */
		$DOCUMENT.on('pageInit', '#page-call', function(e, id, page) {
			var CLASS_ID = CURRENT_USER.CLASS_ID;
			var STU_NAME;
			var STU_ID;
			var resultMap;
			var starDate; //教师给学生请假默认开始时间
			var endDate; //教师给学生请假默认结束时间
			var result;
			var nowDateTime;
			var classId;
			var flag = 0;
			var latestudent = [];
			var studentId = [];
			var allstudent;
			var cal;
			var vacatnum;
			var later = [];
			var vastudent = [];
			var vaId = [];
			var arrivedStu = [];
			var arrivedId = [];
			var num = 0;
			var pp = 0;
			var n = true;
			var num1;
			var num2;
			var nmu3;
			var nowDate = utils.getNowFormatDate(); //获取系统当前时间
			var userId = CURRENT_USER.USER_ID;
			var vm = new Vue({
				el: '#page-call',
				data: {
					allStudent: [],
					calldate: nowDate,
					call: cal,
					late: later,
					valist: [],
					vacatNum: 0,
					nowdate: n,
					stlist: [],
					num1: num1,
					num2: num2,
					num3: nmu3,
					show: false,
					nowTime: 0
				},
				methods: {
					submitOk: function() {
						var remark = document.getElementById("remark").value;
						for ( var i = 0; i < remark.length; i++) {  
				        var hs = remark.charCodeAt(i);  
				        if (0xd800 <= hs && hs <= 0xdbff) {  
				            if (remark.length > 1) {  
				                var ls = remark.charCodeAt(i + 1);  
				                var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;  
				                if (0x1d000 <= uc && uc <= 0x1f77f) {  
				                	plus.nativeUI.toast("不能输入emoji表情!");
				                    return;  
				                }  
				            }  
				        } else if (remark.length > 1) {  
				            var ls = remark.charCodeAt(i + 1);  
				            if (ls == 0x20e3) {  
				            	plus.nativeUI.toast("不能输入emoji表情!");
				                return;  
				            }  
				        } else {  
				            if (0x2100 <= hs && hs <= 0x27ff) {  
				            	plus.nativeUI.toast("不能输入emoji表情!");
				                return;  
				            } else if (0x2B05 <= hs && hs <= 0x2b07) {  
				            	plus.nativeUI.toast("不能输入emoji表情!");
				                return;  
				            } else if (0x2934 <= hs && hs <= 0x2935) {  
				            	plus.nativeUI.toast("不能输入emoji表情!");
				                return;  
				            } else if (0x3297 <= hs && hs <= 0x3299) {  
				            	plus.nativeUI.toast("不能输入emoji表情!");
				                return;  
				            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030  
				                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b  
				                    || hs == 0x2b50) {  
					                    	plus.nativeUI.toast("不能输入emoji表情!");
					                return;  
					            }  
					        }  
					    }
						var vacationobj = {
							"DETAIL_URL": "vacation-information.html",
							"VACATE_TYPE": 1,
							"START_TIME": starDate,
							"END_TIME": endDate,
							"VACATE_REASON": remark,
							"USER_ID": STU_ID,
							"VACATE_PERSON_ID": STU_ID,
							"VACATE_PERSON_ROLE": 2,
							"VACATE_PERSON_NAME": STU_NAME
						};
						njyy_data.addVacationMessageStudent(vacationobj, function(data) {
							if(data.SystemCode == 1) {
								vm.show = false
								plus.nativeUI.toast('请假成功');
								flag++;
								vm.vacatNum = flag;
								vm.allStudent[$(this).data("index")].STATUS = -3;
								latestudent.push(vm.allStudent[$(this).data("index")].STU_NAME);
								studentId.push(vm.allStudent[$(this).data("index")].STU_ID);
							} else if(data.SystemCode == 1002) {
								plus.nativeUI.toast('请假时间已存在');
							} else {
								plus.nativeUI.toast('请假申请失败,请稍后再试.....');
							}

						})
					},
					submitCancle: function() {
						this.show = false
					}

				},
				components: {
					'v-bar': vBar
				}
			});
			function getNowTime() {
				vm.nowTime = (new Date()).getHours()
				console.log(vm.nowTime);
			}
			getNowTime();
			$.ajax({
				type: "get",
				url: url + "/client/rollCall/list?userId=" + userId,
				async: true,
				success: function(data) {
					console.log("班级点名模块:"+JSON.stringify(data))
					classId = data.classId;
					nowDateTime = data.SystemCode;
					if(data.SystemCode == 10002) {
						vm.nowdate = 0;
						$.ajax({
							type: "get",
							url: url + "/client/rollCall/findRecord?classId=" + classId,
							async: true,
							success: function(data) {
								console.log("获取点名列表:"+JSON.stringify(data))
								vm.stlist = data.stuList;
								vm.num1 = data.ABSENCE_NUM;
								vm.num2 = data.VACATE_NUM;
								vm.num3 = data.ARRIVED_STU_NUM;
								vm.$nextTick(function() {
									initCalendar();
								});
							}
						});

					} else {
						resultMap=5;//给result赋值标识
						vm.nowdate = 1;
						vm.allStudent = data.list;
						vm.valist = data.vacateList;
						vm.vacatNum = data.vacateList.length;
						vm.vm = data.vacateList.length;
						vm.$nextTick(function() {
							initCalendar();
						});
					}
				}
			});

			var myDate = new Date();
			var dater = myDate.getDate();
			//日历选择点名日期	
			var initCalendar = function() {
				$("#choosedate").calendar({
					onDayClick: function(p, dayContainer, year, month, day) {
						$("#tab1, #tab2, #tab3").removeClass("active")
						$("#tab1").addClass("active")
						$(".tab-link").removeClass("active")
						$(".tab-link-first").addClass("active")
						console.log(p+", "+dayContainer+", "+year+", "+month+", "+day)
						month++;
						if(month < 10) {
							month = '0' + month.toString();
						}
						if(day < 10) {
							day = '0' + day;
						}
						resultMap="";
						var daydate = year + "-" + month + "-" + day;
						starDate = daydate + " " + "10:00"; //教师给学生请假默认时间开始时间早晨10点
						endDate = daydate + " " + "18:00"; //教师给学生请假默认时间结束晚上10点
						result = utils.getUnixTimeDetail(daydate, nowDate);
						$("#call-h1").html(daydate);
						if(result == true) {
							vm.nowdate = 0;
							$.ajax({
								type: "get",
								url: url + "/client/rollCall/findRecord?time=" + daydate + "&classId=" + classId,
								async: true,
								success: function(data) {
									console.log("1:"+JSON.stringify(data))
									if(!(data.stuList && data.stuList.length>0)) {
										plus.nativeUI.toast('没有点名记录');
									}
									vm.stlist = data.stuList;
									vm.num1 = data.ABSENCE_NUM;
									vm.num2 = data.VACATE_NUM;
									vm.num3 = data.ARRIVED_STU_NUM;
								}
							});
						} else if(result == 1001) { /*1001表示两个日期相等*/
							if(nowDateTime == 10002) {
								vm.nowdate = 0;
								$.ajax({
									type: "get",
									url: url + "/client/rollCall/findRecord?time=" + daydate + "&classId=" + classId,
									async: true,
									success: function(data) {
										console.log("2:"+JSON.stringify(data))
										if(!(data.stuList && data.stuList.length>0)) {
											plus.nativeUI.toast('没有点名记录');
										}
										vm.stlist = data.stuList;
										vm.num1 = data.ABSENCE_NUM;
										vm.num2 = data.VACATE_NUM;
										vm.num3 = data.ARRIVED_STU_NUM;
									}
								});
							} else {
								vm.nowdate = 1;
								vm.call = ''
								$.ajax({
									type: "get",
									url: url + "/client/rollCall/list?userId=" + userId,
									data: {
										time: daydate
									},
									async: true,
									success: function(data) {
										console.log("3:"+JSON.stringify(data))
										if(!(data.list && data.list.length>0)) {
											plus.nativeUI.toast('没有点名记录');
										}
										vm.allStudent = data.list;
										vm.valist = data.vacateList;
										vacatnum= data.vacateList.length;
										vm.vacatNum = data.vacateList.length;
										vm.$nextTick(function() {
											initCalendar();
										});
									}
								})
							}
						} else {
							vm.nowdate = 2;
							$.ajax({
								type: "get",
								url: url + "/client/rollCall/list?userId=" + userId,
								data: {
									time: daydate
								},
								async: true,
								success: function(data) {
									console.log("4:"+JSON.stringify(data))
									if(!(data.list && data.list.length>0)) {
										plus.nativeUI.toast('没有点名记录');
									}
									vm.allStudent = data.list;
									vm.valist = data.vacateList;
									vacatnum= data.vacateList.length;
									vm.vacatNum = data.vacateList.length;
									vm.$nextTick(function() {
										initCalendar();
									});
								}
							})
						}
					},
					maxDate:myDate
				});
				flag = 0
				vm.call = 0
				latestudent = []
				studentId = []
			};

			//未到学生  
			$DOCUMENT.on('click', '.call-list li button', function() {
				if(result == true || result == 1001 || resultMap==5) {
					if(vm.allStudent[$(this).data("index")].STATUS == -1) {
						$(this).html("未到");
						$(this).css("background", "#DF6400");

						flag++;
						vm.call = flag;
						vm.allStudent[$(this).data("index")].STATUS = 0;
						latestudent.push(vm.allStudent[$(this).data("index")].STU_NAME);
						studentId.push(vm.allStudent[$(this).data("index")].STU_ID);
					} else {
						$(this).html("已到");
						$(this).css("background", "#00c7a0");
						flag--;
						vm.call = flag;
						vm.allStudent[$(this).data("index")].STATUS = -1;
						latestudent.pop(vm.allStudent[$(this).data("index")].STU_NAME);
						studentId.pop(vm.allStudent[$(this).data("index")].STU_ID);
					}
				} else {
					if(vm.allStudent[$(this).data("index")].STATUS == -1) {
						STU_NAME = vm.allStudent[$(this).data("index")].STU_NAME;
						STU_ID = vm.allStudent[$(this).data("index")].STU_ID;
						vm.show = true;
					} else {

					}
				}

			});
			//请假学生

			$DOCUMENT.on('click', '.call-vacate li button', function() {
				if(vm.allStudent[$(this).data("index")].STATUS == -1) {
					plus.nativeUI.toast('请到学生请假中撤销请假');
				} else {}

			});
			$DOCUMENT.off('click', '.call-ok').on('click', '.call-ok', function() {
				plus.nativeUI.confirm("确定提交点名?", function(e) {
					if(e.index == 0) {
						for(var i = 0; i < vm.valist.length; i++) {
							if(vm.valist[i].STATUS == -3) {
								vastudent.push(vm.valist[i].STU_NAME);
								vaId.push(vm.valist[i].STU_ID);
							} else if(vm.valist[i].STATUS == -1) {
								num++;
								arrivedId.push(vm.valist[i].STU_ID);
								arrivedStu.push(vm.valist[i].STU_NAME);
							}
						}
						for(var j = 0; j < vm.allStudent.length; j++) {
							if(vm.allStudent[j].STATUS == -1) {
								num++;
								arrivedId.push(vm.allStudent[j].STU_ID);
								arrivedStu.push(vm.allStudent[j].STU_NAME);
							}
						}
						var obj = {
							RC_MASTER_ID: userId,
							ABSENCE_ID: studentId.join(","),
							ABSENCE_NAME: latestudent.join(","),
							ABSENCE_NUM: vm.call,
							VACATE_ID: vaId.join(","),
							VACATE_NAME: vastudent.join(","),
							VACATE_NUM: vm.vacatNum,
							RC_CLASS_ID: classId,
							ARRIVED_STU_ID: arrivedId.join(","),
							ARRIVED_STU_NAME: arrivedStu.join(","),
							ARRIVED_STU_NUM: num + pp
						}
						njyy_data.postOrder(obj, function(data) {
							if(data.SystemCode == 1) {
								plus.nativeUI.toast('提交成功');
								$.router.back();
							} else if (data.SystemCode == 10002) {
								plus.nativeUI.toast('已提交过点名');
								$.router.back();
							} else {
								plus.nativeUI.toast('请求失败');
							}
						});

					}
				}, "点名提交", ["确定", "取消"]);
			});
		});

		/**
		 *页面：消息通知页面
		 *事件：页面加载
		 *创建/修改：左武洲
		 *时间：2016/6/20 9:02
		 */
		$DOCUMENT.on('pageInit', '#page-message', function(e, id, page) {
			var userId = CURRENT_USER.USER_ID;
			var roleId = CURRENT_USER.ROLE;
			var nextUrl = 10001;
			var loading = false;
			var vm = new Vue({
				el: '#page-message',
				data: {
					role: roleId,
					infoList: [],
					host: NGINX_PATH,
					allMessage: {},
					talkList: []
				},
				created: function() {
					if(JSON.parse(plus.storage.getItem("allMessage")) == null) {
						this.allMessage = {}
					} else {
						this.allMessage = JSON.parse(plus.storage.getItem("allMessage"))
					}
					if(JSON.parse(plus.storage.getItem("talkList")) == null) {
						talkList = []
					} else {
						this.talkList = JSON.parse(plus.storage.getItem("talkList"))
						console.log(JSON.stringify(this.talkList))
					}
				},
				methods: {
					getTimeTip: utils.getTimeTip,
					vacateMd5: function(code, url) {
						console.log("code:"+code+", url:"+url)
						$.router.loadPage({
							url: url + "?id=" + code,
							noAnimation: true,
							replace: false
						});
					},
					delete: function(message) {
						njyy_data.deleteMessage(message.MD5CODE, function(data) {
							if(data.SystemCode == 1) {
								vm.infoList.$remove(message);

							} else {
								plus.nativeUI.toast('操作失败');
							}
						});

					},
					sendMessage: function(userInfo) {
						var id = encodeURI(JSON.stringify(userInfo))
						$.router.loadPage({
							url: "chat-icain.html?id="+encodeURI(id),
							noAnimation: true,
							replace: false
						});
					}
				},
				components: {
					'v-bar': vBar,
					'v-nav': vNav,
					'v-messageItem': vMessageItem,
					'v-public': vNavPublic
				}
			});
//			initMessage();
//
//			//轮询请求
//			if(MESSAGE_TIMER == null) {
//				MESSAGE_TIMER = setInterval(function() {
//					initMessage();
//				}, INTERVAL_TIME);
//			}

//			//下拉刷新
//			$('#page-message').on('refresh', '.pull-to-refresh-content', function(e) {
//				initMessage(true);
//			});
//
//			//上拉加载
//			$('#page-message').on('infinite', '.infinite-scroll', function() {
//				// 如果正在加载，则退出vacateMd5
//				if(loading) return;
//				loading = true;
//				if(nextUrl == 10001) {
//					loading = false;
//					$('#page-message .infinite-scroll-preloader').html('已经到底了...');
//				} else {
//					$('#page-message .infinite-scroll-preloader').html('<div class="preloader"></div>');
//					njyy_data.getMessageList(userId, function(data) {
//						if(data.SystemCode == 1) {
//							nextUrl = data.nextUrl;
//							vm.infoList = vm.infoList.concat(data.infoList);
//						} else {
//							plus.nativeUI.toast('请求失败');
//						}
//						loading = false;
//					}, nextUrl);
//				}
//			});

//			//初始化消息列表
//			function initMessage(isRefresh) {
//				isRefresh = isRefresh || false;
//				var currentPageId = document.querySelector('.page-current').getAttribute('id');
//				//为消息页面则请求数据
//				if(currentPageId == "page-message") {
//					njyy_data.getMessageList(userId, function(data) {
//						console.log(JSON.stringify(data))
//						if(data.SystemCode == 1) {
//							nextUrl = data.nextUrl;
//							vm.infoList = data.infoList;
//							$('#page-message .infinite-scroll-preloader').html('');
//							if(isRefresh) {
//								$.pullToRefreshDone('#page-message .pull-to-refresh-content');
//							}
//						} else {
//							plus.nativeUI.toast('请求失败');
//						}
//					});
//				}
//			}
			
			
			
			
			
			
			
						/*聊天开始*/
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
(function(window) {
	Date.prototype.Format = function(fmt)   
	{ //author: meizz   
	  var o = {   
	    "M+" : this.getMonth()+1,                 //月份   
	    "d+" : this.getDate(),                    //日   
	    "h+" : this.getHours(),                   //小时   
	    "m+" : this.getMinutes(),                 //分   
	    "s+" : this.getSeconds(),                 //秒   
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
	    "S"  : this.getMilliseconds()             //毫秒   
	  };   
	  if(/(y+)/.test(fmt))   
	    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
	  for(var k in o)   
	    if(new RegExp("("+ k +")").test(fmt))   
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	  return fmt;   
	};
	var socket, session = {},
		ID_SEQ = 1;
	var config = { listener: null, log: console };

	var interVal = null;
	var listener = {
		onOpened: function(event) {
			if(config.listener != null) {
				config.listener.onOpened(event);
			}
			handshake();
		},
		onClosed: function(event) {
			if(config.listener != null) {
				config.listener.onClosed(event);
			}
			session = {};
			ID_SEQ = 1;
			socket = null;
		},
		onHandshake: function() {
			session.handshakeOk = true;
			if(config.listener != null) {
				config.listener.onHandshake();
			}
			if(config.userId) {
				bindUser(config.userId, config.tags);
			}
		},
		onBindUser: function(success) {
			if(config.listener != null) {
				config.listener.onBindUser(success);
			}
		},
		onReceivePush: function(message, messageId) {
			if(config.listener != null) {
				config.listener.onReceivePush(message, messageId);
			}
		},
		onKickUser: function(userId, deviceId) {
			if(config.listener != null) {
				config.listener.onKickUser(userId, deviceId);
			}
			doClose(-1, "kick user");
		}
	};

	var Command = {
		HANDSHAKE: 2,
		BIND: 5,
		UNBIND: 6,
		ERROR: 10,
		OK: 11,
		KICK: 13,
		PUSH: 15,
		ACK: 23,
		UNKNOWN: -1
	};

	function Packet(cmd, body, sessionId) {
		return {
			cmd: cmd,
			flags: 16,
			sessionId: sessionId || ID_SEQ++,
			body: body
		}
	}

	function handshake() {
		send(Packet(Command.HANDSHAKE, {
			deviceId: config.deviceId,
			osName: config.osName,
			osVersion: config.osVersion,
			clientVersion: config.clientVersion
		}));
		
	}

	function bindUser(userId, tags) {
		if(userId && userId != session.userId) {
			session.userId = userId;
			session.tags = tags;
			send(Packet(Command.BIND, { userId: userId, tags: tags }));
		}
	}

	function ack(sessionId) {
		send(Packet(Command.ACK, null, sessionId));
	}

	function send(message) {
		if(!socket) {
			return;
		}
		if(socket.readyState == WebSocket.OPEN) {
			socket.send(JSON.stringify(message));
		} else {}
	}

	function dispatch(packet) {
		switch(packet.cmd) {
			case Command.HANDSHAKE:
				{
					console.log('handshake');
					listener.onHandshake();
					break;
				}
			case Command.OK:
				{
					if(packet.body.cmd == Command.BIND) {
						listener.onBindUser(true);
					}
					if(packet.body.cmd == Command.PUSH){//消息发送成功
						console.log("发送成功")
					}
					break;
				}
			case Command.ERROR:
				{
					if(packet.body.cmd == Command.BIND) {
						listener.onBindUser(false);
					}
					break;
				}

			case Command.KICK:
				{
					if(session.userId == packet.body.userId && config.deviceId == packet.body.deviceId) {
						listener.onKickUser(packet.body.userId, packet.body.deviceId);
					}
					break;
				}

			case Command.PUSH:
				{
					var message = JSON.parse(packet.body.content);
					onMessage(message);
					var sessionId;
					if((packet.flags & 8) != 0) {
						ack(packet.sessionId);
					} else {
						sessionId = packet.sessionId
					}
					listener.onReceivePush(packet.body.content, sessionId);
					break;
				}
		}
	}

	function onReceive(event) {
		dispatch(JSON.parse(event.data))
	}

	function onOpen(event) {
		listener.onOpened(event);
	}

	function onClose(event) {
		listener.onClosed(event);
	}

	function onError(event) {
		if(socket) socket.close();
		interVal = setInterval(reConnect(), 5000);
	}

	function doClose(code, reason) {
		if(socket) socket.close();
	}

	function doConnect(cfg) {
		config = copy(cfg);
		socket = new WebSocket(config.url);
		socket.onmessage = onReceive;
		socket.onopen = onOpen;
		socket.onclose = onClose;
		socket.onerror = onError;
	}

	function reConnect(userId) {
		if(!socket || socket.readyState != WebSocket.OPEN) {
			doConnect(config);
		} else {
			clearInterval(interVal);
		}

	}

	function copy(cfg) {
		for(var p in cfg) {
			if(cfg.hasOwnProperty(p)) {
				config[p] = cfg[p];
			}
		}
		return config;
	}

	window.wqchat = {
		connect: doConnect,
		close: doClose,
		bindUser: bindUser,
		sendChat: send,
		chatPacket: Packet,
		reConnect:function(){
			interVal = setInterval(reConnect(), 5000);
		}
	}
})(window);


// 绑定用户
function connect() {
	console.log("正在连接：ws://139.196.115.139:8081/");
	wqchat.connect({
		url: "ws://139.196.115.139:8081/",
		userId: 'userId'+CURRENT_USER.USER_ID,
		deviceId: plus.device.uuid,
		osName: plus.os.name,
		osVersion: plus.os.version,
		clientVersion: plus.runtime.version
	});
}
	connect();		
			function onMessage(message) {
	if (tmp) {
		tmp = JSON.parse(message.content)
		tmp.stat = 1
	} else {
		var tmp = JSON.parse(message.content)
		tmp.stat = 1
	}
	console.log("收到的消息:"+JSON.stringify(tmp))
	var getSign = message.sendUserId
	if(vm.allMessage[getSign]) {
		vm.allMessage[getSign].push(tmp)
	} else {
		vm.allMessage[getSign] = []
		vm.talkList.push(tmp.userInfo)
		vm.allMessage[getSign].push(tmp)
	}
	plus.storage.setItem("allMessage", JSON.stringify(vm.allMessage));
	plus.storage.setItem("talkList", JSON.stringify(vm.talkList));
}
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
		});
		/**
		 *页面：专家答疑
		 *事件：页面加载
		 *创建/修改：李路丹
		 *时间：2016/6/21 13:51
		 */
		$DOCUMENT.on('pageInit', '#expert-answer', function(e, id, page) {
			var recordPeopleId = CURRENT_USER.USER_ID;
			$("#recordPeopleId").val(recordPeopleId);
			var data = [];
			var numberId = [];
			var exple = new Vue({
				el: '#expert-answer',
				components: {
					'v-bar': vBar
				},
				data: {
					items1: [],
					items: [],
					wordBreak: false,
					selectBlow: false,
					voteListTitle: ''
				},
				methods: {
					choose: function(i, item) {
						if($(".check-box-type").get(i).checked) {
							item.NUM++;
						} else {
							item.NUM--;
						}

					},
					showMore: function() {
						this.wordBreak = !this.wordBreak
					}
				}

			});
			//下拉刷新
			$('#expert-answer').on('refresh', '.pull-to-refresh-content', function(e) {
				njyy_data.getExpertList(function(data) {
					$.pullToRefreshDone('.pull-to-refresh-content');
					console.log("refresh"+JSON.stringify(data))
					exple.voteListTitle = data.title_name;
					exple.items1 = data.ansList;
					exple.items = data.voteList;
					if(data.voteList[0]) {
						var num = data.voteList[0].CYCLE_NUM
					}
					if (data.ansList[0].ANSWER) {
						exple.items1[0].ANSWER = data.ansList[0].ANSWER.replace(/\n/g, '<br />')
						console.log(data.ansList[0].ANSWER.replace(/\n/g, '<br />'))
					}
					$("#num").val(num);
				});
			});
			njyy_data.getExpertList(function(data) {
				exple.voteListTitle = data.title_name;
				exple.items1 = data.ansList;
				exple.items = data.voteList;
				if(data.voteList[0]) {
					var num = data.voteList[0].CYCLE_NUM
				}
				if (data.ansList[0].ANSWER) {
					exple.items1[0].ANSWER = data.ansList[0].ANSWER.replace(/\n/g, '<br/>')
					exple.items1[0].ANSWER = exple.items1[0].ANSWER.replace(/\s/g, '&nbsp;')
					console.log(exple.items1[0].ANSWER)
				}
				$("#num").val(num);
			});
			$(".head-first").bind("click", function() {
				if($(this).next().is(":visible")) {
					$(".head-first a").removeClass("icon-down");
					$(".head-first a").addClass("icon-right");
					$(this).next().hide();
				} else {
					$(".head-first a").removeClass("icon-right");
					$(".head-first a").addClass("icon-down");
					$(this).next().show();
				}
			})
			$(".head-second").bind("click", function() {
				if($(this).next().is(":visible")) {
					$(".head-second a").removeClass("icon-down");
					$(".head-second a").addClass("icon-right");
					$(this).next().hide();
				} else {
					$(".head-second a").removeClass("icon-right");
					$(".head-second a").addClass("icon-down");
					$(this).next().show();
				}
			})
			/*点击提交投票结果*/
			$(document).off('click', '#expert-answer-button').on('click', '#expert-answer-button', function() {
				var icain_detailId = document.getElementsByName("detailId")
				var isOk = true
				for (var i=0; i<icain_detailId.length; i++) {
					if (icain_detailId[i].checked) {
						isOk = false
					}
				}
				console.log(isOk)
				if (isOk) {
					plus.nativeUI.toast('请选择选项');
					return
				}
				var form = $('#expert-answer-qustion');
				var dt = new FormData(form.get(0));
				if(recordPeopleId == undefined) {
					plus.nativeUI.toast('请先登录账号');
				} else {
					plus.nativeUI.confirm("确定提交投票?", function(event) {
						if(event.index == 0) {
							njyy_data.postExpert(dt, function(data) {
								if(data.SystemCode == 1) {
									plus.nativeUI.toast('提交成功');
//									exple.selectBlow = false
								} else {
									plus.nativeUI.toast('你已经投过票了');
								}
							});
						}
					}, "投票提交", ["确定", "取消"]);
				}
			});
		});
		/**
		 *页面：通讯录
		 *事件：通讯界面
		 *创建/修改：张大亨
		 *时间：2017/4/25
		 */
		$DOCUMENT.on('pageInit', '#page-roster', function(e, id, page) {
			var vm = new Vue({
				el: '#page-roster',
				data: {
					alert: false,
					userInfo: {},
					list: [],
					requesting: [], // 储存正在进行的请求
					imgSrc: NGINX_PATH,
					search: '',
					sendSearch: {},
					searchTitle: '正在搜索...',
					searchReslut: [],
					searchReslutState: '暂无更多',
					clickTime: false,
					showTearchList: []
				},
				created: function() {
					this.getShowList();
				},
				methods: {
					callphone: function(phone) {
						plus.device.dial( phone, true );
					},
					retry: function() {
						this.getShowList();
					},
					getShowList: function() {
						var _this = this;
						if (CURRENT_USER.ROLE == 1) {
							njyy_data.getDirectories(undefined, false, function(data) {
								data.orgList.orgList = [];
								_this.list = data.orgList;
							});
						} else {
							var newClassList = [];
							for (var i=0; i<CURRENT_USER.CHILDREN.length; i++) {
								if (newClassList.indexOf(CURRENT_USER.CHILDREN[i].CLASS_ID) == -1) {
									newClassList.push(CURRENT_USER.CHILDREN[i].CLASS_ID)
									njyy_data.getDirectories(CURRENT_USER.CHILDREN[i].CLASS_ID, true, function(data) {
										console.log(JSON.stringify(data))
										var tempTearchList = {}
										tempTearchList.classId = CURRENT_USER.CHILDREN[i].CLASS_ID
										tempTearchList.className = CURRENT_USER.CHILDREN[i].CLASS_NAME
										tempTearchList.teacherList = data.teacherList
										_this.showTearchList.push(tempTearchList)
									});
								}
							}
						}
					},
					show: function(userInfo) {
						console.log(JSON.stringify(userInfo))
						this.userInfo = userInfo
						this.alert = true
					},
					hide: function() {
						this.alert = false
					},
					send: function() {
						var id = encodeURI(JSON.stringify(this.userInfo))
						$.router.loadPage({
							url: "chat-icain.html?id="+encodeURI(id),
							noAnimation: true,
							replace: false
						});
					},
					getInnerList: function(hierarchy, orgId, orgName, parentParentId, parentId, index, event) {
						if (hierarchy == 1) {
							var selectedId = "selectone"+index
						} else if (hierarchy == 2) {
							var selectedId = "selecttwo"+parentId+"of"+index
						} else if (hierarchy == 3) {
							var selectedId = "selectthree"+parentParentId+"of"+parentId+"of"+index
						}
						document.getElementById(selectedId).checked = !document.getElementById(selectedId).checked
//						console.log(event.currentTarget.checked)
//						if(plus.os.name != "Android") {
//							if (event.currentTarget.checked) {
//								event.currentTarget.checked = false
//							} else {
//								event.currentTarget.checked = true
//							}
//						}
						// 检测该请求是否已经存在
						if (thisArrSign) {
							thisArrSign = 'hierarchy='+hierarchy+'&index='+index+'&parentId='+parentId+'&parentParentId='+parentParentId
						} else {
							var thisArrSign = 'hierarchy='+hierarchy+'&index='+index+'&parentId='+parentId+'&parentParentId='+parentParentId
						}
						if (this.requesting.indexOf(thisArrSign) == -1) {
							this.requesting.push(thisArrSign)
						} else {
							return
						}
						// 向服务器请求数据
						var _this = this;
						// 判断是否为获取人员列表的请求
						if(isFindPeople) {
							isFindPeople = false
						} else {
							var isFindPeople = false
						}
						if((hierarchy==2 && orgName=='总园') || (hierarchy==3 && orgName=='分园')) {
							isFindPeople = true
						}
						plus.nativeUI.showWaiting('正在拉取');
						njyy_data.getDirectories(orgId, isFindPeople, function(data) {
							plus.nativeUI.closeWaiting();
//							console.log(JSON.stringify(data));
							switch(hierarchy) {
								case 1:
									var tmp = {
										org_NAME: _this.list[index].org_NAME,
										org_ID: _this.list[index].org_ID,
										org_state: true,
										orgList: data.orgList
									}
									_this.list.$set(index, tmp);
									console.log(JSON.stringify(_this.list));
									break;
								case 2:
									if(orgName=='总园') {
										var tmp = {
											org_NAME: _this.list[parentId].orgList[index].org_NAME,
											org_ID: _this.list[parentId].orgList[index].org_ID,
											org_state: true,
											teacherList: data.teacherList
										}
										_this.list[parentId].orgList.$set(index, tmp);
										console.log(JSON.stringify(_this.list));
									} else {
										var tmp = {
											org_NAME: _this.list[parentId].orgList[index].org_NAME,
											org_ID: _this.list[parentId].orgList[index].org_ID,
											org_state: true,
											orgList: data.orgList
										}
										_this.list[parentId].orgList.$set(index, tmp);
										console.log(JSON.stringify(_this.list));
									}
									break;
								case 3:
									var tmp = {
										org_NAME: _this.list[parentParentId].orgList[parentId].orgList[index].org_NAME,
										org_ID: _this.list[parentParentId].orgList[parentId].orgList[index].org_ID,
										org_state: true,
										teacherList: data.teacherList
									}
									_this.list[parentParentId].orgList[parentId].orgList.$set(index, tmp);
									console.log(JSON.stringify(_this.list));
									break;
							}
						});
					}
				},
				watch: {
					search: function() {
						this.searchTitle = "正在搜索..."
						vm.searchReslut = []
						clearTimeout(this.sendSearch)
						if(vm.search == "") {
							return
						}
						this.sendSearch = setTimeout(function() {
							console.log(vm.search)
							if (vm.search == '10086') {
								vm.searchTitle = "暂无数据"
								return
							}
							if(vm.search.length>11) {
								vm.searchTitle = "搜索到与 '" + vm.search.substring(0, 11) + "...' 相关结果"
							} else {
								vm.searchTitle = "搜索到与 '" + vm.search + "' 相关结果"
							}
							var tmp = {}
							tmp.name = vm.search
							tmp.duties = '果果班班主任'
							vm.searchReslut.push(tmp)
						}, 1000)
					}
				},
				components: {
					'v-bar': vBar,
					'v-nav': vNav
				}
			});
			window.addEventListener("resize", function() {
				if(window.innerHeight < 500) {
					document.getElementById("foot-bar").style.display="none"
				} else {
					document.getElementById("foot-bar").style.display="block"
				}
			})
		});
		
		/**
		 *页面：聊天界面
		 *事件：对话页面
		 *创建/修改：张大亨
		 *时间：2017/4/25
		 */
		$DOCUMENT.on('pageInit', '#chat-icain', function(e, id, page) {
			var userInfo = JSON.parse(decodeURI(utils.getId()));
			var sign = 'userId'+userInfo.USER_ID
			console.log(CURRENT_USER.PATH+", userInfo:"+JSON.stringify(userInfo))
			var allMessage = {}
			var talkList=[]
//			mui.init({
//				gestureConfig: {
//					tap: true, //默认为true
//					doubletap: true, //默认为false
//					longtap: true, //默认为false
//					swipe: true, //默认为true
//					drag: true, //默认为true
//					hold: true, //默认为false，不监听
//					release: true //默认为false，不监听
//				}
//				
//			});
			var vm = new Vue({
				el: '#chat-icain',
				data: {
					inputMessage: '',
					sendSound: true,
					name: userInfo.TEACHER_NAME,
					nginx: NGINX_PATH,
					sendMsg: '',
					showVoice: false,
					showSmile: false,
					showMore: false,
					messages: [],
					otherPic: NGINX_PATH+userInfo.PATH,
					minePic: NGINX_PATH+CURRENT_USER.PATH
				},
				created: function() {
					var sign = 'userId'+userInfo.USER_ID
					
					if(JSON.parse(plus.storage.getItem("allMessage")) == null) {
						allMessage = {}
					} else {
						allMessage = JSON.parse(plus.storage.getItem("allMessage"))
					}
					if(JSON.parse(plus.storage.getItem("talkList")) == null) {
						talkList = []
					} else {
						talkList = JSON.parse(plus.storage.getItem("talkList"))
					}
					if (plus.storage.getItem("allMessage")) {
						console.log('allMessage:1'+JSON.stringify(JSON.parse(plus.storage.getItem("allMessage"))[sign]))
						if(JSON.parse(plus.storage.getItem("allMessage"))[sign]) {
							console.log('allMessage:2')
							this.messages = JSON.parse(plus.storage.getItem("allMessage"))[sign]
							console.log("this.messages:"+this.messages)
						}
					} else {
						console.log("空")
					}
					this.$nextTick(this.pushDom)
					console.log('allMessage:'+allMessage)
				},
				methods: {
					sendSoundMessage: function() {
						this.sendSound = !this.sendSound
						this.showSmile = false;
						this.showMore = false;
					},
					selectControl: function(controlType) {
						this.showSmile = false;
						this.showMore = false;
						this[controlType] = true;
						if(controlType == 'showSmile') {
							this.sendSound = true
						}
					},
					hidenSelectControl: function() {
						this.showVoice = false;
						this.showSmile = false;
						this.showMore = false;
					},
					send: function() {
//						if(document.getElementById("input-area").innerHTML.toString() == "<div><br></div><div><br></div>") {
//							document.getElementById("input-area").innerHTML = ""
//							return
//						}
						if (this.inputMessage == '') {
							return
						}
						if ($.trim(this.inputMessage) == '') {
							plus.nativeUI.toast("不能发送纯空格");
							return
						}
						if(tmp) {
							tmp = {}
						} else {
							var tmp = {}
						}
						var myinfo = {}
						myinfo.TEACHER_PHONE = CURRENT_USER.USER_NAME
						myinfo.TEACHER_NAME = CURRENT_USER.NAME
						myinfo.USER_ID = CURRENT_USER.USER_ID
						myinfo.PATH = CURRENT_USER.PATH
						var nowDate = new Date()
						tmp.time = nowDate.getFullYear()+"/"+(nowDate.getMonth()+1)+"/"+nowDate.getDate()+" "+nowDate.getHours()+":"+nowDate.getMinutes()+":"+nowDate.getSeconds()
						tmp.userInfo = myinfo
						tmp.stat = 0
						tmp.type = 'default',
//						tmp.content = document.getElementById("input-area").innerHTML.replace(/<div>/g, "").replace(/<br>/g, "").replace(/<\/div>/g, "")
						tmp.content = this.inputMessage.replace(/\[([^\[\]]*)\]/g,function(match){
															if(njyy_config_chat.base_emoji.map[match]){
																return '<img class="icain-expression" src ="'+njyy_config_chat.base_emoji.path+njyy_config_chat.base_emoji.map[match]+'" />';
															}else{
																return match;
															}
															
														})
						tmp.path = ''
						this.messages.push(tmp)
						this.$nextTick(this.pushDom)
						chatSend(tmp, 'userId'+userInfo.USER_ID);
						if(sign == undefined) {
							var sign = 'userId'+userInfo.USER_ID
						}
						if(allMessage[sign]) {
							allMessage[sign].push(tmp)
						} else {
							allMessage[sign] = []
							talkList.push(userInfo)
							allMessage[sign].push(tmp)
						}
						plus.storage.setItem("allMessage", JSON.stringify(allMessage));
						plus.storage.setItem("talkList", JSON.stringify(talkList));
						console.log(plus.storage.getItem("allMessage"))
						console.log(plus.storage.getItem("talkList"))
//						document.getElementById("input-area").innerHTML = ""
						this.inputMessage = ''
					},
					pushDom: function() {
						var messageLength = document.getElementsByClassName("record-list-repeat")
						if(messageLength.length<=0) {
							return
						}
						messageLength[messageLength.length-1].scrollIntoView(true)
					},
					selectExpression: function(expressionId) {
						this.inputMessage += expressionId
//						document.getElementById("input-area").innerHTML += '<img class="icain-expression" src="./assets/img/expression/'+ expressionId +'.png" alt="" />'
					},
					sendPicture: function() {
						this.showSmile = false;
						plus.nativeUI.actionSheet({
							cancel: "取消",
							buttons: [{
								title: "从相册选择"
							}, {
								title: "拍照"
							}]
						}, function(event) {
							if(event.index == 1) {
								plus.gallery.pick(function(path) {
									console.log("相册")
									plus.nativeUI.showWaiting('等待中...');
									plus.zip.compressImage({
										src: path,
										dst: "_downloads/camera/" + path.substring(path.lastIndexOf('/')),
										overwrite: true,
										quality: 20
									}, function(event) {
										uploadUserImage(event.target);
										plus.nativeUI.closeWaiting();
									}, function() {
										plus.nativeUI.closeWaiting();
										plus.nativeUI.toast("操作出错");
									});
								}, function(path) {
									console.log("error"+JSON.stringify(path))
								}, {
									filter: "image",
									system: false
								});
							} else if(event.index == 2) {
								utils.getCamera(function(path) {
									console.log("相机")
									plus.nativeUI.showWaiting('等待中...');
									plus.zip.compressImage({
										src: path,
										dst: path,
										overwrite: true,
										quality: 20
									}, function(event) {
										uploadUserImage(event.target);
										plus.nativeUI.closeWaiting();
									}, function() {
										plus.nativeUI.closeWaiting();
										plus.nativeUI.toast("请求出错");
									});
								});
							}
						});
					},
					selectPic: function() {
						plus.gallery.pick(function(path) {
							console.log("相册")
							plus.nativeUI.showWaiting('等待中...');
							plus.zip.compressImage({
								src: path,
								dst: "_downloads/camera/" + path.substring(path.lastIndexOf('/')),
								overwrite: true,
								quality: 20
							}, function(event) {
								uploadUserImage(event.target);
								plus.nativeUI.closeWaiting();
							}, function() {
								plus.nativeUI.closeWaiting();
								plus.nativeUI.toast("操作出错");
							});
						}, function(path) {
							console.log("error"+JSON.stringify(path))
						}, {
							filter: "image",
							system: false
						});
					},
					photograph: function() {
						utils.getCamera(function(path) {
							console.log("相机")
							plus.nativeUI.showWaiting('等待中...');
							plus.zip.compressImage({
								src: path,
								dst: path,
								overwrite: true,
								quality: 20
							}, function(event) {
								uploadUserImage(event.target);
								plus.nativeUI.closeWaiting();
							}, function() {
								plus.nativeUI.closeWaiting();
								plus.nativeUI.toast("请求出错");
							});
						});
					},
					lisener: function(path, event) {
						if(event.target.innerHTML=='<span class="ion-radio-waves" style="font-size: 15px; margin: auto 10px;"></span>正在播放...') {
							return
						}
						event.target.innerHTML='<span class="ion-radio-waves" style="font-size: 15px; margin: auto 10px;"></span>正在播放...';
						var dtask = plus.downloader.createDownload( path, {}, function ( d, status ) {
							// 下载完成
							if ( status == 200 ) { 
								console.log("已下载的文件"+d.filename)
								player = plus.audio.createPlayer(d.filename);
								console.log("播放音频："+d.filename);
								player.play(function() {
									event.target.innerHTML='<span class="ion-play" style="font-size: 15px; margin: auto 10px;"></span>点击播放';
								}, function(e) {
									event.target.innerHTML='<span class="ion-play" style="font-size: 15px; margin: auto 10px;"></span>点击播放';
								});
							} else {
								 event.target.innerHTML='<span class="ion-play" style="font-size: 15px; margin: auto 10px;"></span>点击播放';
							}  
						});
						//dtask.addEventListener( "statechanged", onStateChanged, false );
						dtask.start(); 
					}
				},
				components: {
					'v-bar': vBar,
					'v-nav': vNav
				}
			});
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
/*聊天开始*/
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
(function(window) {
	Date.prototype.Format = function(fmt)   
	{ //author: meizz   
	  var o = {   
	    "M+" : this.getMonth()+1,                 //月份   
	    "d+" : this.getDate(),                    //日   
	    "h+" : this.getHours(),                   //小时   
	    "m+" : this.getMinutes(),                 //分   
	    "s+" : this.getSeconds(),                 //秒   
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
	    "S"  : this.getMilliseconds()             //毫秒   
	  };   
	  if(/(y+)/.test(fmt))   
	    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
	  for(var k in o)   
	    if(new RegExp("("+ k +")").test(fmt))   
	  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	  return fmt;   
	};
	var socket, session = {},
		ID_SEQ = 1;
	var config = { listener: null, log: console };

	var interVal = null;
	var listener = {
		onOpened: function(event) {
			if(config.listener != null) {
				config.listener.onOpened(event);
			}
			handshake();
		},
		onClosed: function(event) {
			if(config.listener != null) {
				config.listener.onClosed(event);
			}
			session = {};
			ID_SEQ = 1;
			socket = null;
		},
		onHandshake: function() {
			session.handshakeOk = true;
			if(config.listener != null) {
				config.listener.onHandshake();
			}
			if(config.userId) {
				bindUser(config.userId, config.tags);
			}
		},
		onBindUser: function(success) {
			if(config.listener != null) {
				config.listener.onBindUser(success);
			}
		},
		onReceivePush: function(message, messageId) {
			if(config.listener != null) {
				config.listener.onReceivePush(message, messageId);
			}
		},
		onKickUser: function(userId, deviceId) {
			if(config.listener != null) {
				config.listener.onKickUser(userId, deviceId);
			}
			doClose(-1, "kick user");
		}
	};

	var Command = {
		HANDSHAKE: 2,
		BIND: 5,
		UNBIND: 6,
		ERROR: 10,
		OK: 11,
		KICK: 13,
		PUSH: 15,
		ACK: 23,
		UNKNOWN: -1
	};

	function Packet(cmd, body, sessionId) {
		return {
			cmd: cmd,
			flags: 16,
			sessionId: sessionId || ID_SEQ++,
			body: body
		}
	}

	function handshake() {
		send(Packet(Command.HANDSHAKE, {
			deviceId: config.deviceId,
			osName: config.osName,
			osVersion: config.osVersion,
			clientVersion: config.clientVersion
		}));
		
	}

	function bindUser(userId, tags) {
		if(userId && userId != session.userId) {
			session.userId = userId;
			session.tags = tags;
			send(Packet(Command.BIND, { userId: userId, tags: tags }));
		}
	}

	function ack(sessionId) {
		send(Packet(Command.ACK, null, sessionId));
	}

	function send(message) {
		if(!socket) {
			return;
		}
		if(socket.readyState == WebSocket.OPEN) {
			socket.send(JSON.stringify(message));
		} else {}
	}

	function dispatch(packet) {
		switch(packet.cmd) {
			case Command.HANDSHAKE:
				{
					console.log('handshake');
					listener.onHandshake();
					break;
				}
			case Command.OK:
				{
					if(packet.body.cmd == Command.BIND) {
						listener.onBindUser(true);
					}
					if(packet.body.cmd == Command.PUSH){//消息发送成功
						console.log("发送成功")
					}
					break;
				}
			case Command.ERROR:
				{
					if(packet.body.cmd == Command.BIND) {
						listener.onBindUser(false);
					}
					break;
				}

			case Command.KICK:
				{
					if(session.userId == packet.body.userId && config.deviceId == packet.body.deviceId) {
						listener.onKickUser(packet.body.userId, packet.body.deviceId);
					}
					break;
				}

			case Command.PUSH:
				{
					var message = JSON.parse(packet.body.content);
					onMessage(message);
					var sessionId;
					if((packet.flags & 8) != 0) {
						ack(packet.sessionId);
					} else {
						sessionId = packet.sessionId
					}
					listener.onReceivePush(packet.body.content, sessionId);
					break;
				}
		}
	}

	function onReceive(event) {
		dispatch(JSON.parse(event.data))
	}

	function onOpen(event) {
		listener.onOpened(event);
	}

	function onClose(event) {
		listener.onClosed(event);
	}

	function onError(event) {
		if(socket) socket.close();
		interVal = setInterval(reConnect(), 5000);
	}

	function doClose(code, reason) {
		if(socket) socket.close();
	}

	function doConnect(cfg) {
		config = copy(cfg);
		socket = new WebSocket(config.url);
		socket.onmessage = onReceive;
		socket.onopen = onOpen;
		socket.onclose = onClose;
		socket.onerror = onError;
	}

	function reConnect(userId) {
		if(!socket || socket.readyState != WebSocket.OPEN) {
			doConnect(config);
		} else {
			clearInterval(interVal);
		}

	}

	function copy(cfg) {
		for(var p in cfg) {
			if(cfg.hasOwnProperty(p)) {
				config[p] = cfg[p];
			}
		}
		return config;
	}

	window.wqchat = {
		connect: doConnect,
		close: doClose,
		bindUser: bindUser,
		sendChat: send,
		chatPacket: Packet,
		reConnect:function(){
			interVal = setInterval(reConnect(), 5000);
		}
	}
})(window);


// 绑定用户
function connect() {
	console.log("正在连接：ws://139.196.115.139:8081/");
	wqchat.connect({
		url: "ws://139.196.115.139:8081/",
		userId: 'userId'+CURRENT_USER.USER_ID,
		deviceId: plus.device.uuid,
		osName: plus.os.name,
		osVersion: plus.os.version,
		clientVersion: plus.runtime.version
	});
}
// 发送消息
function chatSend(me, targetUserId){
	console.log("发送消息："+me+", "+targetUserId)
	var targetUserId = targetUserId || 'user-0';
    wqchat.sendChat(wqchat.chatPacket(15, {"chatType":0,"clientTime":(new Date()).Format("yyyy-MM-dd hh:mm:ss.S"),"id":guid(),"message":me,"messageType":0,"targetId":targetUserId}));
}
// 生成GUID
function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

connect();

function onMessage(message) {
	console.log(JSON.stringify(message,null,4)+", "+message.sendUserId);
	if (tmp) {
		tmp = JSON.parse(message.content)
		tmp.stat = 1
	} else {
		var tmp = JSON.parse(message.content)
		tmp.stat = 1
	}
	var getSign = message.sendUserId
	if(allMessage[getSign]) {
		allMessage[getSign].push(tmp)
	} else {
		allMessage[getSign] = []
		talkList.push(userInfo)
		allMessage[getSign].push(tmp)
	}
	plus.storage.setItem("allMessage", JSON.stringify(allMessage));
	plus.storage.setItem("talkList", JSON.stringify(talkList));
	console.log(plus.storage.getItem("allMessage"))
	console.log("message.sendUserId:"+message.sendUserId+", "+userInfo.USER_ID)
	if (message.sendUserId == 'userId'+userInfo.USER_ID) {
		vm.messages.push(tmp)
		vm.$nextTick(vm.pushDom)
	}
}

//图片部分
function uploadUserImage(path) {
	var task = plus.uploader.createUpload(USERIMAGE_UPLOAD_PATH, {
		method: "POST"
	}, function(t, status) {
		console.log(JSON.stringify(t))
		if(status == 200) {
			if(tmp) {
				tmp = {}
			} else {
				var tmp = {}
			}
			var myinfo = {}
			myinfo.TEACHER_PHONE = CURRENT_USER.USER_NAME
			myinfo.TEACHER_NAME = CURRENT_USER.NAME
			myinfo.USER_ID = CURRENT_USER.USER_ID
			myinfo.PATH = CURRENT_USER.PATH
			var nowDate = new Date()
			tmp.time = nowDate.getFullYear()+"/"+(nowDate.getMonth()+1)+"/"+nowDate.getDate()+" "+nowDate.getHours()+":"+nowDate.getMinutes()+":"+nowDate.getSeconds()
			tmp.userInfo = myinfo
			tmp.stat = 0
			tmp.type = 'picture'
			tmp.content = '<a class="icain-picture" href="'+ vm.nginx+JSON.parse(t.responseText).path +'" data-lightbox="chat"><img src="'+vm.nginx+JSON.parse(t.responseText).path+'" data-src="'+vm.nginx+JSON.parse(t.responseText).path+'" alt="" />'
			tmp.path = ''
			vm.messages.push(tmp)
			vm.$nextTick(vm.pushDom)
			console.log(t.responseText)
			chatSend(tmp, 'userId'+userInfo.USER_ID);
			
			if(allMessage[sign]) {
				allMessage[sign].push(tmp)
			} else {
				allMessage[sign] = []
				talkList.push(userInfo)
				allMessage[sign].push(tmp)
			}
			plus.storage.setItem("allMessage", JSON.stringify(allMessage));
			plus.storage.setItem("talkList", JSON.stringify(talkList));
			console.log(plus.storage.getItem("allMessage"))
			plus.nativeUI.closeWaiting();
		} else {
			plus.nativeUI.closeWaiting();
			plus.nativeUI.toast("上传失败");
		}
	});
	task.addFile(path, {
		key: "file"
	});
	task.addData('userId', CURRENT_USER.USER_ID);
	task.addData('supply', 'chat_picture');
	task.start();
}

//语音部分
var recordCancel = false;
var recorder = null;
var startTimestamp = null;
var stopTimestamp = null;
var MIN_SOUND_TIME = 800;
var MAX_SOUND_TIME = 60000;
var STARTY = null;
var lisenerTime;
document.getElementById("input-sound").addEventListener('touchstart', function(event) {
	document.getElementById("input-sound-show").style.display='block'
	document.getElementById("input-sound").value = "正在录音...";
	var event = event || window.event
	var touch = event.targetTouches[0]
	if (STARTY == null) {
		STARTY = touch.pageY
	}
	recordCancel = false;
	recorder = plus.audio.getRecorder();
	if (recorder == null) {
		plus.nativeUI.toast("不能获取录音对象");
		return;
	} else {
	}
	startTimestamp = (new Date()).getTime();
	lisenerTime = setTimeout(function() {
		recorder.stop();
	}, MAX_SOUND_TIME)
	recorder.record({
		filename: "_doc/audio/"
	}, function(path) {
		if (recordCancel) return;
		createUpload(path);
	}, function(e) {
		clearTimeout(lisenerTime)
		plus.nativeUI.toast("录音时出现异常: " + e.message);
	});
});
document.getElementById("input-sound").addEventListener('touchend', function(event) {
	document.getElementById("input-sound-show").style.display='none'
	document.getElementById("input-sound").value = "按住说话";
	recorder.stop();
	clearTimeout(lisenerTime)
	stopTimestamp = (new Date()).getTime();
	if (stopTimestamp - startTimestamp < MIN_SOUND_TIME) {
		plus.nativeUI.toast("录音时间太短");
		recordCancel = true;
	}
	STARTY = null
});
document.getElementById("input-sound").addEventListener('touchmove', function(event) {
	var event = event || window.event
	var touch = event.targetTouches[0]
	if (event.targetTouches.length == 1) {
		if ((STARTY - touch.pageY) > 100) {
			document.getElementById("input-sound-show-cancel").innerText='松开取消发送'
			recordCancel = true;
		} else {
			document.getElementById("input-sound-show-cancel").innerText='上滑取消发送'
			recordCancel = false;
		}
	}
});

//上传文件
function createUpload(path) {
	var task = plus.uploader.createUpload( AUDIO_UPLOAD_PATH, 
		{ method:"POST" },
		function ( t, status ) {
			// 上传完成
			if ( status == 200 ) { 
				console.log(JSON.stringify(t))
				if(tmp) {
					tmp = {}
				} else {
					var tmp = {}
				}
				var myinfo = {}
				myinfo.TEACHER_PHONE = CURRENT_USER.USER_NAME
				myinfo.TEACHER_NAME = CURRENT_USER.NAME
				myinfo.USER_ID = CURRENT_USER.USER_ID
				myinfo.PATH = CURRENT_USER.PATH
				var nowDate = new Date()
				tmp.time = nowDate.getFullYear()+"/"+(nowDate.getMonth()+1)+"/"+nowDate.getDate()+" "+nowDate.getHours()+":"+nowDate.getMinutes()+":"+nowDate.getSeconds()
				tmp.userInfo = myinfo
				tmp.stat = 0
				tmp.type = 'sound'
				tmp.content = ''
				tmp.path = vm.nginx+JSON.parse(t.responseText).path
				vm.messages.push(tmp)
				vm.$nextTick(vm.pushDom)
				chatSend(tmp, 'userId'+userInfo.USER_ID);
				if(allMessage[sign]) {
					allMessage[sign].push(tmp)
				} else {
					allMessage[sign] = []
					talkList.push(userInfo)
					allMessage[sign].push(tmp)
				}
				plus.storage.setItem("allMessage", JSON.stringify(allMessage));
				plus.storage.setItem("talkList", JSON.stringify(talkList));
				console.log(plus.storage.getItem("allMessage"))
			} else {
				plus.nativeUI.toast("上传出错");
			}
		}
	);
	task.addFile(path, {
		key: "file"
	});
	task.addData('userId', CURRENT_USER.USER_ID);
	task.addData('fileType', '2');
	task.start();
}









plus.key.addEventListener('backbutton', function() {
	var lightboxmark = $('#lightboxOverlay')
	var lightboxcontent = $('#lightbox')
	if (!lightboxmark.is(':hidden') && !lightboxcontent.is(':hidden')) {
		lightboxmark.hide()
		lightboxcontent.hide()
	}
}, false)




















/*聊天结束*/











		});
		/**
		 *页面：注册登录导航
		 *创建: wangshujing
		 *时间：2016/6/20
		 */
		$DOCUMENT.on('pageInit', '#login-index', function(e, id, page) {

			//登录跳转
			$('#loginIndexBtn').on('click', function() {
				console.log(JSON.stringify(GESTURE_SETTING))
				if(GESTURE_SETTING.PASSWORD && GESTURE_SETTING.PASSWORD != null && GESTURE_SETTING.IS_USED == true) {
					$.router.loadPage({
						url: 'gesture-login.html',
						noAnimation: true,
						replace: false
					});
				} else {
					$.router.loadPage({
						url: 'login-login.html',
						noAnimation: true,
						replace: false
					});
				}
			});
			$('#loginlook').on('click', function() {
				plus.nativeUI.toast("暂时关闭请谅解");
			});
		});
		/**
		 *页面：登录页面
		 *事件：用户登录
		 *创建: wangshujing
		 *时间：2016/6/16
		 */
		$DOCUMENT.on('pageInit', '#login-login', function(e, id, page) {
            /*显示密码*/
			$('#show-password-checkbox').on('click', function() {
				if($(this).is(":checked")) {
						$("#show-password-text").html("隐藏密码");
					$("#password").attr("type", "text");
				} else {
					$("#show-password-text").html("显示密码");
					$("#password").attr("type", "password");
				}
			});
			$("#btn-login").on('click', function() {
				var clientid = plus.push.getClientInfo().clientid;
				var username = $("#username").val();
				var password1 = $("#password").val();
				var encrypt = new JSEncrypt();
	            encrypt.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfH7HDHniemNLaCFF0dOtZ6KaLqZYHAEpJ12fa3bfoexuy1uU/7HI6dQzfapLEAPuMRumydi0e4HZEZGSUSokytbHF8PiQvxXxWnSJ7BsxUMgtyLXH/0eIah8yKwPvnhmcI9tWRR2p1vzMFLioH3sjfaPnRWiY8KthdxeuJ8wVPwIDAQAB");
	            var encrypted = encrypt.encrypt(password1);

				//数据校验
				if(username == "" || username.length != 11) {
					plus.nativeUI.toast("请输入正确的手机号!");
					return;
				}
				if(password1 == "") {
					plus.nativeUI.toast("密码不能为空!");
					return;
				}
				var user = {
					"USERNAME": username,
					"PASSWORD": encrypted,
					"CLIENTID": clientid
				};
				var checkPassword = password1;
				plus.nativeUI.showWaiting('请稍等...');
				njyy_data.postLogin(user, function(data) {
					plus.nativeUI.closeWaiting();
					plus.storage.removeItem('allMessage');
					plus.storage.removeItem('talkList');
					console.log(JSON.stringify(data))
					switch(data.SystemCode) {
						case 1:
							if(checkPassword == 123456) {
								plus.nativeUI.confirm("请您修改初始密码", function(event) {
									if(event.index == 0) {
										$.router.loadPage({
											url: "password-change.html",
											noAnimation: true,
											replace: false
										});
									}
								}, "修改初始密码", ["确定", "取消"]);
							}
							CURRENT_USER.USER_NAME = username; //登录名
							CURRENT_USER.USER_ID = data.USER_ID; //用户id
							CURRENT_USER.ROLE = data.ROLE; //小角色区分[1000 2000)教师角色,[2000 3000)家长角色,[3000 ~)教师角色
							CURRENT_USER.ROLE_TOP_ID = checkRole(data.ROLE); //大角色1是老师,2是家长,3是社会人员角色
							CURRENT_USER.ACCEPT_ID = data.ROLE_ID; //受理人角色
							CURRENT_USER.DETAIL_ROLE_ID=data.DETAIL_ROLE_ID;//小角色区分教师角色

							CURRENT_USER.NAME = data.NAME; //昵称
							CURRENT_USER.PATH = data.PATH; //头像	
							console.log(CURRENT_USER.PATH);
							CURRENT_USER.CLASS_ID = data.CLASS_ID; //学生所在班级
							CURRENT_USER.ORG_ID = data.ORG_ID; //所在机构
							//手势配置不存在或者手势配置存在但不是当前用户
							console.log(JSON.stringify(GESTURE_SETTING))
							console.log(JSON.stringify(CURRENT_USER))
							if(!GESTURE_SETTING.USER_NAME || GESTURE_SETTING.USER_NAME != CURRENT_USER.USER_NAME) {
								GESTURE_SETTING.USER_NAME = CURRENT_USER.USER_NAME;
								GESTURE_SETTING.IS_USED = true;
								GESTURE_SETTING.PASSWORD = data.G_PASSWORD;
							} else {
								GESTURE_SETTING.PASSWORD = data.G_PASSWORD;
							}
							function checkRole(ROLE){
						    if(ROLE>=1000&&ROLE<2000){
						    	return "1";
						    }else if(ROLE>=2000&&ROLE<3000){
						    	return "2";
						    }else if(ROLE>=3000){
						    	return "3";
						    }
							}
							//更新本地配置
							plus.storage.setItem('GESTURE_SETTING', JSON.stringify(GESTURE_SETTING));
							plus.nativeUI.showWaiting('请稍等...');
							switch(data.ROLE) {
								case "1":
									// 角色:教师
									//班级id
									CURRENT_USER.CLASS_ID = data.CLASS_ID;
									plus.nativeUI.closeWaiting();
									$.router.loadPage({
										url: "yy-circle.html",
										noAnimation: true,
										replace: false
									});
									break;
								case "2":
									//角色:家长
									//孩子
									CURRENT_USER.CHILDREN = data.stuInfoMap;
									//被选中的孩子
									for(var item in CURRENT_USER.CHILDREN) {
										if(CURRENT_USER.CHILDREN[item].IS_DEFAULT_STUDENT == 1) {
											CURRENT_USER.SELECTED_CHILD = CURRENT_USER.CHILDREN[item];
											CURRENT_USER.CLASS_ID = CURRENT_USER.CHILDREN[item].CLASS_ID;
											break;
										}
									}
									plus.nativeUI.closeWaiting();
									$.router.loadPage({
										url: "yy-circle.html",
										noAnimation: true,
										replace: false
									});
									break;
								case "3":
									//角色:游客
									plus.nativeUI.closeWaiting();
									$.router.loadPage({
										url: "yy-public.html",
										noAnimation: true,
										replace: false
									});
							}
							break;
						case 1003:
							plus.nativeUI.toast("用户名错误!");
							break;
						case 1004:
							plus.nativeUI.toast("密码错误!");
							break;
						default:
							if(njyy_error_config[data.SystemCode]) {
								plus.nativeUI.toast(njyy_error_config[data.SystemCode].errorMsg);
							};
							break;
					}
				});
			});
		});

		/**
		 *页面：注册页面
		 *事件：用户注册
		 *创建: wangshujing
		 *时间：2016/6/20
		 */
		$DOCUMENT.on('pageInit', '#login-register', function(e, id, page) {
			$("#but-register").on('click', function() {
				var username = $("#username").val();
				var password2 = $("#password").val();
				//数据校验
				if(username == "" || username.length != 11) {
					plus.nativeUI.toast("请输入正确的手机号!");
					return;
				}
				if(password2 == "") {
					plus.nativeUI.toast("密码不能为空!");
					return;
				}

				$.ajax({
					type: "POST",
					url: url + "/client/user/add",
					data: {
						"username": username,
						"password": password2
					},
					error: function() {
						plus.nativeUI.toast("请求出错");
					},
					success: function(data) {
						plus.nativeUI.toast("注册成功!");
						$.router.back();
					}
				});
			})
		});
		/**
		 *页面：注册页面——设置密码
		 *事件：设置密码
		 *创建: wangshujing
		 *时间：2016/6/20
		 */
		$DOCUMENT.on('pageInit', '#login-set-password', function(e, id, page) {

		});

		/**
		 * 忘记密码——输入手机号
		 *创建: wangshujing
		 *时间：2016/6/20
		 */
		$DOCUMENT.on('pageInit', '#login-retrieve-password', function(e, id, page) {

		});
		/**
		 * 忘记密码——重设密码
		 *创建: wangshujing
		 *时间：2016/6/20
		 */
		$DOCUMENT.on('pageInit', '#login-reset-password', function(e, id, page) {

		});
		/**
		 * 手势密码
		 */
		$DOCUMENT.on('pageInit', '#set-gestures-password', function(e, id, page) {
			new Vue({
				el: '#set-gestures-password',
				components: {
					'v-bar': vBar,
				}
			});
			new H5lock({
				chooseType: 3
			}).init();
		});
		/**
		 * 我的主界面
		 * 创建:wangshujing
		 * 时间: 2016/6/22 10:34
		 */
		$DOCUMENT.on('pageInit', "#mine-index", function(e, id, page) {
			var headimg = CURRENT_USER.PATH;
			var roleId = CURRENT_USER.ROLE;
			new Vue({
				el: '#mine-index',
				data: {
					role: roleId,
					headimg: headimg,
					nginx:NGINX_PATH
				},
				components: {
					'v-bar': vBar,
					'v-nav': vNav,
					'v-public': vNavPublic
				}
			});
			//列表项点击事件
			$("#mineMenuList").on("click", "li", function() {
				var href = $(this).data('href');
				$.router.loadPage({
					url: href,
					noAnimation: true,
					replace: false
				});
			});
			var userImgDOM = document.getElementById('mineUserImg'),
				bgImgDOM = document.getElementById('mineIndexBg');
			//头像缓存
			utils.fetchImage(CURRENT_USER.PATH, userImgDOM, 0);
			setTimeout(function() {
				utils.fetchImage(CURRENT_USER.PATH, bgImgDOM, 0);
			},5000);
			document.getElementById('userNameDiv').innerText = CURRENT_USER.NAME;

			//上传头像
			$('#mineUserImg').click(function() {
				plus.nativeUI.actionSheet({
					cancel: "取消",
					buttons: [{
						title: "从相册选择"
					}, {
						title: "拍照"
					}]
				}, function(event) {
					if(event.index == 1) {
						plus.gallery.pick(function(path) {
							console.log("success")
							plus.nativeUI.showWaiting('等待中...');
							plus.zip.compressImage({
								src: path,
								dst: "_downloads/camera/" + path.substring(path.lastIndexOf('/')),
								overwrite: true,
								quality: 20
							}, function(event) {
								uploadUserImage(event.target);
							}, function() {
								plus.nativeUI.closeWaiting();
								plus.nativeUI.toast("操作出错");
							});
						}, function(path) {
							console.log("error"+JSON.stringify(path))
						}, {
							filter: "image"
						});
					} else if(event.index == 2) {
						utils.getCamera(function(path) {
							plus.nativeUI.showWaiting('等待中...');
							plus.zip.compressImage({
								src: path,
								dst: path,
								overwrite: true,
								quality: 20
							}, function(event) {
								uploadUserImage(event.target);
							}, function() {
								plus.nativeUI.closeWaiting();
								plus.nativeUI.toast("请求出错");
							});
						});
					}
				});
			});

			function uploadUserImage(path) {
				var task = plus.uploader.createUpload(USERIMAGE_UPLOAD_PATH, {
					method: "POST"
				}, function(t, status) {
					if(status == 200) {
						var result = JSON.parse(t.responseText);
						CURRENT_USER.PATH = result.path;
						utils.fetchImage(result.path, userImgDOM, 0);
						setTimeout(function() {
							utils.fetchImage(CURRENT_USER.PATH, bgImgDOM, 0);
						});
						plus.nativeUI.closeWaiting();
					} else {
						plus.nativeUI.closeWaiting();
						plus.nativeUI.toast("上传失败");
					}
				});
				task.addFile(path, {
					key: "file"
				});
				task.addData('userId', CURRENT_USER.USER_ID);
				task.addData('supply', 'user_head_portrait');
				task.start();
			}

		});
		/**
		 * 我的福利
		 */
		$DOCUMENT.on('pageInit', "#mine-my-welfare", function(e, id, page) {
			var vm = new Vue({
				el: '#mine-my-welfare',
				components: {
					'v-bar': vBar,
					'v-nav': vNav
				},
				data: {
					welfareList: []
				}
			});;
			njyy_data.getWelfare(CURRENT_USER.USER_ID, function(data) {
				vm.welfareList = data.WELFARE_LIST;
			});
		});
		/**
		 * 我的设置
		 */
		$DOCUMENT.on('pageInit', "#mine-setting", function(e, id, page) {
			var phone = CURRENT_USER.USER_NAME;
			//显示创建修改手势
			if(window.GESTURE_SETTING.PASSWORD !== null) {
				document.getElementById('mineGestureBtn').querySelector('.item-after').innerHTML = '修改';
			}
			//隐藏手机号
			document.getElementById('minePhoneDiv').innerText = phone.replace(phone.substring(3, 7), '****');
			var roleId = CURRENT_USER.ROLE;
			var vm = new Vue({
				el: '#mine-setting',
				data: {
					role: roleId
				},
				components: {
					'v-bar': vBar
				}
			});

			//跳转手势密码页面
			$('#mineGestureBtn').on('click', function() {
				$.router.loadPage({
					url: "gesture-index.html",
					noAnimation: true,
					replace: false
				});
			});

			//跳转登录密码页
			$('#loginPasswordBtn').on('click', function() {
				$.router.loadPage({
					url: "password-index.html",
					noAnimation: true,
					replace: false
				});
			});
			//跳转关于页
			$('#aboutAppBtn').on('click', function() {
				$.router.loadPage({
					url: "#page-about",
					noAnimation: true,
					replace: false
				});
			});
			//退出登录
			$("#btn-logout").on('click', function() {
				//删除手势配置
				plus.storage.removeItem('allMessage');
				plus.storage.removeItem('talkList');
				plus.storage.removeItem('GESTURE_SETTING');
				//重启应用
				plus.runtime.restart();
			});

			//清除缓存
			$('#clearCacheBtn').on('click', function() {
				plus.nativeUI.confirm("是否清除缓存", function(event) {
					if(event.index == 0) {
						utils.cleanCache();
					}
				}, '确认', ["确定", "取消"]);
			});
		});
		/**
		 * 我的设置
		 社会版
		 */
		$DOCUMENT.on('pageInit', "#mine-setting-public", function(e, id, page) {
			new Vue({
				el: '#mine-setting-public',
				components: {
					'v-bar': vBar
				}
			});
			//退出登录
			$("#btn-logout").on('click', function() {
				//重启应用
				plus.runtime.restart();
			});

			//清除缓存
			$('#clearCacheBtn').on('click', function() {
				plus.nativeUI.confirm("是否清除缓存", function(event) {
					if(event.index == 1) {
						utils.cleanCache();
					}
				}, '确认', ["取消", "确定"]);
			});
			//跳转关于页
			$('#aboutAppBtn').on('click', function() {
				$.router.loadPage({
					url: "#page-about",
					noAnimation: true,
					replace: false
				});
			});
			$("#loginRegister").on('click', function() {
				$.router.loadPage({
					url: "login-register.html",
					noAnimation: true,
					replace: false
				});
			});
		});
		/**
		 *页面：添加投票页面
		 *事件：页面加载
		 *创建/修改：左武洲
		 *时间：2016/6/22 9:02
		 */
		$(document).on('pageInit', '#page-addVote', function(e, id, page) {
			var voteLengthList;
			var VOTE_CREAT = CURRENT_USER.USER_ID;
			$("#CREAT_ID").val(VOTE_CREAT);
			var vm = new Vue({
				el: '#page-addVote',
				components: {
					'v-bar': vBar
				}
			});
			/* 在原有 的时间上减去一天*/
			var myDate = new Date();
			myDate = new Date(myDate.valueOf() - 1 * 24 * 60 * 60 * 1000);
			$("#VOTE_STAR").calendar({
				minDate: myDate
			});
			$("#VOTE_END").calendar({
				minDate: myDate
			});
			var numVote = 0;
			$(".add-vote-item").on('click', function() {
				numVote++;
				var yy = getchinese(numVote);
				$('#voteItemList').append('<li class="swipeout"><div class="swipeout-content"><div class="item-content"><div class="item-inner"><div class="item-title label">选项' + yy + '</div><div class="item-input"><input type="text" placeholder="请输入选项内容" name="VOTE_CONTENT" required></div></div></div></div><div class="swipeout-actions-right"> <a class="bg-danger swipeout-delete" href="#">删除</a></div></li>');
			});
			$(document).off('click', '#page-addVote-send').on('click', '#page-addVote-send', function() {
				var totals = $('#voteItemList li').length; //判断投票选项的个数
				if(totals < 2) {
					plus.nativeUI.toast('投票选项至少两项');
					return;
				}
				$('#voteItemList li input').each(function() { //遍历投票选项获取投票选项的值
					voteLengthList = $(this).val();
				});
				if(voteLengthList.length == 0) {
					plus.nativeUI.toast('投票选项存在空内容');
					return;
				}
				var VOTE_STAR = $("#VOTE_STAR").val();
				var VOTE_END = $("#VOTE_END").val();
				var VOTE_TITLE = $("#VOTE_TITLE").val();
				var VOTE_DESC= $("#VOTE_DESC").val();
				for ( var i = 0; i < VOTE_DESC.length; i++) {  
			        var hs = VOTE_DESC.charCodeAt(i);  
			        if (0xd800 <= hs && hs <= 0xdbff) {  
			            if (VOTE_DESC.length > 1) {  
			                var ls = VOTE_DESC.charCodeAt(i + 1);  
			                var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;  
			                if (0x1d000 <= uc && uc <= 0x1f77f) {  
			                	plus.nativeUI.toast("不能输入emoji表情!");
			                    return;  
			                }  
			            }  
			        } else if (VOTE_DESC.length > 1) {  
			            var ls = VOTE_DESC.charCodeAt(i + 1);  
			            if (ls == 0x20e3) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            }  
			        } else {  
			            if (0x2100 <= hs && hs <= 0x27ff) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x2B05 <= hs && hs <= 0x2b07) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x2934 <= hs && hs <= 0x2935) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x3297 <= hs && hs <= 0x3299) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030  
			                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b  
			                    || hs == 0x2b50) {  
			                    	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            }  
			        }  
			    }
				if(VOTE_DESC=="" || $.trim(VOTE_DESC) == ""){
					plus.nativeUI.toast('请填写投票说明');
					return;
				}
				if(VOTE_STAR=="" || VOTE_END == ""){
					plus.nativeUI.toast('存在内容未填写');
					return;
				}
				if(VOTE_TITLE==""){
					plus.nativeUI.toast('请填写投票标题');
					return;
				}
				var result = utils.getUnixTimeDetail(VOTE_STAR, VOTE_END);
				var form = $('#page-addVote-subit');
				var dt = new FormData(form.get(0));
				if(result == true || result == 1001) {
					plus.nativeUI.confirm("确定提交投票?", function(event) {
						if(event.index == 0) {
							njyy_data.postVote(dt, function(data) {
								if(data.SystemCode == 1) {
									plus.nativeUI.toast('提交成功');
									$.router.back();
								} else {
									plus.nativeUI.toast('提交投票失败');
								}
							});
						}
					}, "投票提交", ["确定", "取消"]);
				} else {
					plus.nativeUI.toast('开始时间不能大于结束时间');
				}
			});

			function getchinese(p) {
				var input = p.toString();
				var result = "";
				for(var s in input) {
					switch(input[s]) {
						case "0":
							result += "零";
							break;
						case "1":
							result += "一";
							break;
						case "2":
							result += "二";
							break;
						case "3":
							result += "三";
							break;
						case "4":
							result += "四";
							break;
						case "5":
							result += "五";
							break;
						case "6":
							result += "六";
							break;
						case "7":
							result += "七";
							break;
						case "8":
							result += "八";
							break;
						case "9":
							result += "九";
							break;
						default:
							break;
					}
				}
				return result;
			}
		});

		/*页面：投票列表页面
		 *事件：页面加载
		 *创建/修改：左武洲
		 *时间：2016/6/27 9:02
		 */
		$(document).on('pageInit', '#page-voteList', function(e, id, page) {
			var roleId = CURRENT_USER.ROLE;
			var nextUrl = 10001;
			var nextUrl1 = 10001;
			var loading = false;
			var timeTotle = [];
			var vm = new Vue({
				el: '#page-voteList',
				data: {
					voteClassList: [],
					voteList: [],
					timeTotle: [],
					roleId: roleId
				},
				methods: {
					getTimeTip: utils.getTimeTip,
					hrefSchool: function(item) {
						var pp = item.VOTE_ID
						$.router.loadPage({
							url: "voteDetail.html?id=" + pp,
							noAnimation: true,
							replace: false
						});
					},
					hrefClass: function(item) {
						var pp = item.VOTE_ID
						$.router.loadPage({
							url: "voteDetail.html?id=" + pp,
							noAnimation: true,
							replace: false
						});
					}

				},
				components: {
					'v-bar': vBar
				},
			});

			getVoteSchollList(); //校园

			

			$('#tab1').bind('refresh', '.pull-to-refresh-content', function(e) {
				getVoteSchollList(true);
			});
			$('#tab2').bind('refresh', '.pull-to-refresh-content', function(e) {
				getVoteClassList(true);
			});

			//上拉加载
			$('#page-voteList').on('infinite', '#tab1', function() {
				// 如果正在加载，则退出
				if(loading) return;
				loading = true;
				if(nextUrl == 10001) {
					loading = false;
					$('#tab1 .infinite-scroll-preloader').html('已经到底了...');
				} else {
					$('#page-voteList  .infinite-scroll-preloader').html('<div class="preloader"></div>');
					njyy_data.getSchoolList(function(data) {
						if(data.SystemCode == 1) {
							nextUrl = data.nextUrl;
							vm.voteList = vm.voteList.concat(data.votesList);
						} else {
							plus.nativeUI.toast('请求出错');
						}
						loading = false;
					}, nextUrl);
				}
			});

			//上拉加载
			$('#page-voteList').on('infinite', '#tab2', function() {
				// 如果正在加载，则退出
				if(loading) return;
				loading = true;
				if(nextUrl1 == 10001) {
					loading = false;
					$('#tab2 .infinite-scroll-preloader').html('已经到底了...');
				} else {
					$('#page-voteList .infinite-scroll-preloader').html('<div class="preloader"></div>');
					njyy_data.getClassList(function(data) {
						if(data.SystemCode == 1) {
							nextUrl1 = data.nextUrl;
							vm.voteClassList = vm.voteClassList.concat(data.voteList);
						} else {
							plus.nativeUI.toast('请求出错');
						}
						loading = false;
					}, nextUrl1);
				}
			});

			//初始化校园信息列表
			function getVoteSchollList(isRefresh) {
				isRefresh = isRefresh || false;
				njyy_data.getSchoolList(function(data) {
					if(data.SystemCode == 1) {
						nextUrl = data.nextUrl;
						vm.voteList = data.votesList;
						$('#page-voteList .infinite-scroll-preloader').html('');
					} else if(data.SystemCode == 10001) {
						plus.nativeUI.toast('没有投票数据哦');
					} else {
						plus.nativeUI.toast('请求出错');
					}
					$.pullToRefreshDone('#page-voteList .pull-to-refresh-content');
				});

			}
			
			document.getElementById("tab2Btn").addEventListener("click", function() {
				getVoteClassList(); //班级
			})

			//初始化班级信息列表
			function getVoteClassList(isRefresh) {
				isRefresh = isRefresh || false;
				njyy_data.getClassList(function(data) {
					console.log("投票列表班级:"+JSON.stringify(data))
					if(data.SystemCode == 1) {
						nextUrl1 = data.nextUrl;
						vm.voteClassList = data.voteList;
						$('#page-voteList .infinite-scroll-preloader').html('');
					} else if(data.SystemCode == 10001) {
						plus.nativeUI.toast('没有投票数据哦');
					} else {
						plus.nativeUI.toast('请求出错');
					}
					$.pullToRefreshDone('#page-voteList .pull-to-refresh-content');
				});

			}
			var $pubCircleBtn = $('#pubCircleBtn');
			$('#page-voteList .com-tab').find('#tab1Btn').click(function() {
				$pubCircleBtn.hide();
			}).end().find('#tab2Btn').click(function() {
				$pubCircleBtn.show();
			});
		});
		/**
		 *页面：投票详情页面
		 *事件：页面加载
		 *创建/修改：左武洲
		 *时间：2016/6/28 9:02
		 */
		$(document).on('pageInit', '#page-voteDetail', function(e, id, page) {
			var recordPeopleId = CURRENT_USER.USER_ID;
			$("#RECORED_PEOPLE_ID").val(recordPeopleId);
			var id = utils.getId();
			var userId = CURRENT_USER.USER_ID;
			$("#VOTE_ID").val(id);
			var data = {};
			var example1 = new Vue({
				el: '#page-voteDetail',
				data: {
					item: [],
					items: [],
					greeting: greeting,
					isWorking: false
				},
				components: {
					'v-bar': vBar,
					'v-nav': vNav
				}
			})
			njyy_data.getVoteDetail(id, userId, function(data, greeting) {
				console.log(JSON.stringify(data))
				example1.item = data;
				example1.items = data.votelist;
				example1.item.vote_DESC = example1.item.vote_DESC.replace(/\n/g,'<br/>')
				example1.item.vote_DESC = example1.item.vote_DESC.replace(/\s/g,'&nbsp;')
				if(greeting == 10002) {
					example1.greeting = 1;
				} else {
					example1.greeting = 0;
				}
				
				if ((((new Date(data.vote_STAR)).getTime()) <= ((new Date()).getTime())) && (((new Date(data.vote_END)).getTime())+86400000 >= ((new Date()).getTime()))) {
					console.log("显示")
					example1.isWorking = true;
				}

			});

			/*点击提交投票结果*/
			$(document).off('click', '#expert-answer-button').on('click', '#expert-answer-button', function() {
				obj = document.getElementsByName("DETAIL_ID");
				check_val = [];
				for(k in obj) {
					if(obj[k].checked)
						check_val.push(obj[k].value);
				}
				var obj = {
					VOTE_ID: $("#VOTE_ID").val(),
					RECORED_PEOPLE_ID: $("#RECORED_PEOPLE_ID").val(),
					DETAIL_ID: check_val.toString()
				}
				if(check_val == "") {
					plus.nativeUI.toast('请选择投票选项');
					return;
				} else {
					plus.nativeUI.confirm("确定提交投票?", function(e) {
						if(e.index == 0) {
							njyy_data.postVotePerson(obj, function(data) {
								if(data.SystemCode == 1) {
									plus.nativeUI.toast('提交成功');
									$.router.back();
								} else {
									plus.nativeUI.toast('你已经投过票了');
								}
							})
						}
					}, "提交投票", ["确定", "取消"]);
				}
			});

		});
		/**
		 * 绑定的手机号
		 */
		$DOCUMENT.on('pageInit', "#setting-current-phonenum", function(e, id, page) {
			var phoneNum = CURRENT_USER.USER_NAME;
			$("#current-phonenum").val(phoneNum);
			new Vue({
				el: '#setting-current-phonenum',
				components: {
					'v-bar': vBar
				}
			});
		});
		/**
		 * 修改绑定的手机号
		 */
		$DOCUMENT.on('pageInit', "#change-current-phonenum", function(e, id, page) {
			var phoneNum = CURRENT_USER.USER_NAME;
			$("#current-phonenum").val(phoneNum);
			new Vue({
				el: '#change-current-phonenum',
				components: {
					'v-bar': vBar
				}
			});
		});
		/**
		 *页面：班级课表
		 *事件：页面加载
		 *创建/修改：李路丹
		 *时间：2016/6/28 9:02
		 */
		$DOCUMENT.on('pageInit', "#page-class", function(e, id, page) {
			new Vue({
				el: '#page-class',
				components: {
					'v-bar': vBar
				}
			});
		});
		/**
		 *页面：问卷调查
		 *事件：页面加载
		 *创建/修改：王书静
		 *时间：2016/6/28 9:02
		 */
		$DOCUMENT.on('pageInit', "#ques-survey-list", function(e, pageId, $page) {
			var code;
			var loading = false;
			var nextUrl = 10001;
			var vm = new Vue({
				el: '#ques-survey-list',
				components: {
					'v-bar': vBar,
				},
				data: {
					items: [],
				},
				methods: {
					gotoDetail: function(item) {
						id = item.RESEARCH_ID;
						$.router.loadPage({
							url: "qusSurveyDetail.html?id=" + id,
							noAnimation: false,
							repalce: true
						});
					},
					back: function(path) {
						$.router.loadPage({
							url: path,
							noAnimation: true,
							repalce: true
						});
					}

				},
			});
			getqusSurveyList();
			//下拉刷新
			$('#ques-survey-list').on('refresh', '.pull-to-refresh-content', function(e) {
				getqusSurveyList(true);
			});

			//上拉加载
			$('#ques-survey-list').on('infinite', '.infinite-scroll', function() {
				// 如果正在加载，则退出
				if(loading) return;
				loading = true;
				if(nextUrl == 10001) {
					loading = false;
					$('#ques-survey-list .infinite-scroll-preloader').html('已经到底了...');
				} else {
					$('#ques-survey-list .infinite-scroll-preloader').html('<div class="preloader"></div>');
					njyy_data.getQuestionList(function(data) {
						console.log(JSON.stringify(data))
						if(data.SystemCode == 1) {
							nextUrl = data.nextUrl;
							vm.items = vm.items.concat(data.researchList);
						} else {
							plus.nativeUI.toast('请求出错');
						}
						loading = false;
					}, nextUrl);
				}
			});

			function getqusSurveyList(isRefresh) {
				isRefresh = isRefresh || false;
				njyy_data.getQuestionList(function(data) {
					console.log(JSON.stringify(data));
					//vue绑定数据
					var code = data.SystemCode;
					if(code == 1) {
						nextUrl = data.nextUrl;
						vm.items = data.researchList;
					} else if(code == 10001) {
						plus.nativeUI.toast("没有记录");
					} else {
						plus.nativeUI.toast("请求出错");
					}
					$.pullToRefreshDone('#ques-survey-list .pull-to-refresh-content');
				})
			}

		});
		/**
		 * 问卷调查说明
		 */
		$DOCUMENT.on('pageInit', "#qus-survey-detail", function(e, id, page) {
			var id = utils.getId(); //问卷调查id
			var vm = new Vue({
				el: '#qus-survey-detail',
				components: {
					'v-bar': vBar,
				},
				data: {
					item: {},
					startBtn: true,
					btnText: '开始问卷调查'
				},
				watch: {
					item: function() {
						console.log(JSON.stringify(this.item))
					}
				}
			});
			njyy_data.getQuestionDetail(id, CURRENT_USER.USER_ID, function(data) {
				vm.item = data;
				console.log(JSON.stringify(data))
				vm.item.END_TIME = vm.item.END_TIME.replace(/\s+/g,'')
				vm.item.START_TIME = vm.item.START_TIME.replace(/\s+/g,'')
				vm.item.RESEARCH_DESC = vm.item.RESEARCH_DESC.replace(/\n/g,'<br/>')
				vm.item.RESEARCH_DESC = vm.item.RESEARCH_DESC.replace(/\s/g,'&nbsp;')
				if ((((new Date(vm.item.END_TIME)).getTime()+86400000) <= (new Date()).getTime())&&(data.isVote == '1')) {
					console.log("结束时间")
					vm.startBtn = false
				}
				if (((new Date(vm.item.START_TIME)).getTime() >= (new Date()).getTime())&&(data.isVote == '1')) {
					console.log("开始时间")
					vm.startBtn = false
				}
				if (data.isVote == '0') {
					vm.btnText = '查看问卷记录'
				}
			})
			//开始进行问卷调查按钮
			$("#begin-qus-survey").on('click', function() {
				$.router.loadPage({
					url: "questionnaireResponse.html?id=" + vm.item.isVote + ',' + id,
					noAnimation: false,
					repalce: true
				});
			});

		});
		/**
		 * 进行问卷调查
		 */
		$DOCUMENT.on('pageInit', "#qus-response", function(e, id, page) {
			var qusId = utils.getId().split(',')[1]; //问卷调查id
			var index = 0;
			var json = {
				"RECORD_PEOPLE_ID": CURRENT_USER.USER_ID,
				"RESEARCH_ID": qusId
			};
			var anserList = [];
			var jsonItem;
			var vm = new Vue({
				el: '#qus-response',
				components: {
					'v-bar': vBar,
				},
				data: {
					tag: 0,
					userid: CURRENT_USER.USER_ID,
					outNum: 0, //调查问题数量
					qusId: qusId, //问卷调查id
					outList: {},
					option: {},
					OneSELECTED: '',
					resultsTmp: {},
					results: [],
					anserTmp: [],
					submitBtn: utils.getId().split(',')[0]
				},
				ready: function() {
					this.option = {};
				},
				methods: {
					selectedThis: function(index, thisOptionId, thisQuestionId) {
						this.option.optionList[index].SELECTED = thisOptionId
						/*this.resultsTmp = {}
						icain_tmp.OPTION_ID = thisOptionId
						icain_tmp.QUESTION_ID = thisQuestionId
						this.results[index] = icain_tmp*/
					},
					surveyNext: function() {
						var question_id = $("#QUESTION_ID1").val();
						var checkboxId = getCheckboxId();
						var OPTION_ID = $("#OPTION_ID").val();
						this.OneSELECTED = checkboxId;
						console.log(OPTION_ID)
						if(OPTION_ID == "" && checkboxId == "") {
							plus.nativeUI.toast("请填写问卷内容");
							return;
						} else if (OPTION_ID && OPTION_ID.length>200) {
							plus.nativeUI.toast("问卷内容不超过200字");
							return;
						} else if(checkboxId == "" && OPTION_ID == undefined) {
							plus.nativeUI.toast("你还没有选中任何内容!");
							return;
						}
						if (document.getElementById("OPTION_ID") && document.getElementById("OPTION_ID").value) {
							vm.option.rESEARCH_RESULT = document.getElementById("OPTION_ID").value
							var anser = {};
							this.anserTmp.iCainSign = 1;
							anser.OPTION_ID = document.getElementById("OPTION_ID").value
							anser.QUESTION_ID = question_id
							anserList.push(anser);
						} else {
							this.anserTmp = getCheckboxId().toString().split(',')
							this.anserTmp.iCainSign = 0;
							console.log(JSON.stringify(this.anserTmp))
							for (var i=0; i<this.anserTmp.length; i++) {
								var anser = {};
								console.log(this.anserTmp[i])
								anser.OPTION_ID = this.anserTmp[i]
								anser.QUESTION_ID = question_id
								anserList.push(anser);
							}
						}

						/*var anser = {
							"OPTION_ID": getCheckboxId().toString(),
							"QUESTION_ID": question_id
						}*/
						console.log('2'+JSON.stringify(anserList))
						
						index += 1;
						vm.option = {};
						vm.option = vm.outList[index];
						console.log(index+"==========vm.option: "+JSON.stringify(vm.option))
						console.log(index+"==========vm.outList[index]: "+JSON.stringify(vm.outList[index]))
						getTag(index + 1);
						if (document.getElementById("OPTION_ID") && (vm.option.rESEARCH_RESULT == null)) {
							console.log("清空")
							document.getElementById("OPTION_ID").value = ""
						}
					},
					surveyLast: function(icainNumber) {
						index -= 1;
						vm.option = vm.outList[index];
						getTag(vm.option.qUESTION_NUM);
						/*if (icainNumber) {
							anserList.pop()
						}*/
						if (this.anserTmp.iCainSign) {
							anserList.pop()
							console.log(anserList.length+'1'+JSON.stringify(anserList))
						} else {
							anserList.splice((anserList.length - this.anserTmp.length), this.anserTmp.length)
							console.log(anserList.length+'0'+JSON.stringify(anserList))
						}
					},
					surveyCommit: function() {
						var question_id = $("#QUESTION_ID1").val();
						var checkboxId = getCheckboxId();
						if(checkboxId == "") {
							plus.nativeUI.toast("你还没有选中任何内容!");
							return;
						}
						/*var anser = {
							"OPTION_ID": getCheckboxId().toString(),
							"QUESTION_ID": question_id
						}*/
						if (document.getElementById("OPTION_ID") && document.getElementById("OPTION_ID").value) {
							this.option.rESEARCH_RESULT = document.getElementById("OPTION_ID").value
							var anser = {};
							this.anserTmp.iCainSign = 1;
							anser.OPTION_ID = document.getElementById("OPTION_ID").value
							if (anser.OPTION_ID.length>200) {
								plus.nativeUI.toast("问卷内容不超过200字");
								return;
							}
							anser.QUESTION_ID = question_id
							anserList.push(anser);
						} else {
							this.anserTmp = getCheckboxId().toString().split(',')
							this.anserTmp.iCainSign = 0;
							console.log(JSON.stringify(this.anserTmp))
							for (var i=0; i<this.anserTmp.length; i++) {
								var anser = {};
								console.log(this.anserTmp[i])
								anser.OPTION_ID = this.anserTmp[i]
								anser.QUESTION_ID = question_id
								anserList.push(anser);
							}
						}
						json["anserList"] = anserList;
						var jStr = JSON.stringify(json); //把json对象转化成json字符串
						console.log(jStr)
//						return
						jQuery.support.cors = true; //查询数据
						$.ajax({
							type: "POST",
							url: url + "/client/research/add?jStr=" + encodeURI(encodeURI(jStr)),
							error: function() {
								plus.nativeUI.toast("请求出错");
							},
							success: function(data) {
								if(data.SystemCode == 1) {
									plus.nativeUI.toast('提交成功');
									$.router.back();
								} else if(data.SystemCode == 10002) {
									plus.nativeUI.toast('你已经参加过本次问卷调查');
									$.router.back();
								}
							}
						});
					}
				},
				watch: {
					option: function() {
//						console.log(JSON.stringify(this.option))
					}
				}

			});
			jQuery.support.cors = true; //查询数据
			console.log(url + "/client/research/findDetail?researchId="+qusId+"&userId="+CURRENT_USER.USER_ID)
			$.ajax({
				type: "GET",
				url: url + "/client/research/findDetail",
				data: {
					'researchId': qusId,
					'userId': CURRENT_USER.USER_ID
				},
				contentType: "json",
				error: function() {
					plus.nativeUI.toast("请求出错");
				},
				success: function(data) {
					//vue绑定数据
					console.log(JSON.stringify(data))
					if(data.SystemCode == 1) {
						vm.outList = data.outList;
						vm.outNum = data.outList.length;
						vm.option = vm.outList[index];
						if(vm.outNum == 1) {
							vm.tag = 1;
						}
						if (vm.option.qUESTION_NUM != undefined) {
							getTag(vm.option.qUESTION_NUM);
						}
					}
				}
			});

			//获取checkbox选中的值
			function getCheckboxId() {
				var obj = document.getElementsByName('OPTION_ID'); //选择所有name="OPTION_ID"的对象，返回数组 
				//取到对象数组后，我们来循环检测它是不是被选中 
				var s = [];
				var is_choice = $(".iS_CHOICE").val();
				//简答
				if(is_choice == 2) {
					s.push(obj[0].value);
				} else {
					for(var i = 0; i < obj.length; i++) {
						if(obj[i].checked) {
							s.push(obj[i].value);
						}
					}
				}

				return s;
			}

			function getTag(questionNum) {
				if(vm.outNum == 1) {
					return
				}
				if(questionNum == 1) {
					vm.tag = 2;
				}
				if(questionNum > 1) {
					if(questionNum < vm.outNum) {
						vm.tag = 3;
					}
					if(questionNum == vm.outNum) {
						vm.tag = 4;
					}
				}
			}

		});
		/**
		 *页面：文件管理
		 *事件：页面加载
		 *创建/修改：左武洲
		 *时间：2016/7/5 16:25
		 */
		$DOCUMENT.on('pageInit', '#page-fileManage', function(e, id, page) {
			var loading = false;
			var nextUrl = ["10001", "10001", "10001", "10001"];
			var vm = new Vue({
				el: '#page-fileManage',
				data: {
					studyList: [],
					schoolList: [],
					ruleList: [],
					disciplineList: []
				},
				components: {
					'v-bar': vBar,
					'file-item': {
						template: '#fileListItem',
						props: ['item'],
						methods: {
							download: function(name, url, id) {
								var path = FILE_PATH + name;
								plus.io.resolveLocalFileSystemURL(path, function(entry) {
									plus.runtime.openFile(path);
                                
								}, function(e) {
									plus.nativeUI.confirm("文件需要下载?", function(e) {
										if(e.index == 0) {
											$('#' + id).children('.file-size').hide();
											$('#' + id).children('.file-progress-container').show();
											var task = plus.downloader.createDownload(SERVER_DOWNLOAD_PATH + url, {
												filename: FILE_PATH + name
											});
											task.addEventListener("statechanged", function(task, status) {
												if(task.state == 3) {
													var width = ((task.downloadedSize / task.totalSize) * 100).toFixed(2);
													$('#' + id + ' .file-progress-bar').width(width + "%");
												}
												if(task.state == 4 && status == 200) {
													plus.nativeUI.toast('下载成功');
													$('#' + id).children('.file-progress-container').hide();
													$('#' + id).children('.file-size').show();
												}
												if(task.state == 4 && status !== 200) {
													plus.nativeUI.toast('下载失败');
													$('#' + id).children('.file-progress-container').hide();
													$('#' + id).children('.file-size').show();
												}
											}, false);
											task.start();
										}
									}, "下载提示", ["确定", "取消"]);
								});
							}
						}
					}
				}
			});
			window.njyy_data.getFileList(1, function(data) {
				vm.studyList = data.varList;
				nextUrl[0]=data.nextUrl
			}, "/client/file/listPage?currentPage=1");
			window.njyy_data.getFileList(2, function(data) {
				vm.schoolList = data.varList;
				nextUrl[1]=data.nextUrl
			}, "/client/file/listPage?currentPage=1");
			window.njyy_data.getFileList(3, function(data) {
				vm.ruleList = data.varList;
				nextUrl[2]=data.nextUrl
			}, "/client/file/listPage?currentPage=1");
			window.njyy_data.getFileList(4, function(data) {
				vm.disciplineList = data.varList;
				nextUrl[3]=data.nextUrl
			}, "/client/file/listPage?currentPage=1");

			//下拉刷新
			$('#page-fileManage').on('refresh', '.pull-to-refresh-content', function(e) {
				var category = $(this).data('category');
				window.njyy_data.getFileList(category, function(data) {
					if(category==1){
						vm.studyList = data.varList;
						nextUrl[0]=data.nextUrl;
					}else if(category==2){
					   vm.schoolList = data.varList;
					   nextUrl[1]=data.nextUrl;
					}	
					else if(category==3){
						vm.ruleList = data.varList;
						nextUrl[2]=data.nextUrl;
					}else{
						vm.disciplineList = data.varList;
						nextUrl[3]=data.nextUrl;
					}
					$.pullToRefreshDone($(this).children('.pull-to-refresh-content'));
				}, "/client/file/listPage?currentPage=1");

			});

			//上拉加载
			$('#page-fileManage').on('infinite', '.infinite-scroll', function() {
				// 如果正在加载，则退出
				if(loading) return;
				loading = true;
				var category = $(this).data('category');
				if(nextUrl[category - 1] == 10001) {
					loading = false;
					$(this).children('.infinite-scroll-preloader').html('已经到底了...');
				} else {
					$(this).children('.infinite-scroll-preloader').html('<div class="preloader"></div>');
					var _this = this;
					window.njyy_data.getFileList(category, function(data) {	
						if (data.nextUrl == 10001) {
							$(_this).children('.infinite-scroll-preloader').html('已经到底了...');
						}
						console.log(category)
						if(category==1){
							vm.studyList = vm.studyList.concat(data.varList);
						}else if(category==2){
						   vm.schoolList = vm.schoolList.concat(data.varList);
						}	
						else if(category==3){
						   vm.ruleList = vm.ruleList.concat(data.varList);
						}else{
						   vm.disciplineList = vm.disciplineList.concat(data.varList);
						}
						nextUrl[category - 1] = data.nextUrl;
						console.log(JSON.stringify(nextUrl))
						loading = false;
					}, nextUrl[category - 1]);
				}
			});

			//选项卡切换
			$('#page-fileManage').on('click', '.file-manage-tab-bar li', function() {
				var index = $(this).index();
				$('.file-manage-tab-bar .active-tab-bar').removeClass('active-tab-bar');
				$(this).addClass('active-tab-bar');
				$('.file-manage-list-container .list-active').removeClass('list-active');
				$('.file-manage-list-container .list-tab:nth-child(' + (index + 1) + ')').addClass('list-active');
			});
		});
		/**
		 *页面：新增院长信箱
		 *事件：页面加载
		 *创建/修改：王乐乐/李路丹
		 *时间：2016/7/05 14:00
		 */

		$DOCUMENT.on('pageInit', "#page-createEmail", function(e, id, page) {
			new Vue({
				el: '#page-createEmail',
				components: {
					'v-bar': vBar
				}
			});
			$DOCUMENT.off('click', '.email-ok').on('click', '.email-ok', function() {
				var emailcontent = $("#email-text").val();
				var creatMail = {
					"MAIL_CONTENT": emailcontent,
					"MAIL_SENDER": CURRENT_USER.USER_ID
				}
				if ($.trim(emailcontent) == "") {//判断是否为空格
                plus.nativeUI.toast('新增选项不能为空');
                return;
                }
				if (emailcontent.length>200) {
					plus.nativeUI.toast('内容不得超过200字');
					return
				}
				for ( var i = 0; i < emailcontent.length; i++) {  
			        var hs = emailcontent.charCodeAt(i);  
			        if (0xd800 <= hs && hs <= 0xdbff) {  
			            if (emailcontent.length > 1) {  
			                var ls = emailcontent.charCodeAt(i + 1);  
			                var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;  
			                if (0x1d000 <= uc && uc <= 0x1f77f) {  
			                	plus.nativeUI.toast("不能输入emoji表情!");
			                    return;  
			                }  
			            }  
			        } else if (emailcontent.length > 1) {  
			            var ls = emailcontent.charCodeAt(i + 1);  
			            if (ls == 0x20e3) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            }  
			        } else {  
			            if (0x2100 <= hs && hs <= 0x27ff) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x2B05 <= hs && hs <= 0x2b07) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x2934 <= hs && hs <= 0x2935) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x3297 <= hs && hs <= 0x3299) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030  
			                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b  
			                    || hs == 0x2b50) {  
			                    	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            }  
			        }  
			    }
				if(emailcontent == "") {
					plus.nativeUI.toast('新增选项不能为空');
					return;
				} else {
					plus.nativeUI.confirm("确定新增院长信件?", function(e) {
						if(e.index == 0) {
							njyy_data.postCreateEmail(creatMail, function(data) {
								if(data.SystemCode == 1) {
									plus.nativeUI.toast('新增院长信件成功');
									$.router.back();
								} else {
									plus.nativeUI.toast('新增出错');
								}
							})
						}
					}, "新增院长信件", ["确定", "取消"]);
				}

			});
		});
		/**
		 *页面：查询院长信箱列表
		 *事件：页面加载
		 *创建/修改：王乐乐/李路丹
		 *时间：2016/7/05 14:00
		 */
		$DOCUMENT.on('pageInit', "#page-email", function(e, id, page) {
			var userId = CURRENT_USER.USER_ID;
			var nextUrl = 10001;
			var loading = false;
			var vm = new Vue({
				el: '#page-email',
				data: {
					mailboxList: [],
					host: njyy_data.HOST
				},
				methods: {
					delete: function(item) {
						njyy_data.deleteEmail(item.MD5CODE, function(data) {
							if(data.SystemCode == 1) {
								vm.mailboxList.$remove(item);

							} else {
								plus.nativeUI.toast('操作失败');
							}
						});
						event.stopPropagation();
					},
					md5code: function(code) {
						$.router.loadPage({
							url: "email-information.html?id=" + code,
							noAnimation: true,
							replace: false
						});
					}
				},
				components: {
					'v-bar': vBar
				}
			});
			initEmail();
			$('#page-email').on('refresh', '.pull-to-refresh-content', function(e) {
				initEmail(true);
			});
			//上拉加载
			$('#page-email').on('infinite', '.pull-to-refresh-content', function() {
				// 如果正在加载，则退出
				if(loading) return;
				loading = true;
				if(nextUrl == 10001) {
					loading = false;
					$('#page-email .infinite-scroll-preloader').html('已经到底了...');
				} else {
					$('#page-email .infinite-scroll-preloader').html('<div class="preloader"></div>');
					njyy_data.getEmailList(userId, function(data) {
						console.log(JSON.stringify(data))
						if(data.SystemCode == 1) {
							nextUrl = data.nextUrl;
							vm.mailboxList = vm.mailboxList.concat(data.mailboxList);
						} else {
							plus.nativeUI.toast('请求出错');
						}
						loading = false;
					}, nextUrl);
				}
			});

			//初始化email列表
			function initEmail(isRefresh) {
				isRefresh = isRefresh || false;
				njyy_data.getEmailList(userId, function(data) {
					console.log("获取院长信箱列表: "+JSON.stringify(data))
					if(data.SystemCode == 1) {
						nextUrl = data.nextUrl;
						vm.mailboxList = data.mailboxList;
						$('#page-email .infinite-scroll-preloader').html('');
					} else if (data.SystemCode == 10001) {
						plus.nativeUI.toast('没有记录');
					} else {
						plus.nativeUI.toast('请求出错');
					}
					$.pullToRefreshDone('#page-email .pull-to-refresh-content');
				});
			}

		});
		//信箱详情
		$DOCUMENT.on('pageInit', '#page-email-information', function(e, id, page) {
			var vm = new Vue({
				el: '#page-email-information',
				data: {
					email: [],
				},
				components: {
					'v-bar': vBar
				}
			});
			var md5code = utils.getId(); //获取code
			njyy_data.getEmailDetail(md5code, function(data) {
				console.log("信箱详情:"+JSON.stringify(data))
				if(data.SystemCode == 1) {
					vm.email = data;
					if(vm.email.mail.reply_CONTENT) {
						vm.email.mail.reply_CONTENT = vm.email.mail.reply_CONTENT.replace(/\n/g,'<br/>')
						vm.email.mail.reply_CONTENT = vm.email.mail.reply_CONTENT.replace(/\s/g,'&nbsp;')
					}
					if (vm.email.mail.mail_CONTENT) {
						vm.email.mail.mail_CONTENT = vm.email.mail.mail_CONTENT.replace(/\n/g,'<br/>')
						vm.email.mail.mail_CONTENT = vm.email.mail.mail_CONTENT.replace(/\s/g,'&nbsp;')
					}
				} else {
					plus.nativeUI.toast('请求出错');
				}
			})
		});

		//我的收藏
		$DOCUMENT.on('pageInit', "#page-favorite", function(e, id, page) {
			var nextUrl = 10001;
			var loading = false;
			var userId = CURRENT_USER.USER_ID;
			var vm = new Vue({
				el: '#page-favorite',
				data: {
					favoriteList: []
				},
				methods: {
					getTimeTip: utils.getTimeTip,
					delete: function(item) {
						njyy_data.deleteFavorite(item.FAVORITE_ID, function(data) {
							if(data.SystemCode == 1) {
								vm.favoriteList.$remove(item);
							} else {
								plus.nativeUI.toast('请求失败');
							}
						});
					},
					favoritehref: function(href) {
						$.router.loadPage({
							url: href,
							noAnimation: true,
							replace: false
						});
					}
				},
				components: {
					'v-bar': vBar
				}
			});

			njyy_data.getFavoriteList(userId, function(data) {
				if(data.SystemCode == 1) {
					nextUrl = data.nextUrl;
					vm.favoriteList = data.favoriteList;
					$('#page-message .infinite-scroll-preloader').html('');
				} else {
					plus.nativeUI.toast('请求失败');
				}
			});

			//上拉加载
			$('#page-favorite').on('infinite', '.infinite-scroll', function() {
				// 如果正在加载，则退出
				if(loading) return;
				loading = true;
				if(nextUrl == 10001) {
					loading = false;
					$('#page-favorite .infinite-scroll-preloader').html('已经到底了...');
				} else {

					$('#page-favorite .infinite-scroll-preloader').html('<div class="preloader"></div>');
					njyy_data.getFavoriteList(userId, function(data) {
						if(data.SystemCode == 1) {
							nextUrl = data.nextUrl;
							vm.favoriteList = vm.favoriteList.concat(data.favoriteList);
						} else {
							plus.nativeUI.toast('请求失败');
						}
						loading = false;
					}, nextUrl);
				}
			});
		});
		/**
		 * 社会版登录
		 */
		$DOCUMENT.on('pageInit', '#public-login', function(e, id, page) {
			var vm = new Vue({
				el: '#public-login',
				components: {
					'v-bar': vBar
				}
			});
		});
		/**
		 * 社会版注册
		 */
		$DOCUMENT.on('pageInit', '#public-register', function(e, id, page) {
			var vm = new Vue({
				el: '#public-register',
				components: {
					'v-bar': vBar
				}
			});
		});
		/**
		 *页面：工资单
		 *事件：工作查询
		 *创建/修改：刘有
		 *时间：2016/7/18 14:20
		 */

		$DOCUMENT.on('pageInit', "#mine-my-payroll", function(e, id, page) {
			var nextUrl = 10001;
			var vm = new Vue({
				el: '#mine-my-payroll',
				data: {
					wageList: [],
					activeIndex: 0
				},
				components: {
					'v-bar': vBar
				}
			});;
			var swiper = new Swiper('#minePayrollContainer', {
				onSlideChangeEnd: function(swiper, event) {
					vm.activeIndex = swiper.activeIndex;
					if(swiper.activeIndex == swiper.slides.length - 1 && nextUrl != 10001) {
						njyy_data.getMoney(CURRENT_USER.USER_ID, function(data) {
							nextUrl = data.nextUrl;
							vm.wageList = vm.wageList.concat(data.varList);
							vm.$nextTick(function() {
								swiper.updateSlidesSize();
							});
						}, nextUrl);
					}
				}
			});
			njyy_data.getMoney(2, function(data) {
				console.log(JSON.stringify(data))
				nextUrl = data.nextUrl;
				vm.wageList = data.varList;
				vm.$nextTick(function() {
					swiper.updateSlidesSize();
				});
			});

		});

		/**
		 *页面：手势密码
		 *事件:页面加载
		 *创建/修改:左武洲
		 *时间：2016/7/29 14:20
		 */
		$DOCUMENT.on('pageInit', '#gesture-index', function() {
			var checkGesture;
			if(!window.GESTURE_SETTING.IS_USED) {
				document.getElementById('gestureIsUsedBtn').removeAttribute('checked');
			}
			var vm = new Vue({
				el: '#gesture-index',
				components: {
					'v-bar': vBar
				}
			});
			//启用手势
			$('#gestureIsUsedBtn').on('click', function() {
				if($(this).is(":checked")) {
					window.GESTURE_SETTING.IS_USED = true;
					plus.nativeUI.toast('已启用手势密码');
					checkGesture=false;
				} else {
					checkGesture=true;
					window.GESTURE_SETTING.IS_USED = false;
					plus.nativeUI.toast('已关闭手势密码');
				}
				//更新本地手势配置
				plus.storage.setItem('GESTURE_SETTING', JSON.stringify(window.GESTURE_SETTING));
			});
			//修改手势
			$('#changeGestureBtn').on('click', function() {
				if(checkGesture==true){
					plus.nativeUI.toast('请先启用手势密码');
					return;
				}
				$.router.loadPage({
					url: 'gesture-panel.html',
					noAnimation: true,
					replace: false
				});
			});
		});

		/**
		 *页面：登录密码
		 *事件:页面加载
		 *创建/修改:左武洲
		 *时间：2016/7/29 14:20
		 */
		$DOCUMENT.on('pageInit', '#password-index', function() {
			var vm = new Vue({
				el: '#password-index',
				methods: {
					forgetPass:function(){
						plus.nativeUI.toast('联系管理员索取密码');
					}
				},
				components: {
					'v-bar': vBar
				}
			});

			//跳转修改登录密码页面
			$('#changePdBtn').on('click', function() {
				$.router.loadPage({
					url: "password-change.html",
					noAnimation: true,
					replace: false
				});
			});
		});

		/**
		 *页面：修改登录密码
		 *事件:页面加载
		 *创建/修改:左武洲
		 *时间：2016/7/29 15:00
		 */
		$DOCUMENT.on('pageInit', '#password-change', function() {
			var vm = new Vue({
				el: '#password-change',
				components: {
					'v-bar': vBar
				}
			});

			$('#cpChangePdBtn').on('click', function() {
				var oldPd = $('#cpOldPassword').val();
				var newPd = $('#cpNewPassword').val();
				var repeatPd = $('#cpRepeatPassword').val();
				var encrypt = new JSEncrypt();
                encrypt.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfH7HDHniemNLaCFF0dOtZ6KaLqZYHAEpJ12fa3bfoexuy1uU/7HI6dQzfapLEAPuMRumydi0e4HZEZGSUSokytbHF8PiQvxXxWnSJ7BsxUMgtyLXH/0eIah8yKwPvnhmcI9tWRR2p1vzMFLioH3sjfaPnRWiY8KthdxeuJ8wVPwIDAQAB");
                var encryptedOldPd = encrypt.encrypt(oldPd);
                var encryptedNewPd = encrypt.encrypt(newPd);
				if(oldPd === "") {
					plus.nativeUI.toast('原密码不能为空');
					return;
				}
				if(newPd === "") {
					plus.nativeUI.toast('新密码不能为空');
					return;
				}
				if(repeatPd === "") {
					plus.nativeUI.toast('重复密码不能为空');
					return;
				}
				if(repeatPd !== newPd) {
					plus.nativeUI.toast('密码输入不一致');
					return;
				}
				if(newPd.length != 6) {
					plus.nativeUI.toast('密码必须为6位');
					return;
				}
				if(newPd.match(/\d/) && newPd.match(/[a-zA-Z]/)) {
					njyy_data.updatePassword(CURRENT_USER.USER_ID, encryptedOldPd, encryptedNewPd, function(data) {
						switch(data.SystemCode) {
							case 0:
								plus.nativeUI.toast('服务器错误');
								break;
							case 1:
								plus.nativeUI.toast('修改成功,请重新登录');
								//重启应用
								plus.runtime.restart();
								break;
							case 1004:
								plus.nativeUI.toast('密码错误');
								break;
							default:
								plus.nativeUI.toast('请求失败');
								break;
						}
					});
				} else {
					plus.nativeUI.toast("您输入的密码至少包含一个数字和一个字母！");
					return false;
				}

			});
		});

		/**
		 *页面：修改手势密码
		 *事件:页面加载
		 *创建/修改:左武洲
		 *时间：2016/8/2 16:56
		 */
		$DOCUMENT.on('pageInit', '#gesture-panel', function() {
			var vm = new Vue({
				el: '#gesture-panel',
				components: {
					'v-bar': vBar
				}
			});
			new H5lock({
				chooseType: CHOOSE_TYPE,
				container: 'gesturePanelCotainer',
				title: 'gesturePanelTitle'
			}).init();
		});

		/**
		 *页面：手势密码登录
		 *事件:页面加载
		 *创建/修改:左武洲
		 *时间：2016/8/3 17:55
		 */
		$DOCUMENT.on('pageInit', '#gesture-login', function() {
			new H5lock({
				chooseType: CHOOSE_TYPE,
				container: 'gestureLoginCotainer',
				title: 'gestureLoginTitle',
				isLogin: true
			}).init();
		});

		/**
		 *页面：我的孩子
		 *事件:页面加载
		 *创建/修改:左武洲
		 *时间：2016/8/3 17:55
		 */
		$DOCUMENT.on('pageInit', '#mine-my-children', function() {
			var mvvm = new Vue({
				el: '#mine-my-children',
				data: {
					childrenList: CURRENT_USER.CHILDREN,
					showChildNameList: [],
					hideChildIdList: [],
					selectedChild: '',
				},
				created: function() {
					document.getElementById("picker-name").value = CURRENT_USER.SELECTED_CHILD.STUDENT_NAME + " "+ CURRENT_USER.SELECTED_CHILD.CLASS_NAME;
				},
				components: {
					'v-bar': vBar
				}
			});
			//加载孩子
			console.log(JSON.stringify(CURRENT_USER.CHILDREN))
			for(var i=0; i< CURRENT_USER.CHILDREN.length; i++) {
				mvvm.showChildNameList.push(CURRENT_USER.CHILDREN[i].STUDENT_NAME + ' ' + CURRENT_USER.CHILDREN[i].CLASS_NAME)
				mvvm.hideChildIdList.push(CURRENT_USER.CHILDREN[i].STUDENT_ID)
			}
			function selectThisChild() {
			}
			$("#picker-name").picker({
			  toolbarTemplate: '<header class="bar bar-nav"><h1 class="title">选择孩子</h1></header>',
			  cols: [
			    {
			      textAlign: 'center',
			      values: mvvm.showChildNameList,
			      onChange: function (picker, name) {
			      	for(var item in CURRENT_USER.CHILDREN) {
						if(CURRENT_USER.CHILDREN[item].STUDENT_NAME +" "+CURRENT_USER.CHILDREN[item].CLASS_NAME == name) {
							//修改选择孩子
							CURRENT_USER.SELECTED_CHILD = CURRENT_USER.CHILDREN[item];
							CURRENT_USER.CLASS_ID = CURRENT_USER.CHILDREN[item].CLASS_ID;
							//修改服务器选中孩子
							plus.nativeUI.showWaiting();
							console.log("正在切换")
							njyy_data.updateSeletedChild(CURRENT_USER.USER_ID, CURRENT_USER.CHILDREN[item].STUDENT_ID, function(data) {
								plus.nativeUI.closeWaiting();
							}, function() {
								plus.nativeUI.closeWaiting();
								plus.nativeUI.toast("切换失败!");
							});
							break;
						}
					}
			      }
			    }
			  ]
			});
			//选中孩子
			$('#myChildrenPicker').on('change', function() {
				var studentId = $(this).children('option:selected').val();
				
			});
		});

		/**
		 *页面：班级圈详情
		 *事件:页面加载
		 *创建/修改:左武洲
		 *时间：2016/8/3 17:55
		 */
		$DOCUMENT.on('pageInit', '#yy-circle-detail', function() {
			var vm = new Vue({
				el: '#yy-circle-detail',
				data: {
					nginx: NGINX_PATH,
					circleInfo: {},
					commentsList: []
				},
				components: {
					'v-bar': vBar
				},
				methods: {
					//返回图片地址数组
					getImagePath: function(path) {
						var arr = [];
						if(path.length > 0 && path.indexOf(',') > -1) {
							arr = path.split(',');
						} else {
							arr.push(path);
						}
						return arr;
						
					}
				}
			});
			var circleId = utils.getId();
			njyy_data.getClassCircleDetail(circleId, CURRENT_USER.USER_ID, function(data) {
				vm.circleInfo = data.msgClassMap;
				vm.commentsList = data.comList;
				vm.$nextTick(function() {
					loadImage();
				})
			});
			//缓存图片
			function loadImage() {
				//缓存并显示图片
				$('.yy-circle-item-image[src=""]').each(function() {
					var path = this.dataset.src;
					utils.fetchImage(path, this);
				});
			}
		});

		/**
		 *页面：关于
		 *事件:页面加载
		 *创建/修改:左武洲
		 *时间：2016/9/23 9:25
		 */
		$DOCUMENT.on('pageInit', '#page-about', function() {
			var vm = new Vue({
				el: '#page-about',
				components: {
					'v-bar': vBar
				}
			});
			//			var version=plus.runtime.version;
		});
		//移动办公
		$DOCUMENT.on('pageInit', '#page-mobileworking', function() {
			var mySwiper = new Swiper('.swiper-container', {
				direction: 'horizontal',
		        autoplay: 2000,
		        autoplayDisableOnInteraction: false,
		        loop: true,
		        pagination: '.swiper-pagination',
		        paginationClickable: true
			});
			var vm = new Vue({
				el: '#page-mobileworking',
				data:{
					items:[]
				},
				components: {
					'v-bar': vBar,
					'v-nav': vNav
				},
				methods: {
					choseItem: function(menu_URL) {
						$.router.loadPage({
							url: menu_URL,
							noAnimation: true,
							replace: false
						});
					}
				}
			});
			njyy_data.getMobileWork(CURRENT_USER.ACCEPT_ID, function(data) {
				if(data.SystemCode == 1) {
					vm.items=data.menuList;
				}else {
					plus.nativeUI.toast("暂无菜单权限");
				}
			});

		});
		//销假页面重新选择
		$DOCUMENT.on('pageInit', '#page-canclevat', function() {
			var userId = CURRENT_USER.USER_ID;
			var starttime = utils.getQueryString('starttime');
			var md5 = utils.getQueryString('id');
			var vm = new Vue({
				el: '#page-canclevat',
				components: {
					'v-bar': vBar
				}
			});
			//重新选择时间
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours();
			var minue = date.getMinutes();
			var chooseDate = year + '-' + p(month) + '-' + p(day) + " " + p(hour) + ':' + p(minute)
			$("#cancletime").val(chooseDate);

			function p(s) {
				return s < 10 ? '0' + s : s;
			}
			$("#cancletime").datetimePicker({
				toolbarTemplate: '<header class="bar bar-nav">\
		      <button class="button button-link pull-right close-picker">确定</button>\
		      <h1 class="title">请选择时间</h1>\
		      </header>'
			});
			$DOCUMENT.on('click', '.canclesub', function() {
				var cancletime = $("#cancletime").val();
				var str1 = utils.getUnixTime(starttime, cancletime);
				var cancletext = $("#cancletext").val();
				if(str1 == true) {
					if(cancletime == "" || cancletext == "") {
						plus.nativeUI.toast("请填全选项");
						return;
					} else {
						var cancleobj = {
							md5Code: md5,
							personId: userId,
							endTime: cancletime,
							Remark: cancletext
						}
						njyy_data.getcancelVacate(cancleobj, function(data) {
							if(data.SystemCode == 1) {
								$(".canclesub").unbind("click");
								plus.nativeUI.toast('销假成功');
								$.router.loadPage({
									url: "mobile-working.html",
									noAnimation: true,
									replace: true
								});
							} else {
								plus.nativeUI.toast('发布失败,请稍后再试');
							}
						});

					}
				} else {
					plus.nativeUI.toast("请填写正确的销假时间");
					return;
				}
			});
		});
		/**
		 *页面：财务/食堂师傅查询请假状况
		 *事件：页面加载
		 *创建/修改：李路丹
		 *时间：2017/2/28 10：24
		 */
		$DOCUMENT.on("pageInit", "#page-leaveSummary", function(e, pageId, $page) {
			var clickClass;
			var nowData = utils.getNowFormatDate();
			var vm = new Vue({
				el: '#page-leaveSummary',
				data: {
					summaryList: '',
					show: false,
					showDetail: false,
					summaryListClass: [],
					summaryListDetail: [],
					activeName: '',
				},
				methods: {
					clickClass: function() {
						if(clickClass==""){
							plus.nativeUI.toast('没有班级请假记录');
							return;
						}else{
						if(this.show == true && this.showDetail == true) {
							this.show = false;
							this.showDetail = false
						} else {
							this.show ? this.show = false : this.show = true;
						}
                         }
					},
					showDetailClass: function(index, orgId) {
						this.activeName = orgId;
						this.showDetail ? this.showDetail = false : this.showDetail = true;
						njyy_data.getSummaryClassDetail(nowData, orgId, function(data) {
							if(data.SystemCode == 1) {
								vm.summaryListDetail = data.List;
							} else if(data.SystemCode == 30003) {
								plus.nativeUI.toast('没有请假记录');
							} else {
								plus.nativeUI.toast("请求出错");
							}
						});
					}
				},
				components: {
					'v-bar': vBar,
					'v-nav': vNav
				}
			});
			njyy_data.getSummary(nowData, function(data) {
				console.log(JSON.stringify(data))
				if(data.SystemCode == 1) {
					vm.summaryList = data;
				} else if(data.SystemCode == 30003) {
					plus.nativeUI.toast('没有请假记录');
				} else {
					plus.nativeUI.toast("请求出错");
				}
			});
			njyy_data.getSummaryClass(nowData, function(data) {
				if(data.SystemCode == 1) {
					if(data.List==""){
						clickClass="";
					}
					vm.summaryListClass = data.List;
				} else if(data.SystemCode == 30003) {
					plus.nativeUI.toast('没有请假记录');
				} else {
					plus.nativeUI.toast("请求出错");
				}
			});
		});
		/**
		 *页面：工会活动
		 *事件：页面列表
		 *创建/修改：李路丹
		 *时间：2017/3/9 10：24
		 */
		$DOCUMENT.on("pageInit", "#unionActivity", function(e, pageId, $page) {
			var commonId; /*每天记录id*/
			var loading = false;
			var vm = new Vue({
				el: '#unionActivity',
				data: { //数据
					i: -1,
					show: true,
					showDetail: false,
					tradeActList: [],
					showMessage: false,
					/*评论对话框弹出默认隐藏*/
					comList: [],
					/*评论列表*/
					commentThis: ''
				},
				methods: { //方法
					addVote: function(item, _index) { /*点击投票*/
						if(item.VOTE_STATUS && item.VOTE_STATUS != 0) {
							plus.nativeUI.toast('您已经投过此票');
							return;
						} else {
							njyy_data.addVoteUion(CURRENT_USER.USER_ID, item.UN_ID, function(data) {
								console.log("工会活动投票"+JSON.stringify(data))
								if(data.SystemCode == 1) {
									plus.nativeUI.toast('投票成功');
									vm.tradeActList[_index].VOTENUM++;
									vm.tradeActList[_index].VOTE_STATUS = '1';
									console.log(JSON.stringify(vm.tradeActList[_index]))
								} else {
									plus.nativeUI.toast('投票出错');
								}
							})
						}
					},
					addComment: function(item, index) { /*点击弹出评论框*/
						this.showMessage = true;
						commonId = item.UN_ID;
						this.commentThis = index;
					},
					checkComment: function(item, index) { /*查询评论列表*/
						if(this.i == index) {
							this.i = -1;
						}else {
							this.i = index;
						}
						njyy_data.checkComment(item.UN_ID, function(data) {
							console.log(JSON.stringify(data))
							vm.comList = data.comList
						})
					},
					submitOk: function() {
						var comm_DATE = utils.getNowFormatTime; //获取系统当前时间
						var remark = $("#remark").val(); //获取评论的值
						for ( var i = 0; i < remark.length; i++) {  
			        var hs = remark.charCodeAt(i);  
			        if (0xd800 <= hs && hs <= 0xdbff) {  
			            if (remark.length > 1) {  
			                var ls = remark.charCodeAt(i + 1);  
			                var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;  
			                if (0x1d000 <= uc && uc <= 0x1f77f) {  
			                	plus.nativeUI.toast("不能输入emoji表情!");
			                    return;  
			                }  
			            }  
			        } else if (remark.length > 1) {  
			            var ls = remark.charCodeAt(i + 1);  
			            if (ls == 0x20e3) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            }  
			        } else {  
			            if (0x2100 <= hs && hs <= 0x27ff) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x2B05 <= hs && hs <= 0x2b07) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x2934 <= hs && hs <= 0x2935) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (0x3297 <= hs && hs <= 0x3299) {  
			            	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030  
			                    || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b  
			                    || hs == 0x2b50) {  
			                    	plus.nativeUI.toast("不能输入emoji表情!");
			                return;  
			            }  
			        }  
			    }
						if ($.trim(remark) == "") {
							plus.nativeUI.toast('请输入评论内容');
							return;
						}
						if(remark == "") {
							plus.nativeUI.toast('请输入评论内容');
							return;
						}
						njyy_data.subComment(CURRENT_USER.USER_ID, commonId, comm_DATE, remark, function(data) {
							if(data.SystemCode == 1) {
								plus.nativeUI.toast('评论成功!');
								njyy_data.checkComment(commonId, function(data) {
									if(data.SystemCode == 1) {
										vm.comList = data.comList;
										vm.showMessage = false;
										vm.tradeActList[vm.commentThis].COMMNUM = 1;
										document.getElementById("remark").value = ''
									}
								})
							} else {

							}
						})
					},
					submitCancle: function() {
						this.showMessage = false
						document.getElementById("remark").value = ''
					},
					unnionSignDetail: function(item, att_status) { /*点击报名*/
						console.log(JSON.stringify(item))
						var UN_ID = item.UN_ID;
//						var att_status = item.ATTNUM;
						$.router.loadPage({
							url: "union-activity-sign.html?id=" + UN_ID + "&att_status=" + att_status,
							noAnimation: true,
							replace: false
						});
					},
					checkdate :function(date){
						date = date.substring(0,10);
						return date;
					}
				},
				components: { //模板
					'v-bar': vBar,
					'v-nav': vNav
				}
			});
			Vue.filter('checkTime', function(value) {
				console.log(value.START_TIME)
				if((new Date(value.START_TIME.replace(/-/g, '/'))).getTime()<(new Date()).getTime()) {
					return false
				} else {
					if (value.ATT_STATUS && value.ATT_STATUS == "1") {
						return false
					} else {
						return true
					}
				}
			})
			getUnionActivityList();
			//下拉刷新
			$('#unionActivity').on('refresh', '.pull-to-refresh-content', function(e) {
				getUnionActivityList(true);
			});
			//上拉加载
			$('#unionActivity').on('infinite', '.infinite-scroll', function() {
				console.log("上拉加载")
				// 如果正在加载，则退出
				if(loading) return;
				loading = true;
				if(nextUrl == 10001) {
					loading = true;
					$('#unionActivity .infinite-scroll-preloader').html('已经到底了...');
				} else {
					$('#unionActivity .infinite-scroll-preloader').html('<div class="preloader"></div>');
					njyy_data.getUnionActivity(CURRENT_USER.USER_ID, function(data) {
						console.log(JSON.stringify(data))
						if(data.SystemCode == 1) {
							nextUrl = data.nextUrl;
							vm.tradeActList = vm.tradeActList.concat(data.tradeActList);
						} else {
							plus.nativeUI.toast('请求出错');
						}
						loading = false;
					}, nextUrl);
				}
			});
			//初始化工会列表
			function getUnionActivityList(isRefresh) {
				isRefresh = isRefresh || false;
				njyy_data.getUnionActivity(CURRENT_USER.USER_ID, function(data) {
					console.log("初始化工会列表: "+JSON.stringify(data))
					vm.i = -1;
					vm.tradeActList = [];
					if(data.SystemCode == 1) {
						nextUrl = data.nextUrl;
						vm.tradeActList = data.tradeActList;
						if(nextUrl == 10001 && !isRefresh) {
							$('#unionActivity .infinite-scroll-preloader').html('');
						} else if(nextUrl == 10001 && isRefresh) {
							$('#unionActivity .infinite-scroll-preloader').html('暂无更多');
						} else {
							$('#unionActivity .infinite-scroll-preloader').html('<div class="preloader"></div>');
						}
						if(isRefresh) {
							$.pullToRefreshDone('#unionActivity .pull-to-refresh-content');
						}
						loading = false;
					} else if(data.SystemCode == 10001) {
						$.pullToRefreshDone('#unionActivity .pull-to-refresh-content');
						plus.nativeUI.toast('没有工会记录');
					} else {
						$.pullToRefreshDone('#unionActivity .pull-to-refresh-content');
						plus.nativeUI.toast("请求出错");
					}
				});
			}
		});
		/**
		 *页面：工会活动
		 *事件：页面报名详情页
		 *创建/修改：李路丹
		 *时间：2017/3/9 10：24
		 */
		$DOCUMENT.on("pageInit", "#unionActivitySign", function(e, pageId, $page) {
			var UN_ID = utils.getId();
			var ATT_STATUS = 1; //提交点名默认值设置为1
			function GetQueryString(name) //判断att_status的值
			{
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				var r = window.location.search.substr(1).match(reg);
				if(r != null) return unescape(r[2]);
				return null;
			}
			var att_status = GetQueryString("att_status");
			var vm = new Vue({
				el: '#unionActivitySign',
				data: { //数据
					att_status: att_status,
					item: "",
					imgPath: njyy_config_picture,
				},
				methods: { //方法
					signOk: function() {
						plus.nativeUI.showWaiting();
						njyy_data.signOk(UN_ID, CURRENT_USER.USER_ID, ATT_STATUS, function(data) {
							plus.nativeUI.closeWaiting();
							console.log(JSON.stringify(data))
							if(data.SystemCode == 1) {
								if (data.sctivictyStatus!=undefined && data.sctivictyStatus==102) {
									plus.nativeUI.toast("该活动已取消");
								} else {
									plus.nativeUI.toast("报名成功");
									$.router.back();
								}
							} else {
								plus.nativeUI.toast("请求出错");
							}

						})
					}
				},
				components: { //模板
					'v-bar': vBar,
					'v-nav': vNav
				}
			});
			njyy_data.unionActivitySign(UN_ID,CURRENT_USER.USER_ID, function(data) {
				console.log("工会活动:"+JSON.stringify(data))
				if(data.SystemCode == 1) {
					vm.item = data;
					vm.item.UN_CONTENT = vm.item.UN_CONTENT.replace(/\n/g,'<br/>')
					vm.item.UN_CONTENT = vm.item.UN_CONTENT.replace(/\s/g,'&nbsp;')
					if((new Date(vm.item.START_TIME.replace(/-/g, '/'))).getTime()<(new Date()).getTime()) {
						vm.item.isTrue =  true
					} else {
						if (!vm.item.isTrue) {
							vm.item.isTrue =  false
						} else {
							vm.item.isTrue =  true
						}
					}
				} else {
					plus.nativeUI.toast("请求出错");
				}
			});
		});
		$.init(); //页面初始化
	})
}