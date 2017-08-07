//引入vue/vue-router/axios
import Vue from 'vue';


//引入自己的组件 home,app
import App from './app.vue';
import Home from './components/home/home.vue';
import Member from './components/member/member.vue';
import Search from './components/search/search.vue';
import Shopcart from './components/shopcart/shopcart.vue';

// import Home from './components/home/home.vue';
import SuperMarket from './components/supermarket/supermarket.vue';
import Service from './components/service/service.vue';
// import Shopcart from './components/shopcart/shopcart.vue';
import Myself from './components/myself/myself.vue';

import NewsList from './components/news/list.vue';
import NewsDetail from './components/news/newsDetail.vue';
import PhotoShare from './components/photo/share.vue';
import PhotoDetail from './components/photo/detail.vue';
import GoodsList from './components/goods/list.vue';
import GoodsDetail from './components/goods/detail.vue';
import GoodsComment from './components/goods/goodsComment.vue';

//引入配置对象
import HttpConfig from './httpConfig.js';
Vue.prototype.$httpConfig = HttpConfig;


//引入Mint-ui
import MintUi from 'mint-ui';
//mint-ui 的css
import 'mint-ui/lib/style.css'
Vue.use(MintUi);

//引入mui的css
import './static/vendor/mui/dist/css/mui.css';
import './static/vendor/mui/dist/css/iconfont.css';

//引入自己的css
import './static/css/global.css';



//引入axios
import Axios from 'axios';

//配置拦截器，加载loadding的图标
//添加一个请求拦截器
Axios.interceptors.request.use(function(config) {
    //在请求发送之前做一些事

    MintUi.Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
    });


    return config;
}, function(error) {
    //当出现请求错误是做一些事
    return Promise.reject(error); //  相当于是new Promise(结果是失败)
});

//添加一个返回拦截器
Axios.interceptors.response.use(function(response) {

    MintUi.Indicator.close();

    //对返回的数据进行一些处理
    return response;
}, function(error) {
    //对返回的错误进行一些处理
    return Promise.reject(error);
});


Vue.prototype.$ajax = Axios; //可以使用this.$ajax了

//安装vue-preview
import VuePreView from 'vue-preview';
Vue.use(VuePreView); // 给Vue的原型挂载属性，让this.$preview能拿到对象

//引入qs库
import Qs from 'qs';
Vue.prototype.$qs = Qs;




//vue-router
import VueRouter from 'vue-router';
//安装插件
Vue.use(VueRouter);
//构建路由对象
let router = new VueRouter({
    linkActiveClass: 'mui-active'
});
router.addRoutes([
    //默认路由规则 重定向 redirect
    { name: 'default', path: '/', redirect: { name: 'home' } },
    { name: 'home', path: '/home', component: Home }, //首页
    { name: 'supermarket', path: '/supermarket', component: SuperMarket }, //超市
    { name: 'service', path: '/service', component: Service }, //会员
    { name: 'myself', path: '/myself', component: Myself }, //会员
    { name: 'shopcart', path: '/shopcart', component: Shopcart }, //购物车
    
    { name: 'search', path: '/search', component: Search }, //查找
    { name: 'newsList', path: '/news/list', component: NewsList }, //新闻列表
    { name: 'newsDetail', path: '/news/detial/:newsId', component: NewsDetail }, //新闻详情
    { name: 'photoShare', path: '/photo/share', component: PhotoShare }, //图片分享
    { name: 'photoDetail', path: '/photo/detail', component: PhotoDetail }, //图片详情
    { name: 'goodsList', path: '/goods/list', component: GoodsList }, // 商品列表
    { name: 'goodsDetail', path: '/goods/detail/:goodsId', component: GoodsDetail }, //商品详情
    { name: 'goodsComment', path: '/goods/comment/:goodsId', component: GoodsComment }, //商品评论组件
    { path: '/test', component: Comment }, //测试组件
]);

//设置全局路由钩子（放不放行）
router.beforeEach((to, from, next) => {

    if (to.name === 'newsDetail') {
        if (from.name === 'newsList') {
            console.log('是从新闻过来的');
        } else {
            console.log('是从图文详情过来的');
        }
    }
    next(); //放行

})





//引入moment
import Moment from 'moment';
//声明一个全局的过滤器
Vue.filter('convertTime', function(value) { //{{value|convertTime}}

    return Moment(value).format('YYYY-MM-DD');
})

//注册一个全局的组件
import NavBar from './components/commons/navBar.vue';
Vue.component('nav-bar', NavBar);
//注册评论全局组件
import Comment from './components/commons/comment.vue';
Vue.component('comment', Comment);
//注册轮播图全局组件
import MySwipe from './components/commons/mySwipe.vue';
Vue.component('my-swipe', MySwipe);

//加入进vue的实例中
new Vue({
    el: '#app',
    router,
    render: (c) => c(App), //c(App)就是return
})
