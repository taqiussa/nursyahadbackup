<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class InitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            'Admin',
            'Kepala Sekolah',
            'Guru',
            'Tata Usaha'
        ];

        foreach ($data as $name) {
            Role::create([
                'name' => $name,
                'guard_name' => 'web'
            ]);
        }

        $users =
            [
                [
                    'name' => 'Khoirur Roziqin',
                    'username' => 'roziqin'
                ],
                [
                    'name' => 'Administrator',
                    'username' => 'admin'
                ],

            ];

        foreach($users as $user)
        {
            $data = User::create([
                'name' => $user['name'],
                'username' => $user['username'],
                'password' => bcrypt('sdkarakter')
            ]);

            $data->assignRole('Guru');
        }

        $kepala = User::whereUsername('roziqin')->first();
        $kepala->assignRole('Kepala Sekolah');

        $admin = User::whereUsername('admin')->first();
        $admin->assignRole('Admin');
    }
}
