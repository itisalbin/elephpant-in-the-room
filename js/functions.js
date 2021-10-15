function handleAnimalFormData(animalIndexes) {
  fetch('data.json')
    .then((response) => response.json())
    .then((animalsData) => drawData(animalsData, animalIndexes));
}

function drawData(animalsData, animalIndexes) {
  animals = animalsData['animals'];
  keys = Object.keys(animals[0]); //array(3) [ "name", "legs", "lives" ]

  //Get compareSection
  const animalDataContainer = document.getElementsByClassName('animal-data-container')[0];

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

      //Topic value
      topicValue = animals[animalIndexes[j]][keys[i]];
      createDOMObject('p', 'topic-value', topicValue, dataPointContainer);

      //Bar
      const bar = createDOMObject('div', 'bar', '', dataPointContainer);
      bar.style.height = (topicValue / highestTopicVal) * 60 + 'vh';

      //Name
      animalName = animals[animalIndexes[j]][keys[0]];
      createDOMObject('p', 'animal-name', animalName, dataPointContainer);
    }
  }
  //This will only pick the last now, put this later in filter function
  const currentTopicHeader = document.getElementsByClassName('current-topic-header')[0];
  currentTopicHeader.innerHTML = topic;
}

function createDOMObject(divType, className, innerHTML, parentTag) {
  const newTag = document.createElement(divType);
  newTag.classList.add(className);
  newTag.innerHTML = innerHTML;
  parentTag.appendChild(newTag);
  return newTag;
}