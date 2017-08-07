<template>
    <div>
        <nav-bar title="商品详情"></nav-bar>
        <div class="outer-swiper">
            <div class="swiper">
                <my-swipe :imgs="goods_imgs"></my-swipe>
            </div>
        </div>
        <div class="product-desc">
            <ul>
                <li><span class="product-desc-span" v-text="goodsInfo.title">
                </span></li>
                <li class="price-li">市场价：
                    <s>￥{{goodsInfo.market_price}}</s> 销售价：<span>￥{{goodsInfo.sell_price}}</span></li>
                <li class="number-li">购买数量：<span @click="substract">-</span><span>{{pickNum}}</span><span @click="add">+</span></li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click="addShopcart">加入购物车</mt-button>
                </li>
            </ul>
        </div>
        <transition name="ball" @after-enter="afterEnter">
            <div class="ball" v-if="isShow"></div>
        </transition>
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号：{{goodsInfo.goods_no}}</li>
                <li>库存情况：{{goodsInfo.stock_quantity}}件</li>
                <li>上架时间：{{goodsInfo.add_time | convertTime}}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain @click="goPicInfo">图文介绍</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" plain @click="goGoodsComment">商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import myBus from '../commons/myBus.js';
import prodTools from '../commons/prodTools.js';

export default {
    data() {
            return {
                goodsInfo: {}, //商品详情信息
                isShow: false, //小球是否显示
                goods_imgs: [], //缩略图
                pickNum: 1, //挑选数量
            }
        },
        created() {
            //从路由参数获取id
            let id = this.$route.params.goodsId;
            // this.$ajax.get(this.$httpConfig.getinfo + id)
            //     .then(res => {
            //         this.goodsInfo = res.data.message[0];
            //     })


            this.$ajax.all([
                    this.$ajax.get(this.$httpConfig.getthumimages + id),
                    this.$ajax.get(this.$httpConfig.getinfo + id)
                ])
                .then(this.$ajax.spread((imgRes, infoRes) => {
                    this.goodsInfo = infoRes.data.message[0];
                    this.goods_imgs = imgRes.data.message;
                }))
                .catch(err => {
                    console.log('商品详情获取数据失败', err);
                })

        },
        methods: {
            //通过路由显示商品评论
            goGoodsComment() {
                //去到商品评论组件
                //1:去哪里,1.5:要不要参数
                this.$router.push({
                    name: 'goodsComment',
                    params: {
                        goodsId: this.$route.params.goodsId
                    }
                });
            },
            //通过路由显示图文详情-> 复用新闻详情
            goPicInfo() {
                this.$router.push({
                    name: 'newsDetail',
                    params: {
                        newsId: this.$route.params.goodsId
                    }
                });
            },
            substract() {
                if (this.pickNum <= 1) return;
                this.pickNum--;
            },
            add() {
                //不要超出库存数量或者小于1
                if (this.pickNum >= this.goodsInfo.stock_quantity) return;
                this.pickNum++;
            },
            //添加购物车
            addShopcart() {
                //通信app.vue
                myBus.$emit('pickNum', this.pickNum);


                //调用工具对象的insertOrUpdate函数
                prodTools.addOrUpdate({
                    id: this.goodsInfo.id,
                    num: this.pickNum,
                });
                //让小球飞一会，元素被插入
                this.isShow = true;
            },
            //处理小球元素进入的动画完毕以后，隐藏小球
            afterEnter: function(el) {
                this.isShow = false; //隐藏小球
            }
        }
}
</script>
<style scoped>
/*有一个name叫ball的transition中的元素如果在被插入的时候我要执行bounce-in*/

.ball-enter-active {
    animation: bounce-in 1s;
}

@keyframes bounce-in {
    0% {
        /*translate3d流畅一点*/
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(140px, -50px, 0);
    }
    75% {
        transform: translate3d(160px, 0px, 0);
    }
    100% {
        transform: translate3d(140px, 300px, 0);
    }
}

.swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
}

.outer-swiper,
.product-desc,
.product-props,
.product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
}


/*请ulpadding*/

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
    padding: 0;
}

.product-desc ul li,
.product-props ul li,
.product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
}

.product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
}

.product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
    padding-left: 10px;
}

.price-li span {
    color: red;
    font-size: 25px;
}

.price-li s {
    margin-right: 16px;
}


/*加减*/

.number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
}


/*商品参数*/

.product-props ul >:nth-child(1) {
    text-align: left;
}

.product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
}

.product-info ul {
    margin-bottom: 70px;
    padding: 0 5;
}

.number-li span {
    text-align: center;
}

.number-li >:nth-child(2) {
    width: 40px;
}

.ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 440px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
}
</style>
