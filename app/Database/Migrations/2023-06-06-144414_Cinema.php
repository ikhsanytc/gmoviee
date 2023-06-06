<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Cinema extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id' => [
                'type' => 'int',
                'constraint' => 11,
                'null' => true,
                'auto_increment' => true
            ],
            'slug' => [
                'type' => 'varchar',
                'constraint' => 255
            ],
            'title' => [
                'type' => 'varchar',
                'constraint' => 255
            ],
            'description' => [
                'type' => 'text'
            ],
            'poster' => [
                'type' => 'text'
            ],
            'time' => [
                'type' => 'int',
                'constraint' => 12
            ],
            'created_at' => [
                'type' => 'datetime'
            ],
            'updated_at' => [
                'type' => 'datetime'
            ]
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('gmoviee_cinema_list');
    }

    public function down()
    {
        $this->forge->dropTable('gmoviee_cinema_list');
    }
}
