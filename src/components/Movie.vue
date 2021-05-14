<template>
  <div class="p-10">
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
      <img class="w-full" :src="movie.url" />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ movie.name }}</div>
        <p class="text-gray-700 text-base">
          {{ movie.details }}
        </p>
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >#{{ movie.genre }}</span
        >
      </div>
      <div class="flex px-5 py-5">
        <v-btn @click="liked">
          <v-icon class="transform hover:scale-125"
            >mdi-thumb-up-outline</v-icon
          >
        </v-btn>
        <v-avatar color="#5ce681" size="48" class="mx-2">
          <span class="white--text headline">{{ movie.likes }}</span>
        </v-avatar>
        <v-avatar color="#7099cf" size="64" class="mx-5 py-5">
          <span class="white--text headline">{{ sum }}</span>
        </v-avatar>
        <v-avatar color="#e0725a" size="48" class="mx-2">
          <span class="white--text headline">{{ movie.dislikes }}</span>
        </v-avatar>
        <v-btn @click="disliked">
          <v-icon class="transform hover:scale-125"
            >mdi-thumb-down-outline</v-icon
          >
        </v-btn>
      </div>
      <v-alert v-if="this.reviewed" type="success"
        >Uz jsi tento film ohodnotil</v-alert
      >
    </div>
  </div>
</template>

<script>
import { db } from "@/main";

export default {
  name: "Movie",
  props: ["movie"],
  data: () => ({
    reviewed: false,
  }),
  methods: {
    async liked() {
      if (!this.reviewed) {
        this.movie.likes++;
        await db.collection("movies").doc(this.movie.id).update({
          likes: this.movie.likes,
        });
        this.reviewed = true;
      }
    },
    async disliked() {
      if (!this.reviewed) {
        this.movie.dislikes++;
        await db.collection("movies").doc(this.movie.id).update({
          dislikes: this.movie.dislikes,
        });
        this.reviewed = true;
      }
    },
  },
  computed: {
    sum() {
      return this.movie.likes - this.movie.dislikes;
    },
  },
};
</script>
