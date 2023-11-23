<?php

namespace Database\Seeders;


use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        //Creando primer usuario.
        $usuario = new User();
        $usuario->nombre="salvador";
        $usuario->email="salvadorehchavez@gmail.com";
        $usuario->password="$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi"; //password.
        $usuario->activo=true;
        $usuario->save();

    }
}
