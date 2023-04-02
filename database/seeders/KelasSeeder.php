<?php

namespace Database\Seeders;

use App\Models\Kelas;
use EnumKategoriKelas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data =
            [
                [
                    'nama' => '1',
                    'tingkat' => '1',
                    'kategori' => EnumKategoriKelas::UMUM
                ],
                [
                    'nama' => '2',
                    'tingkat' => '2',
                    'kategori' => EnumKategoriKelas::UMUM
                ],
                [
                    'nama' => '3',
                    'tingkat' => '3',
                    'kategori' => EnumKategoriKelas::UMUM
                ],
                [
                    'nama' => '4',
                    'tingkat' => '4',
                    'kategori' => EnumKategoriKelas::UMUM
                ],
                [
                    'nama' => '5',
                    'tingkat' => '5',
                    'kategori' => EnumKategoriKelas::UMUM
                ],
                [
                    'nama' => '6',
                    'tingkat' => '6',
                    'kategori' => EnumKategoriKelas::UMUM
                ],
                [
                    'nama' => '3.Inklusi',
                    'tingkat' => '3',
                    'kategori' => EnumKategoriKelas::INKLUSI
                ],
            ];

        foreach ($data as $item) {
            Kelas::create([
                'nama' => $item['nama'],
                'tingkat' => $item['tingkat'],
                'kategori_id' => $item['kategori']
            ]);
        }
    }
}
