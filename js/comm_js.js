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