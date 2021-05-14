<template>
  <v-toolbar>
    <v-icon large>mdi-movie-open</v-icon>
    <h1 class="text-2xl mx-5">Movie Database</h1>
    <v-spacer> </v-spacer>
    <v-autocomplete
      v-model="model"
      :items="movies.map((movie) => movie.name)"
      :loading="isLoading"
      :search-input.sync="search"
      color="gray"
      flat
      solo-inverted
      hide-no-data
      hide-selected
      hide-details
      item-text="Description"
      item-value="Movie"
      label="Search for movies"
      placeholder="Start typing to Search"
      prepend-icon="mdi-database-search"
      return-object
      class="mx-10 w-1 my-5"
    ></v-autocomplete>
    <v-btn :disabled="!model" color="grey darken-3" @click="model = null">
      Clear
      <v-icon right> mdi-close-circle </v-icon>
    </v-btn>
    <v-switch hide-details @change="theme" class="mx-5 my-5"></v-switch>
  </v-toolbar>
</template>

<script>
export default {
  name: "Toolbar",
  data: () => ({
    model: null,
  }),
  props: ["movies"],
  methods: {
    theme() {
      if (this.$vuetify.theme.dark) {
        this.$vuetify.theme.dark = false;
        this.$vuetify.theme.light = true;
      } else {
        this.$vuetify.theme.light = false;
        this.$vuetify.theme.dark = true;
      }
    },
  },
  watch: {
    model() {
      const movie = this.movies.find((movie) => movie.name === this.model);
      this.$emit("input", movie ? movie : null);
    },
  },
};
</script>

<style></style>
