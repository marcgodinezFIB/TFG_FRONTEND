<template>
  <div class="vue-template">
    <NavBar :key="$route.fullPath"></NavBar>
    <!-- Navigation -->
    <!-- Main -->
    <div class="App">
      <div>
        <div>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

import axios from "axios";
export default {
  data() {
    return {
      windowHeight: window.innerHeight,
      txt: "",
    };
  },
  watch: {
    windowHeight(newHeight, oldHeight) {
      this.txt = `it changed to ${newHeight} from ${oldHeight}`;
    },
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  components: { NavBar },
  methods: {
    onResize() {
      this.windowHeight = window.innerHeight;
    },
    logout() {
      localStorage.clear();
      this.$router.go("/login");
    },
  },
};
</script>
<style>
@font-face {
  font-family: "Roboto";
  src: local("Roboto"),
   url(./fonts/SF.ttf) format("truetype");
}
</style>