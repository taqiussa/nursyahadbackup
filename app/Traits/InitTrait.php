<?php
namespace App\Traits;

trait InitTrait
{
    public function data_tahun()
    {
        $tahunIni = date('Y');
        $bulanIni = date('m');
        if ($bulanIni <= 6) {
            $tahunAjaran = (intval($tahunIni) - 1) . ' / ' . intval($tahunIni);
        } else {
            $tahunAjaran = intval($tahunIni) . ' / ' . (intval($tahunIni) + 1);
        }
        return $tahunAjaran;
    }

    public function data_semester()
    {
        $bulanIni = date('m');
        if ($bulanIni <= 6) {
            $semester = 2;
        } else {
            $semester = 1;
        }
        return $semester;
    }
}
