import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countriesByRegion: null,
    allCountries: null,
    nameUseToFilter: null,
    countryToDisplay:null,
    borderCountries:null
  },
  mutations: {
    setAllCountries(state, allCountries) {
      state.allCountries = allCountries;
    },
    setCountriesByRegion(state, countriesByRegion) {
      state.countriesByRegion = countriesByRegion;
    },
    setNameUseToFilter(state, nameUseToFilter) {
      state.nameUseToFilter = nameUseToFilter;
    },
    getRoutName(state, routeName) {
      console.log("routeName", routeName);
      state.isRouteDetails = routeName.includes("details");
    },
    
    setCountryToDisplay(state,countryToDisplay){
        state.countryToDisplay = countryToDisplay;
    },
    setBorderCountries(state,countryToDisplay){
        state.countryToDisplay = countryToDisplay;
    }
  },
  actions: {
    updateAllCountries({ commit }, allCountries) {
      commit("setAllCountries", allCountries);
    },  

    updateCountriesByRegion({ commit }, countriesByRegion) {
      commit("setCountriesByRegion", countriesByRegion);
    },

    updateNameUseToFilter({ commit }, nameUseToFilter) {
      commit("setNameUseToFilter", nameUseToFilter);
    },
    updateIsRouteDetails({ commit }, routeName) {
      commit("getRoutName", routeName);
    },
    updateCountryToDisplay({ commit }, countryToDisplay) {
      commit("setCountryToDisplay", countryToDisplay);
    },
    updateBorderCountries({ commit }, countryToDisplay) {
      commit("setCountryToDisplay", countryToDisplay);
    },

    
  },
  modules: {},
});
