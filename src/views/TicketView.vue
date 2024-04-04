<script setup lang="ts">
import { TicketService } from '@/services/ticket.service';
import { ref } from 'vue';

const tickets = ref<any>()
TicketService.getAllTickets().then(rsp => {
    tickets.value = rsp.data
    tickets.value.forEach((ticket: any) => {
        TicketService.getFlightById(ticket.flightId).then(frsp => {
            ticket.flight = frsp.data
        })
    });
})
</script>

<template>
    <div v-if="tickets">
        <h1 class="h3">Karte</h1>
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
                        <i class="fa-solid fa-business-time"></i> VREME LETA
                    </th>
                    <th scope="col">
                        <i class="fa-regular fa-clock"></i> REZERVISNO DANA
                    </th>
                    <th scope="col">
                        <i class="fa-solid fa-triangle-exclamation"></i> AKCIJE
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ticket in tickets" :ticket-id="ticket.ticketId" :key="ticket.ticketId">
                    <th scope="row" class="td-100">{{ ticket.flight.flightNumber }}</th>
                    <td class="td-300">{{ ticket.flight.destination }}</td>
                    <td>{{ new Date(ticket.flight.scheduledAt).toLocaleString('sr') }}</td>
                    <td>{{ new Date(ticket.createdAt).toLocaleString('sr') }}</td>
                    <td class="td-100">
                        N/A
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>