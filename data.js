/**
 *数据接口
 *说明：封装调用接口与数据处理的方法
 *创建/修改：左武洲
 *时间：2016/5/31 11:07
 */
'use strict'
window.njyy_data = {
	HOST: njyy_config_host,
	/**
	 *方法：获取校园圈子
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：圈子json数据
	 *创建/修改：刘有
	 *时间：2016/6/14 10:43
	 */
	getSchool: function(callBack, url) {
		url = url || "/client/message/listPage?currentPage=1";
		url = this.HOST + url;
		$.getJSON(url, function(data) {
			callBack(data);
		});
	},
	/**
	 *方法：获取校园风光
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：圈子json数据
	 *创建/修改：刘有
	 *时间：2016/6/15 16:00
	 */
	getSurroundings: function(callBack) {
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/pictures/list",
			contentType: "json",
			error: function() {
				plus.nativeUI.toast('请求出错');
			},
			success: function(data) {
				callBack(data.varList);
			}
		})
	},

	/**
	 *方法：获取活动列表
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：圈子json数据
	 *创建/修改：刘有
	 *时间：2016/6/14 11:14
	 */
	getActivity: function(callBack, url) {
		url = url || "/client/activity/list?currentPage=1";
		url = this.HOST + url;
		$.getJSON(url, function(data) {
			callBack(data);
		});
	},
	/**
	 *方法：获取活动列表详情
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：圈子json数据
	 *创建/修改：刘有
	 *时间：2016/6/14 11:14
	 */
	getActivityListDetail: function(id, callBack) {
		jQuery.support.cors = true; //查询数据
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/activity/actinfo",
			contentType: "json",
			async: false, //同步
			cache: false,
			data: {
				'ACT_ID': id
			},
			error: function() {
				plus.nativeUI.toast('请求出错');
			},
			success: function(data) {
				callBack(data.activity)
			}
		});
	},

	/**
	 *方法：活动详情界面点击报名
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：圈子json数据
	 *创建/修改：刘有
	 *时间：2016/6/14 15:57
	 */
	getApplyActivity: function(callBack) {

	},
	/**
	 *方法：获取班级圈子
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：圈子json数据
	 *创建/修改：刘有
	 *时间：2016/6/14 15:06
	 */
	getClassCircleList: function(userId, classId, callBack, url) {
	    url = url || "/client/messageClass/listPage?currentPage=1";
	    console.log(this.HOST+url+"&userId="+userId+"&CLASS_ID="+classId)
		$.ajax({
			type: "get",
			url: this.HOST + url,
			data: {
				userId: userId,
				CLASS_ID: classId
			},
			error: function() {
				plus.nativeUI.toast('请求出错');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：获取食堂菜谱
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：圈子json数据
	 *创建/修改：刘有
	 *时间：2016/6/15 14:15
	 */
	getCanteenList: function(role, recipesDate,userId,studentId,callBack) {
		$.ajax({
			type: "GET",
			/*url: "recipesList.json",*/
			url: this.HOST + "/client/recipes/recipesList",
			dataType: "json",
			contentType: "json",
			async: false, //同步
			data: {
				userId:userId,
				role: role,
				recipesDate: recipesDate,
				stuId:studentId
			},
			error: function() {
				plus.nativeUI.toast('请求出错');
			},
			success: function(data) {
				callBack(data);

			}
		});
	},
	//食堂菜谱点赞
	thumbsUp: function(userId, foodId, STATUS,recipesDate, callBack) {
		$.ajax({
			type: "post",
			url: this.HOST + "/client/recipes/thumbsUp",
			data: {
				userId: userId,
				recipesInfoId: foodId,
				status: STATUS,
				recipesDate:recipesDate
			},
			error: function() {
				plus.nativeUI.toast("点赞失败");
			},
			success: function(data) {
				callBack(data);
			}
		});
	},

	/**
	 *方法：获取公告列表
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：公告列表json数据
	 *创建/修改：李路丹
	 *时间：2016/6/13 15:45
	 */
	getNotice: function(NO_RANGE,callBack, url) {
		url = url || "/client/notice/listPage?currentPage=1&NO_RANGE="+NO_RANGE;
		console.log(this.HOST+url)
		$.ajax({
			type: "GET",
			url: this.HOST + url,
		/*	url:"test.json",*/
			dataType: "json",
			contentType: "json",
			error: function() {
				plus.nativeUI.toast('请求出错');
			},

			success: function(data) {
				console.log(JSON.stringify(data))
				callBack(data);
			}
		});
	},
	/**
	 *方法：获取公告详情
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：公告列表json数据
	 *创建/修改：李路丹
	 *时间：2016/6/13 15:45
	 */
	getNoticeDetail: function(id, callBack) {
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/notice/findNoticeDetail",
			contentType: "json",
			data: {
				'NO_ID': id
			},
			error: function() {
				plus.nativeUI.toast('请求出错');
			},

			success: function(data) {
				console.log("公告详情"+JSON.stringify(data))
				callBack(data.notice);
			}
		});
	},

	/**
	 *方法：获取消息列表
	 *方式:GET
	 *参数：url:url;callBack:回调方法
	 *返回值：消息列表json
	 *创建/修改：左武洲
	 *时间：2016/6/21 14:00
	 */
	getMessageList: function(userId, callBack, url) {
		url = url || "/client/remind/listPage";
		var data = url === "/client/remind/listPage" ? {
			currentPage: 1,
			receiveId: userId
		} : {};
		$.ajax({
			type: "get",
			url: this.HOST + url,
			data: data,
			error: function() {
				plus.nativeUI.toast('请求出错');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},

	/**
	 *方法：删除消息
	 *方式:GET
	 *参数：url:url;callBack:回调方法
	 *返回值：systemCode 0 失败 1成功
	 *创建/修改：左武洲
	 *时间：2016/6/21 14:00
	 */
	deleteMessage: function(md5, callBack) {
		$.getJSON(this.HOST + "/client/remind/hideRemind", {
			md5Code: md5
		}, function(data) {
			callBack(data);
		});
	},
	/**
	 *方法：获取校园投票列表
	 *方式:GET
	 *参数：url:url;callBack:回调方法
	 *返回值：消息列表json
	 *创建/修改：李路丹
	 *时间：2016/6/21 14:00
	 */
	getSchoolList: function(callBack, url) {
		url = url || "/client/vote/listPage?currentPage=1&ranageNum=2";
		url = this.HOST + url;
		$.getJSON(url, function(data) {
			callBack(data);
		});
	},

	/**
	 *方法：获取班级投票列表
	 *方式:GET
	 *参数：url:url;callBack:回调方法
	 *返回值：消息列表json
	 *创建/修改：李路丹
	 *时间：2016/6/21 14:00
	 */
	getClassList: function(callBack, url) {
		url = url || "/client/vote/listPage?currentPage=1&ranageNum=1";
		url = this.HOST + url;
		$.getJSON(url, function(data) {
			callBack(data);
		});
	},
	/**
	 *方法：获取投票详情页面
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：公告列表json数据
	 *创建/修改：李路丹
	 *时间：2016/6/13 15:45
	 */
	getVoteDetail: function(id, userId, callBack) {
		jQuery.support.cors = true; //查询数据
		console.log('voteId:'+id+"userId:"+userId)
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/vote/findById",
			contentType: "json",
			data: {
				'voteId': id,
				'userId': userId
			},
			success: function(data) {
				console.log(JSON.stringify(data))
				callBack(data.vlist[0], data.isHave);
			}
		});
	},
	/**
	 *方法：获取文件列表
	 *方式:GET
	 *参数：url:url;callBack:回调方法
	 *返回值：文件列表json
	 *创建/修改：左武洲
	 *时间：2016/7/14 16:00
	 */
	getFileList: function(category, callBack, url) {
		if (typeof category != 'number') {
			category = Number(category)
		}
//		if(category !== 0) {
//			url = "/client/file/listPage?currentPage=1&CLOFD=" + category;
//		}
		url = this.HOST + url +"&CLOFD="+ category;
		console.log("请求文件列表-头:"+url)
		$.getJSON(url, function(data) {
			console.log("请求文件列表-身:"+JSON.stringify(data))
			callBack(data);
		});
	},
	//我的收藏
	getFavoriteList: function(userId, callBack, url) {
		url = url || "/client/favorite/listPage";
		var data = url === "/client/favorite/listPage" ? {
			currentPage: 1,
			collecterId: userId
		} : {};
		$.ajax({
			type: "get",
			url: this.HOST + url,
			data: data,
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	//删除收藏
	deleteFavorite: function(favoriteid, callBack) {
		$.getJSON(this.HOST + "/client/favorite/remove", {
			favoriteId: favoriteid
		}, function(data) {
			callBack(data);
		});
	},
	//添加收藏
	addFavorite: function(userId, title, circleUrl, callBack) {
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/favorite/add",
			data: {
				COLLECTER_ID: userId,
				NAME: title,
				ITEM_URL: circleUrl,
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	//院长信箱
	getEmailList: function(userId, callBack, url) {
		url = url || "/client/mailbox/listPage?currentPage=1";
		url = url + "&userId=" + userId;
		url = this.HOST + url;
		$.getJSON(url, function(data) {
			callBack(data);
		});
	},
	deleteEmail: function(md5, callBack) {
		$.getJSON(this.HOST + "/client/mailbox/deleteMail", {
			MD5CODE: md5
		}, function(data) {
			callBack(data);
		});
	},
	/**
	 *方法：获取工资单
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：工资单
	 *创建/修改：刘有
	 *时间：2016/7/18 14:00
	 */
	getMoney: function(userId, callBack, url) {
		url = url || "/client/mypayroll/listPage?currentPage=1";
		$.ajax({
			type: "GET",
			url: this.HOST + url,
			data: {
				userId: userId
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});

	},

	/**
	 *方法：获取福利
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：福利
	 *创建/修改：左武洲
	 *时间：2016/7/19
	 */
	getWelfare: function(userId, callBack) {
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/welfare/listPage",
			data: {
				userId: userId
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},

	/**
	 *方法：修改密码
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：1004  密码错误 1 修改成功 0 失败
	 *创建/修改：左武洲
	 *时间：2016/8/1
	 */
	updatePassword: function(userId, oldPassword, newPassword, callBack) {
		$.ajax({
			type: "get",
			url: this.HOST + "/client/login/updatePassword",
			data: {
				userId: userId,
				passWord: oldPassword,
				newPassWord: newPassword
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：获取请假列表
	 *方式:GET
	 *参数：url:url;callBack:回调方法
	 *返回值：请假列表json
	 *创建/修改：王乐乐
	 *时间：2016/11/29 11:00
	 * 请假完成
	 */
	getVacationList: function(userId,callBack, url) {
		url = url || "/client/vacate/listPageC?currentPage=1&&vacatePersonId="+userId;
		url = this.HOST + url
		console.log(url)
		$.ajax({
			type: "get",
			url: url,
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				console.log(JSON.stringify(data))
				callBack(data);
			}
		});
	},
	//请假列表待办
	getwaitList: function(userId, callBack, url) {
		url = url || "/client/vacate/listPage";
		var data = url === "/client/vacate/listPage" ? {
			currentPage: 1,
			vacatePersonId: userId
		} : {};
		console.log(url)
		$.ajax({
			type: "get",
			url: this.HOST + url,
			data: data,
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：获取报修完成
	 *方式:GET
	 *参数：url:url;callBack:回调方法
	 *创建/修改：王乐乐
	 *时间：2016/11/29 11:00
	 */
	getFinishList: function(userId, callBack, url) {
		url = url || "/client/repair/listPageC";
		var data = url === "/client/repair/listPageC" ? {
			currentPage: 1,
			repairPersonId: userId
		} : {};
		$.ajax({
			type: "get",
			url: this.HOST + url,
			data: data,
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},

	/**
	 *方法：获取报修列表
	 *方式:GET
	 *参数：url:url;callBack:回调方法
	 *返回值：报修列表json
	 *创建/修改：左武洲
	 *时间：2016/8/2 11:00
	 */
	getRepairList: function(userId, callBack, url) {
		url = url || "/client/repair/listPage";
		var data = url === "/client/repair/listPage" ? {
			currentPage: 1,
			repairPersonId: userId
		} : {};
		$.ajax({
			type: "get",
			url: this.HOST + url,
			data: data,
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	//销假页面方法
	getcancelVacate: function(cancleobj, callBack) {
		$.ajax({
			type: "post",
			url: this.HOST + "/client/vacate/cancelVacate",
			data: cancleobj,
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	//撤销方法
	getcancelVac: function(CODE,nowData ,callBack) {
		$.ajax({
			type: "post",
			url: this.HOST + "/client/vacate/confAct",
			data: {
				md5Code: CODE,
				actId:nowData
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：获取请假详情
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：请假json
	 *创建/修改：WLL
	 *时间：2016/8/2 11:00
	 */
	getVacationDetail: function(md5,personid, callBack) {

		$.ajax({
			type: "get",
			url: this.HOST + "/client/vacate/findDetailVacate",
			data: {
				md5Code: md5,
				vacatePersonId: personid
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
//				console.log(JSON.stringify(data));
				callBack(data);
			}
		});
	},/**
	 *方法：获取学生请假详情
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：请假json
	 *创建/修改：WLL
	 *时间：2016/8/2 11:00
	 */
	getVacationDetailStudent: function(md5, callBack) {
		$.ajax({
			type: "get",
			url: this.HOST + "/client/vacate/findDetailVacate1",
			data: {
				md5Code: md5
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	//审核人通过按钮接口
	getcompVacate: function(md5, userId, callBack) {
		$.ajax({
			type: "get",
			url: this.HOST + "/client/vacate/compVacate",
			data: {
				md5Code: md5,
				actId: userId
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	//审核人驳回接口
	getrefuse: function(md5, userId, remark, callBack) {
		$.ajax({
			type: "post",
			url: this.HOST + "/client/vacate/refuse",
			data: {
				md5Code: md5,
				personId: userId,
				remark: JSON.stringify(remark)
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	//申请人确认
	getconfEnd: function(md5, userId, callBack) {
		$.ajax({
			type: "get",
			url: this.HOST + "/client/vacate/confEnd",
			data: {
				md5Code: md5,
				personId: userId
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				console.log(JSON.stringify(data));
				callBack(data);
			}
		});
	},
	/**
	 *方法：获取报修详情
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：请假json
	 *创建/修改：左武洲
	 *时间：2016/8/2 11:00
	 */
	getRepairDetail: function(md5, userId, callBack) {
		$.ajax({
			type: "get",
			url: this.HOST + "/client/repair/findDetailRepair",
			data: {
				md5Code: md5,
				userId: userId
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/*催一催接口*/
	getUrge: function(md5, personid, callBack) {
		console.log(personid);
		$.ajax({
			type: "get",
			url: this.HOST + "/client/repair/urge",
			data: {
				md5Code: md5,
				personId: personid
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	//申请人完成报修
	getcompact: function(md5, personid, callBack) {
		$.ajax({
			type: "get",
			url: this.HOST + "/client/repair/compact",
			data: {
				md5Code: md5,
				personId: personid
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	//受理人完成报修
	getconfirm: function(md5, personid, callBack) {
		$.ajax({
			type: "get",
			url: this.HOST + "/client/repair/confirm",
			data: {
				md5Code: md5,
				personId: personid
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	//报修催促次数接口
	geturgeCount: function(md5, callBack) {
		$.ajax({
			type: "get",
			url: this.HOST + "/client/repair/urgecount",
			data: {
				md5Code: md5
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：获取学生请假列表
	 *方式:GET
	 *参数：url:url;callBack:回调方法
	 *返回值：请假列表json
	 *创建/修改：王乐乐
	 *时间：2016/11/29 11:00
	 * 请假完成
	 */
	getVacationStudentList: function(userId, classId,roleId,callBack, url) {
		if(roleId==1){
		    url = url || "/client/vacate/listPageS";
		    var data = url === "/client/vacate/listPageS" ? {
		    currentPage: 1,
			classId: classId
		} : {};
		}else{
			url = url || "/client/vacate/listPageP";
		    var data = url === "/client/vacate/listPageP" ? {
			currentPage: 1,
			vacatePersonId: userId
		} : {};
		}
		console.log(this.HOST + url + JSON.stringify(data));
		$.ajax({
			type: "get",
			url: this.HOST + url,
			data: data,
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：已阅
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：请假json
	 *创建/修改：左武洲
	 *时间：2016/8/2 11:00
	 */
	readRemind: function(md5, callBack) {
		$.ajax({
			type: "get",
			url: this.HOST + "/client/remind/readRemind",
			data: {
				md5Code: md5
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：手势登录
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：请假json
	 *创建/修改：左武洲
	 *时间：2016/8/4 11:00
	 */
	gestureLogin: function(userName, gPassword, clientid,callBack) {
		$.ajax({
			type: "POST",
			url: this.HOST + "/client/login/userLogin",
			timeout: 5000,
			data: {
				"USERNAME": userName,
				"G_PASSWORD": gPassword,
				"CLIENTID": clientid
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
				callBack(false);
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：修改手势密码
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：1004  密码错误 1 修改成功 0 失败
	 *创建/修改：左武洲
	 *时间：2016/8/4
	 */
	updateGesturePassword: function(userId, newGPassword, scallBack, ecallBack) {
		$.ajax({
			type: "get",
			url: this.HOST + "/client/login/updatePassword",
			data: {
				userId: userId,
				newGPassWord: newGPassword
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
				ecallBack();
			},
			success: function(data) {
				scallBack(data);
			}
		});
	},

	/**
	 *方法：发布班级圈
	 *方式:POST
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：左武洲
	 *时间：2016/8/12
	 */
	addClassMessage: function(content, userId, classId, path, pictureId, callBack) {
		$.ajax({
			type: "POST",
			url: this.HOST + "/client/messageClass/addMessageClass",
			data: {
				CLA_CONTENT: content,
				NAME_ID: userId,
				CLASS_ID: classId,
				PATH: path,
				PICTURE_ID: pictureId
			},
			error: function() {
				plus.nativeUI.toast("请求出错");
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	//申请请假
	addVacationMessage: function(vacationobj, callBack) {
		$.ajax({
			type: "POST",
			url: this.HOST + "/client/vacate/addVacate",
			data: JSON.stringify(vacationobj),
			dataType: "json",
			error: function() {
				plus.nativeUI.toast("请求出错");
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	//申请学生请假
	addVacationMessageStudent: function(vacationobj, callBack) {
		$.ajax({
			type: "POST",
			url: this.HOST + "/client/vacate/addVacate1",
			data: JSON.stringify(vacationobj),
			dataType: "json",
			error: function() {
				plus.nativeUI.toast("请求出错");
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	//受理人节点接口
	addnodeQuery: function(acttype, callBack) {
		$.ajax({
			type: "POST",
			url: this.HOST + "/client/vacate/nodeQuery",
			data: {
				vacationId: acttype
			},
			error: function() {
				plus.nativeUI.toast("请求出错");
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	//申请报修
	addRepairMessage: function(repairobj, callBack) {
		$.ajax({
			type: "POST",
			url: this.HOST + "/client/repair/addRepair",
			data: repairobj,
			error: function() {
				plus.nativeUI.toast("请求出错");
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：修改默认孩子
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：左武洲
	 *时间：2016/8/12
	 */
	updateSeletedChild: function(parentId, studentId, callBack) {
		$.ajax({
			type: "get",
			url: this.HOST + "/client/rel/modifyPS",
			data: {
				parentId: parentId,
				studentId: studentId
			},
			error: function() {
				plus.nativeUI.toast("请求出错");
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：提交点名
	 *方式:POST
	 *参数：callBack:回调方法
	 *返回值：1004 密码错误 1 提交成功 0 失败
	 *创建/修改：王乐乐/李路丹
	 *时间：2016/8/
	 */
	postOrder: function(obj, callBack) {
		console.log("提交点名："+JSON.stringify(obj))
//		return
		$.ajax({
			type: "POST",
			url: this.HOST + "/client/rollCall/saveRecord",
			data: obj,
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：专家答疑提交
	 *方式:POST
	 *参数：callBack:回调方法
	 *返回值：1004  密码错误 1 提交成功 0 失败
	 *创建/修改：李路丹/李路丹
	 *时间：2016/8/12
	 */
	postExpert: function(dt, callBack) {
		jQuery.support.cors = true;
		$.ajax({
			type: "POST",
			url: this.HOST + "/client/vote/toVote",
			data: dt,
			async: false,
			contentType: false,
			processData: false,
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：专家答疑列表查询
	 *方式:POST
	 *参数：callBack:回调方法
	 *返回值：1004  密码错误 1 提交成功 0 失败
	 *创建/修改：李路丹/李路丹
	 *时间：2016/8/12
	 */
	getExpertList: function(callBack) {
		jQuery.support.cors = true;
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/que/queList",
			async: false,
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				console.log(JSON.stringify(data))
				callBack(data);
			}
		});
	},
	/**
	 *方法：登录数据接口
	 *方式:POST
	 *参数：callBack:回调方法
	 *返回值：1004  密码错误 1 提交成功 0 失败
	 *创建/修改：王书静/李路丹
	 *时间：2016/8/12
	 */
	postLogin: function(user, callBack) {
		console.log("正在登录")
//		jQuery.support.cors = true;
		var url = this.HOST + "/client/login/userLogin";
		console.log("登录请求: "+url)
		$.ajax({
			type: "POST",
			url: url,
			data: user,
			error: function() {
				plus.nativeUI.toast('请求失败');
				plus.nativeUI.closeWaiting();
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：投票提交
	 *方式:POST
	 *参数：callBack:回调方法
	 *返回值：1004  密码错误 1 提交成功 0 失败
	 *创建/修改：李路丹/李路丹
	 *时间：2016/8/12
	 */
	postVote: function(dt, callBack) {
		jQuery.support.cors = true;
		$.ajax({
			type: "POST",
			url: this.HOST + "/client/vote/addVote",
			data: dt,
			async: false,
			contentType: false,
			processData: false,
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：新增院长信箱
	 *方式:POST
	 *参数：callBack:回调方法
	 *返回值：1004  密码错误 1 提交成功 0 失败
	 *创建/修改：王乐乐/李路丹
	 *时间：2016/8/12
	 */
	postCreateEmail: function(creatMail, callBack) {
		jQuery.support.cors = true;
		$.ajax({
			type: "POST",
			url: this.HOST + "/client/mailbox/addMail",
			data: creatMail,
			async: false,
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：查询院长信息详情
	 *方式:POST
	 *参数：callBack:回调方法
	 *返回值：1004  密码错误 1 提交成功 0 失败
	 *创建/修改：王乐乐/李路丹
	 *时间：2016/8/12
	 */
	getEmailDetail: function(md5code, callBack) {
		jQuery.support.cors = true;
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/mailbox/findDetails?MD5CODE=" + md5code,
			async: false,
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：问卷调查列表
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：1004  密码错误 1 提交成功 0 失败
	 *创建/修改：王书静/李路丹
	 *时间：2016/8/12
	 */
	getQuestionList: function(callBack, url) {
		jQuery.support.cors = true;
		url = url || "/client/research/listPage?currentPage=1";
		$.ajax({
			type: "GET",
			url: this.HOST + url,
			async: false,
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：问卷调查查取信息
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：1004  密码错误 1 提交成功 0 失败
	 *创建/修改：王书静/李路丹
	 *时间：2016/8/12
	 */
	getQuestionDetail: function(id, userId, callBack) {
		jQuery.support.cors = true;
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/research/findById",
			data: {
				'userId': userId,
				'researchId': id
			},
			async: false,
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：点赞
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：左武洲
	 *时间：2016/8/12
	 */
	pushCircle: function(userId, circleId, callBack) {
		$.ajax({
			type: "get",
			url: this.HOST + "/client/messageClass/addPositive",
			data: {
				CLA_ID: circleId,
				POS_NAME_ID: userId,
			},
			error: function() {
				plus.nativeUI.toast("点赞失败");
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：评论
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：左武洲
	 *时间：2016/8/12
	 */
	makeComment: function(userId, circleId, content, callBack) {
		$.ajax({
			type: "POST",
			url: this.HOST + "/client/comment/addComment",
			data: {
				COM_CONTENT: content,
				CRITIC_ID: userId,
				CLA_ID: circleId
			},
			error: function() {
				plus.nativeUI.toast("请求出错");
			},
			success: function(data) {
				callBack(data);
			}
		});
	},

	/**
	 *方法：获取评论列表
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：左武洲
	 *时间：2016/8/12
	 */
	getCommentList: function(circleId, callBack) {
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/messageClass/comAllPage",
			data: {
				CLA_ID: circleId
			},
			error: function() {
				plus.nativeUI.toast("请求出错");
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：获取班级圈详情
	 *方式:GET
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：左武洲
	 *时间：2016/8/12
	 */
	getClassCircleDetail: function(circleId, userId, callBack) {
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/messageClass/findById",
			data: {
				claId: circleId,
				userId: userId
			},
			error: function() {
				plus.nativeUI.toast("请求出错");
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	addCalendar: function(title, MEN_TIME,content, nowtime, userid, CALENDAR_TYPE,callBack) {
		$.ajax({
			type: "post",
			url: this.HOST + "/client/calendar/add",
			async: true,
			scriptCharset: 'utf-8',
			data: {
				TITLE: title,
				CONTENT: content,
				PLAN_DATE: nowtime,
				USER_ID: userid,
				CALENDAR_TYPE:CALENDAR_TYPE,
				MEN_TIME:MEN_TIME
			},
			error: function() {
				plus.nativeUI.toast("请求出错");
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	Calendarlist: function(nowtime, userid, ORG_ID,callBack) {
		console.log("ORG_ID:"+ORG_ID)
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/calendar/listCalendar",
			async: true,
			data: {
				dateId: nowtime,
				userId: userid,
			    orgId:ORG_ID

			},
			error: function() {
				plus.nativeUI.toast("请求出错");
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 *方法：提交投票选项
	 *方式:POST
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：李路丹
	 *时间：2016/8/15
	 */
	postVotePerson: function(dt, callBack) {
		jQuery.support.cors = true;
		$.ajax({
			type: "POST",
			url: this.HOST + "/client/vote/add",
			data: dt,
			async: false,
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},

	/**
	 *方法：删除圈子
	 *方式:Get
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：左武洲
	 *时间：2016/10/13
	 */
	DeleteClassCircle: function(classId, callBack) {
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/messageClass/delMessageClass",
			data: {
				CLA_ID: classId
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/*
	 *方法：财务查询请假数据
	 *方式:Get
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：李路丹
	 *时间：2017/2/28
	 */
	getSummary: function(nowData, callBack) {
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/logistics/list1",
			async: true,
			data: {
				TodayTime : nowData
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/*
	 *方法：财务查询年级
	 *方式:Get
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：李路丹
	 *时间：2017/2/28
	 */
	getSummaryClass: function(nowData, callBack) {
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/logistics/list2",
			async: true,
			data: {
				TodayTime : nowData
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/*
	 *方法：财务查询年级班级
	 *方式:Get
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：李路丹
	 *时间：2017/2/28
	 */
	getSummaryClassDetail: function(nowData,orgId, callBack) {
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/logistics/list3",
			async: true,
			data: {
				TodayTime : nowData,
				orgId : orgId
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/*
	 *方法：工会活动
	 *方式:Get
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：李路丹
	 *时间：2017/2/28
	 */
	getUnionActivity: function(userId,callBack,nextUrl) {
		var url = this.HOST + "/client/tradeActivity/listPage?currentPage=1&userId="+userId
		if(nextUrl && nextUrl != 10001) {
			url = this.HOST + nextUrl
		}
		console.log(url)
		$.ajax({
			type: "GET",
			url: url,
			async: true,
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/*
	 *方法：工会活动投票
	 *方式:Get
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：李路丹
	 *时间：2017/2/28
	 */
	addVoteUion: function(userId,UN_ID,callBack) {
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/tradeActivity/attVote",
			async: true,
			data: {
			//数据
			TEA_ID:userId,
			UN_ID:UN_ID,
			VOTE_STATUS:1
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/*
	 *方法：工会活动评论
	 *方式:Get
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：李路丹
	 *时间：2017/2/28
	 */
	addComment: function(callBack) {
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/tradeActivity/attVote",
			async: true,
			data: {
			//数据
			
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},	/*
	 *方法：工会活动评论列表
	 *方式:Get
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：李路丹
	 *时间：2017/2/28
	 */
	checkComment: function(UN_ID,callBack) {
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/tradeActivity/commList",
			async: true,
			data: {
			//数据
			UN_ID:UN_ID
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/*方法：工会活动评论详情
	 *方式:Get
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：李路丹
	 *时间：2017/2/28
	 */
	subComment: function(TEA_ID,UN_ID,comm_DATE,remark,callBack) {
		$.ajax({
			type: "POST",
			url: this.HOST + "/client/tradeActivity/attVote",
			async: true,
			contentType:'application/x-www-form-urlencoded; charset=UTF-8',
			data: {
			//数据
			COMM_STATUS:1,
			TEA_ID:TEA_ID,
			UN_ID:UN_ID,
			COMM_DATE:comm_DATE,
			COMM_CONTENT:remark
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/*方法：工会活动点击报名详情
	 *方式:Get
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：李路丹
	 *时间：2017/2/28
	 */
	unionActivitySign: function(UN_ID, userId, callBack) {
		console.log(this.HOST + "/client/tradeActivity/findById?userId="+userId+"&&UN_ID="+UN_ID)
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/tradeActivity/findById?userId="+userId,
			async: false,
			data: {
			//数据
			UN_ID:UN_ID
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/*方法：工会活动点击报名详情
	 *方式:Get
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：李路丹
	 *时间：2017/2/28
	 */
	signOk: function(UN_ID,TEA_ID,ATT_STATUS,callBack) {
		$.ajax({
			type: "GET",
			url: this.HOST + "/client/tradeActivity/attVote",
			async: false,
			data: {
			//数据
			UN_ID:UN_ID,
			TEA_ID:TEA_ID,
			ATT_STATUS:ATT_STATUS
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/*方法：移动办公菜单配置
	 *方式:Get
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：李路丹
	 *时间：2017/2/28
	 */
	getMobileWork: function(DETAIL_ROLE_ID,callBack) {
		console.log("DETAIL_ROLE_ID: "+DETAIL_ROLE_ID)
		$.ajax({
			type: "GET",
			dataType: "json",
			url: this.HOST + "/client/menuRights/menuList",
			async: false,
			data:{
				ROLE_ID:DETAIL_ROLE_ID
			},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				console.log(JSON.stringify(data))
				callBack(data);
			}
		});
	},
	/*方法：获取请假类型
	 *方式:Get
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：李路丹
	 *时间：2017/3/29
	 */
	getVacateType: function(role,callBack) {
		$.ajax({
			type: "GET",
			dataType: "json",
			url: this.HOST + "/client/vacate/toVacate",
			async: false,
			data: {
				 roleId: role
					},
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/*方法：获取请假受理人列表
	 *方式:Get
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：李路丹
	 *时间：2017/3/29
	 */
	getLeaveType: function(callBack) {
		$.ajax({
			type: "GET",
			dataType: "json",
			url: this.HOST + "/client/vacate/toFlow",
			async: false,
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/*方法：获取班级活动
	 *方式:Get
	 *参数：callBack:回调方法
	 *返回值：
	 *创建/修改：李路丹
	 *时间：2017/3/29
	 */
	selectTimetable: function(classId ,callBack) {
		$.ajax({
			type: "GET",
			dataType: "json",
			url: this.HOST + "/client/parkActivity/findDetail",
			data: {
				 classId: classId
					},
			async: false,
			error: function() {
				plus.nativeUI.toast('请求失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	},
	/**
	 * 方法： 获取通讯录列表
	 * 方法：GET
	 * 参数：orgId String 机构id 可不传；isFindPeople Boolean 是否查找人员 必传；callBack 回调函数
	 * 返回值：
	 * 创建/修改：张大亨
	 * 时间：2017年4月27日09:26:46
	 */
	getDirectories: function(orgId, isFindPeople, callBack) {
		var getUrl = '/client/phonebook/findOrg';
		if(orgId) {
			getUrl = '/client/phonebook/findOrg?orgId='+orgId+'&isFindPeople='+isFindPeople;
		}
		console.log(this.HOST+getUrl)
		$.ajax({
			type: "get",
			url: this.HOST + getUrl,
			async: false,
			error: function() {
				plus.nativeUI.toast('获取通讯录列表失败');
			},
			success: function(data) {
				callBack(data);
			}
		});
	}
};