<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
import type { TicketModel } from "@/models/ticket.model";
import { TicketService } from "@/services/ticket.service";
import { formatDate } from "@/utils";
import QRCodeVue3 from "qrcode-vue3";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute()
const id = Number.parseInt(route.params.id as string)

const ticket = ref<TicketModel>()
TicketService.getTicketById(id).then(rsp => {
  ticket.value = rsp.data
})
</script>

<template>
  <Navigation />
  <div class="mx-auto text-center mb-3" v-if="ticket">
    <QRCodeVue3 :value="`${ticket.ticketId} ${ticket.flight.flightKey}`" class="text-center"
      :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }" :dotsOptions="{
    type: 'dots',
    color: 'black',
    gradient: {
      type: 'linear',
      rotation: 0,
      colorStops: [
        { offset: 0, color: 'black' },
        { offset: 1, color: 'black' },
      ],
    },
  }" :backgroundOptions="{ color: '#ffffff' }" :cornersSquareOptions="{ type: 'dot', color: '#000000' }"
      :cornersDotOptions="{ type: undefined, color: '#000000' }" myclass="my-qur" imgclass="img-qr" />
    <div class="card mt-3" id="ticket">
      <!-- <img src="..." class="card-img-top" alt="..."> -->
      <div class="card-body">
        <h5 class="card-title">{{ ticket.flight.flightKey }}</h5>
        <p class="card-text">Informacije o rezervisanoj karti</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Destinacija: <strong>{{ ticket.flight.destination }}</strong></li>
        <li class="list-group-item">Kompanija: <strong>{{ ticket.airline.name }}</strong></li>
        <li class="list-group-item">Tip karte: <strong>{{ (ticket.return) ? 'Povratna' : 'Nepovratna' }}</strong></li>
        <li class="list-group-item">Datum rezervacije: <strong>{{ formatDate(ticket.createdAt) }}</strong></li>
        <li class="list-group-item">Datum poletanja: <strong>{{ formatDate(ticket.flight.scheduledAt) }}</strong></li>
      </ul>
    </div>

  </div>
</template>

<style>
#ticket {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
</style>