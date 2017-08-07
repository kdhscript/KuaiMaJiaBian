<template>
    <div class="tmpl">
        <nav-bar title="新闻列表"></nav-bar>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="news in newsList" :key="news.id">
                <router-link :to="{name:'newsDetail',params:{newsId:news.id} }">
                    <img class="mui-media-object mui-pull-left" :src="news.img_url">
                    <div class="mui-media-body">
                        <span v-text="news.title"></span>
                        <div class="news-desc">
                            <p>点击数:{{news.click}}</p>
                            <p>发表时间:{{news.add_time| convertTime}}</p>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
//通用性好些 YYYY-MM-DD

export default {
    data() {
            return {
                newsList: [], //新闻列表数据
            }
        }
        //在组件创建的时候。。
        , created() {
            this.$ajax.get(this.$httpConfig.newslist)
                .then((res) => {
                    //隐藏loadding close
                    this.newsList = res.data.message;
                })
                .catch((err) => {
                    console.log('新闻列表出异常了', err);
                })
        }
}
</script>
<style scoped>
.mui-media-body p {
    color: #0bb0f5;
}

.news-desc p:nth-child(1) {
    float: left;
}

.news-desc p:nth-child(2) {
    float: right;
}
</style>
