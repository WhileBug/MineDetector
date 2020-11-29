//监听消息
chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "copy") {
    //收到copy信息，开始获取当前页面id为sb_form_q的值
            scripts = ""
            length = document.scripts.length;
            var i =0;
            for(i=0;i<length;i++){
                scripts += document.scripts[i].innerText;
            }
            if (length > 0) {
            // 如果获取的值不为空则返回数据到popup.js的回调函数
                if (sendResponse){ 
                    sendResponse(scripts);
                } 
                else {
                alert("No data");
                }
            }
        }

    }
);