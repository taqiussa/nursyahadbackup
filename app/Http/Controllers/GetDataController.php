<?php

namespace App\Http\Controllers;

use App\Models\PemasukanSiswa;
use App\Models\PengeluaranSiswa;
use App\Models\User;
use App\Models\Siswa;

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

    public function get_pengeluaran_siswa()
    {
        return response()->json([
            'listPengeluaran' => PengeluaranSiswa::whereTahun(request('tahun'))
                ->whereMonth('bulan', request('bulan'))
                ->whereNis(request('nis'))
                ->with([
                    'user' => fn ($q) => $q->select('id', 'name')
                ])
                ->orderByDesc('tanggal')
                ->get()
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
            'listUangSaku' => PemasukanSiswa::whereTahun(request('tahun'))
                ->whereNis(request('nis'))
                ->with([
                    'user' => fn ($q) => $q->select('id', 'name')
                ])
                ->orderByDesc('tanggal')
                ->get()
        ]);
    }

    public function get_uang_saku_per_bulan()
    {
        return response()->json([
            'listUangSaku' => PemasukanSiswa::whereTahun(request('tahun'))
                ->whereNis(request('nis'))
                ->whereMonth('bulan', request('bulan'))
                ->with([
                    'user' => fn ($q) => $q->select('id', 'name')
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

    public function get_user_boyong()
    {
        return response()->json([
            'listUser' => User::where('nis', '!=', null)
                ->with([
                    'biodata',
                    'siswaBoyong.kelas'
                ])
                ->whereHas('siswaBoyong')
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
