<template>
    <div class="tmpl">
        <nav-bar title="图片详情"></nav-bar>
        <div class="photo-title">
            <p v-text="info.title"></p>
            <span>发起日期：{{info.add_time | convertTime}}</span>
            <span>{{info.click}}次浏览</span>
            <span>分类：民生经济</span>
        </div>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(img,index) in imgs" :key="index">
                <img class="preview-img" :src="img.src" height="100" @click="$preview.open(index, imgs)">
            </li>
        </ul>
        <div class="photo-desc">
            <p v-html="info.content"></p>
        </div>
        <comment :cid="$route.query.photoId"></comment>
    </div>
</template>
<script>
export default {
    data() {
            return {
                info: {}, //图片信息
                imgs: [], //缩略图

            }
        },
        //在创建组件的时候。。。。
        created() {
            let pid = this.$route.query.photoId;
            //发起请求，需求正常是all来解决
            //但是老师要求一定保证顺序请求，为了熟悉顺序请求的使用
            // getimageInfo、getthumimages
            //先请求info
            this.$ajax.get(this.$httpConfig.getimageInfo + pid)
                .then(res => {
                    this.info = res.data.message[0];
                    //then的参数是成功后的回调函数,这里的return是为了后面的then保证顺序并且接受返回值准备
                    return this.$ajax.get(this.$httpConfig.getthumimages + pid);
                })
                .then(res => {
                    //操作缩略图
                    this.imgs = res.data.message;
                    //手动加上w/h
                    this.imgs.forEach(ele => {
                        ele.h = 300;
                        ele.w = 300;
                    });
                })

        }
}
</script>
<style scoped>
li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-title {
    overflow: hidden;
}

.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}

.photo-title span {
    margin-right: 20px;
}

.mui-table-view.mui-grid-view.mui-grid-9 {
    background-color: white;
    border: 0;
}

.mui-table-view.mui-grid-view.mui-grid-9 li {
    border: 0;
}

.photo-desc p {
    font-size: 18px;
}

.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
    padding: 2 2;
}
</style>
