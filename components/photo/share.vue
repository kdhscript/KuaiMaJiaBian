<template>
    <div class="tmpl">
        <!-- 引入返回导航 -->
        <nav-bar title="图文分享"></nav-bar>
        <div class="photo-header">
            <ul>
                <li v-for="category in categorys" :key="category.id">
                    <a href="javascript:;" @click="getImgs(category.id)">{{category.title}}</a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for="img in imgs" :key="img.id">
                    <!-- 1：去哪里？ -->
                    <router-link :to="{name:'photoDetail',query:{photoId:img.id} }">
                        <img v-lazy="img.img_url">
                        <p>
                            <span v-text="img.title"></span>
                            <br>
                            <span v-text="img.zhaiyao"></span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                categorys: [], //分类
                imgs: [], //图片对象
            }
        },
        created() {
            //合并请求
            this.$ajax.all([
                    this.$ajax.get(this.$httpConfig.getimgs + '0'),
                    this.$ajax.get(this.$httpConfig.category)
                ])
                .then(this.$ajax.spread((imgsRes, categoryRes) => {
                    //(imgsRes,categoryRes) 参数位置对应all函数数组元素位置的响应
                    this.categorys = categoryRes.data.message;

                    //Vue 包含一组观察数组的变异方法，所以它们也将会触发视图更新
                    this.categorys.unshift({
                        id: 0,
                        title: '全部'
                    });

                    this.imgs = imgsRes.data.message;

                }))
                .catch(err => {
                    console.log('图片模块请求数据失败', err);
                })
        },
        //点击分类后获取图片
        methods: {
            getImgs(gid) {
                this.$ajax.get(this.$httpConfig.getimgs + gid)
                    .then(res => {
                        this.imgs = res.data.message;
                    })
                    .catch(err => {
                        console.log('分类图片获取失败');
                    })
            }
        }
}
</script>
<style>
/*图片懒加载的样式*/

image[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
}

.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5;
}


/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}
</style>
