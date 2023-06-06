<?= $this->extend('layout/template') ?>
<?= $this->section('content') ?>
<div class="container">
    <div class="row">
        <?php foreach ($data as $film) : ?>
            <div class="col-md-4">
                <div class="card mb-3 shadow-lg">
                    <img src="https://image.tmdb.org/t/p/w500/<?= $film['poster'] ?>" class="card-img-top" alt="<?= $film['slug'] ?>" loading="lazy">
                    <div class="card-body">
                        <h5 class="card-title"><?= $film['title'] ?></h5>
                        <p class="card-text"><?= $film['description'] ?></p>
                        <p class="text-muted"><small><?php
                                                        $time = $film['time'];
                                                        $time_current = time();
                                                        $timee = $time_current - $time;
                                                        if ($timee < 60) {
                                                            echo $timee . ' Detik Yang Lalu';
                                                        } elseif ($timee < 3600) {
                                                            $minute = floor($timee / 60);
                                                            echo $minute . ' Menit Yang Lalu';
                                                        } elseif ($timee < 86400) {
                                                            $hour = floor($timee / 3600);
                                                            echo $hour . ' Jam Yang Lalu';
                                                        } else {
                                                            $day = floor($timee / 86400);
                                                            echo $day . ' Hari Yang Lalu';
                                                        }
                                                        ?></small></p>
                        <a href="<?= base_url('/cinema/' . $film['slug']) ?>" class="btn btn-primary">Watch</a>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>
<?= $this->endSection() ?>