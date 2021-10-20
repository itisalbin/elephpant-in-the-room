<?php include __DIR__ . '/php/header.php'; ?>

<main>
    <?php
    //Convert json to php array
    $jsonArray = file_get_contents("data.json");
    $animalsArray = json_decode($jsonArray, true);
    ?>

    <section class="compare-section">
        <button onclick="displayAnimalSection(true)" class="animal-section-open-button">▼</button>
        <div class="animal-data-container"></div>
        <h2 class="current-topic-header"></h2>

        <section class="filter-topics-section">
            <?php $topics = array_keys($animalsArray['animals'][0]) ?>
            <?php for ($i = 1; $i < count($topics); $i++) : ?>
                <button class="filter-button" onclick="doTopicsFilter('<?= $topics[$i] ?>')"><?= $topics[$i] ?></button>
            <?php endfor ?>
        </section>
    </section>

    <section class="animal-section">

        <h1>Pick some animals</h1>

        <form id="animalsForm" name="animalsForm">
            <?php $i = 0 ?>
            <div class="checkboxes-container">
                <?php foreach ($animalsArray['animals'] as $animal) : ?>
                    <?php $name = $animal['name'] ?>
                    <input type="checkbox" id="cb<?= $i ?>" class="checkbox" name="checkbox" value="<?= $i ?>">
                    <label for="cb<?= $i ?>"><?= $name ?></label>
                    <?php $i++ ?>
                <?php endforeach ?>
            </div>
            <input class="submit-form-button" type="submit" name="submit" value="Compare!">
        </form>

        <script>
            //Add event type: "submit" and function to react on event.
            const animalsForm = document.getElementById("animalsForm");
            animalsForm.addEventListener('submit', onSubmitAnimalForm);
        </script>
    </section>

</main>

<?php include __DIR__ . '/php/footer.php'; ?>