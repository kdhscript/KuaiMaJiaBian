<template>
	<div>
		<div class="touxiang">
			<div class="admin">
				<img src="../../static/img/admin.jpg"  alt="">
			</div>
			<p>欢迎你，亲爱的13833338888</p>
		</div>
		<div class="mui-content">
                <ul class="mui-table-view mui-grid-view mui-grid-9 ">
                    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
                        <router-link :to="{name:'newsList'}">
                            <span>0.00</span>
                            <div class="mui-media-body">余额</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
                        <router-link :to="{name:'photoShare'}">
                            <span>0</span>
                            <div class="mui-media-body">订单</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
                        <router-link :to="{name:'goodsList'}">
                            <span>0</span>
                            <div class="mui-media-body">优惠券</div>
                        </router-link>
                    </li>
                    <li class="mui-table-view-cell mui-media mui-col-xs-3 mui-col-sm-3">
                        <a href="#">
                            <span>0</span>
                            <div class="mui-media-body">积分</div>
                        </a>
                    </li>
                </ul>
        </div>
		<div>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell">
					<a href="javascript:;" class="mui-navigate-right">
						<span class="mui-icon icon-chaoshi"></span>
						<span>申请开店</span>
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a href="javascript:;" class="mui-navigate-right">
						<span class="mui-icon mui-icon-location"></span>
						<span>收货地址</span>
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a href="javascript:;" class="mui-navigate-right">
						<span class="mui-icon mui-icon-phone"></span>
						<span>联系客服</span>
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a href="javascript:;" class="mui-navigate-right">
						<span class="mui-icon mui-icon-info"></span>
						<span>关于我们</span>
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a href="javascript:;" class="mui-navigate-right">
						<span class="mui-icon mui-icon-compose"></span>
						<span>意见反馈</span>
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a href="javascript:;" class="mui-navigate-right">
						<span class="mui-icon mui-icon-starhalf"></span>
						<span>积分订单</span>
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a href="javascript:;" class="mui-navigate-right">
						<span class="mui-icon mui-icon-chat"></span>
						<span>联系好友</span>
					</a>
				</li>
				<li>
					<button class="quit">安全退出</button>
				</li>
			</ul>
		</div>
	</div>




</template>

<script>
export default {
  data () {
    return {

    };
  }
};
</script>

<style lang="css" scoped>
	.touxiang {
		height: 160px;
		width: 100%;
		background:url(../../static/img/bgc.png) left top repeat-x;
	}

	.touxiang p {
		margin-top: 40px;
		text-align: center;
		color: blue;
	}

	.admin img {
		width: 80px;
		border-radius:40px; 
	}
	.admin {
		width: 80px;
		height: 80px;
		margin: 0 auto;
		padding-top: 35px;
	}

	.mui-content {
		margin-top: 2px;
	}
	
	.mui-content li span {
		color: blue;
	}
	.mui-table-view.mui-grid-view.mui-grid-9 {
	    margin-top: 0px;
	    border: none;
	    background-color: white;
}
	.icon-chaoshi {
		color: orange;
	}
	.mui-icon-location{
		color: #4FBEF0;
	}

	.mui-icon-phone {
		color: #FFB3B2;
	}
	.mui-icon-info {
		color: #A790EA;
	}
	.mui-icon-compose {
		color: #1DB6FA;
	}
	.mui-icon-starhalf {
		color: #16A254;
	}
	.mui-icon-chat {
		color: #864A81;
	}
	.quit {
		display: block;
		width: 200px;
		height: 50px;
		background-color: #3492E9;
		margin: 5px auto;
		color: #fff;
	}
</style>