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

        <section class="filter-topics-section">
            <?php $topics = array_keys($animalsArray['animals'][0]) ?>
            <?php for ($i = 1; $i < count($topics); $i++) : ?>
                <button class="filter-button" onclick="doTopicsFilter('<?= $topics[$i] ?>')"><?= $topics[$i] ?></button>
            <?php endfor ?>
        </section>
    </section>

    <section class="animal-section">


        <form id="animalsForm" name="animalsForm">
            <input type="submit" name="submit" value="submit">
            <?php $i = 0 ?>
            <?php foreach ($animalsArray['animals'] as $animal) : ?>
                <?php $name = $animal['name'] ?>
                <label><input type="checkbox" name="checkbox[]" value="<?= $i ?>"><?= $name ?></label>
                <?php $i++ ?>
            <?php endforeach ?>
        </form>

        <script>
            //Add event type: "submit" and function to react on event.
            const animalsForm = document.getElementById("animalsForm");
            animalsForm.addEventListener('submit', onSubmitForm);

            function onSubmitForm(submitEvent) {
                //Prevent submit from refreshing page
                submitEvent.preventDefault();

                //Get FormData from form
                const animalsForm = document.getElementById("animalsForm");
                let formData = new FormData(animalsForm);

                let animalCheckedIndexes = [];
                for (let data of formData.entries()) {
                    animalCheckedIndexes.push(data[1]);
                }

                handleAnimalFormData(animalCheckedIndexes);

            }
        </script>


    </section>

</main>

<?php include __DIR__ . '/php/footer.php'; ?>