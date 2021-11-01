//Called when form is submitted on index.php.
function onSubmitAnimalForm(submitEvent) {
  //Prevent submit from refreshing page
  submitEvent.preventDefault();

  //Get FormData from form
  let animalsForm = document.getElementById('animalsForm');
  let formData = new FormData(animalsForm);

  //Count how many animals were checked
  let checkedAmount = 0;
  for (let data of formData.entries()) {
    if (!isNaN(data[1])) {
      checkedAmount++;
    }
  }

  let compareWarning = document.getElementsByClassName('compare-warning')[0];

  compareWarning.innerHTML = '';

  //return and show text if checked animals is not in range 2 to 5.
  if (checkedAmount < 2) {
    compareWarning.innerHTML = 'You have to pick at least two.';
    return;
  } else if (checkedAmount > 5) {
    compareWarning.innerHTML = 'You can pick max 5.';
    return;
  }

  //If animals is 2 to 5, continue below.

  //Remove old topic containers
  removeElementsByClass('topic-container');

  //Hide animals section (first page)
  displayAnimalSection(false);

  //Add indexes to new array (The indexes of the checked animals; the ones not checked will not be added to this array.)
  let animalCheckedIndexes = [];

  //Safari also ads submit value 'Compare!' Check if value is int to exclude it.
  for (let data of formData.entries()) {
    if (!isNaN(data[1])) {
      animalCheckedIndexes.push(data[1]);
    }
  }

  //Give index array to handleAnimalFormData
  handleAnimalFormData(animalCheckedIndexes);
}

//Get array from the file 'data.json' and send it -along with the index array- to the function 'drawData'.
function handleAnimalFormData(animalIndexes) {
  fetch('data.json')
    .then((response) => response.json())
    .then((animalsData) => drawData(animalsData, animalIndexes));
}

function removeElementsByClass(className) {
  let elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

function drawData(animalsData, animalIndexes) {
  let animals = animalsData['animals'];
  let keys = Object.keys(animals[0]); //array(3) [ "name", "legs", "lives" ]

  //Get compareSection
  let animalDataContainer = document.getElementsByClassName('animal-data-container')[0];
  let animDataContHeight = animalDataContainer.clientHeight;

  //Loop over every topic and create topic html containers, start on 1 to exclude 'name'.
  for (let i = 1; i < keys.length; i++) {
    //Topic Container
    let topic = keys[i];
    let topicDiv = document.createElement('div');
    topicDiv.classList.add('topic-container');
    topicDiv.classList.add(topic);
    animalDataContainer.appendChild(topicDiv);

    //Calculate highest number per topic and selected animals
    let highestTopicVal = 0;

    for (let j = 0; j < animalIndexes.length; j++) {
      let topicValCurrentAnimal = animals[animalIndexes[j]][keys[i]];
      if (topicValCurrentAnimal > highestTopicVal) {
        highestTopicVal = topicValCurrentAnimal;
      }
    }

    //Loop over every animal in current topic container and create html tags
    for (let j = 0; j < animalIndexes.length; j++) {
      //Animal Container
      let dataPointContainer = createDOMObject('div', 'data-point-container', '', topicDiv);

      //Name
      let animalName = animals[animalIndexes[j]][keys[0]];
      createDOMObject('p', 'animal-name', animalName, dataPointContainer);

      //Topic value
      let topicValue = animals[animalIndexes[j]][keys[i]];
      createDOMObject('p', 'topic-value', topicValue, dataPointContainer);

      //Bar
      let bar = createDOMObject('div', 'bar', '', dataPointContainer);
      let valueFraction = topicValue / highestTopicVal;
      bar.style.height = valueFraction * animDataContHeight * 0.6 + 'px';
    }
  }

  doTopicsFilter('age');
}

function createDOMObject(divType, className, innerHTML, parentTag) {
  let newTag = document.createElement(divType);
  newTag.classList.add(className);
  newTag.innerHTML = innerHTML;
  parentTag.appendChild(newTag);
  return newTag;
}

function doTopicsFilter(buttonTopic) {
  let topicContainers = document.getElementsByClassName('topic-container');

  for (let i = 0; i < topicContainers.length; i++) {
    if (topicContainers[i].className.search(buttonTopic) == -1) {
      topicContainers[i].style.display = 'none';
    } else {
      topicContainers[i].style.display = 'flex';
      let currentTopicHeader = document.getElementsByClassName('current-topic-header')[0];
      currentTopicHeader.innerHTML = buttonTopic;
    }
  }
}

function displayAnimalSection(show) {
  let animalSection = document.getElementsByClassName('animal-section')[0];
  if (show) {
    animalSection.style.transform = 'translateY(0vh)';
  } else {
    animalSection.style.transform = 'translateY(-100vh)';
  }
}
