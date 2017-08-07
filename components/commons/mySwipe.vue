<!-- 组件说明: 使用该组件需要先准备好数据，对应传递的属性名为imgs
    注意事项2: imgs对应的对象应该必须包含img属性或者src属性
 -->
<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(pic,index) in imgs" :key="index">
                <a :href="pic.url">
                    <img :src="pic.img||pic.src">
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }, props: ['imgs']
}
</script>
<style scoped>
.mint-swipe .mint-swipe-item img {
    height: 100%;
    width: 100%;
}

.mint-swipe {
    max-height: 187px;
}
</style>
