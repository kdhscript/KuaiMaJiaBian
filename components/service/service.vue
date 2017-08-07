<template>
	<div>
		<div>
            <my-swipe :imgs="home_imgs"></my-swipe>
        </div>

        <div class="mui-content">
                <ul class="mui-table-view mui-grid-view mui-grid-9 ">
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                        <router-link :to="{name:'newsList'}">
                            <span class="mui-icon mui-icon-home"></span>
                            <div class="mui-media-body">洗衣缝补</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                        <router-link :to="{name:'photoShare'}">
                            <span class="mui-icon mui-icon-email"></span>
                            <div class="mui-media-body">房产</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                        <router-link :to="{name:'goodsList'}">
                            <span class="mui-icon mui-icon-chatbubble"></span>
                            <div class="mui-media-body">汽车</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                        <a href="#">
                            <span class="mui-icon mui-icon-location"></span>
                            <div class="mui-media-body">账单缴费</div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                        <a href="#">
                            <span class="mui-icon mui-icon-search"></span>
                            <div class="mui-media-body">维修</div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                        <a href="#">
                            <span class="mui-icon mui-icon-phone"></span>
                            <div class="mui-media-body">开锁</div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                        <a href="#">
                            <span class="mui-icon mui-icon-redo"></span>
                            <div class="mui-media-body">挂号就诊</div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                        <a href="#">
                            <span class="mui-icon mui-icon-undo"></span>
                            <div class="mui-media-body">废品回收</div>
                        </a>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                        <a href="#">
                            <span class="mui-icon mui-icon-undo"></span>
                            <div class="mui-media-body">预约服务</div>
                        </a>
                    </li>
                </ul>
            </div>
	</div>




</template>

<script>
	export default {
	  data () {
	    return {
	    	home_imgs: [],
	    };
	  },
	    //初始化的时候发起请求获取轮播图数据
	    created() {
	        this.$ajax.get(this.$httpConfig.lunbo)
	            .then((res) => {
	                this.home_imgs = res.data.message;
	            })
	            
	    }
	};
</script>

<style lang="css" scoped>

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
    background-image: url('../../static/img/xiyi.png');
    /*环绕显示，让图片自动填充满*/
    background-repeat: round;
}

.mui-icon-email {
    background-image: url('../../static/img/fangchan.png');
    background-repeat: round;
}

.mui-icon-chatbubble {
    background-image: url('../../static/img/qiche.png');
    background-repeat: round;
}

.mui-icon-location {
    background-image: url('../../static/img/jiaofei.png');
    background-repeat: round;
}

.mui-icon-search {
    background-image: url('../../static/img/weixiu.png');
    background-repeat: round;
}

.mui-icon-phone {
    background-image: url('../../static/img/kaisuo.png');
    background-repeat: round;
}

.mui-icon-redo {
    background-image: url('../../static/img/yuyue.png');
    background-repeat: round;
}

.mui-icon-undo {
    background-image: url('../../static/img/zixun.png');
    background-repeat: round;
}

</style>