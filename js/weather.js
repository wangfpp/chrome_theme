let appid = 73531774,
    appsecret = "nUP7o0qA",
    request_url = `http://www.tianqiapi.com/api?version=v61&appid=${appid}&appsecret=${appsecret}`,
    weather_node = document.querySelector('.weather'),
    time_gap = 3 * 60 * 60 * 1000;
let weatherCity=null;
const weatherNode = document.querySelector(".weather");
getWeather(request_url);
// 天气详情跳转百度天气
weatherNode.onclick=()=>{
    window.location.href = `https://www.baidu.com/s?tn=baidutop10&rsv_idx=2&wd=${weatherCity}天气预报`;
    
}
/**
 * 定时更新天气信息
 */
setInterval(() => {
    getWeather(request_url);
}, time_gap);

function getWeather(url) {
    fetch(url).then(res => {
        return res.json();
    }).then(res => {
        let {
            air,
            air_level,
            air_pm25,
            air_tips,
            city,
            humidity,
            tem,
            tem1,
            tem2,
            win,
            win_speed,
            win_meter,
            visibility,
            wea,
            errcode,
            errmsg
        } = res;
        if (errmsg) {
            weather_node.innerHTML = errmsg;
            return
        }
        if (weather_node) {
            let weaIcon = wea2icon(wea);
            weatherCity=city;
            weather_node.innerHTML = `
            <div class='flex_col flex_end'>
                <h3>${city}</h3>
                <p class="fw_500">${air_level}/PM2.5:${air_pm25}/${win}/${wea}</p>
            </div>
            <div class='divider_ver'></div>
            <div class='flex_col'>
                <img src='./img/rain_icons/${weaIcon}.png'/>
                <h3 class="fs_fy fw_500">${tem}°C</h3>
            </div>
            `
        }
    }).catch(err => {
        console.log(err);
    })
}

function wea2icon(desc) {
    const baseObj = {
        "晴": 100,
        "多云": 101,
        "少云": 102,
        "晴间多云": 103,
        "阴": 104,
        "晴/夜晚": 150,
        "晴间多云": 153,
        "阴": 154,
        "阵雨": 300,
        "强阵雨": 301,
        "雷阵雨": 302,
        "强雷阵雨": 303,
        "雷阵雨伴有冰雹": 304,
        "小雨": 305,
        "中雨": 306,
        "大雨": 307,
        "极端降雨": 308,
        "毛毛雨/细雨": 309,
        "暴雨": 310,
        "大暴雨": 311,
        "特大暴雨": 312,
        "冻雨": 313,
        "小到中雨": 314,
        "中到大雨": 315,
        "大到暴雨": 316,
        "暴雨到大暴雨": 317,
        "大暴雨到特大暴雨": 318,
        "阵雨": 350,
        "强阵雨": 351,
        "雨": 399,
        "小雪": 400,
        "中雪": 401,
        "大雪": 402,
        "暴雪": 403,
        "雨夹雪": 404,
        "雨雪天气": 405,
        "阵雨夹雪": 406,
        "阵雪": 407,
        "小到中雪": 408,
        "中到大雪": 409,
        "大到暴雪": 410,
        "阵雨夹雪": 456,
        "阵雪": 457,
        "雪": 499,
        "薄雾": 500,
        "雾": 501,
        "霾": 502,
        "扬沙": 503,
        "浮尘": 504,
        "沙尘暴": 507,
        "强沙尘暴": 508,
        "浓雾": 509,
        "强浓雾": 510,
        "中度霾": 511,
        "重度霾": 512,
        "严重霾": 513,
        "大雾": 514,
        "特强浓雾": 515,
        "热": 900,
        "冷": 901,
        "未知": 999
    };
    return baseObj[desc] ? baseObj[desc] : 999
}