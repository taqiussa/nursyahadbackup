<?php

namespace App\Http\Controllers;

use App\Models\PengeluaranSiswa;
use App\Traits\InitTrait;

class InputPengeluaranSiswaController extends Controller
{
    use InitTrait;

    public function index()
    {
        return inertia(
            'Guru/InputPengeluaranSiswa',
            [
                'initTahun' => $this->data_tahun(),
                'initSemester' => $this->data_semester(),
            ]
        );
    }

    public function simpan()
    {
        request()->validate([
            'tanggal' => 'required',
            'jumlah' => 'required',
            'nis' => 'required',
            'bulan' => 'required'
        ]);

        $jumlah = ambilAngka(request('jumlah'));

        PengeluaranSiswa::create([
            'nis' => request('nis'),
            'tahun' => request('tahun'),
            'semester' => request('semester'),
            'bulan' => date('Y-'. request('bulan') . '-01'),
            'tanggal' => request('tanggal'),
            'jumlah' => $jumlah,
            'keterangan' => request('keterangan'),
            'user_id' => auth()->user()->id
        ]);

        return to_route('input-pengeluaran-siswa');
    }

    public function hapus()
    {
        PengeluaranSiswa::destroy(request('id'));

        return to_route('input-pengeluaran-siswa');
    }
}
