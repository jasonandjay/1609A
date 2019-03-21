import {getSignList} from '@/api/index';
const moment = require('moment');

const state = {
  active: 0, //表示当前面试类型，0表示全部，1表示未开始，1表示已打卡，2表示已放弃
  list: [], //面试列表
  hasMore: true,  //是否有更多数据
  page: 1, //当前页码
  pageSize: 10 //每页数据
}

const mutations = {
  updateState(state, payload){
    for (let key in payload){
      state[key] = payload[key]
    }
  }
}

const actions = {
  getList({commit, state}, payload){
    console.log('payload...', payload);
    return new Promise(async (resolve, reject)=>{
      let params = {};
      if (state.active){
        params.status = state.active-2;
      }
      let result = await getSignList(params);
      result.data.forEach(item=>{
        item.address = JSON.parse(item.address);
        item.start_time = formatTime(item.start_time);
      })
      // 判断是替换还是追加
      if (state.page == 1){
        commit('updateState',{list: result.data})
      }else{
        commit('updateState',{list: [...state.list, result.data]})
      }
    })
  }
}

function formatTime(start_time){
  return moment(start_time*1000).format('YYYY-MM-DD HH:mm');
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
