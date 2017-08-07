<template>
    <div class="tmpl" :style="{height:divHeight+'px'}">
        <nav-bar title="商品列表" ref="nav"></nav-bar>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" @bottom-status-change="handleBottomChange" :auto-fill="isAutoFill" ref="loadmore">
            <ul class="mui-table-view mui-grid-view">
                <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="goods in goodsList" :key="goods.id">
                    <router-link :to="{name:'goodsDetail',params:{goodsId:goods.id} }">
                        <img class="mui-media-object" :src="goods.img_url">
                        <div class="mui-media-body" v-text="goods.title"></div>
                        <div class="desc">
                            <div class="sell">
                                <span>￥{{goods.sell_price}}</span>
                                <s>￥{{goods.market_price}}</s>
                            </div>
                            <div class="detail">
                                <div class="hot">
                                    热卖中
                                </div>
                                <div class="count">
                                    剩{{goods.stock_quantity}}件
                                </div>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </mt-loadmore>
    </div>
</template>
<script>
import myBus from '../commons/myBus.js';
export default {
    data() {
            return {
                pageindex: 1, //页码
                goodsList: [], //商品数组
                allLoaded: false, //允许再次调用上拉函数
                isAutoFill: false, //是否自动触发下拉函数来填充满父盒子
                divHeight: 0, //父盒子合理的高度
            }
        },
        created() {
            this.$ajax.get(this.$httpConfig.getgoods + this.pageindex++)
                .then(res => {
                    this.goodsList = res.data.message;
                })
                .catch(err => {
                    console.log('商品列表获取失败！', err)
                })
        },
        methods: {
            loadBottom() {
                //获取下一页的数据
                this.$ajax.get(this.$httpConfig.getgoods + this.pageindex++)
                    .then(res => {
                        this.goodsList = this.goodsList.concat(res.data.message);

                        //如果当前数据有10条以上，返回10条，
                        //否则只返回所有剩余的部分（不到10条）
                        //  刚好10条的情况： 1：下一页还有数据,2:下一页没有数据（浪费一次请求)
                        if (res.data.message.length != 10) {
                            //不会触发上拉刷新函数了
                            this.allLoaded = true;
                        }
                        //通知组件的状态改变，从loadding进入pull
                        this.$refs.loadmore.onBottomLoaded();
                    });
            },
            //获取当前刷新状态
            handleBottomChange(s) {
                // console.log(s)
            }
        },
        mounted() {
            // console.log(document.documentElement.clientHeight);
            // console.log(this.$refs.nav.$el.offsetHeight);
            //触发事件
            myBus.$emit('getTabbarHeight', (h) => {
                this.divHeight = document.documentElement.clientHeight - h - this.$refs.nav.$el.offsetHeight;
            });

        }
}
</script>
<style scoped>
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 200px;
}
</style>
