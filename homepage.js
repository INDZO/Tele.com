const scrollButton = document.getElementById('skroluj');

const getTargetSection = () => {
  if (window.innerWidth <= 1050) { 
    return document.getElementById('section3Mini'); 
  } else {
    return document.getElementById('section3'); 
  }
};

scrollButton.addEventListener('click', () => {
  const target = getTargetSection();  
  target.scrollIntoView({
    behavior: 'smooth'
  });
  console.log('radi');
});


const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
var counter = 0;

function getState(state) {
  switch (state) {
    case 0:
      return "jedan";
    case 1:
      return "dva";
    case 2: 
      return "tri";
  }
}

rightBtn.addEventListener('click', function() {
  let oldState = getState(counter);
  let oldElements = document.getElementsByClassName(oldState); 
  Array.from(oldElements).forEach(element => {
    element.style.display = 'none'; 
  });

  counter = (counter + 1) % 3;

  let state = getState(counter); 
  let newElements = document.getElementsByClassName(state); 
  Array.from(newElements).forEach(element => {
    element.style.display = 'flex'; 
  });
});

leftBtn.addEventListener('click', function() {
  let oldState = getState(counter); 
  let oldElements = document.getElementsByClassName(oldState); 
  Array.from(oldElements).forEach(element => {
    element.style.display = 'none';
  });

  counter = (counter - 1 + 3) % 3; 

  let state = getState(counter); 
  let newElements = document.getElementsByClassName(state); 
  Array.from(newElements).forEach(element => {
    element.style.display = 'flex'; 
  });
});
