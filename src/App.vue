<template>
  <div id="app">
    <!-- <div id="nav"><router-link to="/">Home</router-link> |</div>
    <router-view /> -->
    <div :class="isDayMode ? 'main-container ' : 'main-container darkMode'">
      <header>
        <span class="title">Where in the world?</span>

        <p class="container-mode" @click="changeDisplayMode">
          <span v-if="!isDayMode" class="day"><i class="fas fa-moon"></i></span>
          <span v-if="isDayMode" class="night"
            ><i class="far fa-moon"></i
          ></span>
          Dark Mode
        </p>
      </header>
      <div class="container-country">
        <div class="container-nav">
          <form class="search-container">
            <span><i class="fas fa-search"></i></span
            ><input
              type="text"
              placeholder="search for a country ..."
              value=""
              v-model="nameCountries"
              @keyup="getValueInput()"
            />
          </form>

          <div class="container-router-link">
            <div>
              <b-dropdown
                id="dropdown-1"
                text="Filter by Region"
                class="m-md-2"

              >
                <b-dropdown-item
                  ><router-link
                    class="router-link"
                    :to="{
                      name: 'CountriesByRegion',
                      params: { regionName: 'africa' },
                    }"
                    >Africa</router-link
                  >
                </b-dropdown-item>
                <b-dropdown-item
                  ><router-link
                    class="router-link"
                    :to="{
                      name: 'CountriesByRegion',
                      params: { regionName: 'america' },
                    }"
                    >America</router-link
                  >
                </b-dropdown-item>
                <b-dropdown-item
                  ><router-link
                    class="router-link"
                    :to="{
                      name: 'CountriesByRegion',
                      params: { regionName: 'asia' },
                    }"
                    >Asia</router-link
                  >
                </b-dropdown-item>
                <b-dropdown-item
                  ><router-link
                    class="router-link"
                    :to="{
                      name: 'CountriesByRegion',
                      params: { regionName: 'europe' },
                    }"
                    >Europe</router-link
                  ></b-dropdown-item
                >
                <b-dropdown-item
                  ><router-link
                    class="router-link"
                    :to="{
                      name: 'CountriesByRegion',
                      params: { regionName: 'oceania' },
                    }"
                    >Oceania</router-link
                  >
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>
        <router-view :key="$route.path" />
        <!-- <div class="container-grid">
          <div
            v-for="(item, index) in response"
            :class="'grid-item grid-item' + index + 1"
            :key="index"
          >
            <img :src="item.flags.png" :alt="item.name.common" />
            <div class="container-text">
              <p class="name-country">{{ item.name.common }}</p>

              <p class="details">
                <span>Population:</span>{{ item.population }}
              </p>
              <p class="details"><span>Region:</span> {{ item.region }}</p>
              <p class="details"><span>Capital:</span>{{ item.capital[0] }}</p>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <!-- <p>{{ responseBis }}</p> -->
  </div>
</template>

<script>
import axios from "axios";
// import { mapActions } from "vuex";
export default {
  name: "App",

  data() {
    return {
      nameCountries: null,
      isDayMode: true,
    };
  },

  beforeCreate() {
    let countriesRegion = null;
    let countriesRegionBis = {
      africa: null,
      america: null,
      asia: null,
      europe: null,
      oceania: null,
    };
    axios.get("https://restcountries.com/v3.1/region/africa").then((res) => {
      countriesRegion = res.data;
      countriesRegionBis.africa = countriesRegion.slice(0, 8);
      console.log("countries", countriesRegion.slice(0, 6));
    });
    axios.get("https://restcountries.com/v3.1/region/america").then((res) => {
      countriesRegion = res.data;
      countriesRegionBis.america = countriesRegion.slice(0, 8);
      console.log("countries", countriesRegion.slice(0, 6));
    });
    axios.get("https://restcountries.com/v3.1/region/asia").then((res) => {
      countriesRegion = res.data;
      countriesRegionBis.asia = countriesRegion.slice(0, 8);
      console.log("countries", countriesRegion.slice(0, 6));
    });
    axios.get("https://restcountries.com/v3.1/region/europe").then((res) => {
      countriesRegion = res.data;
      countriesRegionBis.europe = countriesRegion.slice(0, 8);
      console.log("countries", countriesRegion.slice(0, 6));
    });
    axios.get("https://restcountries.com/v3.1/region/oceania").then((res) => {
      countriesRegion = res.data;
      countriesRegionBis.oceania = countriesRegion.slice(0, 8);
      console.log("countries", countriesRegion.slice(0, 6));
      this.$store.dispatch("updateCountries", countriesRegionBis);
    });
  },

  methods: {
    // ...mapActions(["updateCountries",'getnameUseToFilter']),

    getValueInput() {
      this.$store.dispatch("updateNameUseToFilter", this.nameCountries);
    },

    changeDisplayMode() {
      this.isDayMode = !this.isDayMode;
    },
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 98vh;
  width: 98vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  .main-container {
    display: flex;
    flex-direction: column;
    width: 95vw;
    min-height: 95vh;
    align-items: center;
    justify-content: center;
    padding: 10px;

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 50px;

      .title {
        font-size: 20px;
        font-weight: bold;
        padding-left: 20px;
      }
      .container-mode {
        display: inline-flex;
        width: 125px;
        // border: 2px solid;
        margin: 0 20px;
        justify-content: space-evenly;
      }
      .container-mode:hover {
        cursor: url("data:image/x-icon;base64,AAACAAEAICACAAAAAAAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAgAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAf4AAAPVAAAH1QAAB9WAAA3VgAAd/4AAGbaAAAG2gAABtgAAAYAAAAGAAAABgAAAAYAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////gD///4A///8AP//+AB///AAf//wAD//4AA//8AAP//AAD//5AA///wAf//8Af///D////w////8P////n///8="),
          auto;
      }
    }
    .container-country {
      min-height: 90vh;
      width: 100%;
      background-color: #e5e5e5;
      border-top: 1px solid rgb(224, 222, 222);
      box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .container-nav {
        display: flex;

        justify-content: space-between;
        width: 100%;
        .search-container {
          border: 1px solid rgb(224, 222, 222);
          box-shadow: 5px rgba(0, 0, 0, 0.2);
          width: 230px;
          background-color: white;
          border-radius: 5px;
          height: 40px;
          display: flex;
          padding-left: 10px;
          align-items: center;
          * {
            background-color: white;
          }
          span {
            padding-right: 10px;
            i {
              color: gray;
            }
          }
          input {
            border: none;
            width: 80%;
            min-width: 150px;
            outline: none;
          }
        }
        #dropdown-1 {
          // background-color: white !important;
          * {

            text-decoration: none;
            color:gray;
          }
        }
      }
      .container-grid {
        display: grid;
        width: 90%;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 40px;
        grid-auto-rows: minmax(200px, auto);
        margin-top: 40px;

        .grid-item {
          // border: 2px solid;
          display: flex;
          flex-direction: column;
          width: 250px;
          min-height: 300px;
          margin: 0 auto;
          border-radius: 10px;
          // padding:5px;

          img {
            height: 50%;
            border-radius: 5px 5px 0 0;
          }

          .container-text {
            height: 50%;
            background-color: white;
            border-top: 1px solid rgb(224, 222, 222);
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
            padding: 20px;
            border-radius: 0 0 5px 5px;
            p {
              width: 100%;
              font-weight: bold;
              text-align: left;
            }
            .details {
              font-size: 13px;
              font-weight: normal;
              color: rgb(150, 142, 142);

              span {
                font-weight: bold;
                color: black;
              }
            }
          }
        }
      }
    }
  }
  .darkMode {
    header {
      color: white !important;
      background-color: rgb(43, 55, 67) !important;
    }
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
