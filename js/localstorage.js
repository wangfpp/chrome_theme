const { localStorage } = window;
localStorage.getItem("search_engine") ? null: localStorage.setItem("search_engine", "baidu"); // 默认使用百度的搜索引擎
localStorage.getItem("screen_bg") ? null : localStorage.setItem("screen_bg", "../img/background/base_bg.jpg"); // 默认使用本地图片