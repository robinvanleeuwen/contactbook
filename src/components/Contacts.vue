<template>
  <div class="contacts">
    
    <div><button id='btnFormMode' v-on:click="addOrSearch">{{ formModeText }}</button></div>
    <form @submit.prevent="handleNameInput">
      <input
        @keyup.prevent="handleNameInput"
        type="text"
        autocomplete="off"
        placeholder="Contact Name..."
        v-model="contactName"
        v-validate="{required: true}"
        name="contactName"
      />
      <p class="validation-alert" v-if="errors.has('contactName')">{{ errors.first('contactName') }}</p>
    </form>
    

    <div class="holder">
      
      <div>
        <p v-if="contacts.length == 0 ">Aren't you lonely?</p>
        <p v-else>
          You have {{ contacts.length }} <span>{{ (contacts.length==1)?"person":"persons" }}</span> to talk to.
        </p>
      </div>
      <ul>
        <li v-for="(data, index) in contacts" :key='index'>
          <div>{{data.name}}</div>
          <div>{{data.phone1}}</div>
          <div>{{data.comment}}</div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>

import {getContacts, createRequest} from '../APIService.js';

export default {
  name: "Contacts",
  data() {
    return  {
      formMode: "search",
      formModeText: "Search-Mode",
      contacts: [],
      contactName: '',
    }
  },
  methods: {
      handleNameInput() {

        this.$validator.validateAll()
          .then(validated => {
            if(!validated){
              this.contacts = [];
              return;
            }

            console.log("The input has been validated");
            console.log("Searching for %"+this.contactName+"%");

            const jsonrpcRequest = createRequest("search", {"name":this.contactName, "comment": ""});
            console.log(jsonrpcRequest);

            const jsonrpcResult = fetch(
              "http://127.0.0.1:3030/api",
              {
                headers: {
                  "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(jsonrpcRequest)
              }
            ).then(result => result.json())
            .then(result => {
              this.contacts = [];
                console.log(result);
                if(result.result.contacts){
                  result.result.contacts.forEach(element => {
                    console.log(element);
                    this.contacts.push(
                      {
                        name: element.name,
                        phone1: element.phone1,
                        comment: element.comment,
                      });
                  });
                }
            });
          });
      },
      addOrSearch() {
        if (this.formMode === "search") {
          this.formMode = "add";
          this.formModeText = 'Add-Mode';
        }
        else if (this.formMode === "add") {
          this.formMode = "search";
          this.formModeText = "Search-Mode";
        }
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .contacts {
    position: relative;
    top: 20px;
  }

  .holder {
    position: fixed;
    top: 430px;
    width: 75%;
    background: #b6c6ce;
    color: #000000;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  ul li {
    padding: 20px;
    font-size: 1.3em;
    background-color: #E0EDF4;
    border-left: 5px solid #3EB3F6;
    margin-bottom: 2px;
    color: #3E5252;
  }

  p {
    align-self:  center;
    text-align:center;
    padding: 0px 0;
    margin: 0px;
    color: black;
    background-color: #E0EDF4;
    border-style: solid;
    border-width: 2px;
    border-color:#3EB3F6;
  }

  .container {
    box-shadow: 0px 0px 40px lightgray;
  }

  input {
    width: calc(100% - 40px);
    border: 0;
    padding: 20px;
    font-size: 1.3em;
    background-color: #b6c6ce;
    color: rgb(29, 34, 34);
    border-style: solid;
    border-width: 2px;
    border-color:#717d83;
  }

  .validation-alert {
    background: #fdf2ce;
    font-weight: bold;
    font-style: italic;
    color: #3E5252;
    border-width: 1px;
    border-color: black;
    display: inline-block;
    padding: 5px;
    margin-top: -20px;
  }

</style>
