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
		userId: "icain000",
		deviceId: "icainsphone",
		osName: "miphone",
		osVersion: "1.0",
		clientVersion: "1.0",
	});
}
// 发送消息
function chatSend(me, targetUserId){
	console.log("发送消息："+me)
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
	console.log(JSON.stringify(message,null,4));
}