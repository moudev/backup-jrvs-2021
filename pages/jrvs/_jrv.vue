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
          :src="`https://io.hackerspace.sv/data/actas_tse${image}`"
          class="my-4 border border-gray-300 cursor-pointer"
          @click="
            setBigImage(`https://io.hackerspace.sv/data/actas_tse${image}`)
          "
        />
      </div>
      <div class="w-3/4 border ml-8 p-4 border border-gray-400">
        <img :src="bigImage" class="border border-gray-300" />
      </div>
    </div>
  </div>
</template>

<script>
import { getJrvByNumber } from '@/utils/utils'

export default {
  async asyncData({ $axios, params, error }) {
    try {
      const { jrv: jrvNumber } = params

      const data = await $axios.$get(
        'https://io.hackerspace.sv/data/actas_tse/disponibles.txt'
      )

      const jrv = await getJrvByNumber(data, jrvNumber)

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
