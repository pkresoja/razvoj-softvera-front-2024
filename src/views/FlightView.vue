<script setup lang="ts">
import type { FlightModel } from '@/models/flight.model';
import { FlightService } from '@/services/flight.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { destImg } from '@/utils';
import Navigation from '@/components/Navigation.vue';

const route = useRoute()
const router = useRouter()
const id = Number.parseInt(route.params.id as string)
const flight = ref<FlightModel>()
FlightService.getFlightById(id)
    .then(rsp => flight.value = rsp.data)
    .catch(e => router.push({
        path: '/'
    }))
</script>

<template>
    <Navigation />
    <div class="container mx-auto" v-if="flight">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/">Početna</RouterLink>
                </li>
                <li class="breadcrumb-item">
                    {{ flight.destination }} ({{ flight.flightNumber }})
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    Detalji
                </li>
            </ol>
        </nav>
        <div class="row mb-3">
            <div class="col-6">
                <img :src="destImg(flight)" :alt="flight.destination" class="card-img-top" />
            </div>
            <div class="col-6">
                <div class="card">
                    <h1 class="card-header h3">
                        {{ flight.destination }}
                    </h1>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            Kljuc: <strong>{{ flight.flightKey }}</strong>
                        </li>
                        <li class="list-group-item">
                            Broj leta: <strong>{{ flight.flightNumber }}</strong>
                        </li>
                        <li class="list-group-item">
                            Vreme poletanja: <strong>{{ flight.scheduledAt }}</strong>
                        </li>
                        <li class="list-group-item" v-if="flight.estimatedAt">
                            Predvidjeno vreme: <strong>{{ flight.estimatedAt }}</strong>
                        </li>
                        <li class="list-group-item" v-if="flight.plane">
                            Model aviona: <strong>{{ flight.plane }}</strong>
                        </li>
                        <li class="list-group-item" v-if="flight.terminal">
                            Terminal: <strong>{{ flight.terminal }}</strong>
                        </li>
                        <li class="list-group-item" v-if="flight.gate">
                            Gate: <strong>{{ flight.gate }}</strong>
                        </li>
                        <li class="list-group-item">
                            <RouterLink class="btn btn-sm btn-success" :to="`/flight/${flight.id}/book`">
                                <i class="fa-solid fa-save"></i> Rezerviši let
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <iframe class="mx-auto" height="400"
                :src="`https://www.google.com/maps?output=embed&amp;q=${flight.destination.split(' ')[0]}`"
                loading="lazy" referrerpolicy="no-referrer-when-downgrade" id="gmaps"></iframe>
        </div>
    </div>
</template>