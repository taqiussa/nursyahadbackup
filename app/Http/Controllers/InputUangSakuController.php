<?php

namespace App\Http\Controllers;

use App\Models\PemasukanSiswa;
use App\Traits\InitTrait;

class InputUangSakuController extends Controller
{
    use InitTrait;

    public function index()
    {
        return inertia('Guru/InputUangSaku', [
            'initTahun' => $this->data_tahun(),
            'initSemester' => $this->data_semester()
        ]);
    }

    public function simpan()
    {
        request()->validate([
            'nis' => 'required',
            'tanggal' => 'required',
            'jumlah' => 'required',
            'bulan' => 'required'
        ]);

        $jumlah = ambilAngka(request('jumlah'));

        PemasukanSiswa::create([
            'nis' => request('nis'),
            'tahun' => request('tahun'),
            'semester' => request('semester'),
            'bulan' => date('Y-' . request('bulan') . '-01'),
            'tanggal' => request('tanggal'),
            'jumlah' => $jumlah,
            'keterangan' => request('keterangan'),
            'user_id' => auth()->user()->id
        ]);
    }

    public function hapus()
    {
        PemasukanSiswa::destroy(request('id'));

        return to_route('input-uang-saku');
    }
}
