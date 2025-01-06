
<script>

export default {
  name : "WordleView",
  data() {
    return {
        grid :[],
        currentRow : 0,
        currentCell : 0,
        guess :"",
        tries:0,
        correct_letters_count :0,
        isfinalGuess:false,
        correct_guess : "",
        map:{},
        isWinner: false

      }
  },
  methods: {
    init(){
        for(let i = 0 ; i<6 ; i++){
            this.grid.push([[" ",'default','0 ms'],
                            [" ",'default','0 ms'],
                            [" ",'default','0 ms'],
                            [" ",'default','0 ms'],
                            [" ",'default','0 ms']
                          ])
        }
    },
    addLettertoRow(letter){
      if(letter.toUpperCase() == letter.toLowerCase()){
        console.log("Please enter a valid letter")
        return;
      }
      if(this.currentCell >4 && this.currentRow ===5){ 
          alert("game over")
          return;
      }
      if(this.currentCell <5 && this.currentRow<6){
          this.grid[this.currentRow][this.currentCell][0] = letter.toUpperCase()
          this.currentCell ++ 
          this.isfinalGuess =  this.currentCell === 5 
      }

    },
    DeleteLetterFromRow(){
        if(this.currentCell>0){
          if(this.grid[this.currentRow][this.currentCell-1][0] !== " "){
              this.grid[this.currentRow][this.currentCell-1][0] = " "
              this.currentCell --
              this.isfinalGuess =  this.currentCell === 5 
          }
        }
        
    },
    compareGuesstoCorrectWord(){

      this.correct_letters_count =0 
      for(let i= 0;i<this.correct_guess.length ;i++){

        setTimeout(() => {
          if(this.correct_guess.toLowerCase().includes(this.guess[i].toLowerCase())){
            this.grid[this.currentRow][i][1] =' correct-letter animate' 
            if(this.guess[i].toLowerCase() === this.correct_guess[i].toLowerCase() ){
              this.grid[this.currentRow][i][1] =' correct-letter-well-placed animate' 
              this.correct_letters_count ++ 
            }
          }
          else{
            this.grid[this.currentRow][i][1] =' incorrect-letter animate '
          }
          }, ((i+1)*500)/2 );
          /**
           * 250ms
           * 500ms
           * 750ms
           * 1000ms
           * 1250ms
           */

        this.grid[this.currentRow][i][1] ='default animate'
        this.grid[this.currentRow][i][2] =((i)*500)/2+'ms' // Animation delay
        //animation delay : 500 ms
          /**
           * 0ms start flip animation => 250ms the color changes when the letter height = 0 && flip animation 2 starts  => 500ms end of animation  
           * 250ms
           * 500ms
           * 750ms
           * 1000ms
           */
      }
    },
    guessWord(){
      if(this.currentCell === 5 && this.currentRow<6){
        this.guess = this.grid[this.currentRow].reduce((accumulator, currentValue) => accumulator + currentValue[0],"",);
        this.compareGuesstoCorrectWord()
        setTimeout(() => {
          if(this.correct_letters_count === this.correct_guess.length){
            this.isWinner = true
          }
          this.tries ++
          this.currentRow ++
          this.currentCell =0 
          this.isfinalGuess =false
          this.guess =""
          }, 3 *500);

      }
    },

  },

  mounted(){
    this.init()
    window.addEventListener("keypress", e => {
        if(!this.isfinalGuess){
          this.addLettertoRow(String.fromCharCode(e.keyCode))
        }
        if(e.key === "Enter"){
          this.guessWord()
        }
	});
    window.addEventListener("keydown", e => {
        if (e.key === "Backspace" || e.key === "Delete") {
          this.DeleteLetterFromRow()
        }
	});
  },
  async created () {
    const response = await fetch("https://random-word-api.herokuapp.com/word?length=5")
    const word = await response.json()
    this.correct_guess = word[0]
    //this.correct_guess ="Hello"

  }


}
</script>


<template>
 <div class="border border-dark rounded p-4 cont">
  <!--Go to Hang Man-->
    <button type="button" class="go-to-hangman mt-2  btn btn-lg ">
      <RouterLink to="/Hangman" class="link">Go to Hangman</RouterLink>
    </button>

  <!--Congrats Alert-->
    <div v-if="this.isWinner" class="alert alert-success center-block alert-dismissible fade show ps-2 pe-1 text-center" role="alert">
       <h2>
          Congrats <span>&#x1F60A;</span>  
        </h2>
        <h4 class ="pt-2" >You Guessed the Correct Word in {{this.tries}} Tries</h4>
      <button type="button" class="btn-close " data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  <!--Game Over Alert-->
    <div v-if="this.tries > 5 && !this.isWinner " class="alert alert-success center-block alert-dismissible fade show ps-2 pe-1 text-center" role="alert">
       <h2>
        Game Over <span>&#x1F614;</span> 
      </h2>
        <h4 class ="pt-2" >Better Luck Next Time !</h4>
      <button type="button" class="btn-close " data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <!--Grid-->
        <div  v-for="(row,index) in grid" :key="index"  class="d-flex flex-row"> 
        <!--Row 1-->
        <div  v-for="(cell,i) in row" :key="i" class="d-flex flex-row">
            <!--Cell-->
            <div id ="cell" class =" m-1 p-4 " :class="cell[1]" :style="{animationDelay: cell[2]}"  >
            <h2 class="mb-1 strong letter">
              {{ cell[0] }}
            </h2>
            </div>
        </div>
    </div>
      <!--Guess-->
      <button type="button" class="guess mt-2 rounded btn border-dark btn-lg " @click="guessWord()">
            Guess 
          </button>
    <!--KeyBoard-->

  </div>
  </template>


<style scoped >
.alert{
  position: absolute;
  right: 35%;
  top:30%;
  height: 10em;
  width:25em

}
.link{
  color: white;
  text-decoration: none;
}
.go-to-hangman {
  position: absolute;
  left:80%;
  top:5%;
  background-color: #F6B17A;
  border: 2px solid black;
  color: var(--bs-btn-hover-color);

}
.go-to-hangman:hover {
  color:white  ; 
  background-color: #F6B17A;
  border-color: var(--bs-btn-hover-border-color);
}

.cont{
  background-color: #31363F;
  margin-top: 6vh;
  font-family: 'Oswald', sans-serif !important;
  display: flex;
  flex-direction: column;
}
.guess{
  background-color: #76ABAE !important;
  text-decoration:white  !important; 
}
.btn{

  --bs-btn-color:white !important ; 
}
#cell{
    width: 2em;
    height: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Oswald', sans-serif !important;
    border: 2px solid rgb(166, 166, 166);

    

}
.letter{
  color: #EEEEEE;
}
.correct-letter-well-placed{
  background-color: #03C988;
  border: 2px solid #03C988 !important;

}
.incorrect-letter{
  background-color: rgb(166, 166, 166);
  border: 2px solid rgb(166, 166, 166) !important;

}
.correct-letter{
  background-color: #F6B17A;
  border: 2px solid #F6B17A !important;

}
.default{
  background-color: #31363F;
  
}
.animate {
  animation: flip 0.5s ease;
}

@keyframes flip {
  0% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
  
}

</style>
