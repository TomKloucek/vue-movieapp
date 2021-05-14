<template>
  <v-app>
    <v-main>
      <Toolbar v-on:input="setMovie" v-bind:movies="movies" />
      <v-container v-if="selectedMovie != null">
        <Movie v-bind:movie="selectedMovie" />
      </v-container>
      <div
        class="flex flex-wrap justify-center space-x-5 space-y-4 my-10"
        v-else
      >
        <Movie v-for="item in movies" :key="item" v-bind:movie="item" />
      </div>
      <v-btn
        v-scroll="onScroll"
        v-show="fab"
        fab
        dark
        fixed
        bottom
        right
        color="primary"
        @click="toTop"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-main>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar.vue";
import Movie from "./components/Movie.vue";
import { db } from "@/main";

export default {
  name: "App",
  components: { Toolbar, Movie },
  data: () => ({
    movies: [],
    selectedMovie: null,
    fab: false,
  }),
  methods: {
    async getItems() {
      let snapshot = await db.collection("movies").get();
      let movies = [];
      snapshot.forEach((doc) => {
        let appData = doc.data();
        appData.id = doc.id;
        movies.push(appData);
      });
      this.movies = movies;
    },
    setMovie(value) {
      this.selectedMovie = value;
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
  mounted() {
    this.getItems();
  },
};
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.container {
  display: flex;
  align-content: space-between;
  width: 70%;
}
</style>
