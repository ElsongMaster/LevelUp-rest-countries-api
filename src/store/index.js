import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    countries:null,
    nameUseToFilter:null
  },
  mutations: {
      getAllCountries(state,countries){
        state.countries = countries;
      },
      getnameUseToFilter(state,nameUseToFilter){
        state.nameUseToFilter = nameUseToFilter;
      }
  },
  actions: {
    updateCountries({commit}, countriesByRegion){
      commit("getAllCountries",countriesByRegion)
    },
    updateNameUseToFilter({commit}, nameUseToFilter){
      commit("getnameUseToFilter",nameUseToFilter)
    }

    
  },
  modules: {
  }
})


