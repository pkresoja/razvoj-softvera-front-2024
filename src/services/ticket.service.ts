import { MainService } from "./main.service"

export class TicketService {
    static async getAllTickets() {
        return await MainService.useAxios('/ticket')
    }

    static async getAllAirlines() {
        return await MainService.useAxios('/airline')
    }

    static async createTicket(payload: any) {
        return await MainService.useAxios('/ticket', 'post', payload)
    }

    static async deleteTicket(id: number) {
        return await MainService.useAxios(`/ticket/${id}`, 'delete')
    }
}