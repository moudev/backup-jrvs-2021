<template>
  <div class="container mx-auto pt-16">
    <div>
      <h1 class="text-3xl text-center font-bold">
        JRVs: {{ globalJrvs.length }} respaldadas
      </h1>
      <p class="text-center my-4">
        Mostrando {{ Math.min(localJrvs.length, maxPaginationCount) }} de
        {{ localJrvs.length }} JRVs encontradas
      </p>
    </div>
    <div class="px-8 md:px-16">
      <input
        type="text"
        class="p-4 border border-gray-500 rounded-lg w-full focus:border-purple-600"
        placeholder="Buscar JRV"
        @input="search"
      />
    </div>
    <div class="flex flex-wrap justify-center items-center">
      <nuxt-link
        v-for="jrv in JrvsPaginated"
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
import jrvs from '@/data/jrvs.json'

import { searchJrvsByNumber } from '@/utils/jrvs-utils'

export default {
  asyncData({ error }) {
    try {
      return {
        globalJrvs: jrvs,
        localJrvs: jrvs,
      }
    } catch (e) {
      error('Error de conexión', e)
    }
  },
  data() {
    return {
      maxPaginationCount: 100,
    }
  },
  computed: {
    JrvsPaginated() {
      return this.localJrvs.slice(0, this.maxPaginationCount)
    },
  },
  methods: {
    search($event) {
      const query = $event.target.value
      this.localJrvs = searchJrvsByNumber(this.globalJrvs, query)
    },
  },
}
</script>
