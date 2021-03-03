<template>
  <div class="container mx-auto pt-16">
    <h1 class="text-3xl text-center font-bold">
      JRV: {{ jrvs.length }} respaldadas
    </h1>
    <div class="flex flex-wrap justify-center items-center">
      <nuxt-link
        v-for="jrv in jrvs"
        :key="jrv.jrv"
        :to="`jrvs/${jrv.jrv}`"
        class="flex flex-col items-center border m-4 my-8 p-8 md:mx-8"
      >
        <p class="text-xl font-semibold">#{{ jrv.jrv }}</p>
        <p class="text-xs text-gray-600">{{ jrv.images.length }} Imágenes</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { getJrvs } from '@/utils/utils'

export default {
  async asyncData({ $axios, error }) {
    try {
      const data = await $axios.$get('disponibles.txt')
      const jrvs = getJrvs(data)

      return {
        jrvs,
      }
    } catch (e) {
      error('Error de conexión')
    }
  },
}
</script>
