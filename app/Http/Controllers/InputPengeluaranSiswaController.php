<?php

namespace App\Http\Controllers;

use App\Traits\InitTrait;

class InputPengeluaranSiswaController extends Controller
{
    use InitTrait;

    public function index()
    {
        return inertia('Guru/InputPengeluaranSiswa',
        [
            'initTahun' => $this->data_tahun(),
            'initSemester' => $this->data_semester(),
        ]);
    }
}
