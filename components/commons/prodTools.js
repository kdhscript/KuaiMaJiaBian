//获取localStorage
let locals = window.localStorage;
let prodTools = {
    //增加或者更新
    addOrUpdate(prod) { //id num
        //获取原来的数据对象，查？
        let prods = this.getProds();
        if (prods[prod.id]) {
            //如果商品存在追加
            prods[prod.id] += prod.num;
        } else {
            //商品不存在，直接赋值
            prods[prod.id] = prod.num;
        }
        //保存
        this.save(prods);
    },
    //删除
    delProd(id) {
        let prods = this.getProds();
        // prods[id] = null;
        //删除key
        delete prods[id];
        // 保存
        this.save(prods);
    },
    getProds() {
        //默认第一次，没有数据
        return JSON.parse(locals.getItem('prods') || '{}');
    },
    save(prods) {
        locals.setItem('prods', JSON.stringify(prods));
    },
    //获取商品累计数量
    getProdCount() {
        let prods = this.getProds();
        let sum = 0;
        for (let id in prods) {
            sum += prods[id];
        }
        return sum;
    }
}


export default prodTools;
