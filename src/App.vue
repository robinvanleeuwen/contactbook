<template>
  <div id="app">
    <div id="header-container">
      <div id="header-logo">
        <img alt="Contact Book Logo" src="./assets/contactbook-icon.png" width="128" height="128">
      
      </div>
      <div id="header-title"><h1>Contact Book</h1></div>
    </div>
    
    <Contacts name="Contacts" />
    
  </div>
</template>

<script>
import Contacts from './components/Contacts.vue'

export default {
  name: 'app',
  components: {
    Contacts
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');

body {
  background-color: #EEEEEE;
  font-family: 'Montserrat', sans-serif;
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
}
body, html {
  top: 0px;
  margin: 0;
}
#app {
    position: relative;
    top: 20px;
    width: 75%;
}
#header-container {
  position:inherit;
  top: 10px;
  width: 75%;
}
#header-logo {
  position: relative;
  top: 0px;
  width: 75%;
}

#header-title {
  position: sticky;
  align: center;
  top: 10px;
  width: 75%;
}

</style>
