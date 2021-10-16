<?php include __DIR__ . '/php/header.php'; ?>

<main>

    <?php
    //Convert json to php array
    $jsonArray = file_get_contents("data.json");
    $animalsArray = json_decode($jsonArray, true);
    ?>

    <section class="compare-section">
        <div class="animal-data-container"></div>
        <h2 class="current-topic-header"></h2>
    </section>

    <section class="filter-topics-section">
        <?php $topics = array_keys($animalsArray['animals'][0]) ?>
        <?php for ($i = 1; $i < count($topics); $i++) : ?>
            <button onclick="doTopicsFilter('<?= $topics[$i] ?>')"><?= $topics[$i] ?></button>
        <?php endfor ?>
    </section>

    <section class="animal-section">


        <!-- Checkbox form -->
        <form method="POST">
            <input type="submit" name="submit" value='Compare'>
            <?php $i = 0; ?>
            <!-- Create checkboxes - Only checked will be added to $_POST['submit'] when submiting.
            Save $i, which will be the index to the json table -->
            <?php foreach ($animalsArray['animals'] as $animal) : ?>
                <?php $name = $animal['name'] ?>
                <label><input type="checkbox" name="check_list[]" value="<?= $i ?>"><?= $name ?></label>
                <?php $i++ ?>
            <?php endforeach ?>

        </form>

        <!-- Recieve checked  -->
        <?php if (isset($_POST['submit'])) : ?>
            <?php if (!empty($_POST['check_list'])) : ?>
                <script>
                    var jsonCheckList = <?= json_encode($_POST['check_list']); ?>;
                    handleAnimalFormData(jsonCheckList);
                </script>
            <?php endif ?>
        <?php endif ?>
    </section>


</main>

<?php include __DIR__ . '/php/footer.php'; ?>