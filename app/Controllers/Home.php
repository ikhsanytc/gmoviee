<?php

namespace App\Controllers;

use GuzzleHttp\Client;

class Home extends BaseController
{
    private $api;
    public function __construct()
    {
        $this->api = new Client();
    }
    public function index()
    {
        $response = $this->api->request('GET', 'https://api.themoviedb.org/3/movie/popular?language=en-US', [
            'headers' => [
                'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjhmY2NjMDVmOTljOTgzMjI0NDYyYjBiZjdkZDhkMSIsInN1YiI6IjYzYjA2MThhNWFkNzZiMDA3ZGM3ODE3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HjyN2WAI8Fde1QFoUVfkKxFuomna1IcBHz_oH6ayZsQ',
                'accept' => 'application/json',
            ],
        ]);
        $movie = json_decode($response->getBody()->getContents());
        // dd($movie);
        $data = [
            'title' => 'Home',
            'data' => $movie->results
        ];
        return view('views/home/index', $data);
    }
    public function search()
    {
        $key = $this->request->getVar('key');
        if (empty($key)) {
            return redirect()->to(base_url('/'));
        }
        $response = $this->api->request('GET', 'https://api.themoviedb.org/3/search/movie?query=' . $key . '&include_adult=false&language=en-US&page=1', [
            'headers' => [
                'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjhmY2NjMDVmOTljOTgzMjI0NDYyYjBiZjdkZDhkMSIsInN1YiI6IjYzYjA2MThhNWFkNzZiMDA3ZGM3ODE3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HjyN2WAI8Fde1QFoUVfkKxFuomna1IcBHz_oH6ayZsQ',
                'accept' => 'application/json',
            ],
        ]);
        // dd(json_decode($response->getBody()->getContents()));
        $data = [
            'title' => 'Search ' . $key,
            'key' => $key,
            'data' => json_decode($response->getBody()->getContents())->results
        ];
        return view('views/home/index', $data);
    }
}
