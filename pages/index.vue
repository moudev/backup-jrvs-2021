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
    <div class="px-8 md:px-16 py-8">
      <select
        class="w-full border bg-white rounded px-3 py-3 outline-none mb-4 md:mb-0 md:w-1/4"
        placeholder="Departamento"
        @change="filterByPlace($event, 'depto_id')"
      >
        <option value="" selected disabled>Seleccionar departamento</option>
        <option
          v-for="depto in deptos"
          :key="`depto-${depto.depto_id}`"
          :value="depto.depto_id"
        >
          {{ depto.name }}
        </option>
      </select>
      <select
        class="w-full border bg-white rounded px-3 py-3 outline-none md:w-1/4"
        @change="filterByPlace($event, 'muni_id')"
      >
        <option value="" selected disabled>Seleccionar municipio</option>
        <option
          v-for="muni in municipalities"
          :key="`muni-${muni.muni_id}`"
          :value="muni.muni_id"
        >
          {{ muni.name }}
        </option>
      </select>
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
import geoData from '@/data/geo-data-process.json'

import {
  searchJrvsByNumber,
  filterByDepto,
  filterByMunicipality,
} from '@/utils/jrvs-utils'

export default {
  data() {
    return {
      maxPaginationCount: 100,
      globalJrvs: jrvs,
      localJrvs: jrvs,
      selectedDepto: 0,
      deptos: geoData,
      municipalities: [],
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
    filterByPlace($event, type) {
      const id = parseInt($event.target.value, 10)
      switch (type) {
        case 'depto_id':
          this.selectedDepto = id
          this.municipalities = this.getMunicipalitiesByDepto(this.deptos, id)
          this.localJrvs = filterByDepto(this.globalJrvs, id)
          break
        case 'muni_id':
          this.localJrvs = filterByMunicipality(
            this.globalJrvs,
            this.selectedDepto,
            id
          )
          break
        default:
          this.localJrvs = []
          break
      }
    },
    getMunicipalitiesByDepto(deptos, deptoId) {
      return deptos.find((depto) => depto.depto_id === deptoId).municipalities
    },
  },
}
</script>
