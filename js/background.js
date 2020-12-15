window.onload = _ => {
    let date_node = document.querySelector('.date');
    let input_node = document.querySelector('#search');
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
            window.location.href = `https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=${value}`
        }
    }
    
}


chrome.browserAction.onClicked.addListener(() => chrome.tabs.create({}))