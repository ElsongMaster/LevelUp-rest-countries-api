<template>
  <div class="container-grid">
    <div
      v-for="(item, index) in pageOfItems"
      :class="'grid-item grid-item' + index + 1"
      :key="index"
    >
      <router-link
        class="router-link-details"
        :to="{
          path: '/:regionName/:countryName',
          name: 'DetailsCountry',
          params: {
            regionName: item.region.toLowerCase(),
            countryName: item.name.common.toLowerCase(),
          },
        }"
        v-on:click.native="sendCountryToDisplay(item.name.common)"
        :key="index"
      >
      </router-link>

      <img :src="item.flags[1]" :alt="item.name.common" />
      <div class="container-text">
        <p class="name-country">{{ item.name.common }}</p>
        <p class="details"><span>Population:</span>{{ item.population }}</p>
        <p class="details"><span>Region:</span> {{ item.region }}</p>
        <p class="details"><span>Capital:</span>{{ item.capital }}</p>
      </div>
    </div>
    <jw-pagination
      :items="getCountriesFiltred"
      :pageSize="8"
      @changePage="onChangePage"
    ></jw-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      regionName: this.$route.params.regionName,
      pageOfItems: [],
    };
  },

  methods: {
    sendCountryToDisplay(countryName) {
      let tabTemp = JSON.parse(localStorage.getItem("countriesByRegion"))[
        this.regionName
      ];
      let countryToDisplay = null;
      tabTemp = tabTemp.filter((country) => country.name.common == countryName);
      countryToDisplay = tabTemp[0];

      this.$store.dispatch("updateCountryToDisplay", countryToDisplay);
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
  },
  computed: {
    getCountriesFiltred() {
      let resFilter = null;

      let tabAllCountries = JSON.parse(localStorage.getItem("allCountries"));
      let tabCountriesByRegion = JSON.parse(
        localStorage.getItem("countriesByRegion")
      )[this.$route.params.regionName];
      if (
        this.$store.state.nameUseToFilter != null &&
        this.$store.state.nameUseToFilter != ""
      ) {
        resFilter = tabAllCountries.filter((country) => {
          return country.name.common
            .toLowerCase()
            .includes(this.$store.state.nameUseToFilter.toLowerCase());
        });
        console.log(resFilter, this.$store.state.nameUseToFilter);
      } else {
        resFilter = tabCountriesByRegion;
        console.log("tabCountriesByRegion", tabCountriesByRegion);
      }

      return resFilter;
    },

    // capital() {
    //   // let tabTemp =
    //   //   this.$store.state.countriesByRegion[this.$route.params.regionName];
    //   //   let capital = null;
    //   //   for(let key in tabTemp.)
    //   console.log('capital',JSON.parse(localStorage.getItem('countriesByRegion'))[this.regionName].capital)
    //    return JSON.parse(localStorage.getItem('countriesByRegion'))[this.regionName].capital;
    // },
  },
};
</script>

<style lang="scss">
// .darkMode {
//   .container-country {
//     background-color: rgb(32, 45, 54) !important;

//     .search-container {
//       background-color: rgb(43, 55, 67) !important;
//       border-color: rgb(43, 55, 67) !important;
//       * {
//         color: rgb(233, 232, 232) !important;
//         background-color: rgb(43, 55, 67) !important;
//       }
//       input::placeholder {
//         color: rgb(194, 189, 189) !important;
//       }
//     }
//     #dropdown-1 {
//       * {
//         background-color: rgb(43, 55, 67) !important;
//         text-decoration: none;
//         color: rgb(194, 189, 189);
//       }
//     }
//     .container-grid {
//       * {
//         background-color: rgb(43, 55, 67) !important;
//       }
//       a#router-link-details {
//         color: red;
//       }

//       .grid-item {
//         position: relative;
//         z-index: -1;
//         .router-link-active {
//           text-decoration: none !important;
//           position: absolute;
//           height: 250px;
//           width: 250px;
//           border: 2px solid;
//           color: red;
//           z-index: 2;
//         }
//         .router-link-details:hover {
//           cursor: url("data:image/x-icon;base64,AAACAAEAICACAAAAAAAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAgAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAf4AAAPVAAAH1QAAB9WAAA3VgAAd/4AAGbaAAAG2gAABtgAAAYAAAAGAAAABgAAAAYAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////gD///4A///8AP//+AB///AAf//wAD//4AA//8AAP//AAD//5AA///wAf//8Af///D////w////8P////n///8="),
//             auto;
//         }
//       }
//       .name-country {
//         color: white;
//       }

//       .details {
//         color: rgb(194, 189, 189) !important;
//         span {
//           color: rgb(233, 232, 232) !important;
//         }
//       }
//     }
//   }
// }
</style>
