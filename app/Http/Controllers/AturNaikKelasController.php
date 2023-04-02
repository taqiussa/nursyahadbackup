<?php

namespace App\Http\Controllers;

use App\Models\DataNaikKelas;
use App\Models\Kelas;
use App\Models\Siswa;
use App\Traits\InitTrait;

class AturNaikKelasController extends Controller
{
    use InitTrait;

    public function index()
    {
        return inertia('Guru/AturNaikKelas', [
            'initTahun' => $this->data_tahun(),
            'initTahunBaru' => $this->data_tahun_baru(),
            'listKelas' => Kelas::orderBy('nama')->get()
        ]);
    }

    public function simpan()
    {
        request()->validate([
            'tahunLama' => 'required',
            'tahunBaru' => 'required',
            'kelasLama' => 'required',
            'kelasBaru' => 'required',
        ]);

        $kelasLama = Kelas::find(request('kelasLama'));
        $kelasBaru = Kelas::find(request('kelasBaru'));

        if(request('arrayInput') === [])
        {
            return back()->withErrors(['pesan' => 'Silahkan Pilih Siswa']);
        }
        
        if($kelasLama->id === $kelasBaru->id)
        {
            return back()->withErrors(['pesan' => 'Kelas Baru dan Kelas Lama tidak boleh Sama']);
        }

        if($kelasLama->tingkat === $kelasBaru->tingkat)
        {
            return back()->withErrors(['pesan' => 'Kelas Baru dan Kelas Lama tidak boleh Satu Tingkatan']);
        }

        if(request('tahunLama') === request('tahunBaru'))
        {
            return back()->withErrors(['pesan' => 'Tahun Baru dan Tahun Lama tidak boleh Sama']);
        }

        foreach (request('arrayInput') as $siswaBaru) {
            Siswa::create([
                'nis' => $siswaBaru,
                'kelas_id' => request('kelasBaru'),
                'tahun' => request('tahunBaru')
            ]);
        }
        return to_route('atur-naik-kelas');
    }
}
