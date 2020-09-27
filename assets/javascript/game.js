const CrystalCollector = function() {
    // Variables for the game
       const numPages      = $(".page").length;
       let   currentPage   = 0;
       const numCrystals   = 4;
       let   crystalValues = new Array(numCrystals);
       
       // Variables for the user
       let numWins = 0, numLosses = 0;
       let targetSum, currentSum;
   
   
      this.startNewGame = function() {
           // Reset variables
           targetSum  = 0;
           currentSum = 0;
   
           // Assign a value between 1 and 12 to each crystal
           for (let i = 0; i < numCrystals; i++) {
               crystalValues[i] = randomInteger(1, 12);
   
               // Take a linear combination
               targetSum += randomInteger(1, 6) * crystalValues[i];
           }
   
           // Ensure that the target sum is between 19 and 120
           while (targetSum < 19 || targetSum > 120) {
               targetSum = 0;
   
               for (let i = 0; i < numCrystals; i++) {
                   targetSum += randomInteger(1, 6) * crystalValues[i];
               }
           }
   
           // Display to the browser
           displayCurrentPage();
           displayNumWins();
           displayNumLosses();
           displayTargetSum();
           displayCurrentSum();
       }
   
       
      function displayCurrentPage() {
           $(".page").css({"display": "none"});
           $(`.page:nth-of-type(${currentPage + 1})`).css({"display": "block"});
       }
   
       this.displayLightBox = function(lightBoxOn) {
           $("#lightBox_background, #lightBox").css({"display": (lightBoxOn ? "block" : "none")});
       }
   
       function displayNumWins() {
           $("#numWins").text(numWins);
       }
   
       function displayNumLosses() {
           $("#numLosses").text(numLosses);
       }
   
       function displayTargetSum() {
           $("#targetSum").text(targetSum);
       }
   
       function displayCurrentSum() {
           $("#currentSum").text(currentSum);
       }
   
   
       this.updatePage = function(changeBy) {
           currentPage = (currentPage + changeBy + numPages) % numPages;
   
           displayCurrentPage();
       }
   
       function updateNumWins(changeBy) {
           numWins += changeBy;
       }
   
       function updateNumLosses(changeBy) {
           numLosses += changeBy;
       }
   
   
      // Generate a random number between a and b
       function randomInteger(a, b) {
           return Math.floor((b - a + 1) * Math.random()) + a;
       }
       
       this.collectCrystal = function(index) {
           // Update the current sum
           currentSum += crystalValues[index];
   
           displayCurrentSum();
   
           if (currentSum < targetSum) {
               return;
   
           } else if (currentSum === targetSum) {
               updateNumWins(1);
   
               $("#outputMessage").html("Nice work! You win!<br>Click to continue.");
               $("#lightBox").css({
                   "animation-name"  : "slide_down",
                   "background-color": "var(--color-mint-green)"
               });
   
               this.displayLightBox(true);
               
               this.startNewGame();
   
           } else {
               updateNumLosses(1);
   
               $("#outputMessage").html("Wa-ho-ho-ho! Slow your roll there, Buckaroo!<br>Click to Try again.");
               $("#lightBox").css({
                   "animation-name"  : "shake",
                   "background-color": "var(--color-danger-red)"
               });
   
               this.displayLightBox(true);
               
               this.startNewGame();
   
           }
       }
   }
   
   
   
   let game;
   
   $(document).ready(function() {
       game = new CrystalCollector();
   
       game.startNewGame();
   
       
        // Page selection
       $(".prev_page").on("click", function() {
           game.updatePage(-1);
       });
   
       $(".next_page").on("click", function() {
           game.updatePage(1);
       });
   
       // Game mechanics
       $(".crystals").on("click", function() {
           game.collectCrystal($(".crystals").index(this));
       });
   
       // Lightbox
       $("#lightBox_background, #lightBox").on("click", function() {
           game.displayLightBox(false);
       });
   });