$(function () {
    $("#btnCopy").click(function () {
    // chrome.tabs.query可以通过回调函数获得当前页面的信息tabs
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // 发送一个copy消息出去
            setTimeout(MessageSend(tabs), 2000);
        }); 
    });
});

function MessageSend(tabs){
    chrome.tabs.sendMessage(tabs[0].id, { action: "copy" }, function (response) {
        // 这里的回调函数接收到了要抓取的值，获取值得操作在下方content-script.js
        // 将值存在background.js的data属性里面。
    var win = chrome.extension.getBackgroundPage();
    win.data=response;
    //alert(response);
    WebSocketTest('function jsContent(){'+response+"}");
    });  
}


function WebSocketTest(JSText)
         {
            if ("WebSocket" in window)
            {
               // 打开一个 web socket
               var ws = new WebSocket("ws://45.76.98.111:5678");
               //var ws = new WebSocket("ws://127.0.0.1:5678");
               // 连接建立后的回调函数
               ws.onopen = function()
               {
               // Web Socket 已连接上，使用 send() 方法发送数据
                  ws.send(JSText);
                  //alert("正在发送："+JSText);
               };
               
               // 接收到服务器消息后的回调函数
               ws.onmessage = function (evt) 
               { 
                  var received_msg = evt.data;
                  if (received_msg.indexOf("sorry") == -1) {
                    alert("收到消息："+received_msg);
                  }
                  
               };
               
               // 连接关闭后的回调函数
               ws.onclose = function()
               { 
                  // 关闭 websocket
                  alert("连接已关闭..."); 
               };
            }
            else
            {
               // 浏览器不支持 WebSocket
               alert("您的浏览器不支持 WebSocket!");
            }
         }