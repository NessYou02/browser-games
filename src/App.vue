
<script>
export default {
  name : "App",
  components:{},
}
</script>


<template>
    <main>
      <RouterView />
  </main>
</template>


<style  >
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;  
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;

}
body {
  background-color: #222831!important ;
  margin: 0;
  padding: 0;
  min-height: 100vh;

}


</style>
