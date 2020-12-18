window.onload = e => {
    let date_node = document.querySelector('.date'),
    input_node = document.querySelector('#search'),
    chp_node = document.querySelector("#chp"),
    menu_node = document.querySelector('#menu'),
    engine_radio = menu_node.querySelectorAll(".menu-item input[name=engine]"),
    root_node = document.querySelector("#root"),
    local_img_input = document.querySelector('#local_img_file'),
    select_img = document.querySelectorAll('.select_file_type>div'),
    textcolor_with_img_node = document.querySelector("#textcolor_with_img"),
    show_history_node = document.querySelector("#show_history_switch"),
    set_btn = document.querySelector('#set_btn');


    const storage = window.localStorage;
    let screenBg = storage.getItem("screen_bg");
    let textcolor_with_img_ = storage.getItem("color_width_img");
    let show_history = storage.getItem("show_history");
    

    setSwitchValue(textcolor_with_img_node, textcolor_with_img_);

    setSwitchValue(show_history_node, show_history);


    createChp(chp_node); // 获取彩虹屁
    // http://pic.netbian.com/uploads/allimg/201207/233833-1607355513c763.jpg 黑色
    setRootBG(screenBg);

    if (show_history == "0") {
        chp_node.setAttribute("style", "top: 50%")
    } 
    function setSwitchValue(node, localstorageValue) {
        if (localstorageValue == "1") {
            setCheckBox(node, true);
        } else {
            removeAttr(node, "checked");
        }
    }

    /**
     * 
     * @param {Element} node 
     */
    function setCheckBox(node, value) {
        node.setAttribute("checked", value)
    }

    /**
     * 删除属性
     */
    function removeAttr(node, attr) {
        node.removeAttribute(attr);
    }

    /**
     * 设置背景图
     */
    function setRootBG(url) {
        if (root_node) {
            root_node.setAttribute("style", `background: url(${url});background-size: cover`);
            let image = new Image();
            image.onload = function(e) {
                if (storage.getItem("color_width_img") == "1") {
                    let { offsetTop, offsetLeft, offsetWidth, offsetHeight } = chp_node;
                    let { target } = e,
                    { width, height } = target;
                    if(!(width >= 2000 || height >= 2000)) {
                        console.log("图片太大")
                        let pixel = getImagePix(image),
                        _date_color = areaPixAverage(pixel, [0, 166], [0, 53]),
                        weather_color = areaPixAverage(pixel, [width-188, width], [0, 60]),
                        chp_color = areaPixAverage(pixel, [offsetLeft, offsetLeft + offsetWidth], [offsetTop, offsetTop + offsetHeight]);
                        setSearchBg(input_node, pixel);
                        root_node.style.setProperty("--date_color", _date_color);
                        root_node.style.setProperty("--weather-color", weather_color);
                        root_node.style.setProperty("--chp_color", chp_color);
                    }
                }
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

    function setSearchBg(search_node, pixel) {
        let { offsetTop, offsetLeft, offsetWidth, offsetHeight } = search_node;
        let averpix = areaPixAverage(pixel, [offsetLeft, offsetLeft + offsetWidth], [offsetTop, offsetTop + offsetHeight],true);
        let aver_count = 0;
        averpix.forEach(num => {
            aver_count += num
        })
        if (aver_count <= 382) {
            root_node.style.setProperty("--search-bg", "rgba(0,0,0,0.1)");
            root_node.style.setProperty("--search-bg-focus", "rgba(0,0,0,0.2)");
            root_node.style.setProperty("--search-color", "#fff");
            
        } else {
            root_node.style.setProperty("--search-bg", "rgba(255,255,255,0.6)");
            root_node.style.setProperty("--search-bg-focus", "rgba(255,255,255,0.8)");
            root_node.style.setProperty("--search-color", "#000");
        }
        
    }
    /**
     * @description 上传本地图像作为背景图
     * @param {Event} e event事件
     */
    local_img_input.oninput = e => {
        let { target } = e,
        { type, files, value } = target;
        if (type === "text") {
            let pattern = /^(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;
            if (!pattern.test(value)) {
                // target.setCustomValidity(true)
                target.setAttribute("style", "border: 1px solid #f00");
                return
            }
            storage.setItem("screen_bg", value);
            setRootBG(value);
            
        } else if(type === "file") {
            let file = files[0],
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
            e.target.value = "";
        }
    }

    /**
     * @description 搜索框
     * @param {*} e 
     */
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
     * 颜色跟随搜索框按钮
     */

    textcolor_with_img_node.onchange = e => {
        console.log(e)
        let { target } = e;
        let { checked } = target;
        if (checked) {
            storage.setItem("color_width_img", "1");
        } else {
            storage.setItem("color_width_img", "0")
        }
    }

    show_history_node.onchange = e => {
        let { target } = e;
        let { checked } = target;
        if (checked) {
            storage.setItem("show_history", "1");
        } else {
            storage.setItem("show_history", "0")
        }
    }
    select_img.forEach(div => {
        div.onclick = e => {
            let { target } = e;
            let class_list = getClass(target);
            if (class_list.includes("local")) {
                local_img_input.setAttribute("type", "file");
            } else if (class_list.includes("network")) {
                local_img_input.setAttribute("type", "text");
                local_img_input.setAttribute("placeholder", "请输入一个网络图片地址");
            }
            select_img.forEach(item => {
                removeClass(item, "active")
            })
            addClass(target, "active");
            
        }
    })
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
     * @param { Boolean } value 是否返回像素值
     */
    function areaPixAverage(imgarr, width, height, value) {
        value = value || false;
        let r = 0, g = 0, b = 0,
        [wmin, wmax] = width,
        [hmin, hmax] = height;
        if (wmin > imgarr.length) {
            wmin = imgarr.length
        }
        if (wmax > imgarr.length) {
            wmax = imgarr.length
        }
        let sun = (wmax - wmin) * (hmax - hmin);
        for(var i = wmin; i < wmax; i++) {
            if (hmin > imgarr[i].length) {
                hmin = imgarr[i].length
            }
            if (hmax > imgarr[i].length) {
                hmax = imgarr[i].length
            }
            for(var j = hmin; j < hmax; j++) {
                r += imgarr[i][j][0];
                g += imgarr[i][j][1];
                b += imgarr[i][j][2];
            }
        }
        r = 255 - parseInt(r/sun);
        g = 255 - parseInt(g/sun);
        b = 255 - parseInt(b/sun);
        let color = `rgb(${r}, ${r}, ${b})`;
        return value ? [r, g, b] : color;
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
        fetch('https://chp.shadiao.app/api.php?').then(res => {
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