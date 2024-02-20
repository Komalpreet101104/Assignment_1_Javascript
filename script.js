// Arrays nested within an array and each of them representing word choices for different categories
const choices = [
  ['the turkey', 'my teacher', 'the dog'], 
  ['sat on', 'ate', 'saw'],  
  ['a funny', 'a scary', 'a fat'], 
  ['goat', 'monkey', 'fish'], 
  ['on the moon', 'in my soup', 'on the grass'] 
];

// An array holding audio file URLs
const audioURLs = [
  'audio/the_turkey.mp3',
  'audio/my_teacher.mp3',
  'audio/a_funny.mp3',
  'audio/goat.mp3',
  'audio/on_the_moon.mp3'
];

// Array to hold the chosen words
let selectedWords = ['', '', '', '', ''];

// Function for cycling through word options for a specified category
function cycleWords(index) {
  const choiceOptions = choices[index];
  const optionsDiv = document.getElementById(`options${index + 1}`);
  optionsDiv.innerHTML = ''; // To Clear the previous options

  // This will Create buttons for each word choice
  choiceOptions.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;

    // Set a onclick event to update the selected word and play the appropriate audio.
    button.onclick = () => {
      selectedWords[index] = option;
      updateButtonLabel(index);
      playAudio(index);
    };
    optionsDiv.appendChild(button);
  });
}

// This function updates the label of a button with the specified word
function updateButtonLabel(index) {
  const currentChoice = selectedWords[index];
  document.getElementsByClassName('choice')[index].innerText = currentChoice;
}

// This Function will display the generated story
function viewStory() {
  const story = selectedWords.join(' '); // Concatenate selected words to form the story
  document.getElementById('storyOutput').innerText = story; // Display the story
  generateAudio(story); // Generate and play audio for the story
}

// This Function will generate the audio for the created story
function generateAudio(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}

// Function for playing audio related to a given word category
function playAudio(index) {
  const audio = document.getElementById('storyAudio');
  audio.src = audioURLs[index]; // Set audio source to corresponding URL
  audio.play(); // Play audio
}

// This function generates a random tale by picking random words from each category
function generateRandomStory() {
  selectedWords = choices.map(options => options[Math.floor(Math.random() * options.length)]);
  updateAllButtonLabels(); // Update button labels with selected words
  viewStory();}

// This Function is for updating all button labels with selected wording.
function updateAllButtonLabels() {
  selectedWords.forEach((word, index) => {
    document.getElementsByClassName('choice')[index].innerText = word;
  });
}

// Function that resets the tale by clearing chosen words and output
function resetStory() {
  selectedWords = ['', '', '', '', '']; // To Reset selected words
  updateAllButtonLabels();
  document.getElementById('storyOutput').innerText = ''; // To Clear story output
}
