
<script>
export default {
  name: 'InputForm',
  props: {
    msg: String
  },
  data() {
    return {
       text: "" 
      }
  },
  methods: {
    clearInput() {
      this.text = ""
    }
  },
}
</script>


<template>
  <div class="input">
    <h1>{{ msg }}</h1>
    <h1>{{ text }}</h1>
    <div class="container">
        <input v-model="text">
        <button type="button" @click="clearInput()">Submit Letter</button>
    </div>
  
  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
