
<script>

import Dashes from '../components/Dashes.vue';
export default {
  name : "HangMan",
  components:{Dashes},
  data() {
    return {
       letter: "",
       secret_text :null,
       map :{},
       tries :7,
       correct_letters: 0,
       isGuessed :false,
       isWrong:false

      }
  },
  methods: {

    sendInput() {
      //check if input is letter
      if(this.letter.toUpperCase() == this.letter.toLowerCase()){
        console.log("Please enter a valid letter")
      }
      //if so check if letter is in word
      else{
        let str = this.secret_text.toLocaleLowerCase()
        let search_term = this.letter.toLocaleLowerCase()
        if(str.includes(search_term) && this.map[search_term] === -1) {
          let position = str.indexOf(search_term);
          let positions =[]
          while (position !== -1) {
            this.correct_letters++
            positions.push(position)
            position = str.indexOf(search_term, position + 1);
            if(this.correct_letters === this.secret_text.length){
              this.isGuessed = true
            }  
          }
          this.map[search_term] = positions
        }
        else{
          this.tries-- ; 
          if(this.tries === 0){
            this.isWrong = true
          }
        }         
      }
      //reset input field
      this.letter = ""
    },

    init(){
      Array.from(this.secret_text).forEach((item)=>this.map[item.toLocaleLowerCase()] =-1 );
    },
    fetchWord(){
      fetch('https://random-word-api.herokuapp.com/word')
      .then(response => response.json())
      .then(word => this.secret_text= word);

    },
    tryAgain(){
      window.location.reload()
    }


  },
  computed: {
    computed_map () {
      if(this.secret_text ){
        Array.from(this.secret_text).forEach((item)=>this.map[item.toLocaleLowerCase()] =-1 );
      }
      return this.map
    },
  },

    async created () {
  //  const response = await fetch("https://random-word-api.herokuapp.com/word") 
    //const word = await response.json() || "word"
//    this.secret_text = word[0]
    this.secret_text = "Hello"

  }

}
</script>


<template>
 <div class="d-flex flex-column rounded p-4 cont">
    <div  v-if="this.secret_text">

        <!--Correct Guess-->
        <div v-if="this.isGuessed">
          <h1>
            Congrats <span>&#x1F60A;</span>  
          </h1>
          <button type="button" class="play-again mt-2 rounded btn border-dark btn-lg guess" @click="tryAgain()" >
            <h5> Play again </h5>
          </button>
        </div> 

        <!--Wrong Guess-->
        <div v-if="this.isWrong ">
          <h1>
            Game Over <span>&#x1F614;</span> 
          </h1>
          <button type="button" class="play-again mt-2 rounded btn border-dark btn-lg guess" @click="tryAgain()" >
            Play again 
          </button>
          <h2 class="pt-3">Correct word is :</h2>
        </div>

    </div>
    <div >
    <!--Tries left-->
    <div v-if="!(this.isGuessed || this.isWrong)" class="tries-left">
      <h2>{{ tries }} Tries Left</h2>
    </div>

    <!--Input Form-->
      <div v-if="!(this.isGuessed|| this.isWrong)" class="d-flex input pt-3">
        <div class="input-group input-group">
          <input class="form-control border-dark" v-model="letter" maxlength="1" @keyup.enter="sendInput()" >
        </div>
        <button  type="button " class=" ms-2 rounded btn border-dark btn-lg w-75 guess" @click="sendInput()">Guess a Letter</button>
      </div>

    <!--Dashes-->
    <div v-if="this.secret_text" class="d-flex pt-3 justify-content-center"> 
      <div  class="dashes d-flex flex-row " v-for="(n,index) in secret_text.length" :key="n">
        <div v-if="this.isWrong" class="no-letter  bg-light  pe-3 ps-3 me-2 border-dark border rounded ">
          <Dashes :text="secret_text[index].toUpperCase()" />
        </div>
        <div v-else-if="computed_map[secret_text[index].toLowerCase()] === -1 " class="no-letter  bg-light  pe-3 ps-3 me-2 border-dark border rounded">
          <Dashes text="_" />
        </div>
        <div v-else class="correct-letter bg-light  pe-3 ps-3 me-2 border-dark border rounded">
          <Dashes :text="secret_text[index].toUpperCase()" />
        </div>
    </div>
    </div>

  </div>
  </div>
  </template>


<style scoped >

h2 {
  color: white;
}

.cont{
  background-color: #31363F;
  margin-top: 20vh;
  font-family: 'Oswald', sans-serif !important;
  border: 2px solid rgb(166, 166, 166);

}

.guess{
  background-color: #76ABAE !important;
  text-decoration:white  !important; 
}
.btn{

  --bs-btn-color:white !important ; 
}



</style>
