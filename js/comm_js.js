/**
 * @description 增加className
 * @param {Element} target Dom节点
 * @param {String} class_name 
 */
function addClass(target, class_name) {
    let class_names = getClass(target);
    if (!class_names.includes(class_name)) {
        class_names.push(class_name);
    }
    target.setAttribute("class", class_names.join(" "));
}

/**
 * @description 获取class列表
 * @param {Element} target Dom节点
 */
function getClass(target) {
    let class_name_list_str = target.getAttribute("class"),
    class_names = class_name_list_str ? class_name_list_str.split(" ") : [];
    return class_names;
}

/**
 * @description 删除节点的某一class_name
 * @param {Element} target Dom节点
 * @param {String} class_name 属性class名
 */
function removeClass(target, class_name) {
    let class_name_list_str = getClass(target);
    if (class_name_list_str.includes(class_name)) {
        let _index = class_name_list_str.indexOf(class_name);
        class_name_list_str.splice(_index, 1);
        target.setAttribute("class", class_name_list_str.join(" "));
    }
}

/**
 * @description 生成两位数
 * @param {Number} num 
 */
function doubleNum(num) {
    return num >= 10 ? num : `0${num}`;
}

/**
 * @description 格式化周
 * @param {Number} week 星期数0-6
 * @param {String} perfix 前缀
 */
function weekParse(week, perfix) {
    perfix = perfix || "星期";
    switch(week) {
        case 0:
            return `${perfix}日`;
        case 1:
            return `${perfix}一`;
        case 2:
            return `${perfix}二`;
        case 3:
            return `${perfix}三`;
        case 4:
            return `${perfix}四`;
        case 5:
            return `${perfix}五`;
        case 6:
            return `${perfix}六`;
    }
}