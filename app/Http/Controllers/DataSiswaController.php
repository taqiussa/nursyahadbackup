<?php

namespace App\Http\Controllers;

use App\Traits\InitTrait;
use Illuminate\Http\Request;

class DataSiswaController extends Controller
{
    use InitTrait;
    
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        return inertia(
            'TataUsaha/DataSiswa',
            [
                'initTahun' => $this->data_tahun(),
            ]
        );
    }
}
