function compareAnimals(animalIndexes) {
  //Get tables somehow and add the data

  fetch('data.json')
    .then((response) => response.json())
    .then((table) => drawData(table, animalIndexes));
}

function drawData(table, animalIndexes) {
  animals = table['animals'];
  keys = Object.keys(animals[0]); //array(3) [ "name", "legs", "lives" ]

  //Get compareSection
  const section = document.getElementsByClassName('compare-section')[0];
  //Start on 1 to exclude name
  for (let i = 1; i < keys.length; i++) {
    //Topic Container
    topic = keys[i];

    const topicDiv = document.createElement('div');
    topicDiv.classList.add('topic-container');

    for (let j = 0; j < animalIndexes.length; j++) {
      //Container
      const dataPointContainer = document.createElement('div');
      dataPointContainer.classList.add('data-point-container');
      //Name
      animalName = animals[animalIndexes[j]][keys[0]];
      const animalNameTag = document.createElement('p');
      animalNameTag.classList.add('animal-name');
      animalNameTag.innerHTML = animalName;
      //Topic value
      topicValue = animals[animalIndexes[j]][keys[i]];
      const topicValueTag = document.createElement('p');
      topicValueTag.classList.add('topic-value');
      topicValueTag.innerHTML = topicValue;

      topicDiv.appendChild(dataPointContainer);
      dataPointContainer.appendChild(topicValueTag);
      dataPointContainer.appendChild(animalNameTag);
    }

    const topicHeader = document.createElement('h3');
    topicHeader.innerHTML = topic;
    section.appendChild(topicDiv);
    topicDiv.appendChild(topicHeader);
  }
}
