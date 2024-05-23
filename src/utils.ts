import type { FlightModel } from "./models/flight.model"

export function destImg(flight: FlightModel) {
    if (flight == undefined) return
    return 'https://img.pequla.com/destination/' + flight.destination.toLowerCase().split(' ')[0] + '.jpg'
}

export function formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS')
}