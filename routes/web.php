<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GetDataController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DataSiswaController;
use App\Http\Controllers\TambahSiswaController;
use App\Http\Controllers\AturNaikKelasController;
use App\Http\Controllers\AturKelasSiswaController;
use App\Http\Controllers\AturPindahKelasController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return inertia('Auth/Login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware([
    'auth',
    'role:Admin|Bendahara|Guru|Karyawan|Kepala Sekolah|Kesiswaan|Kurikulum'
])->group(function () {

    // Route Get Data
    Route::controller(GetDataController::class)->group(function () {
        Route::post('get-all-siswa', 'get_all_siswa')->name('get-all-siswa');
        Route::post('get-siswa', 'get_siswa')->name('get-siswa');
        Route::post('get-siswa-naik-kelas', 'get_siswa_naik_kelas')->name('get-siswa-naik-kelas');
        Route::post('get-user', 'get_user')->name('get-user');
    });

    // Route Atur Kelas Siswa
    Route::controller(AturKelasSiswaController::class)->group(function () {
        Route::get('atur-kelas-siswa', 'index')->name('atur-kelas-siswa');
        Route::post('atur-kelas-siswa/simpan', 'simpan')->name('atur-kelas-siswa.simpan');
        Route::delete('atur-kelas-siswa/{id}', 'hapus')->name('atur-kelas-siswa.hapus');
    });

    // Route Atur Naik Kelas
    Route::controller(AturNaikKelasController::class)->group(function () {
        Route::get('atur-naik-kelas', 'index')->name('atur-naik-kelas');
        Route::post('atur-naik-kelas/simpan', 'simpan')->name('atur-naik-kelas.simpan');
    });

    //Route Atur Pindah Kelas
    Route::controller(AturPindahKelasController::class)->group(function () {
        Route::get('atur-pindah-kelas', 'index')->name('atur-pindah-kelas');
        Route::post('atur-pindah-kelas/simpan', 'simpan')->name('atur-pindah-kelas.simpan');
    });

    // Route Data Siswa
    Route::get('data-siswa', DataSiswaController::class)->name('data-siswa');

    // Route Tambah Siswa
    Route::controller(TambahSiswaController::class)->group(function () {
        Route::get('tambah-siswa', 'index')->name('tambah-siswa');
        Route::post('tambah-siswa/simpan', 'simpan')->name('tambah-siswa.simpan');
        Route::delete('tambah-siswa/{id}', 'hapus')->name('tambah-siswa.hapus');

        // Route Edit Siswa
        Route::get('tambah-siswa/edit', 'edit')->name('tambah-siswa.edit');
        Route::post('tamba-siswa/update', 'update')->name('tambah-siswa.update');
    });
});

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__ . '/auth.php';
