<?php

namespace App\Http\Controllers;

use App\Models\SiswaPondok;
use App\Traits\InitTrait;

class AturSiswaPondokController extends Controller
{
    use InitTrait;

    public function index()
    {
        return inertia(
            'Guru/AturSiswaPondok',
            [
                'initTahun' => $this->data_tahun(),
            ]
        );
    }

    public function simpan()
    {
        $inputs = request('arrayInput');

        foreach ($inputs as $input) {
            SiswaPondok::create([
                'nis' => $input,
                'tahun' => request('tahun')
            ]);
        }
        return to_route('atur-siswa-pondok');
    }

    public function hapus()
    {
        SiswaPondok::destroy(request('id'));

        return to_route('atur-siswa-pondok');
    }
}
