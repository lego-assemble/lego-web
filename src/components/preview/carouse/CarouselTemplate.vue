<template>
  <div>
    <div class="block">
    <van-swipe :autoplay="3000" indicator-color="white" :height="200">
      <van-swipe-item v-for="(image, index) in images" :key="index">
      <div class='image_area'>
        <img class="rightulliimg" :src="image" />
      </div>
      </van-swipe-item>
    </van-swipe>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import BaseTemplate from '../base/BaseTemplate'
export default {
  extends: BaseTemplate,
  data () {
    return {
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  },
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image_area {
width: 100%;
height: 100%;
background: #f2f2f2;
display: flex;
justify-content: center;
align-items: center;
  .rightulliimg {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
