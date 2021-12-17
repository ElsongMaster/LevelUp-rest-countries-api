<template>
  <div class="container-grid">
    <div
      v-for="(item, index) in getCountriesFiltred"
      :class="'grid-item grid-item' + index + 1"
      :key="index"
    >
      <img :src="item.flags.png" :alt="item.name.common" />
      <div class="container-text">
        <p class="name-country">{{ item.name.common }}</p>

        <p class="details"><span>Population:</span>{{ item.population }}</p>
        <p class="details"><span>Region:</span> {{ item.region }}</p>
        <p class="details"><span>Capital:</span>{{ item.capital[0] }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      regionName: this.$route.params.regionName,
    };
  },
  computed: {
    getCountriesFiltred() {
      let resFilter = null;
      let tabTemp = this.$store.state.countries[
          this.$route.params.regionName
        ];
      if (this.$store.state.nameUseToFilter != null) {
        resFilter = tabTemp.filter((countrie) => {
          return countrie.name.common.includes(this.$store.state.nameUseToFilter);
        });
        console.log(resFilter,this.$store.state.nameUseToFilter)
      } else {
        resFilter = tabTemp;
      }

      return resFilter;
    },
  },

  // created() {
  //   console.log("this.store", this.$store.state.countries[this.regionName]);
  // },

  //   mounted() {
  //     let countries = null;
  //     axios.get("https://restcountries.com/v3.1/region/"+this.regionName).then((res) => {
  //       countries = res.data;
  //       this.responseBis = countries.slice(0, 1);
  //       this.response = countries.slice(0, 8);
  //       console.log("countries", countries.slice(0, 6));
  //     });
  // }
};
</script>

<style lang="scss" >
.darkMode{

.container-country {
    background-color: rgb(32, 45, 54) !important;

    .search-container {
      background-color: rgb(43, 55, 67) !important;
      border-color: rgb(43, 55, 67) !important;
      * {
        color: rgb(233, 232, 232) !important;
        background-color: rgb(43, 55, 67) !important;
      }
      input::placeholder {
        color: rgb(194, 189, 189) !important;
      }
    }
    #dropdown-1 {
      * {
        background-color: rgb(43, 55, 67) !important;
        text-decoration: none;
        color: rgb(194, 189, 189);
      }
    }
    .container-grid {
      * {
        background-color: rgb(43, 55, 67) !important;
      }
      .name-country{
        color: white;
      }

      .details{
        color: rgb(194, 189, 189) !important;
        span{
          color: rgb(233, 232, 232) !important;
        }
      }
    }
  }
}


</style>
