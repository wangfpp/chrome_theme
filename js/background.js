window.onload = _ => {
    let date_node = document.querySelector('.date');
    let input_node = document.querySelector('#search');
    if (input_node) {
        input_node.focus();
    }
    if (date_node) {
        moment.locale('zh-cn');
        let base_parse = moment().format("LLLL");
        date_node.innerHTML = base_parse;
        setInterval(() => {
            if (date_node) {
                base_parse = moment().format("LLLL");
                date_node.innerHTML = base_parse;
            }
        }, 1000);
    }

    input_node.onkeydown = function (e) {
        let { keyCode, target } = e;
        let { value } = target;
        if (keyCode === 13 && value) {
            window.location.href = `https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=${value}`;
            target.value = ""
        }
    }
    
}

/***
 * https://www.bing.com/search?q=haha
 * 
 * Google搜索参数
 * 【http://www.google.cn/search?q=112&hl=zh-CN&client=aff- 360daohang&hs=yhE&affdom=360.cn&newwindow=1&start=10&amp; amp;sa=N】
    q–查询的关键词(Query)，百度对应的参数为wd
    hl–Google搜索的界面语言(Interface Language)
    start–显示结果的页数,百度对应的参数为pn（0是首页，10是第二页，以此类推）
    lr–搜索内容的语言限定(Language Restrict),限定只搜索某种语言的网页。如果lr参数为空，则为搜索所有网页。
    ie–查询输入文字的编码(Input Encoding),Google缺省设置ie=utf-8,即请求Google搜索时参数q的值是一段utf-8编码的文字，如果要直接使用中文，可以设置ie=gb2312,即为简体中文编码
    oe–搜索返回页面的编码(Output Encoding),Google缺省设置oe=utf-8
    num–搜索结果显示条数(Number),取值范围在10–100条之间，缺省设置num=10,百度对应的参数为rn
    newwindow–是否开启新窗口以显示查询结果。 缺省设置newwindow=1，在新窗口打开网页
    safe–安全搜索选项(SafeSearch),设置该参数可以过滤成人内容， 缺省设置safe为空，即不过滤成人内容，设置为safe=vss，即过滤成人内容。
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 *  
 */

chrome.browserAction.onClicked.addListener(() => chrome.tabs.create({}))