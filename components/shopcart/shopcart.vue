<template>
    <div>
        <nav-bar title="购物车"></nav-bar>
        <div class="pay-detail">
            <ul>
                <li class="p-list" v-for="(goods,index) in goodsList" :key="goods.id">
                    <mt-switch v-model="goods.isSelected"></mt-switch>
                    <img :src="goods.thumb_path">
                    <div class="pay-calc">
                        <p v-text="goods.title"></p>
                        <div class="calc">
                            <span>￥{{goods.sell_price}}</span>
                            <span @click="sub(index)">-</span>
                            <span>{{goods.pickNum}}</span>
                            <span @click="add(index)">+</span>
                            <a href="javascript:;" @click="del(index)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{payment.count}}件，总价￥{{payment.totalPrice}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import prodTools from '../commons/prodTools.js';
export default {
    data() {
            return {
                goodsList: [], //商品数组
            }
        },
        created() {

            //操作获取id
            let prods = prodTools.getProds(); //{ "87":10 }
            //Object.keys(prods) ->["87", "88"] -> "88,87"
            let ids = Object.keys(prods).join(',');
            this.$ajax.get(this.$httpConfig.getshopcart + ids)
                .then(res => {
                    this.goodsList = res.data.message;
                    //自己挂载属性，不会引起响应式
                    this.goodsList.forEach(ele => {
                        //该属性不是响应式的，属性改变以后不会触发视图更新
                        // ele.pickNum = prods[ele.id];
                        // ele.isSelected = false;
                        this.$set(ele, 'pickNum', prods[ele.id]);
                        this.$set(ele, 'isSelected', false);
                    });


                })
                .catch(err => {
                    console.log('获取购物车商品数据失败', err);
                })
        },
        methods: {
            sub(index) {
                this.goodsList[index].pickNum--;
            },
            add(index) {
                this.goodsList[index].pickNum++;
            },
            del(index) {
                if (confirm('亲，很优惠哟，真的要删除吗？')) {
                    prodTools.delProd(this.goodsList[index].id);
                    this.goodsList.splice(index, 1);
                }
            }
        },
        computed: {
            payment() {

                //件数： 遍历数组，如果当前的isSelected->true，自加一
                //总价: 当前的isSelected->true，将该元素的pickNum* sell_price 累加到总金额中
                //最终返回该对象，具备两个属性: count,totalPrice
                let count = 0;
                let totalPrice = 0;
                this.goodsList.forEach(ele => {
                    if (ele.isSelected) {
                        count++;
                        totalPrice += ele.sell_price * ele.pickNum;
                    }
                });


                return {
                    count,
                    totalPrice
                }
                //根据在该函数体内部的this相关属性的修改，所触发这个函数
                //返回新的计算的数据，也就是return 的任何东西
            }
        },
        //当前路由离开之前问一问，如果false取消用户导航行为，否则放行
        beforeRouteLeave(to, from, next) {
            if (confirm('真的要离开吗？程序猿好不舍哟！')) {
                next();
            } else {
                next(false); //取消导航
            }
        }
}
</script>
<style scoped>
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}

.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}

.pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}

.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}

.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}

.calc a {
    margin-left: 20px;
}

.show-1,
.show-2 {
    display: inline-block;
}

.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
