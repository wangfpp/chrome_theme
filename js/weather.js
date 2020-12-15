let appid = 73531774,
appsecret = "nUP7o0qA",
request_url = `http://www.tianqiapi.com/api?version=v61&appid=${appid}&appsecret=${appsecret}`,
weather_node = document.querySelector('.weather'),
time_gap = 3 * 60 * 60 * 1000;
getWeather(request_url);
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
        let { air,air_level,  air_pm25, air_tips, city, humidity, tem, tem1, tem2, win, win_speed, win_meter, visibility, wea }= res;
        if (weather_node) {
            let html_str = ""
            weather_node.innerHTML = `${city} ${wea}空气质量:${air_level} PM2.5:${air_pm25} 温度${tem}°C ${win}`
        }
    }).catch(err => {
        console.log(err);
    })
}




