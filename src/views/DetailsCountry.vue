<template>
  <div class="details-country">
    <div class="container-back">
      <a @click="$router.go(-1)"><i class="fas fa-arrow-left"></i>back</a>
    </div>

    <div class="container-dataCountry">
      <div class="container-flag">
        <img
          :src="countryToDisplay.flags[1]"
          :alt="countryToDisplay.name.common"
        />
      </div>

      <div class="container-text">
        <h2 class="name-country">{{ countryToDisplay.name.common }}</h2>
        <div>
          <div class="container-text_details">
            <p><span class="labelData">Native Name: </span>{{ nativeName }}</p>
            <p>
              <span class="labelData">Population: </span
              >{{ countryToDisplay.population }}
            </p>
            <p>
              <span class="labelData">Region: </span
              >{{ countryToDisplay.region }}
            </p>
            <p>
              <span class="labelData">Sub Region: </span
              >{{ countryToDisplay.subregion }}
            </p>
            <p><span class="labelData">Capital: </span> {{ capital }}</p>
          </div>
          <div class="container-text_details">
            <p>
              <span class="labelData">Top Level Domain: </span
              >{{ topLevelDomain }}
            </p>
            <p><span class="labelData">Currencies: </span>{{ currencies }}</p>
            <p><span class="labelData">Languages:</span> {{ languages }}</p>
          </div>
        </div>
        <div class="container-border_country">
          <div>
            <span class="labelData">Border Countries:  </span>
            <div
              class="container-borderCountryName"
              v-if="Array.isArray(borderCountriesNames)"
            >
              <span
                v-for="countryName in borderCountriesNames"
                :key="countryName"
                class="name-borderCountry"
                >{{ countryName }}</span
              >
            </div>
            <div class="container-borderCountryName" v-else>
              <span class="name-borderCountryBis" >{{ borderCountriesNames }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <p>{{ countryToDisplay }}</p> -->
  </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  name: "DetailsCountry",

  data() {
    return {
      countryToDisplay: JSON.parse(localStorage.getItem("countriesByRegion"))[
        this.$route.params.regionName
      ].filter(
        (country) =>
          country.name.common.toLowerCase() == this.$route.params.countryName
      )[0],
    };
  },
  mounted() {
    console.log("detailsCountry", this.countryToDisplay);
  },
  computed: {
    nativeName() {
      let name = null;

      for (let key in this.countryToDisplay.name.nativeName) {
        name = this.countryToDisplay.name.nativeName[key].official;
      }
      return name;
    },

    capital() {
      return this.countryToDisplay.capital[0];
    },

    topLevelDomain() {
      let res = 'none'
      if(Object.keys(this.countryToDisplay).includes('tld') && this.countryToDisplay.tld.length>0){
        res = this.countryToDisplay.tld[0]
      }
      return res;
    },

    currencies() {
      let tabTemp = [];
      for (let key in this.countryToDisplay.currencies) {
        tabTemp.push(this.countryToDisplay.currencies[key].name);
        console.log("tabTempCurrencie", key);
      }
      let currencies = tabTemp.join(" , ");

      return currencies;
    },

    languages() {
      let tabTemp = [];
      for (let key in this.countryToDisplay.languages) {
        tabTemp.push(this.countryToDisplay.languages[key]);
      }
      let langs = tabTemp.join(" , ");

      return langs;
    },

    borderCountriesNames() {
      let borderCountriesNames = " No border countries";
      let tabNamesBorderCountries = [];

      if (Object.keys(this.countryToDisplay).includes("borders")) {
        let tabAllCountries = JSON.parse(localStorage.getItem("allCountries"));
        let tabBorderCountries = tabAllCountries.filter((country) =>
          this.countryToDisplay.borders.includes(country.cca3)
        );
        tabBorderCountries.forEach((elt) => {
          tabNamesBorderCountries.push(elt.name.common);
        });

        borderCountriesNames = tabNamesBorderCountries;
      }

      return borderCountriesNames;
    },
  },
};
</script>

<style lang="scss" scoped>
.details-country {
  position: absolute;
  top: 0;
  min-height: 100%;
  height: fit-content;
  width: 100%;
  background-color: white;
  padding: 0;
  margin: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .container-back {
    display: flex;
    justify-content: flex-start;
    width: 90%;
    a {
      display: inline-flex;
      margin: 20px 30px;
      border: 1px solid;
      padding: 0.25em 1.5em;
      justify-content: center;
      align-items: center;

      i {
        padding-right: 10px;
      }
    }
    a:hover {
      cursor: url("data:image/x-icon;base64,AAACAAEAICACAAAAAAAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAgAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAf4AAAPVAAAH1QAAB9WAAA3VgAAd/4AAGbaAAAG2gAABtgAAAYAAAAGAAAABgAAAAYAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////gD///4A///8AP//+AB///AAf//wAD//4AA//8AAP//AAD//5AA///wAf//8Af///D////w////8P////n///8="),
        auto;
    }
  }
  .container-dataCountry {
    display: flex;
    width: 85%;

    * {
      text-align: left;
    }
    .container-flag {
      width: 50%;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .container-text:first-child {
      margin-right: 20px;
    }
    .container-text {
      display: flex;
      flex-direction: column;
      width: 50%;
      padding: 50px;
      h2 {
        padding-bottom: 10px;
        font-weight: bold;
      }
      div {
        display: flex;
        .container-text_details {
          display: flex;
          flex-direction: column;
          width: 50%;

          p{
            color: gray;
          }
          .labelData{
            color: black;
          }
        }

        .container-borderCountryName {
          display: flex;
          min-width: 100px;
          width: fit-content;
          flex-wrap: wrap;
          height: 40px;
          // border: 2px solid;

          .name-borderCountry {
            display: flex;
            min-width: 40px;
            width: fit-content;
            border: 2px solid gray;
            box-shadow: 2px gray;
            padding: 0.1em 1.4em;
            margin-bottom: 5px;
            margin-right: 15px;
          }
          .name-borderCountryBis{
            color: gray;
            padding-left: 5px;
          }
        }
      }
    }
  }
}
</style>
