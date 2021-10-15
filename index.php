<?php include __DIR__ . '/php/header.php'; ?>

<main>

    <section class="compare-section">
        <h2 class="current-topic-header"> - - - </h2>
        <div class="animal-data-container">

        </div>
    </section>

    <section class="filter-topics-section">
        asfasfas
    </section>

    <section class="animal-section">
        <?php
        //Convert json to php array
        $jsonArray = file_get_contents("data.json");
        $animalsArray = json_decode($jsonArray, true);
        ?>

        <!-- Checkbox form -->
        <form action='#' , method="POST">
            <?php $i = 0; ?>
            <!-- Create checkboxes - Only checked will be added to $_POST['submit'] when submiting.
            Save $i, which will be the index to the json table -->
            <?php foreach ($animalsArray['animals'] as $animal) : ?>
                <?php $name = $animal['name'] ?>
                <label><input type="checkbox" name="check_list[]" value="<?= $i ?>"><?= $name ?></label>
                <?php $i++ ?>
            <?php endforeach ?>
            <input type="submit" name="submit" value='Compare'>
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