<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\User;
use App\Traits\InitTrait;

class AturKelasSiswaController extends Controller
{
    use InitTrait;

    public function index()
    {
        return inertia(
            'Guru/AturKelasSiswa',
            [
                'initTahun' => $this->data_tahun(),
                'listSiswaBelum' => User::where('nis', '!=', null)
                    ->whereDoesntHave('siswa')
                    ->orderBy('name')
                    ->get(),
                'listKelas' => Kelas::orderBy('nama')->get()
            ]
        );
    }

    public function simpan()
    {
        request()->validate(
            [
                'nis' => 'required',
                'tahun' => 'required',
                'kelasId' => 'required'
            ]
        );

        Siswa::create([
            'tahun' => request('tahun'),
            'kelas_id' => request('kelasId'),
            'nis' => request('nis')
        ]);

        return to_route('atur-kelas-siswa');
    }

    public function hapus()
    {
        Siswa::destroy(request('id'));

        return to_route('atur-kelas-siswa');
    }
}
