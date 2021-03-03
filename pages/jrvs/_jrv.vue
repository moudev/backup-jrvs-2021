<template>
  <div class="container mx-auto">
    <h1 class="text-3xl my-12">JRV: {{ jrv.jrv }}</h1>
    <div class="flex">
      <div
        class="flex flex-col justify-center max-h-full overflow-y-screen w-1/4 border border-gray-400 p-4"
      >
        <img
          v-for="image in jrv.images"
          :key="image"
          :src="image"
          class="my-4 border border-gray-300 cursor-pointer"
          @click="setBigImage(image)"
        />
      </div>
      <div class="w-3/4 border ml-8 p-4 border border-gray-400">
        <img :src="bigImage" class="border border-gray-300" />
      </div>
    </div>
  </div>
</template>

<script>
import jrvs from '@/data/jrvs.json'

import { getJrvByNumber } from '~/utils/jrvs-utils'

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
