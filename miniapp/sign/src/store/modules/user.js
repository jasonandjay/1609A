import {decrypt} from '@/api/index';

const state = {
  phone: ''
}

const mutations = {
  updateState(state, payload){
    for (let key in payload){
      state[key] = payload[key]+''
    }
  }
}


const actions = {
  async getPhoneNumber({commit}, payload){
    return new Promise(async (resolve, reject)=>{
      let data = await decrypt(payload);
      commit('updateState', {phone: data.data.phoneNumber});
      resolve(data);
    })
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
