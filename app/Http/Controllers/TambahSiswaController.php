<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Biodata;

class TambahSiswaController extends Controller
{
    public function index()
    {
        return inertia('TataUsaha/TambahSiswa', [
            'listUser' => User::where('nis', '!=', null)
                ->whereDoesntHave('siswa')
                ->orderBy('name')
                ->get()
        ]);
    }

    public function edit()
    {
        return inertia('TataUsaha/EditSiswa', [
            'siswa' => User::whereNis(request('nis'))
                ->with(
                    [
                        'biodata'
                    ]
                )
                ->first()
        ]);
    }

    public function simpan()
    {
        request()->validate([
            'name' => 'required',
            'nis' => 'required|unique:users,nis',
            'jenisKelamin' => 'required',
        ]);

        User::create([
            'name' => request('name'),
            'nis' => request('nis'),
            'password' => bcrypt('12345678')
        ]);

        Biodata::create([
            'nis' => request('nis'),
            'nisn' => request('nisn'),
            'jenis_kelamin' => request('jenisKelamin'),
            'tempat_lahir' => request('tempatLahir'),
            'tanggal_lahir' => request('tanggalLahir'),
            'nik' => request('nik'),
            'asal_sekolah' => request('asalSekolah'),
            'nama_ayah' => request('namaAyah'),
            'nama_ibu' => request('namaIbu'),
            'alamat' => request('alamat'),
        ]);

        return to_route('tambah-siswa');
    }
    public function update()
    {
        request()->validate([
            'name' => 'required',
            'jenisKelamin' => 'required',
        ]);

        $user = User::find(request('id'));
        $biodata = Biodata::whereNis($user->nis)->first();
        
        $user->update([
            'name' => request('name'),
            'nis' => request('nis'),
        ]);


        $biodata->update(
            [
                'nis' => request('nis'),
                'nisn' => request('nisn'),
                'jenis_kelamin' => request('jenisKelamin'),
                'tempat_lahir' => request('tempatLahir'),
                'tanggal_lahir' => request('tanggalLahir'),
                'nik' => request('nik'),
                'asal_sekolah' => request('asalSekolah'),
                'nama_ayah' => request('namaAyah'),
                'nama_ibu' => request('namaIbu'),
                'alamat' => request('alamat'),
            ]
        );

        return to_route('data-siswa');
    }

    public function hapus()
    {
        User::destroy(request('id'));

        return to_route('data-siswa');
    }
}
