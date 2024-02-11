document.addEventListener('DOMContentLoaded', function() {
    const noButton = document.querySelector('.bg-red-500');
    const yesButton = document.querySelector('.bg-green-500');
    const funnyTexts = [
        "Please don't press me again",
        "Seriously?",
        "Okay, you got me!",
        "Why do you keep pressing?",
        "Haha, nice try!",
        "Enough already!",
        "I'm running out of text..."
    ];
    let funnyTextIndex = 0;

    noButton.addEventListener('mouseover', function() {
        let width = yesButton.offsetWidth;
        let height = yesButton.offsetHeight;
        if (width < 500 && height < 500) { // Check to prevent exceeding 500x500px
            yesButton.style.width = `${width + 10}px`; // Increment width
            yesButton.style.height = `${height + 10}px`; // Increment height
            yesButton.style.fontSize = 'larger'; // Optionally increase font size
        }
    });

    noButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevents the default action
        noButton.textContent = funnyTexts[funnyTextIndex]; // Update the button text
        funnyTextIndex = (funnyTextIndex + 1) % funnyTexts.length; // Move to the next text, loop back to start if at the end
    });

    yesButton.addEventListener('click', function() {
        document.getElementById('firstPage').style.display = 'none';
        document.getElementById('mainContent').style.display = 'flex';

         setTimeout(function() {
        map.invalidateSize(); // This should fix the grey map issue
    }, 100); // A short delay to ensure the layout has updated
    });
});


var map = L.map('map').setView([51.505, -0.09], 2); // Adjust the initial map view as necessary

var memories = [
    {lat: 43.25435649823367, lng: -79.86604170404077, title: 'Hamilton, Ontario', story: 'Our amazing adventure started here. Cocos... the balls that brought us together.', photoUrl: 'us/tinderlol.png'},
    {lat: 43.32280923046128, lng: -79.79366108118383, title: 'Burlington Lakeshore', story: 'Our first kiss on the Burlington lakeshore, marking the beginning of something beautiful.', photoUrl: 'us/burlington.jpg'},
    {lat: 43.64406587327902, lng: -79.40152480275711, title: 'Toronto Dates', story: 'Our unforgettable dates in Toronto, exploring the city together.', photoUrl: 'us/lavel.JPG'},
    {lat: 51.17815006702565, lng: -115.57089667760336, title: 'Banff', story: 'Our first vacation in Banff, surrounded by breathtaking mountains and serene lakes.', photoUrl: 'us/banff2.JPG'},
    {lat: 43.197853109345225, lng: -79.790235359994, title: 'Brenda and Ryan’s Place', story: 'Celebrating birthdays and where we lived, our home filled with love and laughter.', photoUrl: 'us/birthday.jpg'},
    {lat: 45.49315998451741, lng: -73.60682719682612, title: 'Montreal', story: 'Our second vacation and your birthday in Montreal, a city of romance and history.', photoUrl: 'us/quebec.jpg'},
    {lat: 22.66548069600829, lng: -79.03876249735814, title: 'Cuba', story: 'Our third vacation in Cuba, where the sun, sea, and sand rejuvenated our spirits.', photoUrl: 'us/cuba.JPG'},
    {lat: 51.809239760464116, lng: 5.438725118657505, title: 'The Netherlands', story: 'Where we got engaged, amidst the beauty and tranquility of the Netherlands.', photoUrl: 'us/ossnetherlands.jpg'},
    {lat: 43.77789695721526, lng: -79.23182744830216, title: 'Puppy Birthplace', story: "Where we gave birth to our puppy, a new addition to our love story.", photoUrl: 'us/son.jpg'}
];


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

memories.forEach(function(memory) {
    var popupOptions = {
        maxWidth: 400, 
        maxHeight: 300, // Adjust the maximum height as needed
        autoPan: true, // Automatically pan the map to fit the popup
        closeButton: true, // Show the close button on the popup
        autoPanPaddingTopLeft: L.point(10, 50), // Adjust padding to ensure the popup fits within the view
        autoPanPaddingBottomRight: L.point(10, 50)
    };
    var marker = L.marker([memory.lat, memory.lng]).addTo(map);
    marker.bindPopup('<b>'+memory.title+'</b><br>'+memory.story+'<br><img src="'+memory.photoUrl+'" style="width:100%; max-height: 200px; object-fit: contain;">', popupOptions);
});

// Select the timeline container
const timeline = document.querySelector('.timeline');

// Add a button to the timeline for each memory
memories.forEach((memory, index) => {
    const position = (index / (memories.length - 1)) * 100; // Calculate the button's position as a percentage
    const button = document.createElement('button');
    button.textContent = memory.title;


    button.addEventListener('click', () => {
        map.flyTo([memory.lat, memory.lng], 13); // Adjust the zoom level as needed
    });

    timeline.appendChild(button); // Add the button to the timeline
});

function initGuessTheWordGame() {
    const wordToGuess = "INSTANT NOODLES".toUpperCase();
    // Initialize displayedWord with spaces accounted for
    let displayedWord = wordToGuess.split('').map(letter => letter === ' ' ? ' ' : '_');
    let attemptsLeft = 10;
    document.getElementById("wordToGuess").innerText = displayedWord.join(' ');
    document.getElementById("attempts").innerText = attemptsLeft;

    document.getElementById("guessBtn").addEventListener("click", function() {
        const guessedLetter = document.getElementById("letterInput").value.toUpperCase();
        document.getElementById("letterInput").value = ''; // Clear input field

        if (guessedLetter && wordToGuess.includes(guessedLetter)) {
            // Update displayed word for correct guesses
            wordToGuess.split('').forEach((letter, index) => {
                if (letter === guessedLetter) {
                    displayedWord[index] = guessedLetter;
                }
            });
        } else {
            // Decrement attempts left for incorrect guesses
            attemptsLeft--;
        }

        // Update the UI
        document.getElementById("wordToGuess").innerText = displayedWord.join(' ');
        document.getElementById("attempts").innerText = attemptsLeft;

        // Check for win or loss
        if (displayedWord.join('') === wordToGuess) {
            document.getElementById("status").innerText = "Congratulations! You've guessed the word!";
            setTimeout(() => {
                document.getElementById('guessTheWordGame').style.display = 'none';
                document.getElementById('mealPlanner').style.display = 'flex';
            }, 2000); // Transition after 2 seconds
        } else if (attemptsLeft <= 0) {
            document.getElementById("status").innerText = "Game Over! The word was " + wordToGuess + ".";
            setTimeout(() => {
                document.getElementById('guessTheWordGame').style.display = 'none';
                // Optionally, redirect them back to the main content or show an option to try again
            }, 2000); // Show message for 2 seconds before taking action
        }
    });
}

document.getElementById('continue').addEventListener('click', function() {
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('guessTheWordGame').style.display = 'block';
    initGuessTheWordGame();
});

document.querySelectorAll('.meal-card').forEach(item => {
    item.addEventListener('click', function() {
        const mealType = this.closest('section').id; // Finds the closest section id ('lunch', 'dinner', 'dessert')
        const mealChoice = this.getAttribute('data-meal');

        // Highlight this card
        this.style.borderColor = '#E63946';
        this.querySelector('p').style.backgroundColor = '#ffe0f8';

        // Logic to display next meal options
        if (mealType === 'lunch') {
            document.getElementById('dinner').style.display = 'block';
        } else if (mealType === 'dinner') {
            document.getElementById('dessert').style.display = 'block';
        } else if (mealType === 'dessert') {
            document.getElementById('submitMenu').style.display = 'flex';
            
        }

        this.setAttribute('data-selected', 'true');
    });
});


document.getElementById('submitMenu').addEventListener('click', function() {
    displayMenuPage()
});

function displayMenuPage() {
    // Hide the meal planner
    document.getElementById('mealPlanner').style.display = 'none';

    // Find the container where selected meals will be displayed
    const menuOptions = document.getElementById('menuOptions');
    // Clear previous selections
    menuOptions.innerHTML = '';

    // Loop through each meal section
    const mealSections = ['lunch', 'dinner', 'dessert'];
    mealSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const selectedMeals = section.querySelectorAll('.meal-card[data-selected="true"]'); // Assuming you add `data-selected="true"` to the meal-card div when a meal is selected
        
        selectedMeals.forEach(meal => {
            const mealName = meal.getAttribute('data-meal');
            const imgSrc = meal.querySelector('img').src;
            const description = meal.querySelector('p').textContent;

            // Create new elements for the selected meal
            const mealDiv = document.createElement('div');
            mealDiv.classList.add('selected-meal');

            const img = document.createElement('img');
            img.src = imgSrc;
            img.style.width = '100px'; // Set your desired image size
            img.style.height = '100px'; // Set your desired image size
            img.style.objectFit = 'cover';

            const nameP = document.createElement('p');
            nameP.textContent = mealName;
            nameP.style.fontWeight = 'bold';

            const descP = document.createElement('p');
            descP.textContent = description;

            // Append elements to the mealDiv
            mealDiv.appendChild(img);
            mealDiv.appendChild(nameP);
            mealDiv.appendChild(descP);

            // Append the mealDiv to the menuOptions container
            menuOptions.appendChild(mealDiv);
        });
    });

    // Show the menu page
    document.getElementById('menuPage').style.display = 'flex';
}









// Object to namespace the cryptograph game functions
const cryptographGame = {
    originalMessage: "Valentine's Day",
    key: 14, // Number of positions to shift in the cipher
    encryptedMessage: "",

    // Encrypt or decrypt the message
    transformMessage: function(message, transformKey) {
        return message.toUpperCase().split('').map(char => {
            if (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90) {
                return String.fromCharCode((char.charCodeAt(0) - 65 + transformKey) % 26 + 65);
            }
            return char;
        }).join('');
    },

    // Decrypt the message based on user input
    decryptMessage: function() {
        const userKey = parseInt(document.getElementById("keyInput").value);
    if (isNaN(userKey)) {
        document.getElementById("result").innerText = "Please enter a valid number.";
        return;
    }
    const decryptedMessage = this.transformMessage(this.encryptedMessage, 26 - userKey);
    document.getElementById("result").innerText = decryptedMessage;

    // Corrected comparison
    if (decryptedMessage.toLowerCase() === this.originalMessage.toLowerCase()) {
        // Progress to the next step
        alert("You did it! It was Valentine's Day !!")
        setTimeout(() => {
            document.querySelector(".game-containerOne").style.display = 'none';
            document.getElementById("firstPage").style.display = 'flex';
        }, 2000); // Transition after 2 seconds
        
    } else {
        // Optionally handle incorrect decryption
        alert("Incorrect key. Please try again.");
    }

       
    },

    // Initialize the cryptograph game
    initCryptographGame: function() {
        this.encryptedMessage = this.transformMessage(this.originalMessage, this.key);
        document.getElementById("encryptedMessage").innerText = `Encrypted Message: ${this.encryptedMessage}`;
    }
};


// General initialization function for all games
function initGames() {
    cryptographGame.initCryptographGame();
    // Initialize other games here...
}

window.onload = initGames;


document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#cryptoBtn').addEventListener('click', function() {
        cryptographGame.decryptMessage();
    });
});


document.getElementById('connect').addEventListener('click', function() {
    document.getElementById('menuPage').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';

    const puzzle = document.getElementById('puzzle');
    puzzle.innerHTML = ''; // Clear previous puzzle pieces if any
    const sequence = ['7', '2', '0', '1', '2', '1', '4', '0']; // Target sequence

    // Create and append puzzle pieces
    sequence.forEach(function(num, index) {
        const piece = document.createElement('div');
        piece.innerText = num;
        piece.className = 'puzzle-piece';
        piece.draggable = true;
        piece.id = `piece-${index}`;
        puzzle.appendChild(piece);
    });

    addDragAndDropHandlers();
});

function addDragAndDropHandlers() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    let draggedItem = null;

    pieces.forEach(piece => {
        piece.addEventListener('dragstart', function() {
            draggedItem = piece;
            setTimeout(function() {
                piece.style.display = 'none';
            }, 0);
        });

        piece.addEventListener('dragend', function() {
            setTimeout(function() {
                draggedItem.style.display = 'block';
                draggedItem = null;
            }, 0);
        });

        piece.addEventListener('dragover', function(e) {
            e.preventDefault();
        });

        piece.addEventListener('drop', function(e) {
            e.preventDefault();
            if (this !== draggedItem) {
                let draggedIndex = Array.from(puzzle.children).indexOf(draggedItem);
                let droppedIndex = Array.from(puzzle.children).indexOf(this);

                if (draggedIndex < droppedIndex) {
                    this.parentNode.insertBefore(draggedItem, this.nextSibling);
                } else {
                    this.parentNode.insertBefore(draggedItem, this);
                }
            }
        });
    });
}

document.getElementById('checkSolution').addEventListener('click', function() {
    const currentOrder = Array.from(document.querySelectorAll('.puzzle-piece'))
                              .map(piece => piece.innerText)
                              .join('');
    if (currentOrder === '14072021') {
        alert('Puzzle Solved!');
        document.getElementById('gameCanvas').style.display = 'none';
        document.getElementById('dayPlan').style.display = 'flex';
    } else {
        alert('Try again!');
    }
});
