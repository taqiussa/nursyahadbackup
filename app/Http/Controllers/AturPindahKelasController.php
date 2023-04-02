<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Siswa;
use App\Traits\InitTrait;

class AturPindahKelasController extends Controller
{
    use InitTrait;

    public function index()
    {
        return inertia(
            'Guru/AturPindahKelas',
            [
                'initTahun' => $this->data_tahun(),
                'listKelas' => Kelas::orderBy('nama')->get(),
            ]
        );
    }

    public function simpan()
    {
        request()->validate([
            'kelasLama' => 'required',
            'tahun' => 'required',
            'kelasBaru' => 'required',
            'arrayInput' => 'required'
        ]);

        if (request('kelasBaru') === request('kelasLama')) {
            return back()->withErrors(['pesan' => 'Kelas Lama dan Baru Tidak Boleh Sama']);
        }

        Siswa::whereTahun(request('tahun'))
            ->whereKelasId(request('kelasLama'))
            ->whereIn('nis', request('arrayInput'))
            ->delete();

        foreach (request('arrayInput') as $siswa) {
            Siswa::create([
                'tahun' => request('tahun'),
                'kelas_id' => request('kelasBaru'),
                'nis' => $siswa
            ]);
        }
        return to_route('atur-pindah-kelas');
    }
}
