
/*
 * localstorage 存储 set
 * Author: yujp
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
};

/*
 * localstorage 获取 get
 * Author: yujp
 */
export const getStore = name => {
    if (!name) return;

    return window.localStorage.getItem(name);
};

/*
 * localstorage 删除 remove
 * Author: yujp
 */
export const removeStore = name => {
    if (!name) return;

    window.localStorage.removeItem(name);
};




