<script setup lang="ts">
import QRCodeVue3 from "qrcode-vue3";
import { useRoute } from "vue-router";

const route = useRoute()
const id = Number.parseInt(route.params.id as string)
</script>

<template>
    <div class="mx-auto text-center m-5">
        <h1 class="h3">Pokažite ovaj kod operateru:</h1>
        <QRCodeVue3
          :width="200"
          :height="200"
          :value="'RSAPP://'+id"
          :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
          :dotsOptions="{
            type: 'dots',
            color: '#26249a',
            gradient: {
              type: 'linear',
              rotation: 0,
              colorStops: [
                { offset: 0, color: '#26249a' },
                { offset: 1, color: '#26249a' },
              ],
            },
          }"
          :backgroundOptions="{ color: '#ffffff' }"
          :cornersSquareOptions="{ type: 'dot', color: '#000000' }"
          :cornersDotOptions="{ type: undefined, color: '#000000' }"
          myclass="my-qur"
          imgclass="img-qr"
        />
    </div>
</template>