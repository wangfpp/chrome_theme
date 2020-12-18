let appid = 73531774,
    appsecret = "nUP7o0qA",
    request_url = `http://www.tianqiapi.com/api?version=v61&appid=${appid}&appsecret=${appsecret}`,
    weather_node = document.querySelector('.weather'),
    time_gap = 3 * 60 * 60 * 1000;
let weatherCity=null;
const weatherNode = document.querySelector(".weather");
freeWeather("https://www.ip.cn/api/index?ip=&type=0")
// 天气详情跳转百度天气
weatherNode.onclick=()=>{
    window.location.href = `https://www.baidu.com/s?tn=baidutop10&rsv_idx=2&wd=${weatherCity}天气预报`;
    
}
/**
 * 定时更新天气信息
 */
setInterval(() => {
    freeWeather("https://www.ip.cn/api/index?ip=&type=0")
}, time_gap);

function freeWeather(url) {
    let _date = new Date().getTime();
    fetch(`http://geolocation-db.com/jsonp/?callback=callback&_=${_date}`).then(res => {
        return res.text();
    }).then(res => {
        // 用字符串截取的方式处理JSONP
        let str = res.replace("callback(", "");
        let json = str.slice(0, str.length - 1);
        let { IPv4, latitude: lat, longitude: lon } = JSON.parse(json);
        fetch("http://data.cma.cn/kbweb/home/live", {
                method: "POST",
                body: JSON.stringify({
                    lat,
                    lon,
                    type: "1"
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }).then(res => {
                return res.json();
            }).then(res => {
                let { code, result } = res;
                if (code === 0) {
                    let { city, condition } = result.data;
                    weatherCity = city.secondaryname;
                    if (weather_node) {
                        let { icon, temp } = condition
                        weather_node.innerHTML = `
                        <div class='flex_col flex_end'>
                            <h3>${city.secondaryname}</h3>
                            <p class="fw_500">${condition.windDir}/${condition.windLevel}</p>
                        </div>
                        <div class='divider_ver'></div>
                        <div class='flex_col'>
                            <img src='http://meteor.ckcest.cn/liveIcon/${icon}.png'/>
                            <h3 class="fs_fy fw_500">${temp}°C</h3>
                        </div>
                        `
                    }
                }
            })
    })
}


