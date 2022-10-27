<template>
  <div>
    <!-- 三级联动全局组件: 三级联动已经注册全局组件，因此不需要再引入 -->
    <TypeNav/>
    <ListContainer/>
    <TodayRecommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
//引入其余的组件
import ListContainer from '@/pages/Home/ListContainer';
import TodayRecommend from '@/pages/Home/TodayRecommend';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';
import {mapState} from 'vuex';

// import {mapState} from 'vuex';
export default {
    name:'Home',
    components:{ListContainer,TodayRecommend,Rank,Like,Floor,Brand},
    computed: {
      ...mapState({
        floorList: state=>state.home.floorList
      })
    },
    methods: {
    },
    mounted(){
      //派发action，获取floor组件的数据
      this.$store.dispatch("getFloorList");
    }
}
</script>

<style>

</style>