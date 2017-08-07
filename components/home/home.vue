<template>
    <div>
        <div>
            <my-swipe :imgs="home_imgs"></my-swipe>
        </div>
        <div>
            <div class='notice'>
                <marquee scrollamount=3 >公告公告</marquee> 
            </div>
            <div class="mui-content">
                <ul class="mui-table-view mui-grid-view mui-grid-9 ">
                    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
                        <router-link :to="{name:'newsList'}">
                            <span class="mui-icon mui-icon-home"></span>
                            <div class="mui-media-body">领券</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
                        <router-link :to="{name:'photoShare'}">
                            <span class="mui-icon mui-icon-email"></span>
                            <div class="mui-media-body">积分商城</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
                        <router-link :to="{name:'goodsList'}">
                            <span class="mui-icon mui-icon-chatbubble"></span>
                            <div class="mui-media-body">爱心坊</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
                        <a href="#">
                            <span class="mui-icon mui-icon-location"></span>
                            <div class="mui-media-body">孝心坊</div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
                        <a href="#">
                            <span class="mui-icon mui-icon-search"></span>
                            <div class="mui-media-body">收藏夹</div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
                        <a href="#">
                            <span class="mui-icon mui-icon-phone"></span>
                            <div class="mui-media-body">周边商店</div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
                        <a href="#">
                            <span class="mui-icon mui-icon-redo"></span>
                            <div class="mui-media-body">快递代收</div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
                        <a href="#">
                            <span class="mui-icon mui-icon-undo"></span>
                            <div class="mui-media-body">今日资讯</div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                home_imgs: [], //轮播图数据数组
            }
        },
        //初始化的时候发起请求获取轮播图数据
        created() {
            this.$ajax.get(this.$httpConfig.lunbo)
                .then((res) => {
                    this.home_imgs = res.data[0].image_url;
                })
                
        }
}
</script>
<style scoped>

/*跑马灯*/
.notice {
    height: 30px;
    line-height: 30px;
    width: 100%;
    background: url(../../static/img/notice.png) left center no-repeat;
    background-size:20px ;
    margin-top: 6px;
    padding-left: 30px;
    margin-left: 5px;
    color: red;
}


/*去除九宫格上面margin*/

.mui-table-view.mui-grid-view.mui-grid-9 {
    margin-top: 0px;
    border: none;
    background-color: white;
}


/* 去除li的颜色*/

.mui-table-view-cell.mui-media.mui-col-xs-3.mui-col-sm-3 {
    background-color: white;
    border: none;
}


/*清除ul下面的黑线*/

.mui-table-view.mui-grid-view.mui-grid-9:after {
    height: 0;
}


/*清除九宫格字体图标的样式*/

.mui-icon {
    height: 50px;
    width: 50px;
}

.mui-icon-home:before,
.mui-icon-email:before,
.mui-icon-chatbubble:before,
.mui-icon-location:before,
.mui-icon-search:before,
.mui-icon-phone:before,
.mui-icon-redo:before,
.mui-icon-undo:before {
    content: '';
}

.mui-icon-home {
    background-image: url('../../static/img/lingquan.png');
    /*环绕显示，让图片自动填充满*/
    background-repeat: round;
}

.mui-icon-email {
    background-image: url('../../static/img/jifenmall.png');
    background-repeat: round;
}

.mui-icon-chatbubble {
    background-image: url('../../static/img/aixin.png');
    background-repeat: round;
}

.mui-icon-location {
    background-image: url('../../static/img/xiaoxin.png');
    background-repeat: round;
}

.mui-icon-search {
    background-image: url('../../static/img/shoucang.png');
    background-repeat: round;
}

.mui-icon-phone {
    background-image: url('../../static/img/zhoubian.png');
    background-repeat: round;
}

.mui-icon-redo {
    background-image: url('../../static/img/kuaidi.png');
    background-repeat: round;
}

.mui-icon-undo {
    background-image: url('../../static/img/zixun.png');
    background-repeat: round;
}
</style>
