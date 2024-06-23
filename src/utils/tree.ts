export function toTree(data) {
    // 根据pid生成树形结构，pid为0的是根节点
    let result = [];
    if (!Array.isArray(data)) {
        return result;
    }
    data.forEach(item => {
        delete item.children;
    });
    let map = {};
    data.forEach(item => {
        map[item.id] = item;
    });
    data.forEach(item => {
        let parent = map[item.pid];
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    });

    return result;
}