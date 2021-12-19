<template>
  <div id="app">
    <div class="main-container">
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
        <div v-if="!isRouteDetails" class="container-nav">
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
                      params: { regionName: 'americas' },
                    }"
                    >Americas</router-link
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
                    @click="sendRouteName()"
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
    var allCountries = null;
    var countriesByRegion = {
      africa: [],
      americas: [],
      asia: [],
      europe: [],
      oceania: [],
    };

    function filterAllCountries(nameRegion) {
      countriesByRegion[nameRegion] = allCountries.filter((country) => {
        return country.region.toLowerCase() === nameRegion;
      });
      return countriesByRegion[nameRegion];
    }

    axios.get("https://restcountries.com/v3/all").then((res) => {
      allCountries = res.data;
      console.log(allCountries);
      this.$store.dispatch("updateAllCountries", allCountries);

      countriesByRegion.africa = filterAllCountries("africa");
      countriesByRegion.americas = filterAllCountries("americas");
      countriesByRegion.asia = filterAllCountries("asia");

      countriesByRegion.europe = filterAllCountries("europe");
      countriesByRegion.oceania = filterAllCountries("oceania");

      localStorage.setItem("allCountries", JSON.stringify(allCountries));
      localStorage.setItem(
        "countriesByRegion",
        JSON.stringify(countriesByRegion)
      );
    });
  },

  computed: {
    isRouteDetails() {
      return this.$route.path.includes("details");
    },
  },
  methods: {
    getValueInput() {
      this.$store.dispatch("updateNameUseToFilter", this.nameCountries);
    },

    changeDisplayMode() {
      this.isDayMode = !this.isDayMode;
      let bodyTag = document.getElementsByTagName("body")[0];
      if (!bodyTag.classList.contains("darkMode")) {
        bodyTag.classList.add("darkMode");
      } else {
        bodyTag.classList.remove("darkMode");
      }
    },
  },
};
</script>
<style lang="scss">
body {
  width: 99vw;
  overflow-x: hidden;
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 98vh;
    width: 99vw !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
    .main-container {
      display: flex;
      flex-direction: column;
      width: 99vw;
      min-height: 95vh;
      height: fit-content;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;

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
        height: fit-content;
        width: 100%;
        background-color: #e5e5e5;
        border-top: 1px solid rgb(224, 222, 222);
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        z-index: 3;
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
              color: rgb(184, 178, 178);

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
            position: relative;
            // padding:5px;
            .router-link-details {
              text-decoration: none !important;
              position: absolute;
              height: 100%;
              width: 100%;
              z-index: 2;
            }
            .router-link-details:hover {
              cursor: url("data:image/x-icon;base64,AAACAAEAICACAAAAAAAwAQAAFgAAACgAAAAgAAAAQAAAAAEAAQAAAAAAgAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gAAAf4AAAPVAAAH1QAAB9WAAA3VgAAd/4AAGbaAAAG2gAABtgAAAYAAAAGAAAABgAAAAYAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////gD///4A///8AP//+AB///AAf//wAD//4AA//8AAP//AAD//5AA///wAf//8Af///D////w////8P////n///8="),
                auto;
            }
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
  }
}

.darkMode {
  background-color: rgb(32, 45, 54);

  #app {
    width: 99vw !important;
    .main-container {
      width: 100%;

      header {
        width: 100% !important;
        background-color: rgb(43, 55, 67);
        * {
          color: rgb(240, 235, 235);
        }
        .night {
          color: rgb(207, 203, 203);
        }
      }
      .container-country {
        background-color: rgb(32, 45, 54) !important;
        border-top: 1px solid rgb(32, 45, 54);

        .container-nav {
          .search-container {
            background-color: rgb(43, 55, 67);
            border: 1px solid rgb(43, 55, 67);

            *,
            input::placeholder {
              background-color: rgb(43, 55, 67);
              color: rgb(216, 210, 210);
            }
          }
          #dropdown-1 {
            border: none !important;
            outline: none !important;
            * {
              background-color: rgb(43, 55, 67);
              color: rgb(216, 210, 210);
            }
          }
        }
        .container-grid {
          .grid-item {
            .container-text {
              background-color: rgb(43, 55, 67);
              color: rgb(216, 210, 210);
              border-top: 1px solid rgb(43, 55, 67);

              .name-country {
                color: white !important;
              }
              .details {
                span {
                  color: rgb(185, 179, 179);
                }
              }
            }
          }
        }
        .details-country {
          background-color: rgb(32, 45, 54);
          .container-back {
            a {
              background-color: rgb(43, 55, 67);
              color: white;
              border-color: rgb(32, 45, 54);
              i {
                color: rgb(185, 179, 179);
              }
            }
          }
          .container-dataCountry {
            h2.name-country {
              color: white;
            }

            .container-text_details {
              p {
                color: gray;
              }
            }
            .labelData {
              color: rgb(212, 203, 203);
            }

            .name-borderCountry {
              color: gray;
              background-color: rgb(43, 55, 67);
              border-color: rgb(32, 45, 54);
            }
          }
        }
      }
    }
  }
}
</style>
