<template>
  <div class="container mx-auto">
    <h1>JRVs: {{ jrvs.length }}</h1>
    <div class="flex flex-wrap justify-center items-center">
      <nuxt-link
        v-for="jrv in jrvs"
        :key="jrv.jrv"
        :to="`jrvs/${jrv.jrv}`"
        class="flex flex-col items-center border m-8 p-16"
      >
        <p>{{ jrv.jrv }}</p>
        <p>{{ jrv.images.length }} Imágenes</p>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { getJrvs } from '@/utils/utils'

export default {
  async asyncData({ $axios, error }) {
    try {
      const data = await $axios.$get(
        'https://io.hackerspace.sv/data/actas_tse/disponibles.txt'
      )
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
