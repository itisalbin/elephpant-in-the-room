function handleAnimalFormData(animalIndexes) {
  fetch('data.json')
    .then((response) => response.json())
    .then((animalsData) => drawData(animalsData, animalIndexes));
}

function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

function drawData(animalsData, animalIndexes) {
  animals = animalsData['animals'];
  keys = Object.keys(animals[0]); //array(3) [ "name", "legs", "lives" ]

  //Get compareSection
  const animalDataContainer = document.getElementsByClassName('animal-data-container')[0];

  animDataContHeight = animalDataContainer.clientHeight;

  //Loop over every topic and create topic html containers, start on 1 to exclude 'name'.
  for (let i = 1; i < keys.length; i++) {
    //Topic Container
    topic = keys[i];
    const topicDiv = document.createElement('div');
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
      const dataPointContainer = createDOMObject('div', 'data-point-container', '', topicDiv);

      //Name
      animalName = animals[animalIndexes[j]][keys[0]];
      createDOMObject('p', 'animal-name', animalName, dataPointContainer);

      //Topic value
      topicValue = animals[animalIndexes[j]][keys[i]];
      createDOMObject('p', 'topic-value', topicValue, dataPointContainer);

      //Bar
      const bar = createDOMObject('div', 'bar', '', dataPointContainer);
      let valueFraction = topicValue / highestTopicVal;
      bar.style.height = valueFraction * animDataContHeight * 0.74 - 100 + 'px';
    }
  }

  doTopicsFilter('age');
}

function createDOMObject(divType, className, innerHTML, parentTag) {
  const newTag = document.createElement(divType);
  newTag.classList.add(className);
  newTag.innerHTML = innerHTML;
  parentTag.appendChild(newTag);
  return newTag;
}

function doTopicsFilter(buttonTopic) {
  const topicContainers = document.getElementsByClassName('topic-container');

  for (let i = 0; i < topicContainers.length; i++) {
    if (topicContainers[i].className.search(buttonTopic) == -1) {
      topicContainers[i].style.display = 'none';
    } else {
      topicContainers[i].style.display = 'flex';
      const currentTopicHeader = document.getElementsByClassName('current-topic-header')[0];
      currentTopicHeader.innerHTML = buttonTopic;
    }
  }
}

function onSubmitAnimalForm(submitEvent) {
  //Prevent submit from refreshing page
  submitEvent.preventDefault();

  //Get FormData from form
  const animalsForm = document.getElementById('animalsForm');
  let formData = new FormData(animalsForm);

  let checkedAmount = 0;
  for (let data of formData.entries()) {
    checkedAmount++;
  }

  const compareWarning = document.getElementsByClassName('compare-warning')[0];

  compareWarning.innerHTML = '';

  if (checkedAmount > 5) {
    compareWarning.innerHTML = 'You can pick max 5.';
    return;
  }

  //Remove old topic containers
  removeElementsByClass('topic-container');

  //Hide animals section
  displayAnimalSection(false);

  let animalCheckedIndexes = [];
  for (let data of formData.entries()) {
    animalCheckedIndexes.push(data[1]);
  }

  handleAnimalFormData(animalCheckedIndexes);
}

function displayAnimalSection(show) {
  const animalSection = document.getElementsByClassName('animal-section')[0];
  if (show) {
    animalSection.style.transform = 'translateY(0vh)';
  } else {
    animalSection.style.transform = 'translateY(-100vh)';
  }
}
