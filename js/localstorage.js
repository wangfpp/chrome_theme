const { localStorage } = window;
localStorage.getItem("search_engine") ? null: localStorage.setItem("search_engine", "baidu"); // 默认使用百度的搜索引擎
localStorage.getItem("screen_bg") ? null : localStorage.setItem("screen_bg", "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?crop=entropy&cs=srgb&dl=pexels-james-wheeler-417074.jpg&fit=crop&fm=jpg&h=2847&w=4226"); // 默认使用本地图片