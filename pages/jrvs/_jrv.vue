<template>
  <div class="container mx-auto">
    <div class="my-12 text-center">
      <h1 class="text-3xl font-semibold">JRV: #{{ jrv.jrv }}</h1>
      <p class="font-medium underline text-xl mt-4">{{ deptoName }}</p>
      <p>{{ municipalityName }}</p>
    </div>
    <div class="flex">
      <div
        class="max-h-screen overflow-y-scroll w-1/4 border border-gray-400 p-4"
      >
        <div class="flex flex-col justify-center">
          <div
            v-for="paper in jrv.papers"
            :key="`paper-${paper.type}-${jrv.jrv}`"
            class="mt-8"
          >
            <p class="font-bold text-center text-sm underline">
              {{ paper.name }}
            </p>
            <img
              v-for="image in paper.images"
              :key="image"
              :src="image"
              class="my-4 border border-gray-300 cursor-pointer"
              @click="setBigImage(image)"
            />
          </div>
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
import geoData from '@/data/geo-data-process.json'

import { getJrvByNumber } from '@/utils/jrvs-utils'

export default {
  asyncData({ params, error }) {
    try {
      const { jrv: jrvNumber } = params

      const jrv = getJrvByNumber(jrvs, jrvNumber)

      const depto = geoData.find(
        (geo) => parseInt(geo.depto_id, 10) === parseInt(jrv.depto_id, 10)
      )

      const municipality = depto.municipalities.find(
        (muni) => parseInt(muni.muni_id, 10) === parseInt(jrv.muni_id, 10)
      )

      return {
        jrv,
        deptoName: depto.name,
        municipalityName: municipality.name,
      }
    } catch (e) {
      error('Error de conexión')
    }
  },
  data() {
    return {
      bigImage: '',
      deptoName: '',
      municipalityName: '',
    }
  },
  methods: {
    setBigImage(url) {
      this.bigImage = url
    },
  },
}
</script>
