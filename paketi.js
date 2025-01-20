const buttons = document.querySelectorAll('.dugme');
const cardsContainer = document.getElementById('kartice');
const cardsContainerMini = document.getElementById('kartice2');
const section2 = document.getElementById('section2');

const urlParams = new URLSearchParams(window.location.search);
const packageTypeFromURL = urlParams.get('package');
const initialPackageType = packageTypeFromURL ? packageTypeFromURL.toUpperCase() : 'SOLO';

fetch('https://vebdizajn-4.onrender.com/api/vebdizajn/internet-usluge')
  .then(response => response.json())
  .then(packageData => {
    loadPackages(initialPackageType, packageData);
    loadPackagesMini(initialPackageType, packageData);

    buttons.forEach(button => {
      button.classList.remove('active');
      if (button.textContent.toUpperCase() === initialPackageType) {
        button.classList.add('active');
      }

      button.addEventListener('click', () => {
        if(counter!=0){
          const oldState = getState(counter);
          const oldElements = document.getElementsByClassName(oldState);
          Array.from(oldElements).forEach(element => {
            element.style.display = 'none';
          });
        
          counter = 0;
        
          const newState = getState(counter);
          const newElements = document.getElementsByClassName(newState);
          Array.from(newElements).forEach(element => {
            element.style.display = 'block';
          });
        }
        counter = 0;
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const packageType = button.textContent.toUpperCase();
        loadPackages(packageType, packageData);
        loadPackagesMini(packageType, packageData);
      });
    });
  })
  .catch(error => {
    console.error('Error fetching the JSON data:', error);
  });

function createCard(packageType, pkg) {
  const card = document.createElement('div');
  card.classList.add('card');

  const header = document.createElement('div');
  header.classList.add('zaglavlje');
  header.innerHTML = `<p class="naslov">${packageType}</p><p class="naslov">${pkg.name}</p>`;
  card.appendChild(header);

  const info = document.createElement('div');
  info.classList.add('info');

  const services = document.createElement('div');
  services.classList.add('usluge');

  const speed = document.createElement('p');
  speed.classList.add('usluga');
  speed.textContent = `Brzina: ${pkg.speed}`;
  services.appendChild(speed);

  if (pkg.tv_channels) {
    const channels = document.createElement('p');
    channels.classList.add('usluga');
    channels.textContent = `TV Kanali: ${pkg.tv_channels}`;
    services.appendChild(channels);
  }

  if (pkg.minutes) {
    const minutes = document.createElement('p');
    minutes.classList.add('usluga');
    minutes.textContent = `Minuti: ${pkg.minutes}`;
    services.appendChild(minutes);
  }

  info.appendChild(services);

  const price = document.createElement('div');
  price.innerHTML = `<p class="cena">Cena: </p><p>${pkg.price}</p>`;
  info.appendChild(price);

  card.appendChild(info);

  const orderButton = document.createElement('a');
  orderButton.href = "kontakt.html";
  orderButton.innerHTML = `<button class="poruci">Poruči</button>`;
  card.appendChild(orderButton);

  return card;
}

function loadPackages(packageType, packageData) {
  cardsContainer.innerHTML = '';
  const packages = packageData[packageType];

  if (!packages) {
    console.error("Paket nije pronađen!");
    return;
  }

  packages.forEach(pkg => {
    const card = createCard(packageType, pkg);
    cardsContainer.appendChild(card);
  });

  if (packageTypeFromURL) {
    section2.scrollIntoView({ behavior: "smooth" });
  }
}

function loadPackagesMini(packageType, packageData) {
  cardsContainerMini.innerHTML = '';
  const packages = packageData[packageType];

  if (!packages) {
    console.error("Paket nije pronađen!");
    return;
  }

  let counter = 0;
  packages.forEach(pkg => {
    const card = createCard(packageType, pkg);
    const state = getState(counter);
    counter = (counter + 1) % 3;
    card.classList.add(state);
    cardsContainerMini.appendChild(card);
  });

  if (packageTypeFromURL) {
    section2.scrollIntoView({ behavior: "smooth" });
  }
}

function getState(state) {
  switch (state) {
    case 0:
      return "one";
    case 1:
      return "two";
    case 2:
      return "three";
    default:
      return "";
  }
}

const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
var counter = 0;

rightBtn.addEventListener('click', () => {
  updateCarousel(1);
});

leftBtn.addEventListener('click', () => {
  updateCarousel(-1);
});

function updateCarousel(direction) {
  const oldState = getState(counter);
  const oldElements = document.getElementsByClassName(oldState);
  Array.from(oldElements).forEach(element => {
    element.style.display = 'none';
  });

  counter = (counter + direction + 3) % 3;

  const newState = getState(counter);
  const newElements = document.getElementsByClassName(newState);
  Array.from(newElements).forEach(element => {
    element.style.display = 'block';
  });
}
