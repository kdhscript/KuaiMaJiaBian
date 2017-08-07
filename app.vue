<template>
    <div>
        <!-- 头部内容 -->
        <mt-header title="快马家边"></mt-header>
        <router-view></router-view>
        <!-- 底部开始 -->
        <nav class="mui-bar mui-bar-tab" ref="tabbar">
            <router-link :to="{name:'home'}" class="mui-tab-item " href="#tabbar">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link :to="{name:'supermarket'}" class="mui-tab-item" href="#tabbar-with-chat">
                <span class="mui-icon icon-chaoshi"></span>
                <span class="mui-tab-label">超市</span>
            </router-link>
            <router-link :to="{name:'shopcart'}" class="mui-tab-item" href="#tabbar-with-contact">
                <span class="mui-icon iconfont icon-gouwuche"></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link :to="{name:'service'}" class="mui-tab-item" href="#tabbar-with-chat">
                <span class="mui-icon iconfont icon-rili"></span>
                <span class="mui-tab-label">服务</span>
            </router-link>
            <router-link :to="{name:'myself'}" class="mui-tab-item" href="#tabbar-with-map">
                <span class="mui-icon iconfont icon-wode"></span>
                <span class="mui-tab-label">我的</span>
            </router-link>
        </nav>
        <!-- 底部结束 -->
    </div>
</template>
<script>
import myBus from './components/commons/myBus.js';
import prodTools from './components/commons/prodTools.js';
export default {
    data() {
            return {
                pickNum: prodTools.getProdCount()
            }
        },
        mounted() {

        },
        created() {
            //获取底部的高度
            myBus.$on('getTabbarHeight', fn => {
                fn(this.$refs.tabbar.offsetHeight);
            });
            //操作购物车数量
            myBus.$on('pickNum', num => {
                this.pickNum += num;
            });

        },
      
}
</script>
<style>
</style>
