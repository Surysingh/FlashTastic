        // Global settings object – updated via settings page
        let settings = {
            confettiType: 'default',
            fontSize: 24,
            buttonSize: 18,
            animationSpeed: 1,
            showScores: true,
            showMistakes: true,
			showOptionsImmediately: true,
			voice: false,
            grade: 0
        };
		

        // Current game state variables
        let currentCategory = null;
		
		let currenttopLevelCategoryName = null;
		let	currentsubCategoryName = null;
				
        let currentFlashcards = null;
        let currentIndex = 0;
        let score = 0;
        let highScore = localStorage.getItem('highScore') || 0;
        let mistakes = [];
		let currentCard = null; // Store the current flashcard

        let categoryProgress = {};
        let categories = null;
		const chime = new Audio('resources/chime.mp3');
		const mistakeSound = new Audio('resources/mistake.mp3');
		let table_init = 0;
		let totalSum = 0;
		let Quot = 0;
		let extra_shift = '';
		let OngoingOp = 0; // 0 mult, 1 div
		
   const bgColorRadio = document.getElementById("bg-color-radio");
   const bgGradientRadio = document.getElementById("bg-gradient-radio");
   const bgColorPicker = document.getElementById("background-color-picker");
   const bgGradientStart = document.getElementById("background-gradient-start");
   const bgGradientEnd = document.getElementById("background-gradient-end");
   const bgGradientDirection = document.getElementById("background-gradient-direction");
		
        const appUrl =  "https://surysingh.github.io/FlashTastic/" ; //window.location.href; // Gets the current URL


	
function makeTable(num1, num2) {

console.log(num1);
  // Ensure inputs are strings
  console.log(num1);
  num1 = String(num1).padStart(6, ' ');
  console.log(num1);
  
  console.log(num2);
  num2 = String(num2).padStart(6, ' ');
  console.log(num2);

  let tableHTML = `
    <table>
      <tr>
        <td colspan="1" class="table_head"></td>
		<td colspan="1" class="table_head">L</td>
		<td colspan="1" class="table_head">T Th</td>
        <td colspan="1" class="table_head">Th</td>
        <td colspan="1" class="table_head">H</td>
        <td colspan="1" class="table_head">T</td>
        <td colspan="1" class="table_head">O</td>
        <td colspan="1" class="table_head"></td>
        <td colspan="1" class="table_head">Name</td>
        <td colspan="1" class="table_head"></td>
        <td colspan="1" class="table_head"></td>	
        <td colspan="1" class="table_head"></td>		
        
      </tr>	
      <tr>
        <td></td>
        <td>${num2[0]}</td>
        <td>${num2[1]}</td>
        <td>${num2[2]}</td>
        <td>${num2[3]}</td>
		<td>${num2[4]}</td>
		<td>${num2[5]}</td>
        <td></td>
        <td>Multiplicand</td>
        <td></td>
        <td></td>	
        <td></td>		
        
      </tr>
      <tr>
        <td>x</td>		
        <td>${num1[0]}</td>
        <td>${num1[1]}</td>
        <td>${num1[2]}</td>
        <td>${num1[3]}</td>	
		<td>${num1[4]}</td>
		<td>${num1[5]}</td>
        <td></td>
        <td>Multiplier</td>
        <td></td>
        <td></td>	
		<td></td>
        
      </tr>
      <tr>
        <td colspan="12 " style="border-top: 3px solid black;"></td>
      </tr>
	<tbody id="steps"></tbody>
      <tr>
        <td colspan="12 " style="border-top: 3px solid black;"></td>
      </tr>
      <tr id="totalRow"></tr>
    </table>
  `;

  return tableHTML;
}


function makeTable_div(num1, num2) {

console.log(num1);
  // Ensure inputs are strings
  console.log(num1);
  num1 = String(num1).padStart(3, ' ');
  console.log(num1);
  
  console.log(num2);
  num2 = String(num2).padStart(2, ' ');
  console.log(num2);

  let tableHTML = `
    <table>
      <tr>
        <td colspan="12 " style="border-top: 3px solid black;"></td>
      </tr>
	<tr id="steps"></tr>
      <tr>
        <td colspan="12 " style="border-top: 3px solid black;"></td>
		
 <tr>
        <td colspan="3" class="wrong">Divisor</td>
		
        <td colspan="1" "></td>
        <td colspan="8" class="table_head">Dividend</td>
 		
        
      </tr>	
      <tr>
        <td></td>
       <td>${num2[0]}</td>
       <td>${num2[1]}</td>		
	   <td>)</td>	
	       
      
        <td>${num1[0]}</td>
        <td>${num1[1]}</td>
        <td>${num1[2]}</td>
        <td></td>
		<td></td>
		<td></td>
        <td></td>
        <td></td>
        
        
      </tr>
	  </tr>
      <tbody id="Remainder"></tbody>	
      <tr>

    </table>
  `;

  return tableHTML;
}


        function highlightCells(coords) {
			return;
			/*
            coords.forEach(coord => {
                let row = coord[0];
                let col = coord[1];
                let table = document.querySelector("table");
                let cell = table.rows[row].cells[col];
				
				if (cell){
                cell.classList.add("highlight");
				}
            }); */
			
        }

        function clearHighlight() {
		return;
			/*
            let highlighted = document.querySelectorAll(".highlight");
            highlighted.forEach(cell => {
                cell.classList.remove("highlight");
            }); */
        }

        //showStep();


        function share(platform) {
			
			let extraText =null;
			
			if(currentCategory){
			if (currentCard.question) {
				extraText = `\n\nQuestion: ${currentCard.question}\n` +                  
                      `Options: ${currentCard.options}\n` ;
			}
			else
			{
				extraText = " "; //prevent null print
			}
			}
			
            const shareData = {
                title: "FlashTastic",
                text: "Check out this awesome FlashTastic Educational Game!" + `${extraText}`
                      ,
                url: appUrl
            };

            if (navigator.share) {
                navigator.share(shareData)
                    .then(() => console.log('Shared successfully'))
                    .catch((error) => {
                        console.error('Error sharing:', error);
                        // Fallback to URL-based sharing if Web Share API fails
                        fallbackShare(platform);
                    });
            } else {
                // If Web Share API is not supported, use fallback
                fallbackShare(platform);
            }
        }

        function fallbackShare(platform) {
            let shareUrl = "";
            let text = encodeURIComponent("Check out this awesome FlashTastic Educational Game!" + `${extraText}`);
            let title = encodeURIComponent("FlashTastic");
            let url = encodeURIComponent(appUrl);

            switch (platform) {
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + appUrl)}`;
                    break;
                case 'x':
                    shareUrl = `https://x.com/intent/tweet?text=${text}&url=${url}`;
                    break;
                case 'reddit':
                    shareUrl = `https://www.reddit.com/submit?title=${title}&url=${url}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'instagram':
                     shareUrl = `https://www.instagram.com/?url=${url}`;
                    break;
            }
            if (shareUrl) {
                window.open(shareUrl, '_blank');
            }
        }		

function createCategoryButtons() {
    const menuDiv = document.getElementById("menu");
    settings.grade = Number(document.getElementById("grade-select").value);
    console.log(settings.grade);

    // remove old menu if it exists
    let existingCategoryName = menuDiv.querySelectorAll("button");

    if (existingCategoryName) {
        existingCategoryName.forEach(child => {
            menuDiv.removeChild(child); // Remove old container
        });
    }

    if (categories) {
        // Get the top-level category names
        const topLevelCategoryNames = Object.keys(categories);

        topLevelCategoryNames.forEach((topLevelCategoryName, index) => {
            // Create a button for the top-level category
            const topLevelButton = document.createElement("button");
            topLevelButton.className = "menu-button";
            topLevelButton.textContent = `${index + 1}. ${topLevelCategoryName}`;

            // Create a container for subcategory buttons (initially hidden)
            const subCategoryContainer = document.createElement("div");
            subCategoryContainer.className = "sub-category-container";
            subCategoryContainer.style.display = "none"; // Hide initially

            // Handle the click event for the top-level category button
            topLevelButton.onclick = function() {
                // Toggle the display of subcategory buttons
                subCategoryContainer.style.display = subCategoryContainer.style.display === "none" ? "block" : "none";
            };

            menuDiv.appendChild(topLevelButton);
            menuDiv.appendChild(subCategoryContainer); // Append the subcategory container

            // Get the sub-categories or questions within the top-level category
            const subCategories = categories[topLevelCategoryName];

            // Iterate through sub-categories/questions and create buttons
            Object.keys(subCategories).forEach(subCategoryName => {
				
				   //current
					//console.log(categories[topLevelCategoryName][subCategoryName]);
					const filteredQuestions = categories[topLevelCategoryName][subCategoryName].filter(question => !question.grade ||	settings.grade == 0 ||	Number(question.grade) == settings.grade ||	(Number(question.grade) + 1)  == settings.grade || (Number(question.grade) - 1)  == settings.grade ); // || Number(question.grade) + 2  == settings.grade || Number(question.grade) - 2  == settings.grade);

					if (filteredQuestions.length > 0) {
						
                const subCategoryButton = document.createElement("button");
                subCategoryButton.className = "menu-button sub-category-button"; // Add a class for styling
                subCategoryButton.textContent = subCategoryName;
                subCategoryButton.onclick = function() {
                    selectCategory(topLevelCategoryName, subCategoryName); // Pass both levels
                };
                subCategoryContainer.appendChild(subCategoryButton);
					}
            });
        });

    } else {
        console.error("Categories data is not available.");
    }
}
		
// Function to dynamically create category buttons		
 function createCategoryButtons_() {
       const menuDiv = document.getElementById("menu");
	    settings.grade = Number(document.getElementById("grade-select").value);
		console.log(settings.grade);
		   // remove old menu if it exists
			let existingcategoryName = menuDiv.querySelectorAll("button");
			
			if (existingcategoryName) {
			existingcategoryName.forEach(child => {
				
				menuDiv.removeChild(child); // Remove old container

				});
			}
			
			
			
       if (categories) {
           // Get the category names directly from the 'categories' object's keys
           const categoryNames = Object.keys(categories);
		   

           categoryNames.forEach((categoryName, index) => {
			   
			   //console.log(categoryName);
			   //console.log(categories[categoryName]);
			   //console.log(categories[categoryName].filter(question => !question.grade ||	settings.grade == 0 ||	Number(question.grade) == settings.grade ||	(Number(question.grade) - 2)  == settings.grade || (Number(question.grade) - 1)  == settings.grade ));
			   
			
   //current
            const filteredQuestions = categories[categoryName].filter(question => !question.grade ||	settings.grade == 0 ||	Number(question.grade) == settings.grade ||	(Number(question.grade) + 1)  == settings.grade || (Number(question.grade) - 1)  == settings.grade ); // || Number(question.grade) + 2  == settings.grade || Number(question.grade) - 2  == settings.grade);
	
            if (filteredQuestions.length > 0) {
               const button = document.createElement("button");
               button.className = "menu-button";
               button.textContent = `${index + 1}. ${categoryName}`;
               button.onclick = function() {
                   selectCategory(categoryName);
               };
               menuDiv.appendChild(button);
            }
        })          

           /*  Corrected settings button creation
           const settingsButton = document.createElement("button");
           settingsButton.className = "menu-button";
           settingsButton.textContent = "Settings";
           settingsButton.onclick = openSettings;  
           menuDiv.appendChild(settingsButton); */ 
       } else {
           console.error("Categories data is not available.");
       }
   }	

        // Initialize game after data is loaded
        function initGame() {
            if (typeof window.categories === 'undefined') {
                console.error('Categories data not loaded');
                return;
            }
            categories = window.categories;
            console.log(categories);
			currentCategory = null;
            console.log('Categories loaded successfully');
            createCategoryButtons();
			
			speakText(" "); //init voice, atleast once
        }

        // Load game when document is ready
        document.addEventListener('DOMContentLoaded', initGame);

 

        function selectCategory(topLevelCategoryName, subCategoryName) {
		
				//new
            document.getElementById("message").innerText = "";
            document.getElementById("next-btn").classList.add("hidden");
			document.getElementById("show-btn").classList.add("hidden");
            document.getElementById("continueGame-btn").classList.add("hidden");
            document.getElementById("summary-btn").classList.remove("hidden");
            document.getElementById("flashcard").classList.remove("hidden");
            document.getElementById("options").classList.remove("hidden");
			
           // if (currentsubCategoryName != subCategoryName) {
                if (!subCategoryName) {
                    alert("Game data is not loaded yet. Please try again.");
                    return;
                }

                let flashcards = categories[topLevelCategoryName][subCategoryName];
                if (!flashcards || flashcards.length === 0) {
                    alert("No flashcards available for this category.");
                    return;
                }

                //currentCategory = categoryName;
				
				currenttopLevelCategoryName = topLevelCategoryName;
				currentsubCategoryName = subCategoryName;
				
                currentFlashcards = flashcards ; //shuffle(  flashcards.filter(question => !question.grade ||	settings.grade == 0 ||	Number(question.grade) == settings.grade  ||	(Number(question.grade) + 1)  == settings.grade || (Number(question.grade) - 1)  == settings.grade )); 
				
                currentIndex = 0;

                document.getElementById("menu").classList.add("hidden");
                document.getElementById("game-container").classList.remove("hidden");
                document.getElementById("summary").classList.add("hidden");
                document.getElementById("exitGame-btn").classList.add("hidden");
				


                showFlashcard();
            }
/*
			else {
                document.getElementById("menu").classList.add("hidden");
                document.getElementById("game-container").classList.remove("hidden");
                document.getElementById("summary").classList.add("hidden");
                document.getElementById("exitGame-btn").classList.add("hidden");

                nextFlashcard();
            }
			*/
        //}

function displayFormattedQuestion() {
 
    let card = currentFlashcards[currentIndex];
    // Extract steps from the question string using a regex pattern
    let stepMatches = card.question.match(/step \d+: [^,]+/g);
    document.getElementById("question-text").innerHTML = "";
 card.question;

    if (stepMatches) {
        stepMatches.forEach((step, index) => {
            let stepElement = document.createElement("span");

            // Apply color based on progress
            if (index < currentIndex) {
                stepElement.style.color = "green"; // Completed steps in GREEN
            } else if (index === stepIndex) {
                stepElement.style.color = "red"; // Current step in RED
                stepElement.style.fontWeight = "bold";
            } else {
                stepElement.style.color = "black"; // Future steps remain BLACK
            }

            stepElement.innerText = step + ", "; // Add a comma and space
            document.getElementById("question-text").appendChild(stepElement);
        });
    } else {
        document.getElementById("question-text").innerText =  card.question; // Default if no matches found
    }
}


        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
		
function displayMultiplication(card){
	
	OngoingOp = 0;
			
			if (table_init == 0){
			let myTableHTML = makeTable(card.num1, card.num2);
			document.getElementById('myTableContainer').innerHTML = myTableHTML;
			table_init = 1;
			}
			//makeTable(card.num1 , card.num2);			
		}
		

function displayDivision(card) {
	
	OngoingOp = 1;
	
			if (table_init == 0){
			let myTableHTML = makeTable_div(card.num1, card.num2);
			document.getElementById('myTableContainer').innerHTML = myTableHTML;
			table_init = 1;
			}
 
}
  
		

        function showFlashcard() {
		    
			
            let card = currentFlashcards[currentIndex];
			
			console.log(card);
			
			if (settings.voice){
				
				console.log(card.question);
				speakText(card.question);
				console.log(card.q_english);
				speakText(card.q_english);
				
			}
			
			currentCard = card; // Store the card
			
			//displayFormattedQuestion();
		/*	if (card.visual){
				console.log (card.visual);
				document.getElementById("question-text").innerText = card.question + card.visual ;
			} else
			{
				document.getElementById("question-text").innerText = card.question  ;
			} */

            document.getElementById("question-text").innerText = currentCategory  ;
			
			
			

		

            //let step = flashcards[currentIndex];
            //document.getElementById("question").innerHTML = `<p>${step.step}</p>`;
			

			
			
			let optionsDiv = document.getElementById("options");
            optionsDiv.innerHTML = "";
			
			
			 if (currenttopLevelCategoryName === "Division") {
    displayDivision(card); // Use displayDivision for division
  } else {
    displayMultiplication(card); // Use displayMultiplication for multiplication
  }
			

			
			//[step.correct, `${step.options}`]
            // Generate answer options (including the correct one)
            //let options =  card.options  
            //    .sort(() => Math.random() - 0.5); // Shuffle

            //let optionsHtml = options.map(opt => `<button onclick="checkAnswer('${opt}')">${opt}</button>`).join("");
            //document.getElementById("options").innerHTML = optionsHtml;

            	
			
			// Handle showing options based on settings
			if (settings.showOptionsImmediately) {
			

            const shuffledOptions =  shuffle([...card.options]); //options can be shuffles
            shuffledOptions.forEach(opt => {
                let btn = document.createElement("button");
                btn.className = "option";
                btn.style.fontSize = settings.buttonSize + "px";
                btn.innerText = opt;
                btn.onclick = function() {
                    checkAnswer(opt);
                };
                optionsDiv.appendChild(btn);
            });
            document.getElementById("message").innerText = "";
            document.getElementById("next-btn").classList.add("hidden");
			document.getElementById("show-btn").classList.add("hidden");
            document.getElementById("continueGame-btn").classList.add("hidden");
            document.getElementById("summary-btn").classList.remove("hidden");
            document.getElementById("flashcard").classList.remove("hidden");
            document.getElementById("options").classList.remove("hidden");
			}
			else
			{
				document.getElementById("show-btn").classList.remove("hidden");
				
            document.getElementById("next-btn").classList.add("hidden");
			
            document.getElementById("continueGame-btn").classList.add("hidden");
            
            
			}
        }
		
       function showFlashcardOptions() {
	    let card = currentFlashcards[currentIndex];
			
			currentCard = card; // Store the card
			

  let optionsDiv = document.getElementById("options");
            optionsDiv.innerHTML = "";
            const shuffledOptions = card.options ; // shuffle([...card.options]);
            shuffledOptions.forEach(opt => {
                let btn = document.createElement("button");
                btn.className = "option";
                btn.style.fontSize = settings.buttonSize + "px";
                btn.innerText = opt;
                btn.onclick = function() {
                    checkAnswer(opt);
                };
                optionsDiv.appendChild(btn);
            });
            document.getElementById("message").innerText = "";
            document.getElementById("next-btn").classList.add("hidden");
			document.getElementById("show-btn").classList.add("hidden");
            document.getElementById("continueGame-btn").classList.add("hidden");
            document.getElementById("summary-btn").classList.remove("hidden");
            document.getElementById("flashcard").classList.remove("hidden");
            document.getElementById("options").classList.remove("hidden");	   
	   
	   document.getElementById("show-btn").classList.add("hidden");
}	   
		
		
function clear() {

            document.getElementById("message").innerText = "";
            document.getElementById("next-btn").classList.add("hidden");
			document.getElementById("show-btn").classList.add("hidden");
            document.getElementById("continueGame-btn").classList.add("hidden");
            document.getElementById("summary-btn").classList.add("hidden");
            document.getElementById("flashcard").classList.add("hidden");
            document.getElementById("options").classList.add("hidden");	   
	   
	   document.getElementById("show-btn").classList.add("hidden");
	   
	              document.getElementById("game-container").classList.add("hidden");
            document.getElementById("menu").classList.remove("hidden");
			
}

    function openReportIssueModal() {
        if (!currentCard) return;  // Exit if no card

        document.getElementById("report-issue-question").innerText = currentCard.question;
        document.getElementById("report-issue-modal").style.display = "block";
    }

    function closeReportIssueModal() {
        document.getElementById("report-issue-modal").style.display = "none";
    }

    document.getElementById('report-issue-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent page reload

        const issueDescription = document.getElementById('issue-description').value;
        const issueTitle = `Issue with flashcard: ${currentCard.question}`; // Create a descriptive title

    // Sanitize input (basic example)
    const sanitizedDescription = issueDescription.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const question = currentCard.question;

    const correct = currentCard.correct;
    const options = `${currentCard.options}`;
    const grade = Number(currentCard.grade);
    const category =currentCategory;
    const recipient = "FlashTasticApp@gmail.com";  // Replace with your email address

    // Basic input sanitization (consider more robust methods)
    const sanitizedQuestion = question.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const sanitizedCorrect = correct.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const sanitizedOptions = options.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	

    const emailTitle = `Flashcard Issue Report: ${question}`;
    const emailBody = `Issue Flashcard\n\n` +
                      `Question: ${sanitizedQuestion}\n` +
                       `Correct Answer: ${sanitizedCorrect}\n` +
                      `Options: ${sanitizedOptions}\n` +
                      `Grade: ${grade}\n` +
                      `Category: ${category}\n`+
                      `Description: ${sanitizedDescription}\n`;

    // Construct the mailto: link
   this.action = `mailto:${recipient}?subject=${emailTitle}&body=${encodeURIComponent(emailBody)}`;
//	    this.action = `mailto:${recipient}?subject={encodeURIComponent(emailTitle)}&body=${encodeURIComponent(emailBody)}`;


	

     // Programmatically trigger the <a> link
     window.location.href = this.action;
	 

    closeReportIssueModal();
       
    });

    function openSuggestFlashcardModal() {
	
        //console.log( openSuggestFlashcardModal )
		if (!currentCard) return;  // Exit if no card

        
        document.getElementById("suggest-flashcard-modal").style.display = "block";
        
    }

    function closeSuggestFlashcardModal() {
	//console.log( closeSuggestFlashcardModal )
        document.getElementById("suggest-flashcard-modal").style.display = "none";
    }

  document.getElementById('suggest-flashcard-form').addEventListener('submit', function(event) {
    event.preventDefault();
	
	

    const question = document.getElementById('suggest-question').value;

    const correct = document.getElementById('suggest-correct').value;
    const options = document.getElementById('suggest-options').value;
    const grade = document.getElementById('suggest-grade').value;
    const category =currentCategory;
    const recipient = "FlashTasticApp@gmail.com";  // Replace with your email address

    // Basic input sanitization (consider more robust methods)
    const sanitizedQuestion = question.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const sanitizedCorrect = correct.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const sanitizedOptions = options.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const emailTitle = `Flashcard Suggestion: ${question}`;
    const emailBody = `Suggested Flashcard\n\n` +
                      `Question: ${sanitizedQuestion}\n` +

                      `Correct Answer: ${sanitizedCorrect}\n` +
                      `Options: ${sanitizedOptions}\n` +
                      `Grade: ${grade}\n` +
                      `Category: ${category}`;

    // Construct the mailto: link
//    this.action = `mailto:<span class="math-inline">\{recipient\}?subject\=</span>{encodeURIComponent(emailTitle)}&body=${encodeURIComponent(emailBody)}`;
this.action = `mailto:${recipient}?subject=${emailTitle}&body=${encodeURIComponent(emailBody)}`;

console.log( this.action )
     // Programmatically trigger the <a> link
     window.location.href = this.action;
	 //console.log( this.action )
    closeSuggestFlashcardModal();
});

function ans_div(selected){
	
	let card = currentFlashcards[currentIndex];
	let rem_color = "<td>";
	//fix me
	
	
				if (card.stepValue){
                Quot = Quot *10 + parseInt(card.stepValue);
				}
				let expectedQuote = card.num1 / card.num2;
				//console.log(totalSum);
				
				expectedQuote = expectedQuote.toFixed(2);
				  // Ensure inputs are strings
			  in_ans = String(Quot).padStart(3, ' ');

				let newRow = `<td>=</td><td colspan="3"  >Quotient ${expectedQuote}</td><td   class="correct">${in_ans[0]}</td><td  class="correct">${in_ans[1]}</td><td   class="correct">${in_ans[2]}</td><td colspan="5" class="correct">✔ Step ${currentIndex + 1} Rem = ${card.remainder}</td>`;
               // let newRow = `<tr><td>+</td><td></td><td></td><td></td> <td>${selected}</td><td colspan="3" class="correct">${card.step}</td><td colspan="2" class="correct">✔ Step ${currentIndex + 1} </td></tr>`;
                //console.log(newRow);
				document.getElementById("steps").innerHTML = newRow;
				
								  // Ensure inputs are strings
								  if (card.stepValue){
			  in_ans = String(card.sub).padStart(3, ' '); //Quotient ${card.num1} ÷ ${card.num2} = ${Quot}</td>
				 
				 document.getElementById("Remainder").innerHTML += `<tr><td>-</td>${extra_shift}<td></td><td></td><td>${in_ans[0]}</td><td>${in_ans[1]}</td><td>${in_ans[2]}</td> <td></td><td colspan="6" class="table_head">${card.stepText}</tr> `;
								  }
								  else
								  {
									extra_shift = "<td></td>";
								  }

					//document.getElementById("Remainder").innerHTML += ``;
					
				  in_ans = String(card.remainder).padStart(3, ' ');
				  
				  if ((currentIndex + 1) == 3){
					   rem_color = "<td class=\"table_head\">"
				  }
				  else
				  {
					 rem_color = "<td class=\"wrong\">"
				  }
				  
				  document.getElementById("Remainder").innerHTML += `<tr></tr><tr><td>=</td>${extra_shift}<td></td><td></td>${rem_color}${in_ans[0]}</td>${rem_color}${in_ans[1]}</td>${rem_color}${in_ans[2]}</td> <td></td><td colspan="6" class="table_head">${card.ans_english}</tr>`;
				//console.log(newRow);
               // document.getElementById("totalRow").innerHTML = `<td></td><td></td><td></td><td></td><td  class="table_head">${totalSum}</td><td colspan="5" class="table_head">Product ${expectedSum}</td>`;
             
                clearHighlight();
}

function ans_mult(selected){
	
	let card = currentFlashcards[currentIndex];
	//fix me
                totalSum += parseInt(selected);
				let expectedSum = card.num1 * card.num2;
				//console.log(totalSum);
				
				  // Ensure inputs are strings
			  in_ans = String(selected).padStart(6, ' ');

				let newRow = `<tr><td>+</td><td>${in_ans[0]}</td><td>${in_ans[1]}</td><td>${in_ans[2]}</td> <td>${in_ans[3]}</td><td>${in_ans[4]}</td> <td>${in_ans[5]}</td><td colspan="3" class="correct">${card.step}</td><td colspan="2" class="correct">✔ Step ${currentIndex + 1} </td></tr>`;
               // let newRow = `<tr><td>+</td><td></td><td></td><td></td> <td>${selected}</td><td colspan="3" class="correct">${card.step}</td><td colspan="2" class="correct">✔ Step ${currentIndex + 1} </td></tr>`;
                //console.log(newRow);
				document.getElementById("steps").innerHTML += newRow;
				
								  // Ensure inputs are strings
			  in_ans = String(totalSum).padStart(6, ' ');
				 
				 document.getElementById("totalRow").innerHTML = `<td>=</td><td>${in_ans[0]}</td><td>${in_ans[1]}</td><td>${in_ans[2]}</td> <td>${in_ans[3]}</td><td>${in_ans[4]}</td> <td>${in_ans[5]}</td><td colspan="5" class="table_head">${card.num1} X ${card.num2} = ${expectedSum}</td>`;
				//console.log(newRow);
               // document.getElementById("totalRow").innerHTML = `<td></td><td></td><td></td><td></td><td  class="table_head">${totalSum}</td><td colspan="5" class="table_head">Product ${expectedSum}</td>`;
             
                clearHighlight();
}


        function checkAnswer(selected) {
			
			
			
            let card = currentFlashcards[currentIndex];
			
				if (settings.voice){
				speakText(card.ans_english); //fix me
			}			
			
			
            if (!categoryProgress[currentCategory]) {
                categoryProgress[currentCategory] = {
                    correct: 0,
                    total: 0
                };
            }
            categoryProgress[currentCategory].total++;

            if (selected === card.correct) {
                categoryProgress[currentCategory].correct++;
                score += 10;
                document.getElementById("message").innerText = "Correct!!!";
                triggerConfetti();
				
				console.log(OngoingOp);
				
				if (OngoingOp == 0){
					ans_mult(selected);
				}
				else{
					ans_div(selected);
				}
				
                
				
            } else {
                document.getElementById("message").innerText = "Wrong! Correct Answer: " + card.correct;

                score -= 10;
                mistakeSound.play();
				


        document.querySelectorAll('.option').forEach(btn => {
          btn.style.backgroundColor ="red";
          btn.style.color ="white";
        });
        
        mistakes.push({card: card, selected: selected});
		
		currentIndex = currentIndex - 1;
            }
			
            updateScore();
            let optionButtons = document.getElementsByClassName("option");
            for (let btn of optionButtons) {
                btn.disabled = true;
                if (btn.innerText === card.correct) {
                    btn.classList.add("highlight-correct");
                }
            }
            document.getElementById("next-btn").classList.remove("hidden");
			document.getElementById("show-btn").classList.add("hidden");
        }

        function updateScore() {
			if (score > highScore) highScore = score;
            if (settings.showScores) {
                document.getElementById("score").innerText = "Score: " + score;
                document.getElementById("high-score").innerText = "High Score: " + highScore;
            } else {
                document.getElementById("score").innerText = "";
                document.getElementById("high-score").innerText = "";
            }
        }

        function nextFlashcard() {
			
            currentIndex++;
            if (currentIndex < currentFlashcards.length) {
                showFlashcard();
            } else {
				//table_init = 0;
				//totalSum = 0;
				//Quot = 0;
				//extra_shift = '';
				
	
			
                summaryGame();
            }
        }

        function summaryGame() {
			
		
			
            if (score > highScore) highScore = score;

            let progress = categoryProgress[currentCategory];
            let diff = currentFlashcards.length - currentIndex - 1;
            let progressText = progress ?
                `Category Progress: ${progress.correct} / ${progress.total}` :
                'No progress tracked for this category.';
            let progressText2 = (currentIndex < currentFlashcards.length) ?
                `Remaining: ${diff}` :
                'All questions tried for this category';

            let summaryDiv = document.getElementById("summary");
            summaryDiv.innerHTML = "<h2>Game Summary </h2>" +
                (settings.showMistakes ? "<p>Mistakes: " + mistakes.length + "</p>" : "") +
                (mistakes.length ? "" : "<p>Amazing! You haven't made a mistake!!!</p>") +
                "<p>Current Category: " + currentCategory + "</p>" +
                "<p>" + progressText + "</p>" +
                "<p>" + progressText2 + "</p>" +
                "<h2> Email: FlashTasticApp@gmail.com </h2>" +
                "<p><a href=\"https://github.com/Surysingh/FlashTastic\">Collaborate to improve this game!!!</a></p>";

            summaryDiv.classList.remove("hidden");
            document.getElementById("continueGame-btn").classList.remove("hidden");
            document.getElementById("exitGame-btn").classList.remove("hidden");
            document.getElementById("next-btn").classList.add("hidden");
			document.getElementById("show-btn").classList.add("hidden");
            document.getElementById("summary-btn").classList.add("hidden");
            document.getElementById("flashcard").classList.add("hidden");
            document.getElementById("options").classList.add("hidden");
			
			
			table_init = 0;
			totalSum = 0;
			Quot = 0;
			extra_shift = '';
			currentIndex = 0;		
			
        }

        function endGame() {
            updateScore();
            document.getElementById("game-container").classList.add("hidden");
            document.getElementById("menu").classList.remove("hidden");
        }

        function continueGame() {
            document.getElementById("game-container").classList.add("hidden");
            document.getElementById("menu").classList.remove("hidden");
        }

        function exitGame() {
            score = 0;
            mistakes = 0;
            currentCategory = null;
            categoryProgress = {};
            updateScore();
            document.getElementById("game-container").classList.add("hidden");
            document.getElementById("menu").classList.remove("hidden");
        }

        function triggerConfetti() {
            let container = document.getElementById("confetti-container");
            container.innerHTML = "";

            
            chime.play();

            for (let i = 0; i < 30; i++) {
                let confetti = document.createElement("div");
                confetti.className = "confetti-piece";
                confetti.style.backgroundColor = (settings.confettiType === "rainbow") ?
                    getRandomColor() :
                    (settings.confettiType === "sparkle") ?
                    "#fff" : "#ff0000";
                confetti.style.left = Math.random() * 100 + "%";
                confetti.style.animationDuration = (1000 / settings.animationSpeed) + "ms";
                container.appendChild(confetti);
            }
            setTimeout(() => {
                container.innerHTML = "";
            }, 1500);
        }

        function getRandomColor() {
            let letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
		
	

        // Settings page functions
        function openSettings() {
            document.getElementById("settings-page").classList.remove("hidden");
            document.getElementById("menu").classList.add("hidden");
			toggleBackgroundInputs();
        }

        function closeSettings() {



            document.getElementById("settings-page").classList.add("hidden");
            document.getElementById("menu").classList.remove("hidden");
			
			clear();
        }
		

function toggleBackgroundInputs() {
    const bgColorInputGroup = document.getElementById("bg-color-input-group");
    const bgGradientInputGroup = document.getElementById("bg-gradient-input-group");

    if (bgColorRadio.checked) {
        bgColorInputGroup.classList.remove("hidden");
        bgGradientInputGroup.classList.add("hidden");
    } else if (bgGradientRadio.checked) {
        bgColorInputGroup.classList.add("hidden");
        bgGradientInputGroup.classList.remove("hidden");
    }
}

        function saveSettings() {

			settings.showOptionsImmediately = document.getElementById("show-options-immediately").checked;
			settings.voice = document.getElementById("text-to-voice").checked;
			

            settings.confettiType = document.getElementById("confetti-select").value;
            settings.fontSize = document.getElementById("font-size-range").value;
            settings.buttonSize = document.getElementById("button-size-range").value;
            settings.animationSpeed = parseFloat(document.getElementById("animation-speed-range").value);
            settings.showScores = document.getElementById("toggle-scores").checked;
            settings.showMistakes = document.getElementById("toggle-mistakes").checked;
  
			
			

    const bgColorRadio = document.getElementById("bg-color-radio");
    const bgGradientRadio = document.getElementById("bg-gradient-radio");
    const bgColorPicker = document.getElementById("background-color-picker");
    const bgGradientStart = document.getElementById("background-gradient-start");
    const bgGradientEnd = document.getElementById("background-gradient-end");
    const bgGradientDirection = document.getElementById("background-gradient-direction");

    if (bgColorRadio.checked) {
        document.body.style.background = bgColorPicker.value;
    } else if (bgGradientRadio.checked) {
        let gradientString = `linear-gradient(${bgGradientDirection.value}, ${bgGradientStart.value}, ${bgGradientEnd.value})`;
        //console.log("Gradient CSS:", gradientString); // Debugging
        document.body.style.background = gradientString;
    }			

            document.getElementById("flashcard").style.fontSize = settings.fontSize + "px";
            //document.body.style.background = document.getElementById("background-color-picker").value;
            let btns = document.getElementsByClassName("menu-button");
            for (let btn of btns) {
                btn.style.backgroundColor = document.getElementById("button-color-picker").value;
            }
            closeSettings();
        }
		
   bgColorRadio.addEventListener("change", toggleBackgroundInputs);
   bgGradientRadio.addEventListener("change", toggleBackgroundInputs);
		


const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", performSearch);
searchBar.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        performSearch();
    }
});

function performSearch() {
	return;
	
    const searchTerm = searchBar.value.trim().toLowerCase();
    if (!searchTerm) {
        return; // Don't search if the input is empty
    }

    let results =[];
	
  // Clear previous search results if any
    let resultsContainer = document.getElementById("results-container");
    if (resultsContainer) {
        resultsContainer.remove();
    }
	clear()	;

    // Search through all categories and flashcards
    for (const category in categories) {
        for (const card of categories[category]) {
            if ((card.question)  ) {
						if (card.question.toLowerCase().includes(searchTerm) ||
                card.correct.toLowerCase().includes(searchTerm) ||
                card.topic.toLowerCase().includes(searchTerm)
            ){
                results.push({ card: card, category: category });
				}
			}
        }
    }

    if (results.length === 0) {
        // No exact matches, try "nearby" matching (levenshtein distance)
        let nearbyResults = findNearbyMatches(searchTerm);
        if (nearbyResults.length > 0) {
            displaySearchResults(nearbyResults, "Nearby Matches");
        } else {
            alert("No matching flashcards found.");
        }
    } else {
        displaySearchResults(results, "Search Results");
    }
}

function findNearbyMatches(searchTerm) {
    const threshold = 2; // Adjust this threshold as needed
    let nearbyResults = [];

    for (const category in categories) {
        for (const card of categories[category]) {
            if (
                levenshteinDistance(card.question.toLowerCase(), searchTerm) <= threshold ||
                levenshteinDistance(card.correct.toLowerCase(), searchTerm) <= threshold ||
                levenshteinDistance(card.topic.toLowerCase(), searchTerm) <= threshold
            ) {
                nearbyResults.push({ card: card, category: category });
            }
        }
    }
    return nearbyResults;
}

// Levenshtein Distance Algorithm (for "nearby" matching)
function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    let matrix = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // Substitution
                    matrix[i][j - 1] + 1, // Insertion
                    matrix[i - 1][j] + 1
                ); // Deletion
            }
        }
    }
    return matrix[b.length][a.length];
}

function displaySearchResults(results, title) {
    let menuDiv = document.getElementById("menu");
    let searchDiv = document.createElement("div"); // Create a temporary div
    searchDiv.id = "search-container"; // Give it an ID
    searchDiv.innerHTML = `
        <input type="text" id="search-bar" placeholder="Search...">
        <button id="search-button">Search</button>
    `;

    // Keep a reference to the search container
    let existingSearchContainer = menuDiv.querySelector("#search-container");
    if (existingSearchContainer) {
        menuDiv.removeChild(existingSearchContainer); // Remove old container
    }
    //menuDiv.appendChild(searchDiv); // Add the search bar back

    // Add event listeners again
    const searchBar = document.getElementById("search-bar");
    const searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", performSearch);
    searchBar.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            performSearch();
        }
    });

    let resultsDiv = document.createElement("div"); // Create a div for results
    resultsDiv.id = "results-container";

    resultsDiv.innerHTML = `<h2>${title}</h2>`; // Add title to results div

    if (results.length === 0) {
        resultsDiv.innerHTML = "No results found.";
        menuDiv.appendChild(resultsDiv);
        return;
    }

    results.forEach((result) => {
        let button = document.createElement("button");
        button.className = "menu-button";
        button.textContent = `Category: ${result.category} - Question: ${result.card.question}`;
        button.onclick = function() {
            // Logic to start the game with the selected flashcard
            selectCategory(result.category); // Assuming selectCategory handles this
            // You might need to adjust currentIndex to start with the specific card
            currentFlashcards = categories[result.category];
            currentIndex = currentFlashcards.indexOf(result.card);
            showFlashcard();
        };
        resultsDiv.appendChild(button);
    });

    // Add a "Back to Menu" button
    let backButton = document.createElement("button");
    backButton.textContent = "Back to Menu";
    backButton.className = "menu-button";
    backButton.onclick = function() {
	
	  // Clear previous search results if any
    let resultsContainer = document.getElementById("results-container");
    if (resultsContainer) {
        resultsContainer.remove();
    }
	
	
        document.getElementById("results-container").remove(); // Clear results
        createCategoryButtons(); // Redisplay category buttons
    };
    resultsDiv.appendChild(backButton);
    menuDiv.appendChild(resultsDiv);
} 





		
function speakText(text) {
			return; 
			/*
            
			console.log(text);
			const sanitizedtext = text.replace(/=/g, '').replace(/_/g, '');
			
			
            // Create a new SpeechSynthesisUtterance object
			console.log(sanitizedtext);
            var utterance = new SpeechSynthesisUtterance( sanitizedtext);

            // Set properties for the speech (optional)
            utterance.pitch = 1; // Set pitch (range: 0 to 2)
            utterance.rate = 1;  // Set rate (range: 0.1 to 10)
            utterance.volume = 1; // Set volume (range: 0 to 1)

            // Check if the browser supports Kannada
            if ('speechSynthesis' in window) {
                let voices = speechSynthesis.getVoices();
                // Try to set an appropriate voice for India, if available
				
				
                let IndiaVoice = voices.find(voice => voice.lang == 'hi-IN'); // Searching for Kannada voice
                if (IndiaVoice) {
                    utterance.voice = IndiaVoice; // Set India voice if found
                }
				else
				{
					let AltVoice = voices.find(voice => voice.lang == '-IN');
					
					if (AltVoice) {
						utterance.voice = AltVoice; // Set India voice if found
					}
				
				}
                window.speechSynthesis.speak(utterance);
            } else {
                alert("Speech Synthesis not supported in this browser.");
            } */
        } 


       // Get the YouTube button element
        const youtubeButton = document.getElementById('youtube-button');

        // Add a click event listener to the button
        youtubeButton.addEventListener('click', function() {
            // Open the specified URL in a new tab when the button is clicked
            window.open('https://www.youtube.com/@flashtasticapp', '_blank');
        });
