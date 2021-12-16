<template>
  <div id="app">
    <!-- <div id="nav"><router-link to="/">Home</router-link> |</div>
    <router-view /> -->
    <div class="main-container">
      <header>
        <span class="title">Where in the world?</span>

        <p class="container-mode">
          <span v-if="isDayMode" class="day"><i class="fas fa-moon"></i></span>
          <span v-if="!isDayMode" class="night"
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
            />
          </form>

          <div class="container-router-link">
            <div>
              <b-dropdown id="dropdown-1" text="Dropdown Button" class="m-md-2">
                <b-dropdown-item>First Action</b-dropdown-item>
                <b-dropdown-item>Second Action</b-dropdown-item>
                <b-dropdown-item>Third Action</b-dropdown-item>

              </b-dropdown>
            </div>
          </div>
        </div>
        <div class="container-grid">
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
        </div>
      </div>
    </div>
    <!-- <p>{{ responseBis }}</p> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",

  data() {
    return {
      response: null,
      responseBis: null,
      isDayMode: true,
      options: ["A", "B", "C"],
      value: "B",
    };
  },

  mounted() {
    let countries = null;
    axios.get("https://restcountries.com/v3.1/region/europe").then((res) => {
      countries = res.data;
      this.responseBis = countries.slice(0, 1);
      this.response = countries.slice(0, 8);
      console.log("countries", countries.slice(0, 6));
    });
  },

  // computed: {
  //   getLimitCountries() {
  //     let countries = null;
  //     setTimeout(
  //       function () {
  //         countries = this.response.splice(6);
  //       }.bind(this),
  //       500
  //     );

  //     return countries;
  //   },
  // },
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
      width: 90%;
      height: 50px;

      .title {
        font-size: 20px;
        font-weight: bold;
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
          width: 200px;
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
            outline: none;
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
          height: 300px;
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
