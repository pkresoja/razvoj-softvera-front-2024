<script setup lang="ts">
import type { TicketModel } from '@/models/ticket.model'
import { TicketService } from '@/services/ticket.service';
import { ref } from 'vue';

const tickets = ref<TicketModel[]>()
TicketService.getAllTickets().then(rsp => {
    tickets.value = rsp.data
    tickets.value?.forEach((ticket) => {
        TicketService.getFlightById(ticket.flightId).then(frsp => {
            ticket.flight = frsp.data
        })
    });
})

function remove(ticket: TicketModel) {
    if (confirm(`Da li sigurno zelite da obrisete kartu za ${ticket.flight.destination}?`)) {
        TicketService.deleteTicket(ticket.ticketId)
            .then(rsp => {
                tickets.value = tickets.value?.filter(t => ticket.ticketId != t.ticketId)
            })
    }
}
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
                    <th scope="col" class="td-300">
                        <i class="fa-solid fa-triangle-exclamation"></i> AKCIJE
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="ticket in tickets" :ticket-id="ticket.ticketId" :key="ticket.ticketId">
                    <th scope="row" class="td-100" v-if="ticket.flight">{{ ticket.flight.flightNumber }}</th>
                    <td class="td-300" v-if="ticket.flight">{{ ticket.flight.destination }}</td>
                    <td v-if="ticket.flight">{{ new Date(ticket.flight.scheduledAt).toLocaleString('sr') }}</td>
                    <td>{{ new Date(ticket.createdAt).toLocaleString('sr') }}</td>
                    <td class="td-300">
                        <div class="btn-group">
                            <button type="button" class="btn btn-danger" @click="remove(ticket)">
                                <i class="fa-solid fa-trash"></i> Obriši
                            </button>
                            <RouterLink class="btn btn-primary" :to="'/code/' + ticket.ticketId">
                                <i class="fa-solid fa-code"></i> QR Code
                            </RouterLink>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>