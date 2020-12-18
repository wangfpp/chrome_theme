const search_gine_dict = {
    "baidu": {
        text: "百度",
        create_url: val => {
            return `https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=${val}`
        }
    },
    "biying": {
        text: "必应",
        create_url: val => {
            return `https://www.bing.com/search?q=${val}`
        }
    },
    "google": {
        text: "谷歌",
        create_url: val => {
            return `http://www.google.cn/search?q=${val}&hl=zh-CN&client=aff- 360daohang&hs=yhE&affdom=360.cn&newwindow=1&start=10&amp; amp;sa=N`
        }
    }
}

const search_gine_list = Object.keys(search_gine_dict)