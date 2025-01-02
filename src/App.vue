
<script>
//import HangMan from './views/HangMan.vue';
import Wordle from './views/Wordle.vue';
export default {
  name : "App",
  components:{Wordle},
}
</script>


<template>
    <main>
      <!--
            <HangMan/>  
      -->
      <Wordle/>  
  </main>
</template>


<style  >
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  text-decoration: white;

}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #222831!important ;

}


</style>
