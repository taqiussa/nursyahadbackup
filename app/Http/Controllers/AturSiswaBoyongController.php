<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\SiswaBoyong;
use App\Traits\InitTrait;

class AturSiswaBoyongController extends Controller
{
    use InitTrait;

    public function index()
    {
        return inertia('Guru/AturSiswaBoyong', [
            'initTahun' => $this->data_tahun(),
            'listKelas' => Kelas::orderBy('nama')->get(),
        ]);
    }

    public function hapus()
    {
        Siswa::whereTahun(request('tahun'))
            ->whereKelasId(request('kelasId'))
            ->whereNis(request('nis'))
            ->first()
            ->delete();
        
        SiswaBoyong::create([
            'tahun' => request('tahun'),
            'nis' => request('nis'),
            'kelas_id' => request('kelasId')
        ]);

        return to_route('atur-siswa-boyong');
    }
}
