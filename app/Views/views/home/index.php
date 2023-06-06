<?= $this->extend('layout/template') ?>
<?= $this->section('content') ?>
<div class="container">
    <form class="input-group mb-3" action="<?= base_url('/search') ?>" method="post">
        <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" name="key" value="<?= (isset($key)) ? $key : '' ?>" autocomplete="off">
        <button class="btn btn-outline-secondary" type="submit" id="button-addon2">Search</button>
    </form>
    <div class="row">
        <?php foreach ($data as $film) : ?>
            <div class="col-md-4">
                <div class="card mb-3 shadow-lg">
                    <img src="https://image.tmdb.org/t/p/w500<?= $film->poster_path ?>" class="card-img-top" alt="<?= $film->title ?>" loading="lazy">
                    <div class="card-body">
                        <h5 class="card-title"><?= $film->title ?></h5>
                        <p class="card-text"><?= $film->overview ?></p>
                        <p></p>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
</div>
<?= $this->endSection() ?>