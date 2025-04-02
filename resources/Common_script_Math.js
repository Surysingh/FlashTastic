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
		let OngoingOp = 0; // 0 mult, 1 div, 2 fraction, 3 visual_fract, 4 visual_add, 5 add sub mul div rem, 6 angle, triangle & quad, 7 angle, 8 algebra balance, 9 linear eq , 10 hcf, lcm
		const fraction_piechart_height = 200; // height and width of pie charts
		
   const bgColorRadio = document.getElementById("bg-color-radio");
   const bgGradientRadio = document.getElementById("bg-gradient-radio");
   const bgColorPicker = document.getElementById("background-color-picker");
   const bgGradientStart = document.getElementById("background-gradient-start");
   const bgGradientEnd = document.getElementById("background-gradient-end");
   const bgGradientDirection = document.getElementById("background-gradient-direction");
		
        const appUrl =  "https://surysingh.github.io/FlashTastic/" ; //window.location.href; // Gets the current URL


	
function makeTable(num1, num2) {

//console.log(num1);
  // Ensure inputs are strings
  //console.log(num1);
  num1 = String(num1).padStart(6, ' ');
  //console.log(num1);
  
  //console.log(num2);
  num2 = String(num2).padStart(6, ' ');
  //console.log(num2);

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

//console.log(num1);
  // Ensure inputs are strings
  //console.log(num1);
  num1 = String(num1).padStart(3, ' ');
  //console.log(num1);
  
  //console.log(num2);
  num2 = String(num2).padStart(2, ' ');
  //console.log(num2);

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
    //console.log(settings.grade);

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
					////console.log(categories[topLevelCategoryName][subCategoryName]);
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
		//console.log(settings.grade);
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
			   
			   ////console.log(categoryName);
			   ////console.log(categories[categoryName]);
			   ////console.log(categories[categoryName].filter(question => !question.grade ||	settings.grade == 0 ||	Number(question.grade) == settings.grade ||	(Number(question.grade) - 2)  == settings.grade || (Number(question.grade) - 1)  == settings.grade ));
			   
			
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
            //console.log(categories);
			currentCategory = null;
            //console.log('Categories loaded successfully');
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

                
				
				currenttopLevelCategoryName = topLevelCategoryName;
				currentsubCategoryName = subCategoryName;
				
				currentCategory = subCategoryName;
				
                currentFlashcards = flashcards ; //shuffle(  flashcards.filter(question => !question.grade ||	settings.grade == 0 ||	Number(question.grade) == settings.grade  ||	(Number(question.grade) + 1)  == settings.grade || (Number(question.grade) - 1)  == settings.grade )); 
				
                currentIndex = 0;
				//console.log("currentIndex:", currentIndex);

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
		
		
let chartInstances = [];
function drawCharts(num1, num2, denominator, denominator2) {
	
	
	
            let chartContainer = document.getElementById('charts');
            chartContainer.innerHTML = "";
            chartInstances.forEach(chart => chart.destroy());
            chartInstances = [];

/*			
Light Red
#FF0000
Dark Red
#8B0000

Light Green
#90EE90
Dark Green
#006400	
*/	

/* halloween

#ff6500	(255,101,0)
#e69138	(230,145,56)
#30913f	(48,145,63)
#5800ac	(88,0,172)
#6a329f	(106,50,159)

*/


/* miso

#fec3ca	(254,195,202)
#ffdbe0	(255,219,224)
#c6d998	(198,217,152)
#d6e8b5	(214,232,181)
*/	

            createFractionCharts(chartContainer, Math.abs(num1), denominator, `[${num1}÷${denominator}]`, num1 > 0 ? '#5800ac' : '#e69138' ); //'#4CAF50');
            
			if (num2 != 0) 
			{
				
			if(denominator2 != 0) {
			createFractionCharts(chartContainer, Math.abs(num2), denominator2, `[${num2}÷${denominator2}]`, num2 > 0 ? '#6a329f' : '#ff6500'); //FFA500 orange //#FF6347 red
			}else
			{
					createFractionCharts(chartContainer, Math.abs(num2), denominator, `[${num2}÷${denominator}]`, num2 > 0 ? '#6a329f' : '#ff6500');
			}
			}
        }

        function createFractionCharts(container, fraction, denominator, label, color) {
            let fullCircles = Math.floor(fraction / denominator);
            let remainingParts = fraction % denominator;

            for (let i = 0; i < fullCircles; i++) {
                createChart(container, denominator, denominator, `${label} ${i + 1} Whole`, color);
            }
            if (remainingParts > 0) {
                createChart(container, remainingParts, denominator, `${label} Fraction`, color);
            }
        }

        function createChart(container, filled, total, label, color) {
            let wrapper = document.createElement("div");
            wrapper.className = "chart-wrapper";
            let title = document.createElement("p");
            title.innerText = "" ; // label;
            let canvas = document.createElement("canvas");
			canvas.height = fraction_piechart_height;
			canvas.height = fraction_piechart_height;
            //wrapper.appendChild(title);
            wrapper.appendChild(canvas);
            container.appendChild(wrapper);
            let ctx = canvas.getContext('2d');
            
            let backgroundColors = Array(total).fill('#ddd');
            for (let i = 0; i < filled; i++) {
                backgroundColors[i] = color;
            }
            
            let chart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: Array(total).fill(''),
                    datasets: [{
                        data: Array(total).fill(1),
                        backgroundColor: backgroundColors
                    }]
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: { display: false },
                        title: { display: true, text: label }
                    }
                }
            });
            chartInstances.push(chart);
        }

       
  let charts = {};

        function createPieChart(canvasId) {
			
			////console.log(canvasId);
			////console.log(document.getElementById(canvasId));
            let ctx = document.getElementById(canvasId).getContext("2d");
            return new Chart(ctx, {
                type: "pie",
                data: {
                    labels: [],
                    datasets: [{
                        data: [],
                        backgroundColor: []
                    }]
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: ''
                        }
                    }
                }
            });
        }

        function updatePieChart(chart, numerator, denominator, displayId) {
            const backgroundColors = Array(denominator).fill("#ddd");
            for (let i = 0; i < numerator; i++) {
                backgroundColors[i] = "#4CAF50";
            }

            chart.data.labels = Array(denominator).fill("");
            chart.data.datasets[0].data = Array(denominator).fill(1);
            chart.data.datasets[0].backgroundColor = backgroundColors;

            chart.options.plugins.title.display = true;
            chart.options.plugins.title.text = `${numerator}/${denominator}`;

            chart.update();
            document.getElementById(displayId).innerText = "" ;// `${numerator}/${denominator}`;
        }

        function calculateResult() {
            let num1 = parseInt(document.getElementById("numerator1").value);
            let den1 = parseInt(document.getElementById("denominator1").value);
            let num2 = parseInt(document.getElementById("numerator2").value);
            let den2 = parseInt(document.getElementById("denominator2").value);
            let operation = document.getElementById("operation").value;

            let resultNum, resultDen;
            if (operation === "+") {
				
				if (den1 == den2){
                resultNum = num1  + num2 ;
                resultDen = den1 ;					
				}else{
                resultNum = num1 * den2 + num2 * den1;
                resultDen = den1 * den2;
				}
            } else if (operation === "-") {
				if (den1 == den2){
                resultNum = num1  - num2 ;
                resultDen = den1 ;					
				}else{				
                resultNum = num1 * den2 - num2 * den1;
                resultDen = den1 * den2;
			}
            } else if (operation === "*") {
                resultNum = num1 * num2;
                resultDen = den1 * den2;
            } else {
                resultNum = num1 * den2;
                resultDen = num2 * den1;
            }

            updatePieChart(charts.result, resultNum, resultDen, "resultFraction");
        }
function displayVisualFraction(card){
	
	OngoingOp = 3;
	  document.getElementById("game-chart-container").classList.remove("hidden");
	  
	document.getElementById('myTableContainer').innerHTML = ""; // clear any table
	//document.getElementById("game-chart-container").classList.add("hidden");	
	document.getElementById("game-angle-container").classList.add("hidden");
	document.getElementById("game-op-container").classList.add("hidden");	
document.getElementById("game-algebra-balance-container").classList.add("hidden");	
document.getElementById("game-hcf-lcm-container").classList.add("hidden");
 
			
				
			charts.chart1 = createPieChart("chart1");
            charts.chart2 = createPieChart("chart2");
            charts.result = createPieChart("resultChart");
			
			charts.chart1.height = fraction_piechart_height;
			charts.chart1.width = fraction_piechart_height;
			charts.chart2.height = fraction_piechart_height;
			charts.chart2.width = fraction_piechart_height;
			charts.result.height = fraction_piechart_height;
			charts.result.width = fraction_piechart_height;			

            // Initialize charts with default values
            updatePieChart(charts.chart1, 1, 4, "fraction1");
            updatePieChart(charts.chart2, 1, 4, "fraction2");
            calculateResult();

            // Add event listeners for input changes
            document.getElementById("numerator1").addEventListener("input", function () {
                let numerator = parseInt(this.value);
                let denominator = parseInt(document.getElementById("denominator1").value);
                updatePieChart(charts.chart1, numerator, denominator, "fraction1");
                calculateResult();
            });

            document.getElementById("denominator1").addEventListener("input", function () {
                let numerator = parseInt(document.getElementById("numerator1").value);
                let denominator = parseInt(this.value);
                updatePieChart(charts.chart1, numerator, denominator, "fraction1");
                calculateResult();
            });

            document.getElementById("numerator2").addEventListener("input", function () {
                let numerator = parseInt(this.value);
                let denominator = parseInt(document.getElementById("denominator2").value);
                updatePieChart(charts.chart2, numerator, denominator, "fraction2");
                calculateResult();
            });

            document.getElementById("denominator2").addEventListener("input", function () {
                let numerator = parseInt(document.getElementById("numerator2").value);
                let denominator = parseInt(this.value);
                updatePieChart(charts.chart2, numerator, denominator, "fraction2");
                calculateResult();
            });

            document.getElementById("operation").addEventListener("change", calculateResult);
        				
			
				
				
            
 
           
}

 // Initial values for A, B, and C
    let a = 3, b = 2, c = 0;


    // Draw number line and update results
    function updateMath() {
		
		//console.log("a= ", a);
		//console.log("b= ", b);
		
        a = parseInt(document.getElementById('sliderA').value);
        b = parseInt(document.getElementById('sliderB').value);

		//console.log("a= ", a);
		//console.log("b= ", b);
		
        document.getElementById('valueA').innerText = a;
        document.getElementById('valueB').innerText = b;


        // Calculate results
        let add = a + b;
        let sub = a - b;
        let mul = a * b;
        let div = b !== 0 ? (a / b).toFixed(2) : "Undefined (Div by zero)";
        let mod = b !== 0 ? a % b : "Undefined";


        // Update displayed results
        //document.getElementById('addResult').innerText = `A + B = ${add}`;
        //document.getElementById('subResult').innerText = `A - B = ${sub}`;
        //document.getElementById('mulResult').innerText = `A × B = ${mul}`;
        //document.getElementById('divResult').innerText = `A ÷ B = ${div}`;
        //document.getElementById('modResult').innerText = `A % B = ${mod}`;


        // Determine operation for C
        const operation = document.getElementById('operation2').value;
        switch (operation) {
            case 'add': c = add; break;
            case 'sub': c = sub; break;
            case 'mul': c = mul; break;
            case 'div': c = b !== 0 ? parseFloat(div) : 0; break;
            case 'mod': c = b !== 0 ? mod : 0; break;
        }


        //document.getElementById('valueC').innerText = c;

		//console.log("b= ", b);
        // Draw number line, plot points, and visualize results
        drawNumberLine(a, b, c);
        visualizeOperations(a, b, c);
		
		//visualizeOperations(a, b, c);
		{
		visualizeResult(a, b, c, operation);
		}
    }
	
	

    // Visualize operations with colored squares
    function visualizeOperations(a, b, c) {
		//console.log("b= ", b);
        visualizeBoxes(a, 'red', 'A', 'boxContainerA');
        visualizeBoxes(b, 'blue', 'B', 'boxContainerB');
        visualizeBoxes(c, 'green', 'C', 'boxContainerD');
    }


    // Draw boxes to visualize numbers
    function visualizeBoxes(count, color, label, containerId) {
        const boxContainer = document.getElementById(containerId);
        boxContainer.innerHTML = ''; // Clear previous visualization


        for (let i = 0; i < Math.abs(count); i++) {
            const box = document.createElement('div');
            box.className = 'box';
            box.style.backgroundColor = color;
            box.title = label + ' = ' + count;
            boxContainer.appendChild(box);
        }


        // Show negative with a border
        if (count < 0) {
            boxContainer.appendChild(document.createTextNode(' (Negative)'));
        } else if (count === 0) {
            boxContainer.innerHTML = '<p>0 (No boxes to show)</p>';
        }
    }	


    // Draw Number Line
    function drawNumberLine(a, b, c) {
        const canvas = document.getElementById('numberLine');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);


        // Draw horizontal line
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(550, 50);
        ctx.strokeStyle = '#333';
        ctx.stroke();


        // Draw ticks and numbers
        for (let i = -10; i <= 10; i++) {
            let x = 50 + (i + 10) * 25;
            ctx.beginPath();
            ctx.moveTo(x, 45);
            ctx.lineTo(x, 55);
            ctx.stroke();
            ctx.fillText(i, x - 5, 70);
        }


        // Plot A, B, and C on number line
        plotPoint(a, 'A', 'red');
        plotPoint(b, 'B', 'blue');
        plotPoint(c, 'C', 'green');
    }


    // Plot a point with label
    function plotPoint(value, label, color) {
        const canvas = document.getElementById('numberLine');
        const ctx = canvas.getContext('2d');
        let x = 50 + (value + 10) * 25;


        ctx.beginPath();
        ctx.arc(x, 50, 5, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.fillText(label + ' = ' + value, x - 10, 35);
    }


 // Visualize the result of C with appropriate operation
    function visualizeResult(a, b, c, operation) {
        const boxContainer = document.getElementById('boxContainerC');
        boxContainer.innerHTML = ''; // Clear previous visualization
		
 
	const boxContainerB = document.getElementById('boxContainerE');  
	boxContainerB.innerHTML = ''; // Clear previous visualization		

		if ((operation == 'div') || (operation == 'mod'))
		{
				return;
		}

        if (operation === 'add') {
            visualizeAddition(a, b);
        } else if (operation === 'sub') {
			//console.log("b= ", b);
            visualizeSubtraction(a, b);
        } else if (operation === 'mul') {
            visualizeMultiplication(a, b);
        } else if (operation === 'div') {
            visualizeDivision(a, b, c);
        } else if (operation === 'mod') {
            visualizeModulus(a, b, c);
        }
    }


    // Visualize addition by combining A and B
    function visualizeAddition(a, b) {
        createBoxes(a, 'red', 'A');
        createBoxes(b, 'blue', 'B');
    }
	
function visualizeSubtraction(a, b) {
	//console.log("b= ", b);
	
    const boxContainerA = document.getElementById('boxContainerC');
	const boxContainerB = document.getElementById('boxContainerE');
    boxContainerA.innerHTML = ''; // Clear previous visualization
	boxContainerB.innerHTML = ''; // Clear previous visualization
	

    const rowA = document.createElement('div');
    rowA.className = 'row';
    const rowB = document.createElement('div');
    rowB.className = 'row';

    if (b >= 0 && a >= 0) {
        // Standard subtraction: Cancel out min(a, b) elements
        let minVal = Math.min(Math.abs(a), Math.abs(b));

        for (let i = 0; i < Math.abs(a); i++) {
            const box = document.createElement('div');
            box.className = 'box';
            box.style.backgroundColor = 'red';
            if (i < minVal) box.innerText = '✖'; // Cross only the cancelled ones
            rowA.appendChild(box);
        }

        for (let i = 0; i < Math.abs(b); i++) {
            const box = document.createElement('div');
            box.className = 'box';
            box.style.backgroundColor = 'blue';
            if (i < minVal) box.innerText = '✖'; // Cross only the cancelled ones
            rowB.appendChild(box);
        }
    } else if (a >= 0){
        // If B is negative, it acts like addition, so no cancellations
        for (let i = 0; i < Math.abs(a); i++) {
            const box = document.createElement('div');
            box.className = 'box';
            box.style.backgroundColor = 'red';
            rowA.appendChild(box);
        }

        for (let i = 0; i < Math.abs(b); i++) { // Adding |b| instead of subtracting
            const box = document.createElement('div');
            box.className = 'box';
            box.style.backgroundColor = 'blue';
            rowB.appendChild(box);
        }
    } else    if (b <= 0 && a <= 0) {
        // Standard subtraction: Cancel out min(a, b) elements
        let minVal = Math.min(Math.abs(a), Math.abs(b));

        for (let i = 0; i < Math.abs(a); i++) {
            const box = document.createElement('div');
            box.className = 'box';
            box.style.backgroundColor = 'red';
            if (i < minVal) box.innerText = '✖'; // Cross only the cancelled ones
            rowA.appendChild(box);
        }

        for (let i = 0; i < Math.abs(b); i++) {
            const box = document.createElement('div');
            box.className = 'box';
            box.style.backgroundColor = 'blue';
            if (i < minVal) box.innerText = '✖'; // Cross only the cancelled ones
            rowB.appendChild(box);
        }
    } else {
        // If B is negative, it acts like addition, so no cancellations
        for (let i = 0; i < Math.abs(a); i++) {
            const box = document.createElement('div');
            box.className = 'box';
            box.style.backgroundColor = 'red';
            rowA.appendChild(box);
        }

        for (let i = 0; i < Math.abs(b); i++) { // Adding |b| instead of subtracting
            const box = document.createElement('div');
            box.className = 'box';
            box.style.backgroundColor = 'blue';
            rowB.appendChild(box);
        }
    }

    boxContainerA.appendChild(rowA);
    boxContainerB.appendChild(rowB);
}
	
	
function visualizeSubtraction3(a, b) {
    const boxContainer = document.getElementById('boxContainerC');
    boxContainer.innerHTML = ''; // Clear previous visualization

    const rowA = document.createElement('div');
    rowA.className = 'row';
    const rowB = document.createElement('div');
    rowB.className = 'row';

    if (b >= 0) {
        // Standard subtraction: cancel out common elements
        for (let i = 0; i < Math.abs(a); i++) {
            const box = document.createElement('div');
            box.className = 'box';
            box.style.backgroundColor = 'red';
            if (i < Math.abs(b)) box.innerText = '✖'; // Mark cancelled elements
            rowA.appendChild(box);
        }

        for (let i = 0; i < Math.abs(b); i++) {
            const box = document.createElement('div');
            box.className = 'box';
            box.style.backgroundColor = 'blue';
            box.innerText = '✖'; // Mark cancelled elements
            rowB.appendChild(box);
        }
    } else {
        // If B is negative, it's equivalent to addition: No cancellations
        for (let i = 0; i < Math.abs(a); i++) {
            const box = document.createElement('div');
            box.className = 'box';
            box.style.backgroundColor = 'red';
            rowA.appendChild(box);
        }

        for (let i = 0; i < Math.abs(b); i++) { // Adding |b| instead of subtracting
            const box = document.createElement('div');
            box.className = 'box';
            box.style.backgroundColor = 'blue';
            rowB.appendChild(box);
        }
    }

    boxContainer.appendChild(rowA);
    boxContainer.appendChild(rowB);
}
	


function visualizeSubtraction2(a, b) {
    const boxContainer = document.getElementById('boxContainerC');
    boxContainer.innerHTML = ''; // Clear previous visualization

    const rowA = document.createElement('div');
    rowA.className = 'row';
    const rowB = document.createElement('div');
    rowB.className = 'row';

    let minVal = Math.min(a, b);
    let maxVal = Math.max(a, b);

    for (let i = 0; i < Math.abs(a); i++) {
        const box = document.createElement('div');
        box.className = 'box';
        box.style.backgroundColor = 'red';
        box.innerText = i < Math.abs(minVal) ? '✖' : ''; // Cross if it cancels
        rowA.appendChild(box);
    }

    for (let i = 0; i < Math.abs(b); i++) {
        const box = document.createElement('div');
        box.className = 'box';
        box.style.backgroundColor = 'blue';
        box.innerText = i < Math.abs(minVal) ? '✖' : ''; // Cross if it cancels
        rowB.appendChild(box);
    }

    boxContainer.appendChild(rowA);
    boxContainer.appendChild(rowB);
}



    // Visualize multiplication as a grid with A rows and B columns
    function visualizeMultiplication(a, b) {
        for (let i = 0; i < Math.abs(a); i++) {
            const row = document.createElement('div');
            row.className = 'row';
            createBoxes(Math.abs(b), (i % 2 === 0) ? 'red' : 'blue', 'B', row);
            document.getElementById('boxContainerC').appendChild(row);
        }
    }


    // Visualize division by grouping B into A
    function visualizeDivision(a, b, c) {
        if (b === 0) {
            boxContainer.innerHTML = '<p>Division by zero is undefined!</p>';
            return;
        }
        for (let i = 0; i < Math.abs(c); i++) {
            createBoxes(Math.abs(b), 'blue', 'B');
        }
    }


    // Visualize modulus as leftover after division
    function visualizeModulus(a, b, c) {
        createBoxes(c, 'green', 'C');
    }


    // Create colored boxes to visualize numbers
    function createBoxes(count, color, label, container = document.getElementById('boxContainerC')) {
        for (let i = 0; i < Math.abs(count); i++) {
            const box = document.createElement('div');
            box.className = 'box';
            box.style.backgroundColor = color;
            box.title = label + ' = ' + count;
            container.appendChild(box);
        }
    }


function displayVisualAdd(card){
	
	OngoingOp = 4;
	
	document.getElementById('myTableContainer').innerHTML = ""; // clear any table
	document.getElementById("game-chart-container").classList.add("hidden");	
	document.getElementById("game-angle-container").classList.add("hidden");
	//document.getElementById("game-op-container").classList.add("hidden");
	document.getElementById("game-algebra-balance-container").classList.add("hidden");
	document.getElementById("game-hcf-lcm-container").classList.add("hidden");
	
	
	
	 document.getElementById("game-op-container").classList.remove("hidden");
	
	// Initialize first render
    updateMath();
}
		
function displayFraction(card){
	
	OngoingOp = 2;
	
	document.getElementById('myTableContainer').innerHTML = ""; // clear any table
	document.getElementById("game-chart-container").classList.add("hidden");
	document.getElementById("game-angle-container").classList.add("hidden");
	document.getElementById("game-op-container").classList.add("hidden");
	document.getElementById("game-algebra-balance-container").classList.add("hidden");
	document.getElementById("game-hcf-lcm-container").classList.add("hidden");
	
    if (card.denominator2)	{
		drawCharts(card.num1, card.num2, card.denominator , card.denominator2);	
	}
	else {
	drawCharts(card.num1, card.num2, card.denominator , 0);	
	}	
}
		
function displayMultiplication(card){
	
	OngoingOp = 0;
	
            document.getElementById('charts').innerHTML = "";	 // clear any chart
			document.getElementById("game-chart-container").classList.add("hidden");
			document.getElementById("game-angle-container").classList.add("hidden");
			document.getElementById("game-op-container").classList.add("hidden");
			document.getElementById("game-algebra-balance-container").classList.add("hidden");
			document.getElementById("game-hcf-lcm-container").classList.add("hidden");
			
			if (table_init == 0){
			let myTableHTML = makeTable(card.num1, card.num2);
			document.getElementById('myTableContainer').innerHTML = myTableHTML;
			table_init = 1;
			}
			//makeTable(card.num1 , card.num2);			
		}
		

function displayDivision(card) {
	
	OngoingOp = 1;
	
	//drawCharts(card.num1, 0, card.num2 , 0);	
	document.getElementById('charts').innerHTML = "";	 // clear any chart
	document.getElementById("game-chart-container").classList.add("hidden");
	document.getElementById("game-angle-container").classList.add("hidden");
	document.getElementById("game-op-container").classList.add("hidden");
	document.getElementById("game-algebra-balance-container").classList.add("hidden");
	document.getElementById("game-hcf-lcm-container").classList.add("hidden");
	
			if (table_init == 0){
			let myTableHTML = makeTable_div(card.num1, card.num2);
			document.getElementById('myTableContainer').innerHTML = myTableHTML;
			table_init = 1;
			}

 
}

// Function to set slider values programmatically
function setSliderValues(a, b, op) {
    let sliderA = document.getElementById("sliderA");
    let sliderB = document.getElementById("sliderB"); 
	let op2 = document.getElementById("operation2");

    sliderA.value = a;
    sliderB.value = b;
	op2.value = op

    updateMath();
}

  // --- Canvas, Context, Displays, Elements ---
    const canvas = document.getElementById('geometryCanvas'); const ctx = canvas.getContext('2d'); const metricsDisplayLeft = document.getElementById('metrics-display-left'); const infoTextDisplay = document.getElementById('info-text'); /* */
    const canvasWidth = canvas.width; /* */
    const canvasHeight = canvas.height; /* */
    const labelSide1 = document.getElementById('labelSide1'); const labelSide2 = document.getElementById('labelSide2'); const labelAngle = document.getElementById('labelAngle'); const sliderAngle = document.getElementById('sliderAngle'); /* */

    // --- Coordinate System Settings (Origin snapped to grid) ---
    const scale = 25; /* */
    const originX = Math.round(canvasWidth / 2 / scale) * scale; /* */
    const originY = Math.round(canvasHeight / 2 / scale) * scale + (scale * 3) ; /* */
    const axisColor = '#aaa'; const axisLabelColor = '#555'; const gridColor = '#e8e8e8'; const pointColor = '#007bff'; const heightColor = '#28a745'; const shapeColor = '#333'; /* */
     // --- Colors ---
    const colorAB = '#ff6347'; const colorBC = '#4682b4'; const colorCD = '#32cd32'; const colorDA = '#ffa500'; const fillColor = 'rgba(200, 200, 255, 0.3)'; /* */
    // --- Tolerance ---
    const epsilon = 0.01; const angleEpsilon = 0.5; /* */
    // --- Global Math Coords ---
    let mthA={}, mthB={}, mthC={}, mthD={}, mthH={}; /* */

    // --- Update Visualization ---
    function updateVisualization() { /* */
        // ... (Reading sliders and adjusting controls remains the same) ...
        const selectedTopic = document.getElementById('geometryTopic').value; /* */ const side1Len = parseFloat(document.getElementById('sliderSide1').value); document.getElementById('valueSide1').innerText = side1Len; /* */ const side2Len = parseFloat(document.getElementById('sliderSide2').value); document.getElementById('valueSide2').innerText = side2Len; /* */ let angleDegrees = parseInt(sliderAngle.value); /* */ if (selectedTopic === 'angle') { labelSide1.innerText = "AB:"; labelSide2.innerText = "BC:"; labelAngle.innerText = "Angle B:"; if (sliderAngle.max !== "360") { sliderAngle.min = 0; sliderAngle.max = 360; angleDegrees = parseInt(sliderAngle.value); } document.getElementById('quad-controls').style.display = 'none'; } else { labelSide1.innerText = "AB:"; labelSide2.innerText = "BC:"; labelAngle.innerText = "Angle B"; if (sliderAngle.max !== "179") { sliderAngle.min = 1; sliderAngle.max = 179; angleDegrees = Math.min(179, Math.max(1, angleDegrees)); sliderAngle.value = angleDegrees; } document.getElementById('quad-controls').style.display = selectedTopic === 'quadrilateral' ? 'block' : 'none'; } document.getElementById('valueAngle').innerText = angleDegrees; /* */ let topLengthCD = 0; if (selectedTopic === 'quadrilateral') { topLengthCD = parseFloat(document.getElementById('sliderTopCD').value); document.getElementById('valueTopCD').innerText = topLengthCD; } /* */

		console.log(selectedTopic);
		console.log(side1Len);
		
        // --- Clear & Draw Background ---
        ctx.clearRect(0, 0, canvasWidth, canvasHeight); metricsDisplayLeft.style.display = 'none'; drawGrid(); drawAxes(); /* */

        // --- Topic Specific Logic ---
        try {
            if (selectedTopic === 'angle') { /* */
                 const angleRad=angleDegrees*(Math.PI/180); mthB={x:0,y:0}; mthA={x:side1Len,y:0}; mthC={x:side2Len*Math.cos(angleRad), y:side2Len*Math.sin(angleRad)}; drawAngle(mathToCanvas(mthA),mathToCanvas(mthB),mathToCanvas(mthC),angleDegrees, side1Len, side2Len, colorAB, colorBC); const angleTypeResult = getAngleType(angleDegrees); metricsDisplayLeft.innerHTML = `Type: ${angleTypeResult.name}<br><span style="font-size:9px; font-weight:normal;">(${angleTypeResult.reason})</span>`; metricsDisplayLeft.style.display='block'; /* */

            } else if (selectedTopic === 'triangle') { /* */
                 const angleBRad=angleDegrees*(Math.PI/180); mthB={x:0,y:0}; mthA={x:side1Len,y:0}; mthC={x:side2Len*Math.cos(angleBRad), y:side2Len*Math.sin(angleBRad)}; const height_tri=Math.abs(mthC.y); mthH={x:mthC.x,y:0}; const sideAC=calculateDistance(mthA,mthC); if(isNaN(sideAC))throw new Error("Calc error."); let angleA_deg=0; if(side1Len>epsilon&&sideAC>epsilon){const cosA=(side1Len**2+sideAC**2-side2Len**2)/(2*side1Len*sideAC); angleA_deg=Math.acos(Math.max(-1,Math.min(1,cosA)))*(180/Math.PI);} let angleC_deg=0; if(side2Len>epsilon&&sideAC>epsilon){const cosC=(side2Len**2+sideAC**2-side1Len**2)/(2*side2Len*sideAC); angleC_deg=Math.acos(Math.max(-1,Math.min(1,cosC)))*(180/Math.PI);} if(Math.abs(angleA_deg+angleDegrees+angleC_deg-180)>angleEpsilon*5){angleC_deg=180-angleA_deg-angleDegrees;} const base_tri=side1Len; const area_tri=0.5*base_tri*height_tri; const perimeter_tri=side1Len+side2Len+sideAC; drawTriangleShape(mathToCanvas(mthA),mathToCanvas(mthB),mathToCanvas(mthC)); drawDottedHeightLine(mathToCanvas(mthC),mathToCanvas(mthH),'H'); const triTypeResult=getTriangleType(side1Len,side2Len,sideAC,angleA_deg,angleDegrees,angleC_deg); metricsDisplayLeft.innerHTML=`<b>Metrics (Triangle):</b><br> AB=${side1Len.toFixed(1)} BC=${side2Len.toFixed(1)} AC≈${sideAC.toFixed(1)}<br> Height CH≈${height_tri.toFixed(1)}<br><hr> ∠A≈${angleA_deg.toFixed(1)}° ∠B=${angleDegrees.toFixed(1)}° ∠C≈${angleC_deg.toFixed(1)}°<br><hr> Perim≈${perimeter_tri.toFixed(1)}<br>Area Formula: 1/2 * Base * Height<br>Area≈${area_tri.toFixed(1)}<br>Type: ${triTypeResult.name}<br><hr><span style="font-size:9px; font-weight:normal;">(${triTypeResult.reason})</span>`; metricsDisplayLeft.style.display='block';  /* */

            } else if (selectedTopic === 'quadrilateral') { /* */
                 if(side1Len<=0||side2Len<=0){handleInvalidInput("Side lengths must be positive."); return;} const angleBRad=angleDegrees*(Math.PI/180); const height=side2Len*Math.sin(angleBRad); if(height<epsilon){handleInvalidInput("Height near zero; invalid shape."); return;} mthB={x:0,y:0}; mthA={x:side1Len,y:0}; mthC={x:side2Len*Math.cos(angleBRad), y:height}; mthD={x:mthC.x-topLengthCD,y:height}; mthH={x:mthC.x, y:0}; const sideBC=side2Len; const sideDA=calculateDistance(mthD,mthA); if(isNaN(sideDA))throw new Error("Calc error."); const angleB_q=angleDegrees; const angleA_q=calculateAngleAtVertex(mthA,mthD,mthB); const angleD_q=calculateAngleAtVertex(mthD,mthC,mthA); const angleC_q=calculateAngleAtVertex(mthC,mthB,mthD); const perimeter_q=side1Len+sideBC+Math.abs(topLengthCD)+sideDA;  drawQuadrilateral(mathToCanvas(mthA),mathToCanvas(mthB),mathToCanvas(mthC),mathToCanvas(mthD)); drawDottedHeightLine(mathToCanvas(mthC),mathToCanvas(mthH),'H'); const quadTypeResult=getQuadrilateralName(side1Len,sideBC,Math.abs(topLengthCD),sideDA,angleA_q,angleB_q,angleC_q,angleD_q,height);let area_q_final=0; console.log(quadTypeResult);if (quadTypeResult.name == "Square" || quadTypeResult.name == "Rectangle" || quadTypeResult.name == "Parallelogram"){area_q_final  = Math.abs(side1Len)*Math.abs(side2Len);}else {area_q_final = 0;}; metricsDisplayLeft.innerHTML=`<b>Metrics (Quad):</b><br> AB=${side1Len.toFixed(1)} BC=${sideBC.toFixed(1)} CD=${Math.abs(topLengthCD).toFixed(1)} DA≈${sideDA.toFixed(1)}<br> Height CH≈${height.toFixed(1)}<br><hr> ∠A≈${angleA_q.toFixed(1)}° ∠B=${angleB_q.toFixed(1)}°<br> ∠C≈${angleC_q.toFixed(1)}° ∠D≈${angleD_q.toFixed(1)}°<br> (Sum: ${(angleA_q+angleB_q+angleC_q+angleD_q).toFixed(0)}°)<br><hr> Perim≈${perimeter_q.toFixed(1)}<br><hr> Type: ${quadTypeResult.name}<br><span style="font-size:9px; font-weight:normal;">(${quadTypeResult.reason})</span>}`; metricsDisplayLeft.style.display='block'; /* */
            }
         } catch (e) { console.error(e); handleInvalidInput("Error during calculation or drawing."); } /* */
    }

     // --- Handle Invalid Input ---
     function handleInvalidInput(message){ /* ... */ ctx.fillStyle='red'; ctx.font='14px Arial'; ctx.textAlign='center'; ctx.fillText(message, canvasWidth/2, 40); ctx.textAlign='left'; metricsDisplayLeft.style.display='none';  } /* */
    // --- Coordinate Transformation ---
    function mathToCanvas(mathPoint){ /* ... */ return { x:originX+mathPoint.x*scale, y:originY-mathPoint.y*scale }; } /* */

    // --- Drawing Functions ---
     function drawGrid(){ /* ... */ ctx.strokeStyle=gridColor; ctx.lineWidth=0.5; for(let x=0; x<=canvasWidth; x+=scale){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvasHeight); ctx.stroke(); } for(let y=0; y<=canvasHeight; y+=scale){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvasWidth,y); ctx.stroke(); } } /* */
     function drawAxes() { // Draws -10 to 10 labels /* */
         ctx.strokeStyle=axisColor; ctx.fillStyle=axisLabelColor; ctx.lineWidth=1; ctx.font='10px Arial'; ctx.beginPath(); ctx.moveTo(0, originY); ctx.lineTo(canvasWidth, originY); ctx.stroke(); ctx.beginPath(); ctx.moveTo(originX, 0); ctx.lineTo(originX, canvasHeight); ctx.stroke(); /* */
         for (let i = -10; i <= 10; i++) { if(i===0)continue; const xPos=originX+i*scale; ctx.beginPath(); ctx.moveTo(xPos, originY-4); ctx.lineTo(xPos, originY+4); ctx.stroke(); if(xPos>5&&xPos<canvasWidth-5)ctx.fillText(i, xPos-(i<0?6:3), originY+15); } /* */
         for (let i = -10; i <= 10; i++) { if(i===0)continue; const yPos=originY-i*scale; ctx.beginPath(); ctx.moveTo(originX-4, yPos); ctx.lineTo(originX+4, yPos); ctx.stroke(); if(yPos>10&&yPos<canvasHeight-5)ctx.fillText(i, originX+8, yPos+3); } ctx.fillText('0', originX-10, originY+15); /* */
     } /* */

    function drawAngle(cvA, cvB, cvC, degrees, len1, len2, color1 = shapeColor, color2 = shapeColor){ // Added vertex coords /* */
        // ... (Draw lines, labels with coords, arc, points - same as previous) ...
        const radians = degrees*(Math.PI/180); ctx.lineWidth=2; ctx.font='bold 10px Arial'; ctx.strokeStyle=color1; ctx.fillStyle=color1; ctx.beginPath(); ctx.moveTo(cvB.x,cvB.y); ctx.lineTo(cvA.x,cvA.y); ctx.stroke(); ctx.fillText(`A (${mthA.x.toFixed(1)},${mthA.y.toFixed(1)})`,cvA.x+5,cvA.y+15); ctx.strokeStyle=color2; ctx.fillStyle=color2; ctx.beginPath(); ctx.moveTo(cvB.x,cvB.y); ctx.lineTo(cvC.x,cvC.y); ctx.stroke(); if(degrees>1&&degrees<359)ctx.fillText(`C (${mthC.x.toFixed(1)},${mthC.y.toFixed(1)})`,cvC.x+5,cvC.y-5); else if(degrees<=1)ctx.fillText(`C≈A`,cvA.x+5,cvA.y-5); ctx.fillStyle=shapeColor; ctx.fillText(`B (${mthB.x.toFixed(1)},${mthB.y.toFixed(1)})`,cvB.x-40,cvB.y+15); ctx.beginPath(); ctx.arc(cvB.x,cvB.y,15,0,-radians,true); ctx.strokeStyle='#d9534f'; ctx.lineWidth=1.5; ctx.stroke(); const tr=22, ta=-radians/2, tx=cvB.x+tr*Math.cos(ta), ty=cvB.y+tr*Math.sin(ta); ctx.fillStyle='#333'; ctx.font='10px Arial'; ctx.fillText(degrees+'°',tx,ty); ctx.fillStyle=pointColor; [cvB,cvA,cvC].forEach(p=>{ctx.beginPath(); ctx.arc(p.x,p.y,3,0,2*Math.PI); ctx.fill();}); ctx.fillStyle=shapeColor; ctx.strokeStyle=shapeColor; ctx.lineWidth=2;
    } /* */

    function drawTriangleShape(cvA, cvB, cvC){ // Added vertex coords and side dashes /* */
         ctx.lineWidth = 2; ctx.font = 'bold 10px Arial'; /* */
         // Fill Area
         ctx.fillStyle = fillColor; ctx.beginPath(); ctx.moveTo(cvA.x, cvA.y); ctx.lineTo(cvB.x, cvB.y); ctx.lineTo(cvC.x, cvC.y); ctx.closePath(); ctx.fill(); /* */
         // Sides
         ctx.strokeStyle = colorAB; ctx.beginPath(); ctx.moveTo(cvA.x, cvA.y); ctx.lineTo(cvB.x, cvB.y); ctx.stroke(); // AB /* */
         ctx.strokeStyle = colorBC; ctx.beginPath(); ctx.moveTo(cvB.x, cvB.y); ctx.lineTo(cvC.x, cvC.y); ctx.stroke(); // BC /* */
         ctx.strokeStyle = colorDA; ctx.beginPath(); ctx.moveTo(cvC.x, cvC.y); ctx.lineTo(cvA.x, cvA.y); ctx.stroke(); // CA /* */

         // --- Side Equality Dashes ---
         const sAB = calculateDistance(mthA, mthB); const sBC = calculateDistance(mthB, mthC); const sAC = calculateDistance(mthC, mthA); /* */
         let dashStyles = {}; let currentStyle = 1; /* */
         const ab_bc = Math.abs(sAB - sBC) < epsilon;
         const bc_ac = Math.abs(sBC - sAC) < epsilon;
         const ac_ab = Math.abs(sAC - sAB) < epsilon;

         if (ab_bc && bc_ac) { // Equilateral
            dashStyles.AB = 1; dashStyles.BC = 1; dashStyles.AC = 1;
         } else if (ab_bc) {
            dashStyles.AB = 1; dashStyles.BC = 1;
            if (ac_ab) { /* Should not happen if equilateral handled */ }
         } else if (bc_ac) {
            dashStyles.BC = 1; dashStyles.AC = 1;
         } else if (ac_ab) {
            dashStyles.AC = 1; dashStyles.AB = 1;
         } // No else needed for scalene

         if(dashStyles.AB) drawSideDash(cvA, cvB, dashStyles.AB); /* */
         if(dashStyles.BC) drawSideDash(cvB, cvC, dashStyles.BC); /* */
         if(dashStyles.AC) drawSideDash(cvC, cvA, dashStyles.AC); /* */

         // Points & Labels with Coords
         const points = [{p:cvA, l:'A', m:mthA}, {p:cvB, l:'B', m:mthB}, {p:cvC, l:'C', m:mthC}]; /* */
         points.forEach(item => { ctx.fillStyle = pointColor; ctx.beginPath(); ctx.arc(item.p.x, item.p.y, 3, 0, 2*Math.PI); ctx.fill(); ctx.fillStyle = shapeColor; ctx.fillText(`${item.l} (${item.m.x.toFixed(1)},${item.m.y.toFixed(1)})`, item.p.x+(item.l==='A'||item.l==='B'?-25:5), item.p.y+(item.l==='A'||item.l==='B'?25:-5)); }); /* */
         ctx.fillStyle = shapeColor; /* */
    } /* */

    function drawQuadrilateral(cvA, cvB, cvC, cvD){ // Added vertex coords and side dashes /* */
        ctx.lineWidth = 2; ctx.font = 'bold 10px Arial'; /* */
        // Fill Area
        ctx.fillStyle = fillColor; ctx.beginPath(); ctx.moveTo(cvA.x, cvA.y); ctx.lineTo(cvB.x, cvB.y); ctx.lineTo(cvC.x, cvC.y); ctx.lineTo(cvD.x, cvD.y); ctx.closePath(); ctx.fill(); /* */
        // Sides: A->B, B->C, C->D, D->A
        ctx.strokeStyle = colorAB; ctx.beginPath(); ctx.moveTo(cvA.x, cvA.y); ctx.lineTo(cvB.x, cvB.y); ctx.stroke(); // AB /* */
        ctx.strokeStyle = colorBC; ctx.beginPath(); ctx.moveTo(cvB.x, cvB.y); ctx.lineTo(cvC.x, cvC.y); ctx.stroke(); // BC /* */
        ctx.strokeStyle = colorCD; ctx.beginPath(); ctx.moveTo(cvC.x, cvC.y); ctx.lineTo(cvD.x, cvD.y); ctx.stroke(); // CD /* */
        ctx.strokeStyle = colorDA; ctx.beginPath(); ctx.moveTo(cvD.x, cvD.y); ctx.lineTo(cvA.x, cvA.y); ctx.stroke(); // DA /* */

        // --- Side Equality Dashes (Revised Logic) ---
        const sAB = calculateDistance(mthA, mthB); const sBC = calculateDistance(mthB, mthC); const sCD = calculateDistance(mthC, mthD); // Use direct distance for CD
        const sDA = calculateDistance(mthD, mthA);
        let qDashStyles = {};
        const ab_eq_bc = Math.abs(sAB - sBC) < epsilon;
        const bc_eq_cd = Math.abs(sBC - sCD) < epsilon;
        const cd_eq_da = Math.abs(sCD - sDA) < epsilon;
        const da_eq_ab = Math.abs(sDA - sAB) < epsilon;
        const ab_eq_cd = Math.abs(sAB - sCD) < epsilon; // Opposite 1
        const bc_eq_da = Math.abs(sBC - sDA) < epsilon; // Opposite 2

        if (ab_eq_bc && bc_eq_cd && cd_eq_da) { // All 4 equal (Rhombus/Square)
            qDashStyles.AB = 1; qDashStyles.BC = 1; qDashStyles.CD = 1; qDashStyles.DA = 1;
        } else {
            let currentStyle = 1;
            if (ab_eq_cd) { // Pair 1 (AB=CD)
                qDashStyles.AB = currentStyle;
                qDashStyles.CD = currentStyle;
            } 
			
			if (bc_eq_da) { // Pair 2 (BC=DA)
                 // If pair 1 was also equal, use style 1, otherwise use next style (1 or 2)
                const style = ab_eq_cd ? currentStyle+1 : currentStyle;
                qDashStyles.BC = style;
                qDashStyles.DA = style;
                if (!ab_eq_cd) currentStyle++; // Increment style only if pair 1 wasn't equal
            }
             // Could add checks for adjacent pairs (kites) but keeping simple for now
        }

        if(qDashStyles.AB) drawSideDash(cvA, cvB, qDashStyles.AB);
        if(qDashStyles.BC) drawSideDash(cvB, cvC, qDashStyles.BC);
        if(qDashStyles.CD) drawSideDash(cvC, cvD, qDashStyles.CD);
        if(qDashStyles.DA) drawSideDash(cvD, cvA, qDashStyles.DA);

        // Points & Labels with Coords
        const points = [{p:cvA, l:'A', m:mthA}, {p:cvB, l:'B', m:mthB}, {p:cvC, l:'C', m:mthC}, {p:cvD, l:'D', m:mthD}]; /* */
        points.forEach(item => { /* ... (labeling adjusted slightly) ... */ ctx.fillStyle = pointColor; ctx.beginPath(); ctx.arc(item.p.x, item.p.y, 3, 0, 2*Math.PI); ctx.fill(); ctx.fillStyle = shapeColor; let lx=item.p.x+5, ly=item.p.y-5; if(item.l==='A'){lx-=25;ly+=30;} if(item.l==='B'){lx-=45; ly+=30;} if(item.l==='D')lx-=45; if(item.l==='C')lx+=3; ctx.fillText(`${item.l} (${item.m.x.toFixed(1)},${item.m.y.toFixed(1)})`, lx, ly); ctx.fillStyle = pointColor; }); /* */
        ctx.fillStyle = shapeColor; /* */
    } /* */

    function drawDottedHeightLine(cvTop, cvFoot, label){ /* ... (same) ... */ ctx.strokeStyle=heightColor; ctx.lineWidth=1.5; ctx.setLineDash([3,3]); ctx.beginPath(); ctx.moveTo(cvTop.x,cvTop.y); ctx.lineTo(cvFoot.x,cvFoot.y); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle=heightColor; ctx.beginPath(); ctx.arc(cvFoot.x,cvFoot.y,3,0,2*Math.PI); ctx.fill(); ctx.font='bold 11px Arial'; ctx.fillText(label, cvFoot.x-5, cvFoot.y+15); ctx.fillStyle=shapeColor; } /* */

    // --- NEW: Draw Side Dash Function ---
    function drawSideDash(cvP1, cvP2, style = 1, length = 8, gap = 4) { // Increased gap
        const midX = (cvP1.x + cvP2.x) / 2; const midY = (cvP1.y + cvP2.y) / 2; const angle = Math.atan2(cvP2.y - cvP1.y, cvP2.x - cvP1.x); const perpAngle = angle + Math.PI / 2; /* */
        ctx.strokeStyle = shapeColor; ctx.lineWidth = 1.5; /* */
        for (let i = 0; i < style; i++) { /* */
            const offset = (i - (style - 1) / 2) * (length/1.5 + gap) ; // Adjusted spacing /* */
            const startX = midX + offset * Math.cos(angle) - length / 2 * Math.cos(perpAngle); const startY = midY + offset * Math.sin(angle) - length / 2 * Math.sin(perpAngle); const endX = midX + offset * Math.cos(angle) + length / 2 * Math.cos(perpAngle); const endY = midY + offset * Math.sin(angle) + length / 2 * Math.sin(perpAngle); /* */
            ctx.beginPath(); ctx.moveTo(startX, startY); ctx.lineTo(endX, endY); ctx.stroke(); /* */
        } ctx.lineWidth = 2; // Reset line width /* */
    }

    // --- Type Classification ---
    function getAngleType(degrees){ // Returns {name, reason} /* */
        degrees=degrees%360; if(degrees<0)degrees+=360; /* */
        if(Math.abs(degrees-0)<epsilon||Math.abs(degrees-360)<epsilon) return{name:"Zero/Full", reason:"Angle = 0°/360°"}; /* */
        if(degrees>0&&degrees<90) return{name:"Acute", reason:"0° < Angle < 90°"}; /* */
        if(Math.abs(degrees-90)<angleEpsilon) return{name:"Right", reason:"Angle = 90°"}; /* */
        if(degrees>90&&degrees<180) return{name:"Obtuse", reason:"90° < Angle < 180°"}; /* */
        if(Math.abs(degrees-180)<angleEpsilon) return{name:"Straight", reason:"Angle = 180°"}; /* */
        if(degrees>180&&degrees<360) return{name:"Reflex", reason:"180° < Angle < 360°"}; /* */
        return{name:"Unknown", reason:""}; } /* */

    function getTriangleType(sAB, sBC, sAC, aA, aB, aC){ // Returns {name, reason} /* */
        // ... (same logic) ... /* */
        let sideType="", angleType="", sideReason="", angleReason=""; const ab_bc=Math.abs(sAB-sBC)<epsilon; const bc_ac=Math.abs(sBC-sAC)<epsilon; const ac_ab=Math.abs(sAC-sAB)<epsilon; if(ab_bc&&bc_ac){sideType="Equilateral"; sideReason="AB = BC = CA";} else if(ab_bc||bc_ac||ac_ab){sideType="Isosceles"; sideReason=ab_bc?"AB = BC":bc_ac?"BC = CA":"CA = AB";} else{sideType="Scalene"; sideReason="All sides different";} const isRight=Math.abs(aA-90)<angleEpsilon||Math.abs(aB-90)<angleEpsilon||Math.abs(aC-90)<angleEpsilon; const isObtuse=aA>90+angleEpsilon||aB>90+angleEpsilon||aC>90+angleEpsilon; if(isRight){angleType="Right"; angleReason=Math.abs(aA-90)<angleEpsilon?"∠A=90°":Math.abs(aB-90)<angleEpsilon?"∠B=90°":"∠C=90°";} else if(isObtuse){angleType="Obtuse"; angleReason=aA>90?"∠A>90°":aB>90?"∠B>90°":"∠C>90°";} else{angleType="Acute"; angleReason="All angles < 90°";} return{name:`${sideType} ${angleType}`, reason:`${sideReason}; ${angleReason}`};
    } /* */

    function getQuadrilateralName(sAB, sBC, sCD, sDA, aA, aB, aC, aD, height){ // Returns {name, reason} /* */
         // Use Math.abs(sCD) for length comparison /* */
         const absCD = Math.abs(sCD); /* */
         const isParallelAB_CD=true; const slopeBC=(mthC.y-mthB.y)/(mthC.x-mthB.x); const slopeDA=(mthA.y-mthD.y)/(mthA.x-mthD.x); const isBCV=Math.abs(mthC.x-mthB.x)<epsilon; const isDAV=Math.abs(mthA.x-mthD.x)<epsilon; let isParallelBC_DA=false; if(isBCV&&isDAV)isParallelBC_DA=true; else if(!isBCV&&!isDAV)isParallelBC_DA=Math.abs(slopeBC-slopeDA)<epsilon; const isRA=Math.abs(aA-90)<angleEpsilon; const isRB=Math.abs(aB-90)<angleEpsilon; const isRC=Math.abs(aC-90)<angleEpsilon; const isRD=Math.abs(aD-90)<angleEpsilon; const allRA=isRA&&isRB&&isRC&&isRD; const nonParEq=Math.abs(sBC-sDA)<epsilon; const allSidesEq=Math.abs(sAB-sBC)<epsilon&&Math.abs(sBC-absCD)<epsilon&&Math.abs(absCD-sDA)<epsilon; let name="Trapezoid", reason="AB || CD"; if(isParallelBC_DA){name="Parallelogram"; reason="AB||CD & BC||DA"; if(allSidesEq){name="Rhombus"; reason="Parallelogram w/ AB=BC=CD=DA"; if(allRA){name="Square"; reason="Rhombus w/ all ∠=90°";}}else if(allRA){name="Rectangle"; reason="Parallelogram w/ all ∠=90°";}}else if(nonParEq){name="Isosceles Trapezoid"; reason="Trapezoid w/ BC=DA";} if(sCD<0){name="Crossed Quadrilateral"; reason="CD length < 0";} return{name:name, reason:reason}; /* */
    } /* */


    // --- Calculation and Display ---
    function calculateDistance(p1, p2){ /* ... */ return Math.sqrt(Math.pow(p2.x-p1.x, 2)+Math.pow(p2.y-p1.y, 2)); } /* */
    function calculateAngleAtVertex(V, P_prev, P_next) { // Order: P_prev -> V -> P_next CCW? /* */
        const v1x = P_prev.x - V.x; const v1y = P_prev.y - V.y; const v2x = P_next.x - V.x; const v2y = P_next.y - V.y; /* */
        let angle = Math.atan2(v2y, v2x) - Math.atan2(v1y, v1x); if (angle < 0) angle += 2 * Math.PI; /* */
        let degrees = angle * (180 / Math.PI); if (Math.abs(degrees) < angleEpsilon) return 0; /* */
        if (Math.abs(degrees - 180) < angleEpsilon) return 180; if (Math.abs(degrees - 360) < angleEpsilon) return 0; return degrees; /* */
    } /* */


function displayVisualAngle(card){
	
	OngoingOp = 6;
	
	document.getElementById('myTableContainer').innerHTML = ""; // clear any table
	document.getElementById("game-chart-container").classList.add("hidden");
	document.getElementById("game-op-container").classList.add("hidden");
	
	
	document.getElementById("game-angle-container").classList.remove("hidden");
	document.getElementById("game-algebra-balance-container").classList.add("hidden");
	document.getElementById("game-hcf-lcm-container").classList.add("hidden");
	
	
   updateVisualization();
}

function displayOp(card){
	
	OngoingOp = 5;
	
	document.getElementById('myTableContainer').innerHTML = ""; // clear any table
	document.getElementById("game-chart-container").classList.add("hidden");
	document.getElementById("game-angle-container").classList.add("hidden");
	document.getElementById("game-algebra-balance-container").classList.add("hidden");
	document.getElementById("game-op-container").classList.remove("hidden");
	document.getElementById("game-hcf-lcm-container").classList.add("hidden");
	
   setSliderValues(card.num1 ,card.num2 , card.operator )
}

/* Angle,Triangle , Quadrilateral

valueSide1
valueSide2
valueAngle
valueTopCD */

// Function to set slider values programmatically
function setAngleSliderValues(card) {
	
	console.log(card);
	
    let sliderAB = document.getElementById("sliderSide1");
    let sliderBC = document.getElementById("sliderSide2"); 
	let sliderCD = document.getElementById("sliderTopCD"); 
	let sliderAngleB = document.getElementById("sliderAngle"); 
	let geoTopic = document.getElementById("geometryTopic");

  
	
	if (card.Type){
	geoTopic.value = card.Type;
	} else {
		geoTopic.value = "Quadrilateral";
	}	
	
	if (card.AB){
	sliderAB.value = card.AB;
	} else {
		sliderAB.value = 0;
	}
	
	if (card.BC){
	sliderBC.value = card.BC;
	} else {
		sliderBC.value = 0;
	}	

		if (card.angle_B){
	sliderAngleB.value = card.angle_B;
	} else {
		sliderAngleB.value = 0;
	}
	
	if (card.CD){
	sliderCD.value = card.CD;
	} else {
		sliderCD.value = 0;
	}

    updateVisualization();
}

function displayAngleTriangleQuad(card){
	
	OngoingOp = 7;
	
	
	

	
		document.getElementById('myTableContainer').innerHTML = ""; // clear any table
	document.getElementById("game-chart-container").classList.add("hidden");
	document.getElementById("game-op-container").classList.add("hidden");
	document.getElementById("game-algebra-balance-container").classList.add("hidden");
	document.getElementById("game-angle-container").classList.remove("hidden");
	document.getElementById("game-hcf-lcm-container").classList.add("hidden");
	
   setAngleSliderValues(card )
}


const balanceCanvas = document.getElementById('balanceCanvas');
 const balanceCtx = balanceCanvas.getContext('2d');
 
 console.log(document);

// --- Slider and Value Displays ---

 /*  BalSliderA
   BalSliderA
   BalSliderA */
                 

console.log(document.getElementById('BalSliderA'));
 const BalsliderA = document.getElementById('BalSliderA');
 const BalvalueA = document.getElementById('BalvalueA');
 const BalsliderX = document.getElementById('BalSliderX');
 const BalvalueX = document.getElementById('BalvalueX');
 const BalsliderB = document.getElementById('BalSliderB');
 const BalvalueB = document.getElementById('BalvalueB');
 const BalsliderD = document.getElementById('BalSliderD');
 const BalvalueD = document.getElementById('BalvalueD');
 const BalsliderC = document.getElementById('BalSliderC');
 const BalvalueC = document.getElementById('BalvalueC');
 const equationDisplay = document.getElementById('equation');

// --- Action Sliders and Buttons ---
 const kConstSlider = document.getElementById('kConstSlider');
 const BalvalKConst = document.getElementById('BalvalKConst');
 const btnAddConst = document.getElementById('btnAddConst');
 const btnSubConst = document.getElementById('btnSubConst');
 const btnMultiplyConst = document.getElementById('btnMultiplyConst');
 const btnDivideConst = document.getElementById('btnDivideConst');


 const kX = document.getElementById('kX');
 const BalvalKX = document.getElementById('BalvalKX');
 const btnAddX = document.getElementById('btnAddX');
 const btnSubX = document.getElementById('btnSubX');
 //const btnMultiplyX = document.getElementById('btnMultiplyX');
 //const btnDivideX = document.getElementById('btnDivideX');


// --- Constants for Drawing (Adjusted for 600x400 balanceCanvas) ---
 const scaleBaseY = balanceCanvas.height - 50;
 const scaleBaseWidth = 150;
 const scalePillarHeight = balanceCanvas.height * 0.7;
 const scalePillarX = balanceCanvas.width / 2;
 const scaleBeamY = scaleBaseY - scalePillarHeight;
 const scaleBeamLength = balanceCanvas.width * 0.75;
 const panWidth = 120;
 const panHeight = 15;
 const panStringLength = 90;
 const maxTiltAngle = Math.PI / 18;
 const tiltMultiplier = 0.02;

 const itemSize = 18;
 const itemPadding = 4;
 const constantRadius = 16;
 const baseFontSize = 12;

// --- Colors ---
 const colorPositive = '#5bc0de';
 const colorNegative = '#d9534f';
 const colorXPositive = '#5cb85c';
 const colorXNegative = '#f0ad4e';
 const colorScale = '#5a6268';
 const colorBeam = '#868e96';
 const colorPan = '#adb5bd';
 const colorString = '#495057';
 const colorTextLight = '#fff';
 const colorTextDark = '#212529';

// --- Drawing Functions ---

 function drawScaleBase(balanceCtx) {
     balanceCtx.fillStyle = colorScale;
     balanceCtx.fillRect(scalePillarX - scaleBaseWidth / 2, scaleBaseY, scaleBaseWidth, 20);
     balanceCtx.fillRect(scalePillarX - 10, scaleBeamY, 20, scalePillarHeight);
     balanceCtx.beginPath();
     balanceCtx.moveTo(scalePillarX - 15, scaleBeamY);
     balanceCtx.lineTo(scalePillarX + 15, scaleBeamY);
     balanceCtx.lineTo(scalePillarX, scaleBeamY - 15);
     balanceCtx.closePath();
     balanceCtx.fillStyle = '#343a40';
     balanceCtx.fill();
 }

 function drawScaleBeamAndPans(balanceCtx, tiltAngle) {
     balanceCtx.save();
     balanceCtx.translate(scalePillarX, scaleBeamY);
     balanceCtx.rotate(tiltAngle);

     balanceCtx.lineWidth = 8;
     balanceCtx.strokeStyle = colorBeam;
     balanceCtx.beginPath();
     balanceCtx.moveTo(-scaleBeamLength / 2, 0);
     balanceCtx.lineTo(scaleBeamLength / 2, 0);
     balanceCtx.stroke();

     const leftPanAttachX = -scaleBeamLength / 2 + 30;
     const rightPanAttachX = scaleBeamLength / 2 - 30;
     const panAttachY = 0;

     balanceCtx.lineWidth = 2;
     balanceCtx.strokeStyle = colorString;

     const leftPanBaseY = panAttachY + panStringLength;
     balanceCtx.beginPath();
     balanceCtx.moveTo(leftPanAttachX, panAttachY);
     balanceCtx.lineTo(leftPanAttachX - panWidth / 2 + 15, leftPanBaseY);
     balanceCtx.moveTo(leftPanAttachX, panAttachY);
     balanceCtx.lineTo(leftPanAttachX + panWidth / 2 - 15, leftPanBaseY);
     balanceCtx.stroke();
     balanceCtx.fillStyle = colorPan;
     balanceCtx.fillRect(leftPanAttachX - panWidth / 2, leftPanBaseY, panWidth, panHeight);

     const rightPanBaseY = panAttachY + panStringLength;
     balanceCtx.beginPath();
     balanceCtx.moveTo(rightPanAttachX, panAttachY);
     balanceCtx.lineTo(rightPanAttachX - panWidth / 2 + 15, rightPanBaseY);
     balanceCtx.moveTo(rightPanAttachX, panAttachY);
     balanceCtx.lineTo(rightPanAttachX + panWidth / 2 - 15, rightPanBaseY);
     balanceCtx.stroke();
     balanceCtx.fillStyle = colorPan;
     balanceCtx.fillRect(rightPanAttachX - panWidth / 2, rightPanBaseY, panWidth, panHeight);

     balanceCtx.restore();
 }

 function drawXBox(balanceCtx, drawX, drawY, color) {
     balanceCtx.fillStyle = color;
     balanceCtx.strokeStyle = colorTextDark;
     balanceCtx.lineWidth = 1.5;
     balanceCtx.fillRect(drawX - itemSize / 2, drawY - itemSize / 2, itemSize, itemSize);
     balanceCtx.strokeRect(drawX - itemSize / 2, drawY - itemSize / 2, itemSize, itemSize);
     balanceCtx.fillStyle = colorTextLight;
     balanceCtx.font = `bold ${baseFontSize}px Arial`;
     balanceCtx.textAlign = 'center';
     balanceCtx.textBaseline = 'middle';
     balanceCtx.fillText('x', drawX, drawY + 1);
 }

 function drawConstantCircle(balanceCtx, drawX, drawY, value, color) {
     let radius = constantRadius;
     let fontSize = baseFontSize + 2;
     const valueStr = Number.isInteger(value) ? value.toString() : value.toFixed(1);

     balanceCtx.fillStyle = color;
     balanceCtx.strokeStyle = colorTextDark;
     balanceCtx.lineWidth = 1.5;
     balanceCtx.beginPath();
     balanceCtx.arc(drawX, drawY, radius, 0, Math.PI * 2);
     balanceCtx.fill();
     balanceCtx.stroke();
     balanceCtx.fillStyle = colorTextLight;
     balanceCtx.font = `bold ${fontSize}px Arial`;
     balanceCtx.textAlign = 'center';
     balanceCtx.textBaseline = 'middle';
     balanceCtx.fillText(valueStr, drawX, drawY + 1);
 }

 function arrangeItems(balanceCtx, panCenterX, panTopY, coeffValue, itemType, colorPositive, colorNegative, displayValue = null) {
     const valueToDraw = (itemType === 'constant') ? displayValue : coeffValue;
     if (Math.abs(valueToDraw) < 0.01) return 0;

     if (itemType === 'constant') {
         const color = valueToDraw > 0 ? colorPositive : colorNegative;
         drawConstantCircle(balanceCtx, panCenterX, panTopY - constantRadius - itemPadding, valueToDraw, color);
         return constantRadius * 2 + itemPadding * 2;
     } else if (itemType === 'x') {
         const numBoxes = Math.round(Math.abs(valueToDraw));
         if (numBoxes === 0) return 0;
         const boxColor = valueToDraw > 0 ? colorXPositive : colorXNegative;
         const itemsPerRowX = Math.floor(panWidth / (itemSize + itemPadding * 2)) || 1;
         const totalRowsX = Math.ceil(numBoxes / itemsPerRowX);
         const startY = panTopY - (itemSize / 2) - itemPadding;
         let itemsDrawn = 0;
         let totalHeight = 0;

         for (let r = 0; r < totalRowsX; r++) {
             const itemsInThisRow = Math.min(numBoxes - itemsDrawn, itemsPerRowX);
             if (itemsInThisRow <= 0) break;

             const thisRowWidth = itemsInThisRow * itemSize + Math.max(0, itemsInThisRow - 1) * itemPadding;
             let currentX = panCenterX - thisRowWidth / 2 + itemSize / 2;
             const currentY = startY - r * (itemSize + itemPadding);
             for (let i = 0; i < itemsInThisRow; i++) {
                 if (itemsDrawn < numBoxes) {
                     drawXBox(balanceCtx, currentX, currentY, boxColor);
                     currentX += (itemSize + itemPadding);
                     itemsDrawn++;
                 }
             }
             totalHeight = (r + 1) * itemSize + r * itemPadding;
         }
         return totalHeight + itemPadding * 2;
     }
     return 0;
 }

// --- Main Update Function ---
 function updateVisualizationBalance(sourceSlider = null) {
     const a = parseFloat(BalsliderA.value);
     const x = parseFloat(BalsliderX.value);
     const b = parseFloat(BalsliderB.value);
     const d = parseFloat(BalsliderD.value);
     const c = parseFloat(BalsliderC.value);

     BalvalueA.textContent = a.toFixed(1);
     BalvalueX.textContent = x.toFixed(1);
     BalvalueB.textContent = b.toFixed(1);
     BalvalueD.textContent = d.toFixed(1);
     BalvalueC.textContent = c.toFixed(1);
     BalvalKConst.textContent = parseFloat(kConstSlider.value).toFixed(1); 
     BalvalKX.textContent = parseFloat(kX.value).toFixed(1);

     const formatNum = (num) => {
         const fixed = num.toFixed(1);
         return fixed.endsWith('.0') ? fixed.slice(0, -2) : fixed;
     };
     const bSign = b >= 0 ? '+' : '-';
     const bAbsStr = formatNum(Math.abs(b));
     const aNum = a;
     const dNum = d;
     const cNum = c;
     let aStr = '';
     if (Math.abs(aNum - 1) < 0.01) aStr = '';
     else if (Math.abs(aNum + 1) < 0.01) aStr = '-';
     else if (Math.abs(aNum) > 0.01) aStr = formatNum(aNum);
     const aTerm = Math.abs(aNum) < 0.01 ? '' : `${aStr}x`;
     let dStr = '';
     if (Math.abs(dNum - 1) < 0.01) dStr = 'x';
     else if (Math.abs(dNum + 1) < 0.01) dStr = '-x';
     else if (Math.abs(dNum) > 0.01) dStr = `${formatNum(dNum)}x`;
     let cStr = '';
     let cSign = '';
     if (Math.abs(cNum) > 0.01) {
         cSign = cNum >= 0 ? '+' : '-';
         cStr = formatNum(Math.abs(cNum));
     }
     let rightSideStr = "";
     if (dStr) {
         rightSideStr += dStr;
         if (cStr) { rightSideStr += ` ${cSign} ${cStr}`; }
     } else if (cStr) {
         rightSideStr = `${cNum >= 0 ? '' : '-'}${cStr}`;
     } else {
         rightSideStr = "0";
     }
     let leftSideStr = "";
     if (aTerm) {
         leftSideStr += aTerm;
         if (Math.abs(b) > 0.01) {
             leftSideStr += ` ${bSign} ${bAbsStr}`;
         }
     } else if (Math.abs(b) > 0.01) {
          leftSideStr = `${b >= 0 ? '' : '-'}${bAbsStr}`;
     } else {
         leftSideStr = "0";
     }
     equationDisplay.textContent = `${leftSideStr} = ${rightSideStr}`;

     const leftValue = a * x + b;
     const rightValue = d * x + c;
     const tolerance = 0.01;
     const isBalanced = Math.abs(leftValue - rightValue) < tolerance;
     if (isBalanced) {
         equationDisplay.classList.remove('unbalanced'); equationDisplay.classList.add('balanced');
     } else {
         equationDisplay.classList.remove('balanced'); equationDisplay.classList.add('unbalanced');
     }

     const valueDifference = leftValue - rightValue;
     let tiltAngle = Math.max(-maxTiltAngle, Math.min(maxTiltAngle, valueDifference * -tiltMultiplier));

     balanceCtx.clearRect(0, 0, balanceCanvas.width, balanceCanvas.height);
     drawScaleBase(balanceCtx);

     const leftAttachGlobal = rotatePoint(-scaleBeamLength / 2 + 30, 0, tiltAngle, scalePillarX, scaleBeamY);
     const rightAttachGlobal = rotatePoint(scaleBeamLength / 2 - 30, 0, tiltAngle, scalePillarX, scaleBeamY);
     const leftPanDrawY = leftAttachGlobal.y + panStringLength + panHeight;
     const rightPanDrawY = rightAttachGlobal.y + panStringLength + panHeight;

     drawScaleBeamAndPans(balanceCtx, tiltAngle);

     let yLeft = leftPanDrawY;
     let heightB = arrangeItems(balanceCtx, leftAttachGlobal.x, yLeft, b, 'constant', colorPositive, colorNegative, b);
     let heightAX = arrangeItems(balanceCtx, leftAttachGlobal.x, yLeft - heightB, a, 'x', colorXPositive, colorXNegative);

     let yRight = rightPanDrawY;
     let heightC = arrangeItems(balanceCtx, rightAttachGlobal.x, yRight, c, 'constant', colorPositive, colorNegative, c);
     let heightDX = arrangeItems(balanceCtx, rightAttachGlobal.x, yRight - heightC, d, 'x', colorXPositive, colorXNegative);
 }

 function rotatePoint(xRel, yRel, angle, pivotX, pivotY) {
     const cosA = Math.cos(angle);
     const sinA = Math.sin(angle);
     const xRot = xRel * cosA - yRel * sinA;
     const yRot = xRel * sinA + yRel * cosA;
     return { x: xRot + pivotX, y: yRot + pivotY };
 }

 function roundTo(num, places) {
     const factor = 10 ** places;
     return Math.round((num + Number.EPSILON) * factor) / factor;
 }
  

// --- Action Handlers ---

 btnAddConst.addEventListener('click', () => {
     const k = parseFloat(kConstSlider.value);
     BalsliderB.value = roundTo(parseFloat(BalsliderB.value) + k, 2);
     BalsliderC.value = roundTo(parseFloat(BalsliderC.value) + k, 2);
     updateVisualizationBalance('action');
 });
 btnSubConst.addEventListener('click', () => {
     const k = parseFloat(kConstSlider.value);
     BalsliderB.value = roundTo(parseFloat(BalsliderB.value) - k, 2);
     BalsliderC.value = roundTo(parseFloat(BalsliderC.value) - k, 2);
     updateVisualizationBalance('action');
 });
 btnMultiplyConst.addEventListener('click', () => {
     const k = parseFloat(kConstSlider.value);
     if (Math.abs(k) < 0.01) {
         console.warn("Multiplication by zero. Resetting equation to 0 = 0.");
         BalsliderA.value = 0; BalsliderB.value = 0; BalsliderD.value = 0; BalsliderC.value = 0;
     } else {
         BalsliderA.value = roundTo(parseFloat(BalsliderA.value) * k, 2);
         BalsliderB.value = roundTo(parseFloat(BalsliderB.value) * k, 2);
         BalsliderD.value = roundTo(parseFloat(BalsliderD.value) * k, 2);
         BalsliderC.value = roundTo(parseFloat(BalsliderC.value) * k, 2);
     }
     updateVisualizationBalance('action');
 });
 btnDivideConst.addEventListener('click', () => {
     const k = parseFloat(kConstSlider.value);
     if (Math.abs(k) < 0.01) {
         alert("Error: Cannot divide by zero!");
         kConstSlider.value = (k >= 0 ? 0.1 : -0.1);
         valKConst.textContent = parseFloat(kConstSlider.value).toFixed(1);
         return;
     }
     BalsliderA.value = roundTo(parseFloat(BalsliderA.value) / k, 2);
     BalsliderB.value = roundTo(parseFloat(BalsliderB.value) / k, 2);
     BalsliderD.value = roundTo(parseFloat(BalsliderD.value) / k, 2);
     BalsliderC.value = roundTo(parseFloat(BalsliderC.value) / k, 2);
     updateVisualizationBalance('action');
 });


 btnAddX.addEventListener('click', () => {
     const k = parseFloat(kX.value);
     BalsliderA.value = roundTo(parseFloat(BalsliderA.value) + k, 2);
     BalsliderD.value = roundTo(parseFloat(BalsliderD.value) + k, 2);
     updateVisualizationBalance('action');
 });
 btnSubX.addEventListener('click', () => {
     const k = parseFloat(kX.value);
     BalsliderA.value = roundTo(parseFloat(BalsliderA.value) - k, 2);
     BalsliderD.value = roundTo(parseFloat(BalsliderD.value) - k, 2);
     updateVisualizationBalance('action');
 });



// --- Event Listeners for value displays (Action Sliders) ---
 kConstSlider.addEventListener('input', () => {
     let currentVal = parseFloat(kConstSlider.value);
     if (Math.abs(currentVal) < 0.01 && (event?.target === btnDivideConst)) {
         currentVal = 0.1 * Math.sign(currentVal || 1);
         kConstSlider.value = currentVal;
     }
     BalvalKConst.textContent = parseFloat(kConstSlider.value).toFixed(1);
 });
 kX.addEventListener('input', () => {
      let currentVal = parseFloat(kX.value);
      if (Math.abs(currentVal) < 0.01 && (event?.target === btnDivideX)) {
         currentVal = 0.1 * Math.sign(currentVal || 1);
         kX.value = currentVal;
     }
     BalvalKX.textContent = parseFloat(kX.value).toFixed(1);
 });

// --- Event Listeners for main sliders ---
 BalsliderA.addEventListener('input', () => { updateVisualizationBalance(); });
 BalsliderX.addEventListener('input', () => { updateVisualizationBalance(); });
 BalsliderB.addEventListener('input', () => { updateVisualizationBalance(); });
 BalsliderD.addEventListener('input', () => { updateVisualizationBalance(); });
 BalsliderC.addEventListener('input', () => { updateVisualizationBalance(); });
  

function displayVisualBalance(card){
	
	OngoingOp = 8 ;
	
	document.getElementById('myTableContainer').innerHTML = ""; // clear any table
	document.getElementById("game-chart-container").classList.add("hidden");
	document.getElementById("game-op-container").classList.add("hidden");	
	document.getElementById("game-angle-container").classList.add("hidden");	
//document.getElementById("game-algebra-balance-container").classList.add("hidden");
document.getElementById("game-hcf-lcm-container").classList.add("hidden");

document.getElementById("game-algebra-balance-container").classList.remove("hidden");
	
 
 
// --- Initial Draw ---
 updateVisualizationBalance();
 
}

  function hcfCalcGenerateTree() {
            const num1 = parseInt(document.getElementById('hcflcm_num1').value);
            const num2 = parseInt(document.getElementById('hcflcm_num2').value);
            if (isNaN(num1) || isNaN(num2)) return;

            function isPrime(num) {
                if (num < 2) return false;
                for (let i = 2; i * i <= num; i++) {
                    if (num % i === 0) return false;
                }
                return true;
            }

            const hcfSvg = document.getElementById('hcfCalcTree');
            const lcmSvg = document.getElementById('lcmCalcTree');
            hcfSvg.innerHTML = '';
            lcmSvg.innerHTML = '';

            function drawNode(svg, x, y, value) {
                let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", x);
                circle.setAttribute("cy", y);
                circle.setAttribute("r", 20);
                circle.classList.add("hcfCalcCircle");

                if (isPrime(value)) {
                    circle.setAttribute("style", "fill: #ffcc00;"); // Highlight prime numbers
                }

                svg.appendChild(circle);

                let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                text.setAttribute("x", x);
                text.setAttribute("y", y);
                text.classList.add("hcfCalcText");
                text.textContent = value;
                svg.appendChild(text);

                return {
                    x,
                    y
                };
            }

            function drawLine(svg, x1, y1, x2, y2, color = "#777", width = "2") {
                let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.setAttribute("x1", x1);
                line.setAttribute("y1", y1);
                line.setAttribute("x2", x2);
                line.setAttribute("y2", y2);
                line.setAttribute("stroke", color);
                line.setAttribute("stroke-width", width);
                svg.appendChild(line);
            }

            function factorize(svg, number, x, y, level = 0, dx = 100, dy = 60) {
                if (number <= 1) {
                    drawNode(svg, x, y, number);
                    return;
                }

                let node = drawNode(svg, x, y, number);

                // **Stop recursion if the number is prime**
                if (isPrime(number)) return;

                let foundFactor = false;

                for (let i = 2; i <= Math.sqrt(number); i++) {
                    if (number % i === 0) {
                        let factor1 = i;
                        let factor2 = number / i;

                        let xLeft = x - dx; // Left for prime factor
                        let yLeft = y + dy;
                        let xRight = x + dx; // Right for composite factor
                        let yRight = y + dy;

                        drawLine(svg, node.x, node.y + 20, xLeft, yLeft - 20);
                        drawLine(svg, node.x, node.y + 20, xRight, yRight - 20);

                        factorize(svg, factor1, xLeft, yLeft, level + 1, dx * 0.7, dy);
                        factorize(svg, factor2, xRight, yRight, level + 1, dx * 0.7, dy);
                        foundFactor = true;
                        break;
                    }
                }

                if (!foundFactor) {
                    drawNode(svg, x - dx, y + dy, number); // Keep prime numbers on left
                    drawLine(svg, node.x, node.y + 20, x - dx, y + dy - 20);
                }
            }

            factorize(hcfSvg, num1, 250, 50);
            factorize(lcmSvg, num2, 250, 50);
            document.getElementById('hcfCalcButton').style.display = 'inline-block';
        }

        function getPrimeFactorExponents(num) {
            let factors = {};
            for (let i = 2; i <= num; i++) {
                while (num % i === 0) {
                    factors[i] = (factors[i] || 0) + 1;
                    num /= i;
                }
            }
            return factors;
        }

        function formatExponentSVG(base, exponent) {
            let textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
            let tspanBase = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
            let tspanExp = document.createElementNS("http://www.w3.org/2000/svg", "tspan");

            tspanBase.textContent = base;
            textElement.appendChild(tspanBase);

            if (exponent > 1) {
                tspanExp.textContent = exponent;
                tspanExp.setAttribute("dy", "-5");
                tspanExp.setAttribute("font-size", "12");
                textElement.appendChild(tspanExp);
            }
            return textElement;
        }

        function drawVennDiagram(a, b) {
            let factorsA = getPrimeFactorExponents(a);
            let factorsB = getPrimeFactorExponents(b);
            let commonFactors = {};
            let uniqueA = {};
            let uniqueB = {};

            for (let factor in factorsA) {
                if (factor in factorsB) {
                    commonFactors[factor] = Math.min(factorsA[factor], factorsB[factor]);
                } else {
                    uniqueA[factor] = factorsA[factor];
                }
            }
            for (let factor in factorsB) {
                if (!(factor in factorsA)) {
                    uniqueB[factor] = factorsB[factor];
                }
            }

            let svg = document.getElementById("hcfCalcCircles");
            svg.innerHTML = "";

            let leftCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            leftCircle.setAttribute("cx", "150");
            leftCircle.setAttribute("cy", "100");
            leftCircle.setAttribute("r", "100"); // Make the circles bigger
            leftCircle.setAttribute("fill", "blue");
            leftCircle.setAttribute("opacity", "0.5");
            svg.appendChild(leftCircle);

            let rightCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            rightCircle.setAttribute("cx", "300");
            rightCircle.setAttribute("cy", "100");
            rightCircle.setAttribute("r", "100"); // Make the circles bigger
            rightCircle.setAttribute("fill", "red");
            rightCircle.setAttribute("opacity", "0.5");
            svg.appendChild(rightCircle);

            let xOffset = 150,
                yOffset = 100;
            let i = 0;
            for (let factor in uniqueA) {
                let g = document.createElementNS("http://www.w3.org/2000/svg", "g"); // Group to hold circle and text
                let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", xOffset - 80); // Position the circle
                circle.setAttribute("cy", yOffset + i * 20);
                circle.setAttribute("r", 12); // Radius of the small circle
                circle.setAttribute("fill", "white");
                circle.setAttribute("stroke", "black");
                g.appendChild(circle);

                let text = formatExponentSVG(factor, uniqueA[factor]);
                text.setAttribute("x", xOffset - 80); // Position the text
                text.setAttribute("y", yOffset + i * 20 + 5); // Adjust for vertical centering
                text.setAttribute("text-anchor", "middle");
                g.appendChild(text);
                svg.appendChild(g);
                i++;
            }

            i = 0;
            for (let factor in commonFactors) {
                let g = document.createElementNS("http://www.w3.org/2000/svg", "g"); // Group to hold circle and text
                let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", xOffset + 70); // Position the circle
                circle.setAttribute("cy", yOffset + i * 20);
                circle.setAttribute("r", 12); // Radius of the small circle
                circle.setAttribute("fill", "white");
                circle.setAttribute("stroke", "black");
                g.appendChild(circle);

                let text = formatExponentSVG(factor, commonFactors[factor]);
                text.setAttribute("x", xOffset + 70); // Position the text
                text.setAttribute("y", yOffset + i * 20 + 5); // Adjust for vertical centering
                g.appendChild(text);
                svg.appendChild(g);
                i++;
            }

            i = 0;
            for (let factor in uniqueB) {
                let g = document.createElementNS("http://www.w3.org/2000/svg", "g"); // Group to hold circle and text
                let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", xOffset + 220); // Position the circle
                circle.setAttribute("cy", yOffset + i * 20);
                circle.setAttribute("r", 12); // Radius of the small circle
                circle.setAttribute("fill", "white");
                circle.setAttribute("stroke", "black");
                g.appendChild(circle);

                let text = formatExponentSVG(factor, uniqueB[factor]);
                text.setAttribute("x", xOffset + 220); // Position the text
                text.setAttribute("y", yOffset + i * 20 + 5); // Adjust for vertical centering
                g.appendChild(text);
                svg.appendChild(g);
                i++;
            }
        }

        function hcfCalcDisplayHCF() {
            const num1 = parseInt(document.getElementById('hcflcm_num1').value);
            const num2 = parseInt(document.getElementById('hcflcm_num2').value);
            if (isNaN(num1) || isNaN(num2)) return;

            hcfCalcGenerateTree();
            hcfCalcCalculateHCF_LCM();

            const factors1 = hcfCalcPrimeFactorization(num1);
            const factors2 = hcfCalcPrimeFactorization(num2);

            let commonFactors = {};
            let uniqueFactors1 = {
                ...factors1
            };
            let uniqueFactors2 = {
                ...factors2
            };

            for (let prime in factors1) {
                if (factors2[prime]) {
                    commonFactors[prime] = Math.min(factors1[prime], factors2[prime]);
                    uniqueFactors1[prime] -= commonFactors[prime];
                    uniqueFactors2[prime] -= commonFactors[prime];
                    if (uniqueFactors1[prime] === 0) delete uniqueFactors1[prime];
                    if (uniqueFactors2[prime] === 0) delete uniqueFactors2[prime];
                }
            }

            hcfCalcDrawHCFVennDiagram(uniqueFactors1, uniqueFactors2, commonFactors);
        }

        function hcfCalcCalculateHCF_LCM() {
            const num1 = parseInt(document.getElementById('hcflcm_num1').value);
            const num2 = parseInt(document.getElementById('hcflcm_num2').value);
            if (isNaN(num1) || isNaN(num2)) return;

            const factors1 = hcfCalcPrimeFactorization(num1);
            const factors2 = hcfCalcPrimeFactorization(num2);
            let commonFactors = {};
            let lcmFactors = {};
            let allPrimes = new Set([...Object.keys(factors1), ...Object.keys(factors2)].map(Number));

            let hcfValue = 1,
                lcmValue = 1;
            for (let prime of allPrimes) {
                let exp1 = factors1[prime] || 0;
                let exp2 = factors2[prime] || 0;
                commonFactors[prime] = Math.min(exp1, exp2);
                lcmFactors[prime] = Math.max(exp1, exp2);

                hcfValue *= prime ** commonFactors[prime];
                lcmValue *= prime ** lcmFactors[prime];
            }

            hcfCalcUpdateTable(num1, num2, factors1, factors2, commonFactors, lcmFactors, allPrimes, hcfValue, lcmValue);
        }

        function hcfCalcUpdateTable(num1, num2, factors1, factors2, commonFactors, lcmFactors, allPrimes, hcfValue, lcmValue) {
            const tableBody = document.getElementById("hcflcm_resultTable").querySelector("tbody");
            tableBody.innerHTML = "";

            let rows = {
                [`${num1}`]: factors1,
                [`${num2}`]: factors2,
                [`HCF = ${hcfValue}`]: commonFactors,
                [`LCM = ${lcmValue}`]: lcmFactors
            };

            for (let category in rows) {
                const row = document.createElement("tr");
                const categoryCell = document.createElement("td");
                categoryCell.textContent = category;
                row.appendChild(categoryCell);

                allPrimes.forEach(prime => {
                    const cell = document.createElement("td");
                    let exponent = rows[category][prime] || 0;
                    cell.textContent = `${prime}^${exponent}`;

                    if (category === `${num1}` || category === `${num2}`) {
                        let otherExponent = category === `${num1}` ? (factors2[prime] || 0) : (factors1[prime] || 0);
                        if (exponent < otherExponent) {
                            cell.classList.add("smaller-exp");
                        } else if (category === `${num1}`) {
                            cell.classList.add("larger-exp-num1");
                        } else {
                            cell.classList.add("larger-exp-num2");
                        }
                    }
                    row.appendChild(cell);
                });

                const combinedFactors = Object.entries(rows[category])
                    .map(([prime, exp]) => `${prime}^${exp}`).join(" × ");
                const combinedCell = document.createElement("td");
                combinedCell.textContent = combinedFactors;
                row.appendChild(combinedCell);

                tableBody.appendChild(row);
            }
        }

        function hcfCalcPrimeFactorization(n) {
            let factors = {};
            for (let i = 2; i <= n; i++) {
                while (n % i === 0) {
                    factors[i] = (factors[i] || 0) + 1;
                    n /= i;
                }
            }
            return factors;
        }

        function hcfCalcDrawHCFVennDiagram(uniqueFactors1, uniqueFactors2, commonFactors) {
            const hcfCirclesDiv = document.getElementById('hcfCalcCircles');
            hcfCirclesDiv.innerHTML = '';

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('width', '400');
            svg.setAttribute('height', '400');
            hcfCirclesDiv.appendChild(svg);

            // Draw main Venn circles
            svg.innerHTML += `
        <circle cx='140' cy='120' r='100' stroke='black' fill='none' />
        <circle cx='260' cy='120' r='100' stroke='black' fill='none' />
    `;

            function addCircle(cx, cy, text, fillColor) {
                let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', cx);
                circle.setAttribute('cy', cy);
                circle.setAttribute('r', '25');
                circle.setAttribute('fill', fillColor);
                circle.setAttribute('stroke', 'black');
                svg.appendChild(circle);

                let txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                txt.setAttribute('x', cx);
                txt.setAttribute('y', cy + 5);
                txt.setAttribute('font-size', '14');
                txt.setAttribute('text-anchor', 'middle');
                txt.setAttribute('dominant-baseline', 'middle');
                txt.textContent = text;
                svg.appendChild(txt);
            }

            let i = 0;
            Object.entries(uniqueFactors1).forEach(([prime, exp]) => {
                addCircle(100, 80 + i * 50, `${prime}^${exp}`, "#4fc3f7"); // Blue for unique factors of num1
                i++;
            });

            i = 0;
            Object.entries(uniqueFactors2).forEach(([prime, exp]) => {
                addCircle(300, 80 + i * 50, `${prime}^${exp}`, "#81c784"); // Green for unique factors of num2
                i++;
            });

            i = 0;
            Object.entries(commonFactors).forEach(([prime, exp]) => {
                addCircle(200, 90 + i * 50, `${prime}^${exp}`, "#ffcc00"); // Orange for common factors
                i++;
            });
        }


function displayVisualHcfLcm(card){
	
	OngoingOp = 10 ;
	
	document.getElementById('myTableContainer').innerHTML = ""; // clear any table
	document.getElementById("game-chart-container").classList.add("hidden");
	document.getElementById("game-op-container").classList.add("hidden");	
	document.getElementById("game-angle-container").classList.add("hidden");	
    document.getElementById("game-algebra-balance-container").classList.add("hidden");
    //document.getElementById("game-hcf-lcm-container").classList.add("hidden");

   document.getElementById("game-hcf-lcm-container").classList.remove("hidden");
	
 
 
// --- Initial Draw ---
 hcfCalcDisplayHCF();
 
}


function displayHcfLcm(card){
	
	OngoingOp = 11 ;
	
	document.getElementById('myTableContainer').innerHTML = ""; // clear any table
	document.getElementById("game-chart-container").classList.add("hidden");
	document.getElementById("game-op-container").classList.add("hidden");	
	document.getElementById("game-angle-container").classList.add("hidden");	
    document.getElementById("game-algebra-balance-container").classList.add("hidden");
    //document.getElementById("game-hcf-lcm-container").classList.add("hidden");

   document.getElementById("game-hcf-lcm-container").classList.remove("hidden");
	
  let hcflcm_num1 = document.getElementById("hcflcm_num1");
    let hcflcm_num2 = document.getElementById("hcflcm_num2"); 
	

  
	

	
	if (card.num1){
	hcflcm_num1.value = card.num1;
	} else {
		hcflcm_num1.value = 0;
	}
	
	if (card.num2){
	hcflcm_num2.value = card.num2;
	} else {
		hcflcm_num2.value = 0;
	}	

	
 
// --- Initial Draw ---
 hcfCalcDisplayHCF();
 
}





function displayLinearEq(card){
	
	OngoingOp = 9;
	
	document.getElementById('myTableContainer').innerHTML = ""; // clear any table
	document.getElementById("game-chart-container").classList.add("hidden");
	document.getElementById("game-op-container").classList.add("hidden");	
	document.getElementById("game-angle-container").classList.add("hidden");	
//document.getElementById("game-algebra-balance-container").classList.add("hidden");
document.getElementById("game-hcf-lcm-container").classList.add("hidden");

document.getElementById("game-algebra-balance-container").classList.remove("hidden");
	
  let BalSliderA = document.getElementById("BalSliderA");
    let BalSliderB = document.getElementById("BalSliderB"); 
		let BalSliderC = document.getElementById("BalSliderC"); 
	let BalSliderD = document.getElementById("BalSliderD");

  
	

	
	if (card.a){
	BalSliderA.value = card.a;
	} else {
		BalSliderA.value = 0;
	}
	
	if (card.b){
	BalSliderB.value = card.b;
	} else {
		BalSliderB.value = 0;
	}	

	if (card.c){
	BalSliderC.value = card.c;
	} else {
		BalSliderC.value = 0;
	}
	
	if (card.d){
	BalSliderD.value = card.d;
	} else {
		BalSliderD.value = 0;
	}
	
	 updateVisualizationBalance();
 
}		

        function showFlashcard() {
		    
			
			
            let card = currentFlashcards[currentIndex];
			
			//console.log(card);
			
			if (settings.voice){
				
				//console.log(card.question);
				speakText(card.question);
				//console.log(card.q_english);
				speakText(card.q_english);
				
			}
			
			currentCard = card; // Store the card
			
			//displayFormattedQuestion();
		/*	if (card.visual){
				//console.log (card.visual);
				document.getElementById("question-text").innerText = card.question + card.visual ;
			} else
			{
				document.getElementById("question-text").innerText = card.question  ;
			} */

            document.getElementById("question-text").innerText = currentCategory  ;
			
			if (card.question){
			document.getElementById("question-text").innerText += "\n " +  card.question ;
			}
			
			
			

		

            //let step = flashcards[currentIndex];
            //document.getElementById("question").innerHTML = `<p>${step.step}</p>`;
			

			
			
			let optionsDiv = document.getElementById("options");
            optionsDiv.innerHTML = "";
			
			
			 if (currenttopLevelCategoryName == "Division Steps") {
					displayDivision(card); // Use displayDivision for division
			}else if ((currenttopLevelCategoryName == "Fraction 1") || (currenttopLevelCategoryName == "Fraction 2")) {
					displayFraction(card); // Use displayDivision for division
			}else if (currenttopLevelCategoryName == "Visual Fraction"){
				displayVisualFraction(card); 
			}else if (currenttopLevelCategoryName == "Visual Add, Sub, Mul, Div, Rem"){
				displayVisualAdd(card); 
			}else if ((currenttopLevelCategoryName == "Addition") || (currenttopLevelCategoryName == "Multiplcation") || (currenttopLevelCategoryName == "Subtraction") || (currenttopLevelCategoryName == "Division") || (currenttopLevelCategoryName == "Remainder")) {
				displayOp(card); 

			}else if ((currenttopLevelCategoryName == "Visual Algebra Balancing Equation")) {
				displayVisualBalance(card); 
			
			}else if ((currenttopLevelCategoryName == "Visual HCF LCM")) {
				displayVisualHcfLcm(card); 
			}else if ((currenttopLevelCategoryName == "HCF LCM")) {
				displayHcfLcm(card); 
			}	
			else if ((currenttopLevelCategoryName == "Algebra Linear Equation")) {
				displayLinearEq(card); 
			}

			
			else if ((currenttopLevelCategoryName == "Angle") || (currenttopLevelCategoryName == "Triangle") || (currenttopLevelCategoryName == "Quadrilateral") || (currenttopLevelCategoryName == "Perimeter") || (currenttopLevelCategoryName == "Area") ) {
				displayAngleTriangleQuad(card); 
			} 		
			
			
			else if (currenttopLevelCategoryName == "Visual Angle, Triangle, Quad"){
				displayVisualAngle(card); 
			}		
			else {
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
	
        ////console.log( openSuggestFlashcardModal )
		if (!currentCard) return;  // Exit if no card

        
        document.getElementById("suggest-flashcard-modal").style.display = "block";
        
    }

    function closeSuggestFlashcardModal() {
	////console.log( closeSuggestFlashcardModal )
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

//console.log( this.action )
     // Programmatically trigger the <a> link
     window.location.href = this.action;
	 ////console.log( this.action )
    closeSuggestFlashcardModal();
});


function ans_fraction(selected){
}

function ans_visual(selected){
}

function ans_div(selected){
	
	let card = currentFlashcards[currentIndex];
	let rem_color = "<td>";
	//fix me
	
	
				if (card.stepValue){
                Quot = Quot *10 + parseInt(card.stepValue);
				}
				let expectedQuote = card.num1 / card.num2;
				////console.log(totalSum);
				
				expectedQuote = expectedQuote.toFixed(2);
				  // Ensure inputs are strings
			  in_ans = String(Quot).padStart(3, ' ');

				let newRow = `<td>=</td><td colspan="3"  >Quotient ${expectedQuote}</td><td   class="correct">${in_ans[0]}</td><td  class="correct">${in_ans[1]}</td><td   class="correct">${in_ans[2]}</td><td colspan="5" class="correct">✔ Step ${currentIndex + 1} Rem = ${card.remainder}</td>`;
               // let newRow = `<tr><td>+</td><td></td><td></td><td></td> <td>${selected}</td><td colspan="3" class="correct">${card.step}</td><td colspan="2" class="correct">✔ Step ${currentIndex + 1} </td></tr>`;
                ////console.log(newRow);
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
				////console.log(newRow);
               // document.getElementById("totalRow").innerHTML = `<td></td><td></td><td></td><td></td><td  class="table_head">${totalSum}</td><td colspan="5" class="table_head">Product ${expectedSum}</td>`;
             
                clearHighlight();
}

function ans_mult(selected){
	
	let card = currentFlashcards[currentIndex];
	//fix me
                totalSum += parseInt(selected);
				let expectedSum = card.num1 * card.num2;
				////console.log(totalSum);
				
				  // Ensure inputs are strings
			  in_ans = String(selected).padStart(6, ' ');

				let newRow = `<tr><td>+</td><td>${in_ans[0]}</td><td>${in_ans[1]}</td><td>${in_ans[2]}</td> <td>${in_ans[3]}</td><td>${in_ans[4]}</td> <td>${in_ans[5]}</td><td colspan="3" class="correct">${card.step}</td><td colspan="2" class="correct">✔ Step ${currentIndex + 1} </td></tr>`;
               // let newRow = `<tr><td>+</td><td></td><td></td><td></td> <td>${selected}</td><td colspan="3" class="correct">${card.step}</td><td colspan="2" class="correct">✔ Step ${currentIndex + 1} </td></tr>`;
                ////console.log(newRow);
				document.getElementById("steps").innerHTML += newRow;
				
								  // Ensure inputs are strings
			  in_ans = String(totalSum).padStart(6, ' ');
				 
				 document.getElementById("totalRow").innerHTML = `<td>=</td><td>${in_ans[0]}</td><td>${in_ans[1]}</td><td>${in_ans[2]}</td> <td>${in_ans[3]}</td><td>${in_ans[4]}</td> <td>${in_ans[5]}</td><td colspan="5" class="table_head">${card.num1} X ${card.num2} = ${expectedSum}</td>`;
				////console.log(newRow);
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
				
				//console.log(OngoingOp);
				
				if (OngoingOp == 0){
					ans_mult(selected);
				} else if (OngoingOp == 1){
					ans_div(selected);
				} else if (OngoingOp == 2){
					ans_fraction(selected);
				}	
				else if (OngoingOp >= 3 && OngoingOp <= 11 ){
					ans_visual(selected);
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
		
		
		currentIndex =  - 1; //repeat
		//console.log("currentIndex:", currentIndex);
		
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

function clear_flashcard_for_math(){
				table_init = 0;
			totalSum = 0;
			Quot = 0;
			extra_shift = '';
			
document.getElementById('charts').innerHTML = "";
document.getElementById('myTableContainer').innerHTML = "";
			
			currentIndex = 0;	
			//console.log("currentIndex:", currentIndex);			
}


function nextFlashcard() {
	

	
	//console.log("Cuurent Subcategory:", currentsubCategoryName);
	//console.log("flashcard:", currentFlashcards);
	//console.log("currentIndex:", currentIndex);
	
	if(currentIndex == -1) //repeat same currentsubCategoryName
	{
		clear_flashcard_for_math();
		showFlashcard();
		return;
	}
	currentIndex++;
	if (currentIndex < currentFlashcards.length) {
                showFlashcard();
				return;
	}
	clear_flashcard_for_math();
	
	//else all NEXT in  currentsubCategoryName done. pick next subCategoryName
	
	
    const subCategories = Object.keys(categories[currenttopLevelCategoryName]); // Get all subcategories

    // Find the current index of the subcategory
    currentIndex = subCategories.indexOf(currentsubCategoryName); 
	//console.log("currentIndex:", currentIndex);
 
		//last item in subcategory?
	    if ((currentIndex + 1) === subCategories.length) {
			summaryGame();
			return
		}
		
   // Move to the next subcategory, or loop back to the first one
    let nextIndex = (currentIndex + 1); // % subCategories.length;		

    // Update to the new subcategory
    currentsubCategoryName = subCategories[nextIndex];

    //console.log("Next Subcategory:", currentsubCategoryName);

    // Reset flashcard index
    currentIndex = 0;
	//console.log("currentIndex:", currentIndex);

    // Get the flashcards for the new subcategory 
    currentFlashcards = categories[currenttopLevelCategoryName][currentsubCategoryName];
	//console.log("flashcard:", currentFlashcards);
    // If no flashcards found, show the summary
    if (!currentFlashcards || currentFlashcards.length === 0) {
        summaryGame();
    } else {
		currentCategory = currentsubCategoryName;
        showFlashcard();
    }
}

       
        function summaryGame() {
			
			clear_flashcard_for_math();
		
			
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
        ////console.log("Gradient CSS:", gradientString); // Debugging
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
            
			//console.log(text);
			const sanitizedtext = text.replace(/=/g, '').replace(/_/g, '');
			
			
            // Create a new SpeechSynthesisUtterance object
			//console.log(sanitizedtext);
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
	


function checkFlashCards(data) {
  let errorCount = 0;
  let totalCount = 0;

  for (const category in data) {
    // Check if the category is an object and has nested flashcards
    if (typeof data[category] === 'object' && data[category] !== null) {
      for (const subcategory in data[category]) {
        const flashcards = data[category][subcategory];

        if (Array.isArray(flashcards)) {
          for (const flashcard of flashcards) {
            totalCount++;
            const { correct, options, question } = flashcard;

            let matchFound = false;
            if (options && Array.isArray(options)) { // Check if options exist and is an array
              for (const option of options) {
                if (option === correct) {
                  matchFound = true;
                  break;
                }
              }
            } else {
              errorCount++;
              console.error(`Error in: ${question} - Options are missing or not an array.`);
              continue; // Skip the rest of the checks for this flashcard
            }

            if (!matchFound) {
              errorCount++;
              console.error(`Error in: ${question} - Correct answer "${correct}" not found in options.`);
            }
          }
        } else {
          console.warn(`Warning: ${category} - ${subcategory} is not an array of flashcards.`);
        }
      }
    } else if (Array.isArray(data[category])) {
      // Handle the case where the category itself is an array (like before)
      const flashcards = data[category];
      for (const flashcard of flashcards) {
        totalCount++;
        const { correct, options, question } = flashcard;

        let matchFound = false;
        if (options && Array.isArray(options)) { // Check if options exist and is an array
          for (const option of options) {
            if (option === correct) {
              matchFound = true;
              break;
            }
          }
        } else {
          errorCount++;
          console.error(`Error in: ${question} - Options are missing or not an array.`);
          continue; // Skip the rest of the checks for this flashcard
        }

        if (!matchFound) {
          errorCount++;
          console.error(`Error in: ${question} - Correct answer "${correct}" not found in options.`);
        }
      }
    } else {
      console.warn(`Warning: ${category} is not a valid category.`);
    }
  }

  if (errorCount === 0) {
    console.log("All flashcards are valid.");
  } else {
    console.warn(`${errorCount} errors found in ${totalCount} flashcards.`);
  }
}

// Assuming the data is in the `categories` object
checkFlashCards(window.categories);