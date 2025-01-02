
<script>
export default {
  name: 'DashesForm',
  props: {
    text: String
  },
  data() {
    return {
       letter: "" 
      }
  },
  methods: {
    
  },
}
</script>


<template>
  <div class="dashes">
    <h1>{{ text }}</h1>  
  </div>
</template>

