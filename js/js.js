function qs(ele){
    return document.querySelector(ele);
}
function qsa(ele){
    return document.querySelectorAll(ele);
}
var login = qs('.login a'),
    loginIn = qs('.loginIn');

login.onclick = function(){
    loginIn.style.display = 'block'
};
var xml = new XMLHttpRequest(),
    ipt = qsa('.loginIn input'),
    submit = document.getElementById('submit');
function ajax(option){
      var type = option.type,
          data = option.data;
    //readyState
    //0 请求未发送
    //1 请求打开
    //2 请求发送成功
    //3 服务端成功接收请求
    //4 服务端响应成功
    function queryString(data){
        var str = "",
            i;
        for(i in data){
            str += "&" + i + "=" + data[i];
        }
        return str.slice(1);
    }
    xml.onreadystatechange = function(){
        console.log(["请求未发送", "请求打开", "请求发送成功", "服务端成功接收请求", "服务端响应成功"][xml.readyState]);
        xml.readyState === 4 && xml.status === 200 && option.success(option.dataType === "json" ? JSON.parse(xml.responseText) : xml.responseText);
    };
    //打开请求
    xml.open(type, option.url + (type === "get" ? "?" + queryString(data) : ""), option.async);
    //设置请求头
    type === "post" && xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");//post
    //发送请求
    xml.send(type === "get" ? null : queryString(data));//get
}
submit.onclick = function(){
    ajax({
        type : "post",
        url : "http://www.ikindness.cn/api/test/signUp",
        data : {
            password: 1,
            tel : ipt[0].value,
            code : ipt[1].value
        },
        dataType : "json",
        async : 1,
        success : function(data){
            console.log(data);
            if(!data.code){
                var script = document.createElement('script');
                script.src = 'http://www.ikindness.cn/api/test/getFund?jsonp=1';
                document.body.appendChild(script);
            }
            /*data.code == 0 && ajax({
                type : 'get',
                url : 'http://www.ikindness.cn/api/test/getFund',
                data : {
                    type : 1
                },
                dataType : "json",
                async : 1,
                success : function(data){
                    var _data = data.data;
                    _data.forEach(function(item){
                        loginIn.style.display = 'none';
                        var div = document.createElement('div');
                        div.className = 'box';
                        div.innerHTML = '<img src=\''+item.image+'\'>'+'<p>'+item.name+'</p>';
                        document.body.appendChild(div);
                    })
                }
            })*/
        }
    });
};
function jsonpCallback(data){
    if(!data.code){
            var _data = data.data;
            _data.forEach(function(item) {
            loginIn.style.display = 'none';
            var div = document.createElement('div');
            div.className = 'box';
            div.innerHTML = '<img src=\'' + item.image + '\'>' + '<p>' + item.name + '</p>';
            document.body.appendChild(div);
        })
    }
}

