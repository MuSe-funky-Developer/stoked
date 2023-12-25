const svgNS = 'http://www.w3.org/2000/svg';
const $ = document.querySelector.bind(document);
const svg = $('svg');
const rand = (min, max) => (min + Math.floor(Math.random() * (max - min + 1)));
const palette = [
  '#f07', '#0cf', '#0f7', '#fff'
];

function setSize() {
  svg.setAttributeNS(svgNS, 'viewBox', [0, 0, innerWidth, innerHeight].join(' ')); 
};

function create(tag, attrs) {
  const el = document.createElementNS(svgNS, tag);
  if (attrs) {
    Object.entries(attrs).map(([key, value]) => {
      el.setAttribute(key, value);
    });
  }
  svg.appendChild(el);
  return el;
}

class GenerativePattern {
  constructor(color = '#fff') {
    this.pathStyle = {fill: 'none', 'stroke': color};
    this.pathDef = '';
    this.setRandomPosition();
    this.setRandomDirection();
  }
  
  setRandomPosition() {
    this.x = rand(0, innerWidth);
    this.y = rand(0, innerHeight);
  }
  
  setRandomDirection() {
    this.xDir = Math.random() < .5 ? -5 : 5;
    this.yDir = Math.random() < .5 ? -5 : 5;    
  }
  
  step() {
    const { x, y, xDir, yDir } = this;
    if (Math.random() < .8) {
      this.pathDef += `M${x} ${y} l${-xDir*50} ${yDir * 50}`
      this.x += xDir;
      this.y += yDir;
    }
    if (! this.path) {
      this.path = create('path', this.pathStyle);
    }
    if (Math.random() < .05) {
      this.setRandomDirection();
    }
    if (Math.random() < .1) {
      this.setRandomPosition();
    }
    if (this.pathDef.length > 800 && Math.random() < .8) {
      this.pathDef = this.pathDef.slice(this.pathDef.indexOf('M', 1))
    }
    this.path.setAttribute('d', this.pathDef);
  }
}

const patterns = Array(4).fill(0).map((_, i) => new GenerativePattern(palette[i]));

function loop() {
  patterns.map(p => p.step());
  window.setTimeout(() => requestAnimationFrame(loop), 100);
}

setSize();
window.addEventListener('resize', setSize);
loop();

//////////////////////////////
// function([string1, string2],target id,[color1,color2])    
consoleText(['Stoked Studios.', 'Artificial Intelligence.', 'Machine Learning.', 'Deep Learning.', 'Neural Networks.', 'Algorithm.', 'Data Analysis.', 'Natural Language Processing.', 'Predictive Modeling.', 'Automation.', 'Chatbot.', 'Voice Recognition.', 'Image Processing.', 'Robotics.', 'Analytics.', 'User Interface.', 'Cloud Computing.', 'Big Data.', 'Ethics in AI.', 'AI Research.', 'Tech Innovation.'], 'text',['tomato', "#ff6ec7", "#39ff14", "#ccff00", "white"]);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}

///Popup
// Get the popup element
var popup = document.getElementById('popup');

// Function to show the popup
//function showPopup() 

// Listen for click events


// Listen for scroll events
//window.addEventListener('scroll', showPopup);
//window.addEventListener('touchmove', showPopup);
//window.addEventListener('wheel', showPopup);

var body = document.getElementsByName('body');
document.addEventListener('click', function(e) {
    if (e.target.id == 'popup' && popup.style.display == 'flex') {
        popup.style.display = 'none';
        console.log('Popup is hidden.');
    }else{
      popup.style.display = 'flex';
      console.log('Popup is visible.');
  }
});

// Variables for the audio elements
var introAudio = document.getElementById('intro-noise');
var bgAudio = document.getElementById('bg-noise');

// Variables for the audio volumes
var introVolume = 0.5; // Adjust as needed
var bgVolume = 0.1; // Adjust as needed

// Set the initial volumes
introAudio.volume = introVolume;
bgAudio.volume = bgVolume;

// Generate a random number between 1 and 6
var randomNumber = Math.floor(Math.random() * 6) + 1;

// Create a new audio element for the intro
var introAudio = new Audio('Sounds/Stoked_intro' + randomNumber + '.mp3');
introAudio.volume = introVolume;

// Play the intro and background audio files when the user interacts with the site
window.addEventListener('click', function () {
  introAudio.volume = introVolume;
bgAudio.volume = bgVolume; 
  introAudio.play();
    bgAudio.play();
}, { once: true });

// Mute button event listener
document.getElementById('mute-button').addEventListener('click', function () {
    // Toggle the muted property of both audio elements
    introAudio.muted = !introAudio.muted;
    bgAudio.muted = !bgAudio.muted;

    // Update the button icon
    var icon = this.querySelector('i');
    icon.className = introAudio.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
});


//impressum
document.getElementById('impressum-button').addEventListener('click', function () {
  var impressumPopup = document.getElementById('impressum-popup');
  if (impressumPopup.classList.contains('show')) {
      impressumPopup.classList.remove('show');
  } else {
      impressumPopup.classList.add('show');
  }
});