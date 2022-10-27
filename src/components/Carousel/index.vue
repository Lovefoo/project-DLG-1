<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
//引入Swiper
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    //监听list数据的变化: 因为这条数据发生过变化----由空数组变为数组里面有四个元素
    list: {
      immediate: true,
      handler(newValue, oldValue) {
        //现在通过watch监听bannerList属性的属性值的变化
        //如果执行handler方法，代表组件实例身上这个属性的属性已经有了[数组:四个元素]
        //当前这个函数执行: 只能保证bannerList数据已经有了，但是你没办法保证v-for已经执行结束了
        //v-for执行完毕，才有结构 (你现在在watch当中没办法保证的)

        //nextTick: 在下次Dom更新  循环结束之后  执行延迟回调。在  修改数据之后  立即使用这个方法，获取更新后的Dom
        this.$nextTick(() => {
          //当你执行这个回调的时候: 保证服务器数据回来了，v-for执行完毕了 (轮播图的结构一定有了)
          var mySwiper = new Swiper(this.$refs.cur, {
            autoplay: true, //自动切换
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              //点击小球的时候也切换图片
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            
          });
        });
      },
    },
  },
};
</script>

<style>
</style>