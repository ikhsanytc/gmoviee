<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use App\Models\Cinema as ModelsCinema;

class Cinema extends BaseController
{
    private $cinemaModel;
    public function __construct()
    {
        $this->cinemaModel = new ModelsCinema();
    }
    public function index()
    {
        // dd($this->cinemaModel->findAll());
        $data = [
            'title' => 'Home Cinema',
            'data' => $this->cinemaModel->orderBy('time', 'DESC')->findAll()
        ];
        return view('views/cinema/index', $data);
    }
}
