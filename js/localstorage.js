const { localStorage } = window;
/**
 * @description 变量说明
 * search_engine 搜索引擎设置
 * screen_bg 背景图url
 * color_width_img 字体颜色是否和图片形成反差
 */

 // 默认使用百度的搜索引擎
localStorage.getItem("search_engine") ? null: localStorage.setItem("search_engine", "baidu");

// 默认图片
localStorage.getItem("screen_bg") ? null : localStorage.setItem("screen_bg", "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?crop=entropy&cs=srgb&dl=pexels-james-wheeler-417074.jpg&fit=crop&fm=jpg&h=2847&w=4226");

// 默认不开启
localStorage.getItem("color_width_img") ? null : localStorage.setItem("color_width_img", "0");