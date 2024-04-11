<script setup lang="ts">
import type { AirlineModel } from '@/models/airline.model';
import type { FlightModel } from '@/models/flight.model';
import { FlightService } from '@/services/flight.service';
import { TicketService } from '@/services/ticket.service';
import { destImg } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const ticket = {
    flightId: 0,
    airlineId: 0,
    return: true
}

const id = Number.parseInt(route.params.id as string)
const flight = ref<FlightModel>()
FlightService.getFlightById(id)
    .then(rsp => {
        flight.value = rsp.data
        ticket.flightId = rsp.data.id
    })
    .catch(e => router.push({
        path: '/'
    }))

const airlines = ref<AirlineModel[]>()
TicketService.getAllAirlines()
    .then(rsp => {
        airlines.value = rsp.data
        ticket.airlineId = rsp.data[0].airlineId
    })
    .catch(e => router.push({
        path: '/'
    }))

function book() {
    TicketService.createTicket(ticket)
        .then(rsp =>
            router.push({
                path: '/ticket'
            }))
        .catch(e => router.push({
            path: '/'
        }))
}
</script>

<template>
    <div class="book" v-if="flight">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Početna</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    {{ flight.destination }} ({{ flight.flightNumber }})
                </li>
                <li class="breadcrumb-item">
                    <RouterLink :to="`/flight/${flight.id}`">Detalji</RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    Rezervacija
                </li>
            </ol>
        </nav>
        <h1 class="h3">Rezervacija karte za {{ flight.destination }}:</h1>
        <img :src="destImg(flight)" class="img-fluid">
        <div class="form-group mb-3">
            <label for="flight">Let:</label>
            <input type="text" class="form-control" id="flight" aria-describedby="flight-help"
                v-model="flight.flightKey" disabled>
            <small id="flight-help" class="form-text text-muted">
                Međunarnodna oznaka leta
            </small>
        </div>
        <div class="form-group mb-3">
            <label for="destination">Destinacija:</label>
            <input type="text" class="form-control" id="destination" v-model="flight.destination" disabled>
        </div>
        <div class="form-group mb-3" v-if="airlines">
            <label for="airline">Avio kompanija:</label>
            <select class="form-control" id="airline" v-model="ticket.airlineId">
                <option v-for="airline in airlines" :value="airline.airlineId">{{ airline.name }}</option>
            </select>
        </div>
        <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="return" v-model="ticket.return">
            <label class="form-check-label" for="return">
                Želim da kupim kartu i za povratan let
            </label>
        </div>
        <button class="btn btn-primary" @click="book">
            <i class="fa-solid fa-save"></i>&nbsp;Rezerviši let
        </button>
    </div>
</template>

<style>
.book {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
}
</style>