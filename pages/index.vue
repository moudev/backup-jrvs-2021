<template>
  <div class="container mx-auto">
    <h1>JRVs: {{ jrvs.length }}</h1>
    <div class="flex flex-wrap justify-center items-center">
      <div
        v-for="jrv in jrvs"
        :key="jrv.jrv"
        class="flex flex-col items-center border m-8 p-16"
      >
        <p>{{ jrv.jrv }}</p>
        <p>{{ jrv.images.length }} Imágenes</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getJrvs } from '@/utils/utils'

export default {
  async asyncData({ $axios }) {
    const data = await $axios.$get(
      'https://io.hackerspace.sv/data/actas_tse/disponibles.txt'
    )
    const jrvs = getJrvs(data)

    return {
      jrvs,
    }
  },
}
</script>
