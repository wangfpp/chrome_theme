window.onload = e => {
    let date_node = document.querySelector('.date'),
    input_node = document.querySelector('#search'),
    chp_node = document.querySelector("#chp"),
    menu_node = document.querySelector('#menu'),
    engine_radio = menu_node.querySelectorAll(".menu-item input[name=engine]"),
    root_node = document.querySelector("#root"),
    local_img_input = document.querySelector('#local_img_file'),
    set_btn = document.querySelector('#set_btn');

    const storage = window.localStorage;
    let screenBg = storage.getItem("screen_bg");
    createChp(chp_node); // 获取彩虹屁
    // http://pic.netbian.com/uploads/allimg/201207/233833-1607355513c763.jpg 黑色
    setRootBG(screenBg);
    /**
     * 设置背景图
     */
    function setRootBG(url) {
        if (root_node) {
            root_node.setAttribute("style", `background: url(${url});background-size: cover`);
            let image = new Image();
            image.onload = function(e) {
                let { offsetTop, offsetLeft, offsetWidth, offsetHeight } = chp_node;
                let { target } = e,
                { width, height } = target,
                pixel = getImagePix(image),
                _date_color = areaPixAverage(pixel, [0, 166], [0, 53]),
                weather_color = areaPixAverage(pixel, [width-188, width], [0, 60]),
                chp_color = areaPixAverage(pixel, [offsetLeft, offsetLeft + offsetWidth], [offsetTop, offsetTop + offsetHeight]);
                root_node.style.setProperty("--date_color", _date_color);
                root_node.style.setProperty("--weather-color", weather_color);
                root_node.style.setProperty("--chp_color", chp_color);
            }
            image.src = url
        }
    }

    if (input_node) {
        input_node.focus();
    }

    if (date_node) {
        date_node.innerHTML = formatDateString();
        setInterval(() => {
            if (date_node) {
                date_node.innerHTML = formatDateString();
            }
        }, 1000);
    }

    local_img_input.onchange = e => {
        let { target } = e,
        { files } = target,
        file = files[0],
        { size } = file,
        sizeM = sizeParse(size);
        if (sizeM >= 5) {
            alert("不能大于5M");
            return
        }
        let fileRead = new FileReader();
        fileRead.onload = result => {
            let base64 = result.target.result;
            storage.setItem("screen_bg", base64);
            setRootBG(base64);
        }
        fileRead.readAsDataURL(file);
        // e.target.files = [];
        e.target.value = "";
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
     * @description 计算图片大小
     * @param {Number} num bit
     */
    function sizeParse(num) {
        return num/1024/1024;
    }

    /**
    * @description 获取图片的像素矩阵
    * @param {Element Image} 图片target
    */
    function getImagePix(image) {
        let canvas = document.createElement("canvas");
        let { naturalWidth: width, naturalHeight: height } = image;
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, width, height);
        let image_data = ctx.getImageData(0, 0, width, height).data;
        let pixel = new Array();
        for(var i = 0; i < width; i++) {
            pixel[i] = [];
            for(var j = 0; j < height; j++) {
                let pix_index = (i*8 + j*4);
                pixel[i].push([image_data[pix_index], image_data[pix_index + 1], image_data[pix_index+2], image_data[pix_index+3]])
            }
        }
        return pixel;
    }

    /**
     * @description 计算一个区域的反色
     * @param {Array} imgarr 图片的数据矩阵
     * @param {Array} width 宽度的坐标范围
     * @param {Array} height 高度的坐标范围
     */
    function areaPixAverage(imgarr, width, height) {
        let r = 0, g = 0, b = 0,
        [wmin, wmax] = width,
        [hmin, hmax] = height;
        let sun = (wmax - wmin) * (hmax - hmin);
        for(var i = wmin; i < wmax; i++) {
            for(var j = hmin; j < hmax; j++) {
                r += imgarr[i][j][0];
                g += imgarr[i][j][1];
                b += imgarr[i][j][2];
            }
        }
        let color = `rgb(${255 - parseInt(r/sun)}, ${255 - parseInt(g/sun)}, ${255 - parseInt(b/sun)})`;
        return color;
    }
    /**
     * @description 点击页面时隐藏菜单
     * @param {*} 
     */
    document.onclick = e => {
        let { target } = e;
        let id = target.getAttribute("id");
        if ((!menu_node.contains(target) && !set_btn.contains(target))){
            let class_list = getClass(menu_node);
            if (class_list.length) {
                 if (class_list.includes("showmenu")) {
                    menu_node.setAttribute("class", "hidemenu");
                }
            }
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

    /**
     * 生成日期数据
     */
    function formatDateString(){
        let date = new Date();
        let [year, mon, day, week, hour, min, second ] = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getDay(), date.getHours(), date.getMinutes(), date.getSeconds()];
        let time = `${doubleNum(hour)}:${doubleNum(min)}:${doubleNum(second)}`
        return `
        <h4 class='year'>${year}</h4>
        <h3 class='mon_day'>
            <cite>${mon}</cite>
            <cite>${day}</cite>
            <p>${weekParse(week)}</p>
        </h3>
        <div class='flex_col flex_start'>
            <h3 class="fw_500 fs_20">${time}</h3>
        </div>
        `
    }
}


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