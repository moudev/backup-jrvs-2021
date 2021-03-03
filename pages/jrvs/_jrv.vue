<template>
  <div class="container mx-auto">
    <div class="my-12 text-center">
      <h1 class="text-3xl font-semibold">JRV: #{{ jrv.jrv }}</h1>
      <p class="text-gray-600">{{ jrv.images.length }} imágenes respaldadas</p>
    </div>
    <div class="flex">
      <div
        class="max-h-screen overflow-y-scroll w-1/4 border border-gray-400 p-4"
      >
        <div class="flex flex-col justify-center">
          <img
            v-for="image in jrv.images"
            :key="image"
            :src="image"
            class="my-4 border border-gray-300 cursor-pointer"
            @click="setBigImage(image)"
          />
        </div>
      </div>
      <div class="w-3/4 border ml-8 p-4 border border-gray-400">
        <img :src="bigImage" class="border border-gray-300" />
      </div>
    </div>
  </div>
</template>

<script>
import jrvs from '@/data/jrvs.json'

import { getJrvByNumber } from '@/utils/jrvs-utils'

export default {
  asyncData({ params, error }) {
    try {
      const { jrv: jrvNumber } = params

      const jrv = getJrvByNumber(jrvs, jrvNumber)

      return {
        jrv,
      }
    } catch (e) {
      error('Error de conexión')
    }
  },
  data() {
    return {
      bigImage: '',
    }
  },
  methods: {
    setBigImage(url) {
      this.bigImage = url
    },
  },
}
</script>
