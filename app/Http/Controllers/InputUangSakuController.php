<?php

namespace App\Http\Controllers;

use App\Models\UangSaku;
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
            'jumlah' => 'required'
        ]);

        $jumlah = ambilAngka(request('jumlah'));

        UangSaku::create([
            'tahun' => request('tahun'),
            'semester' => request('semester'),
            'nis' => request('nis'),
            'tanggal' => request('tanggal'),
            'jumlah' => $jumlah,
            'keterangan' => request('keterangan')
        ]);
    }

    public function hapus()
    {
        UangSaku::destroy(request('id'));

        return to_route('input-uang-saku');
    }
}
