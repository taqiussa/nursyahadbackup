import { toInteger } from 'lodash'

export function hariTanggal(tanggal) {
    return new Date(tanggal).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

export function tanggal(tanggal) {
    return new Date(tanggal).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function bulan(tanggal) {
    return new Date(tanggal).toLocaleDateString('id-ID', { month: 'long' })
}

export function switchBulan(bulan) {
    const bulanNumber = parseInt(bulan, 10) - 1; // subtract 1 since month index starts from 0
    return new Date(0, bulanNumber).toLocaleDateString('id-ID', { month: 'long' });
}
export function arrayBulan() {
    const months = [
        { name: 'Januari', value: '01' },
        { name: 'Februari', value: '02' },
        { name: 'Maret', value: '03' },
        { name: 'April', value: '04' },
        { name: 'Mei', value: '05' },
        { name: 'Juni', value: '06' },
        { name: 'Juli', value: '07' },
        { name: 'Agustus', value: '08' },
        { name: 'September', value: '09' },
        { name: 'Oktober', value: '10' },
        { name: 'November', value: '11' },
        { name: 'Desember', value: '12' }
    ];

    return months.map((month) => ({
        name: month.name,
        value: month.value
    }));
}
export function maskRupiah(angka) {
    // Remove all non-numeric characters
    const numericValue = angka.replace(/\D/g, '')
    // Add a thousands separator
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    // Add the 'Rp.' prefix and return the formatted value
    return `Rp. ${formattedValue}`
}

export function rupiah(angka) {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    return formatter.format(angka);
}

export function penjumlahan(list, column) {

    const totalJumlah = list.reduce((acc, curr) => {
        return acc + toInteger(curr[column])
    }, 0)

    return totalJumlah
}