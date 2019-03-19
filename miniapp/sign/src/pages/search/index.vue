<template>
  <div class="wrap">
    <header>
      <span>北京</span>
      <input type="text" placeholder="面试地址" v-model="address">
    </header>
    <ul>
      <li v-for="(item, index) in suggestion" :key="index"> 
        <p>{{item.title}}</p>
        <p>{{item.address}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {debounce} from '@/utils/index.js'
import {mapState, mapMutations} from 'vuex'

export default {
  data () {
    return {
      address: '',
      suggestion: []
    }
  },

  computed: {
    ...mapState({
      state: state=>state.index.count,
      state2: state=>state.index.count,
    })
  },

  watch: {
    address(val, oldVal){
      this.search(val);
    }
  },

  methods: {
    ...mapMutations({
      changeNum: 'index/changeCount'
    })
  },

  created () {
    var that = this;
    this.search = debounce((val)=>{
      this.$map.search({
        keyword: val,
        region: '北京',
        success: function (res) {
          console.log(res);
          that.suggestion = res.data;
        }
      })
    }, 300);
  }
}
</script>

<style lang="scss" scoped>
header{
  display: flex;
  align-items: center;
  span{
    width: 30%;
    box-sizing: border-box;
    border-right: 1px solid #eee;
  }
}
</style>
