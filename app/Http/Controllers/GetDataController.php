<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Siswa;
use App\Models\UangSaku;

class GetDataController extends Controller
{
    public function get_all_siswa()
    {
        return response()->json([
            'listSiswa' => Siswa::whereTahun(request('tahun'))
                ->with([
                    'kelas',
                    'user' => fn ($q) => $q->select('nis', 'name'),
                ])
                ->get()
                ->sortBy(['user.name'])
                ->values()
        ]);
    }

    public function get_siswa()
    {
        return response()->json([
            'listSiswa' => Siswa::whereTahun(request('tahun'))
                ->whereKelasId(request('kelasId'))
                ->with(['user' => fn ($q) => $q->select('nis', 'name')])
                ->get()
                ->sortBy('user.name')
                ->values()
        ]);
    }

    public function get_siswa_naik_kelas()
    {
        $siswaBaru = Siswa::whereTahun(request('tahunBaru'))
            ->pluck('nis');

        return response()->json([
            'listSiswa' => Siswa::whereTahun(request('tahunLama'))
                ->whereKelasId(request('kelasId'))
                ->whereNotIn('nis', $siswaBaru)
                ->with(['user' => fn ($q) => $q->select('nis', 'name')])
                ->get()
                ->sortBy('user.name')
                ->values()
        ]);
    }

    public function get_uang_saku()
    {
        return response()->json([
            'listUangSaku' => UangSaku::whereTahun(request('tahun'))
                ->whereNis(request('nis'))
                ->with([
                    'user' => fn ($q) => $q->select('nis', 'name')
                ])
                ->orderByDesc('tanggal')
                ->get()
        ]);
    }

    public function get_user()
    {
        return response()->json([
            'listUser' => User::where('nis', '!=', null)
                ->with([
                    'biodata',
                    'siswa' => fn ($q) => $q->whereTahun(request('tahun')),
                    'siswa.kelas'
                ])
                ->whereHas('siswa', fn ($q) => $q->whereTahun(request('tahun')))
                ->orderBy('name')
                ->get()
        ]);
    }

    public function get_user_pondok()
    {
        return response()->json([
            'listUser' => User::where('nis', '!=', null)
                ->with([
                    'biodata',
                    'siswa' => fn ($q) => $q->whereTahun(request('tahun')),
                    'siswa.kelas'
                ])
                ->whereHas('siswaPondok', fn ($q) => $q->whereTahun(request('tahun')))
                ->orderBy('name')
                ->get()
        ]);
    }

    public function get_user_non_pondok()
    {
        return response()->json([
            'listUser' => User::where('nis', '!=', null)
                ->with([
                    'siswa' => fn ($q) => $q->whereTahun(request('tahun')),
                    'siswa.kelas',
                ])
                ->whereHas('siswa', fn ($q) => $q->whereTahun(request('tahun')))
                ->whereDoesntHave('siswaPondok')
                ->orderBy('name')
                ->get()
        ]);
    }
}
