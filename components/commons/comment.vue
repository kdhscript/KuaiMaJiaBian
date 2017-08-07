<template>
    <div class="tmpl">
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a @click="goback">返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model="newComment"></textarea>
                </li>
                <li>
                    <mt-button type="primary" size="large" @click="sendComment">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(msg,index) in msgs" :key="index">
                    {{msg.user_name}}：{{msg.content}} {{msg.add_time |convertTime}}
                </li>
            </ul>
            <mt-button type="danger" size="large" plain @click="loadmore">加载更多{{pageindex}}</mt-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                pageindex: 1,
                msgs: [], //评论信息们
                // cid: 37, 走你
                newComment: '', //评论信息
            }
        },
        props: ['cid'], //  this.$props.cid||this.cid 都可以回去
        created() {
            this.loadFirst();
        },
        methods: {
            loadmore() {
                this.$ajax.get(this.$httpConfig.getcomments + this.cid + '?pageindex=' + this.pageindex++)
                    .then(res => {
                        //将数据追加到原数组末尾
                        this.msgs = this.msgs.concat(res.data.message);
                    })
                    .catch(err => {
                        console.log('评论数据获取失败', err);
                    })
            },
            sendComment() {

                //发送数据发表评论
                this.$ajax.post(this.$httpConfig.postcomment + this.cid, {
                        content: this.newComment
                    }, { //options
                        //转换请求数据
                        transformRequest: (data) => { //data就是content:this.newComment
                            //使用qs对象
                            return this.$qs.stringify(data); //最终请求体的数据
                        }
                    })
                    .then(res => {
                        //首先，将当前的页面变为1
                        this.pageindex = 1;
                        //然后发起请求，加载数据
                        this.loadFirst();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            //第一次加载
            loadFirst() {
                //模拟一个id= 37   ,url需要拼接:artid?pageindex=1
                //获取评论列表
                this.$ajax.get(this.$httpConfig.getcomments + this.cid + '?pageindex=' + this.pageindex++)
                    .then(res => {
                        this.msgs = res.data.message;
                    })
                    .catch(err => {
                        console.log('评论数据获取失败', err);
                    })
            },
            goback() {
                this.$router.go(-1);
            }
        }
}
</script>
<style scoped>
.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}
</style>
