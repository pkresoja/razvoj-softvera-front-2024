<script setup lang="ts">
import type { FlightModel } from '@/models/flight.model';
import type { PageModel } from '@/models/page.model';
import { FlightService } from '@/services/flight.service';
import { onMounted, ref } from 'vue';

const input = ref<string>()
const flights = ref<PageModel<FlightModel>>()

function retrieveData(page = 0) {
    if (input.value != undefined && input.value != '') {
        FlightService.getFlightsByDestination(input.value, page)
            .then(rsp => flights.value = rsp.data)
        return
    }

    FlightService.getDepartures(page)
        .then(rsp => flights.value = rsp.data)
}

function first() {
    if (flights.value == undefined) return
    if (flights.value.first) return
    retrieveData(0)
}

function prev() {
    if (flights.value == undefined) return
    if (flights.value.first) return
    retrieveData(flights.value.number - 1)
}

function next() {
    if (flights.value == undefined) return
    if (flights.value.last) return
    retrieveData(flights.value.number + 1)
}

function last() {
    if (flights.value == undefined) return
    if (flights.value.last) return
    retrieveData(flights.value.totalPages - 1)
}

onMounted(() => retrieveData())

function search() {
    if (input.value == undefined) return
    retrieveData()
}
</script>

<template>
    <div id="home">
        <div class="input-group mb-3">
            <span class="input-group-text" id="search">
                <i class="fa-solid fa-magnifying-glass"></i>
            </span>
            <input type="text" class="form-control" aria-describedby="search" v-model="input" @keyup="search">
        </div>
        <div v-if="flights">
            <nav>
                <ul class="pagination">
                    <li class="page-item">
                        <button type="button" class="page-link" @click="first">Prva</button>
                    </li>
                    <li class="page-item">
                        <button type="button" class="page-link" @click="prev">Prethodna</button>
                    </li>
                    <li class="page-item">
                        <button type="button" class="page-link">{{ flights.number + 1 }}</button>
                    </li>
                    <li class="page-item">
                        <button type="button" class="page-link" @click="next">Sledeća</button>
                    </li>
                    <li class="page-item">
                        <button type="button" class="page-link" @click="last">Poslednja</button>
                    </li>
                </ul>
            </nav>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col" class="td-100">
                            <i class="fa-solid fa-hashtag"></i> OZNKA
                        </th>
                        <th scope="col" class="td-300">
                            <i class="fa-solid fa-location-dot"></i> DESTINACIJA
                        </th>
                        <th scope="col">
                            <i class="fa-solid fa-plane"></i> GATE
                        </th>
                        <th scope="col">
                            <i class="fa-regular fa-clock"></i> VREME
                        </th>
                        <th scope="col" class="td-300">
                            <i class="fa-solid fa-triangle-exclamation"></i> AKCIJE
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="flight in flights.content" :flight-id="flight.id">
                        <th scope="row" class="td-100">{{ flight.flightNumber }}</th>
                        <td class="td-300">{{ flight.destination }}</td>
                        <td>{{ (flight.gate) ? flight.gate : "N/A" }}</td>
                        <td>{{ new Date(flight.scheduledAt).toLocaleString('sr') }}</td>
                        <td class="td-300">
                            <div class="btn-group">
                                <RouterLink class="btn btn-primary" :to="'/flight/' + flight.id">
                                    <i class="fa-solid fa-circle-info"></i> Detalji
                                </RouterLink>
                                <RouterLink class="btn btn-success" :to="`/flight/${flight.id}/book`">
                                    <i class="fa-solid fa-save"></i> Rezerviši
                                </RouterLink>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="5">
                            <i class="fa-regular fa-note-sticky"></i>
                            Prikazno {{ flights.numberOfElements }} od ukupno {{ flights.totalElements }} letova na
                            {{ flights.totalPages }} stranica
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style>
.td-300 {
    width: 300px;
}

.td-200 {
    width: 200px;
}

.td-100 {
    width: 100px;
}
</style>
