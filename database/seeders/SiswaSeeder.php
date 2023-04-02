<?php

namespace Database\Seeders;

use App\Models\Siswa;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kelas1 = [
            ['name' => "Abdullah Al Fayed", 'kelas' => "1", 'nis' => "220065SASI"],
            ['name' => "Adam Arsenio", 'kelas' => "1", 'nis' => "220066PKSI"],
            ['name' => "Adiba Kayyasa Nabiha", 'kelas' => "1", 'nis' => "220067MATE"],
            ['name' => "Ahmad Amri Mubarok", 'kelas' => "1", 'nis' => "220068PKSE"],
            ['name' => "Ahmad Dinejav", 'kelas' => "1", 'nis' => "220069MAII"],
            ['name' => "Aisyah Choirun Najjiya", 'kelas' => "1", 'nis' => "220070MATI"],
            ['name' => "Akyas Mahfudz Muhammad", 'kelas' => "1", 'nis' => "220071SAFE"],
            ['name' => "Aldo Abinaya Alexi", 'kelas' => "1", 'nis' => "220072SAIE"],
            ['name' => "Ammar Syaqib Al Arkhan", 'kelas' => "1", 'nis' => "220073KAIE"],
            ['name' => "Anggita Nur Maulida", 'kelas' => "1", 'nis' => "220074PASI"],
            ['name' => "Azkayra Rukma Qotrunnanda Falah", 'kelas' => "1", 'nis' => "220075KKIE"],
            ['name' => "Dhea Salma Maulidya", 'kelas' => "1", 'nis' => "220076MAIE"],
            ['name' => "Gibran Ahmad El Ghazi", 'kelas' => "1", 'nis' => "220077SAFI"],
            ['name' => "Isna Arrifa Musta", 'kelas' => "1", 'nis' => "220078PATI"],
            ['name' => "Jessica Ayu Azalia", 'kelas' => "1", 'nis' => "220079MATE"],
            ['name' => "Nabila Aulia Zahra", 'kelas' => "1", 'nis' => "220080SASE"],
            ['name' => "Nadhera Ayeesa Amira", 'kelas' => "1", 'nis' => "220081SAFE"],
            ['name' => "Rafif Agastya Pramadana", 'kelas' => "1", 'nis' => "220082PVTE"],
            ['name' => "Rizki Muhammad Affan", 'kelas' => "1", 'nis' => "220083PAFE"],
        ];

        $kelas2 = [
            ['name' =>  'Danish Muhammad Wiratama', 'kelas' => '2', 'nis' => '210050KATE'],
            ['name' =>  'Dzakiyatussyarifah', 'kelas' => '2', 'nis' => '210051PKSI'],
            ['name' =>  'Ghulam Muhammad Hadziq', 'kelas' => '2', 'nis' => '210053KATE'],
            ['name' =>  'Hafiza Khaira Lubna', 'kelas' => '2', 'nis' => '210054KATE'],
            ['name' =>  'Ika Nur Rofiah', 'kelas' => '2', 'nis' => '220085MAFI'],
            ['name' =>  'Latifatus Sadiyah', 'kelas' => '2', 'nis' => '210055SKIE'],
            ['name' =>  'Muhammad Albi Haddad Hidayat', 'kelas' => '2', 'nis' => '220084PAFE'],
            ['name' =>  'Muhammad Al Chafy', 'kelas' => '2', 'nis' => '210057MAIE'],
            ['name' =>  'Muhammad Ibnu Alfin Mubarok', 'kelas' => '2', 'nis' => '210058MAFE'],
            ['name' =>  'Muhammad Vino Bastian', 'kelas' => '2', 'nis' => '210056SASE'],
            ['name' =>  'Muhammad Wigar Tulus Sambodo', 'kelas' => '2', 'nis' => '210059PAFI'],
            ['name' =>  'Nadia Sabikhatul Khasanah', 'kelas' => '2', 'nis' => '210060MASE'],
            ['name' =>  'Naila Bilqis Muazara', 'kelas' => '2', 'nis' => '210061SATE'],
            ['name' =>  'Nuria Alya Syakira', 'kelas' => '2', 'nis' => '210062MVSI'],
        ];

        $kelas3 = [
            ['name' => "Alfin Ma'ruf Alfaruq", 'kelas' => "3", 'nis' => "220086MAII"],
            ['name' => "Almira Farras Divana Permadi", 'kelas' => "3", 'nis' => "200022SASI"],
            ['name' => "Channah Aisyah", 'kelas' => "3", 'nis' => "200024KATE"],
            ['name' => "Dzawata Afnan Alfaiza", 'kelas' => "3", 'nis' => "200026KAIE"],
            ['name' => "Elshafira Khoirul Hafiza", 'kelas' => "3", 'nis' => "200027MAII"],
            ['name' => "Erika Khansa Salsabila", 'kelas' => "3", 'nis' => "200028MAFI"],
            ['name' => "Falihatunnafisa", 'kelas' => "3", 'nis' => "200029MATE"],
            ['name' => "Lidya Alya Faiqa", 'kelas' => "3", 'nis' => "200032SVFI"],
            ['name' => "M. Abie Sakhi Zaidhan", 'kelas' => "3", 'nis' => "200033MAFI"],
            ['name' => "M. Ali Wafa Abasalama", 'kelas' => "3", 'nis' => "200034SATE"],
            ['name' => "M. Darul Firdaus Ar Rafid", 'kelas' => "3", 'nis' => "200035PAIE"],
            ['name' => "M. Nufail Fadhla", 'kelas' => "3", 'nis' => "200038KAII"],
            ['name' => "M. Raffa Al Wizar", 'kelas' => "3", 'nis' => "200039MASE"],
            ['name' => "Nadifa Khanza Azahra", 'kelas' => "3", 'nis' => "220087SASE"],
            ['name' => "Rafa Setya Aprilia", 'kelas' => "3", 'nis' => "200042MAIE"],
            ['name' => "Talitha Fatimah Azzahra", 'kelas' => "3", 'nis' => "200045PAIE"],
            ['name' => "Zahira Lutfia Fitri Azzahra", 'kelas' => "3", 'nis' => "200044PAIE"]
        ];

        $kelas4 = [
            ['name' => "Aeklima Khairunnisa Putri", 'kelas' => "4", 'nis' => "190011SAIE"],
            ['name' => "Agha Zahir Al Shirazi", 'kelas' => "4", 'nis' => "200046SAII"],
            ['name' => "Alex Iskandar Zulkarnaen", 'kelas' => "4", 'nis' => "180002KKTE"],
            ['name' => "Alfaya Nurun Najah", 'kelas' => "4", 'nis' => "190012SASI"],
            ['name' => "Asha Kinara Dewi", 'kelas' => "4", 'nis' => "190013PVSE"],
            ['name' => "Azzahra Naila Rahma", 'kelas' => "4", 'nis' => "190014PAFI"],
            ['name' => "Bachtiar Maulana Agfi", 'kelas' => "4", 'nis' => "190015SATE"],
            ['name' => "Dima Rizkiyana Novia Anwar", 'kelas' => "4", 'nis' => "190021SAIE"],
            ['name' => "Hasnau Sofia Salsabila", 'kelas' => "4", 'nis' => "190016MVIE"],
            ['name' => "Nadinda Hasya Fadaina", 'kelas' => "4", 'nis' => "220088PVFI"],
            ['name' => "Nandito Pratikman Putra", 'kelas' => "4", 'nis' => "190019PAIE"],
            ['name' => "Ravangga Yamdee", 'kelas' => "4", 'nis' => "190020SKFE"],
            ['name' => "Rihla Medina Mecca", 'kelas' => "4", 'nis' => "200043MATE"]
        ];

        $kelas5 = [
            ['name' => "Eza Rifky Akbar", 'kelas' => "5", 'nis' => "210063PAII"],
            ['name' => "Ganesia Restu Huda", 'kelas' => "5", 'nis' => "180003PKIn"],
            ['name' => "M. Habib Hasyim Husaini", 'kelas' => "5", 'nis' => "180005KKSE"],
            ['name' => "Maslahatul Ummah", 'kelas' => "5", 'nis' => "180004MVII"],
            ['name' => "Muhammad Arkaan Lathif Ibnu Nabil", 'kelas' => "5", 'nis' => "190018MVFE"],
            ['name' => "Muhammad Rizqi Maulana", 'kelas' => "5", 'nis' => "180006PAII"],
            ['name' => "Nanda Naira Abiyyah", 'kelas' => "5", 'nis' => "180007SVIE"],
            ['name' => "Naylil Muna Ramadhani", 'kelas' => "5", 'nis' => "180009SVIE"]
        ];
        $kelasinklusi = [
            ['name' => "Dzakira Talita Zahra", 'kelas' => "7", 'nis' => "200025SAFE"],
            ['name' => "Muhammad Miftahul Ulum", 'kelas' => "7", 'nis' => "200040PVTI"],
        ];

        foreach($kelas1 as $siswa1)
        {
            User::create([
                'name' => $siswa1['name'],
                'username' => $siswa1['nis'],
                'nis' => $siswa1['nis'],
                'password' => bcrypt('12345678')
            ]);

            Siswa::create([
                'nis' => $siswa1['nis'],
                'kelas_id' => $siswa1['kelas'],
                'tahun' => '2022 / 2023',
                'tingkat' => $siswa1['kelas']
            ]);
        }
        foreach($kelas2 as $siswa2)
        {
            User::create([
                'name' => $siswa2['name'],
                'username' => $siswa2['nis'],
                'nis' => $siswa2['nis'],
                'password' => bcrypt('12345678')
            ]);

            Siswa::create([
                'nis' => $siswa2['nis'],
                'kelas_id' => $siswa2['kelas'],
                'tahun' => '2022 / 2023',
                'tingkat' => $siswa2['kelas']
            ]);
        }
        foreach($kelas3 as $siswa3)
        {
            User::create([
                'name' => $siswa3['name'],
                'username' => $siswa3['nis'],
                'nis' => $siswa3['nis'],
                'password' => bcrypt('12345678')
            ]);

            Siswa::create([
                'nis' => $siswa3['nis'],
                'kelas_id' => $siswa3['kelas'],
                'tahun' => '2022 / 2023',
                'tingkat' => $siswa3['kelas']
            ]);
        }
        foreach($kelas4 as $siswa4)
        {
            User::create([
                'name' => $siswa4['name'],
                'username' => $siswa4['nis'],
                'nis' => $siswa4['nis'],
                'password' => bcrypt('12345678')
            ]);

            Siswa::create([
                'nis' => $siswa4['nis'],
                'kelas_id' => $siswa4['kelas'],
                'tahun' => '2022 / 2023',
                'tingkat' => $siswa4['kelas']
            ]);
        }
        foreach($kelas5 as $siswa5)
        {
            User::create([
                'name' => $siswa5['name'],
                'username' => $siswa5['nis'],
                'nis' => $siswa5['nis'],
                'password' => bcrypt('12345678')
            ]);

            Siswa::create([
                'nis' => $siswa5['nis'],
                'kelas_id' => $siswa5['kelas'],
                'tahun' => '2022 / 2023',
                'tingkat' => $siswa5['kelas']
            ]);
        }
        foreach($kelasinklusi as $siswa31)
        {
            User::create([
                'name' => $siswa31['name'],
                'username' => $siswa31['nis'],
                'nis' => $siswa31['nis'],
                'password' => bcrypt('12345678')
            ]);

            Siswa::create([
                'nis' => $siswa31['nis'],
                'kelas_id' => $siswa31['kelas'],
                'tahun' => '2022 / 2023',
                'tingkat' => 3
            ]);
        }
    }
}
