window.onload = _ => {
    let date_node = document.querySelector('.date'),
    input_node = document.querySelector('#search'),
    history_container = document.querySelector("#history_container"),
    chp_node = document.querySelector("#chp"),
    menu_node = document.querySelector('#menu'),
    engine_radio = menu_node.querySelectorAll(".menu-item input[name=engine]")
    set_btn = document.querySelector('#set_btn');

    createChp(chp_node); // 获取彩虹屁
    
    if (input_node) {
        input_node.focus();
    }
    function formatDateString(base_parse){
        let date =base_parse.split("<br/>")[0],
        time =base_parse.split("<br/>")[1],
        week =base_parse.split("<br/>")[2],
        year = date.substr(0,4),
        mon = date.substr(5,2),
        day = date.substr(8,2);
        return `
        <h4 class='year'>${year}</h4>
        <h3 class='mon_day'>
            <cite>${mon}</cite>
            <cite>${day}</cite>
            <p>${week}</p>
        </h3>
        <div class='flex_col flex_start'>
            <h3 class="fw_500 fs_20">${time}</h3>
        </div>
        `
    }
    if (date_node) {
        moment.locale('zh-cn');
        let base_parse = moment().format("LLLL");
        date_node.innerHTML = formatDateString(base_parse);
        setInterval(() => {
            if (date_node) {
                base_parse = moment().format("LLLL");
                date_node.innerHTML = formatDateString(base_parse);
            }
        }, 1000);
    }

    input_node.onkeydown = function (e) {
        let { keyCode, target } = e;
        let { value } = target;
        if (keyCode === 13 && value) {
            let localstorage_engine = window.localStorage.getItem("search_engine");
            localstorage_engine = search_gine_list.includes(localstorage_engine) ? localstorage_engine : search_gine_list[0];
            let engin_url = search_gine_dict[localstorage_engine].create_url(value);
            window.location.href = engin_url;
            target.value = ""
        }
    }
    /**
     * 菜单项增加选择搜索引擎
     */
    engine_radio.forEach(item => {
        item.onchange = e => {
            let { target } = e;
           let engine = target.getAttribute("data");
           window.localStorage.setItem("search_engine", engine)
        }
    })
    /**
     * @description 显示菜单项
     * @param {Event} e 
     */
    set_btn.onclick = e => {
        let class_list = getClass(menu_node);
        if (class_list.length) {
            if (class_list.includes("hidemenu")) {
                menu_node.setAttribute("class", "showmenu");
            }else if (class_list.includes("showmenu")) {
                menu_node.setAttribute("class", "hidemenu");
            }
        } else {
            addClass(menu_node, "showmenu");
        }
    }
    function createChp(node) {
        fetch('https://chp.shadiao.app/api.php').then(res => {
            return res.text();
        }).then(res => {
            if (res && node ) {
                node.innerHTML = res;
            }
        })
    }
}




chrome.browserAction.onClicked.addListener(() => chrome.tabs.create({}))
chrome.history.search({text: '', maxResults: 10}, function(data) {
    let history_item = "";
    data.forEach(function(page) {
        let { id, title, url, visitCount, typedCount } = page;
        history_item += `
            <div class="history_item">
                <a href="${url}">
                    <img src="chrome://favicon/size/20@2x/${url}" alt="icon"/>
                    <p class="title">${title}</p>
                </a>
            </div>
        `
    });
    if (history_item.length && history_container) {
        history_container.innerHTML = history_item;
    }
});


/***
 * 
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