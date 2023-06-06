<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;
use CodeIgniter\I18n\Time;

class Cinema extends Seeder
{
    public function run()
    {
        $name = 'habibie & ainun 3';
        $slug = url_title($name, '-', true);
        $data = [
            'slug' => $slug,
            'title' => $name,
            'description' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut saepe nihil sequi quasi nesciunt tenetur culpa ad ab! Rerum neque ut cupiditate quaerat est voluptatibus facilis magnam nihil ipsa et.',
            'poster' => 'z80d5riLuWqjnl3ik8SYJPZTtU4.jpg',
            'time' => time(),
            'created_at' => Time::now('Asia/Jakarta'),
            'updated_at' => Time::now('Asia/Jakarta')
        ];
        $this->db->table('gmoviee_cinema_list')->insert($data);
    }
}
