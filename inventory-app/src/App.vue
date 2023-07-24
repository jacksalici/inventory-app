<script setup>
import Inventory from './components/Inventory.vue'
import { ref, watchEffect, onMounted } from 'vue'


const inputApiCookie = ref(localStorage.DETA_API_KEY)
const inputPartyIdCookie = ref(localStorage.DETA_PARTY_ID)

function inputApiSubmit (){
  localStorage.DETA_API_KEY = inputApiCookie.value
}
function inputPartyIdSubmit (){
  localStorage.DETA_PARTY_ID = inputApiCookie.value
}

</script>

<template>
  <div class="flex flex-col justify-between min-h-screen">
  <div class="navbar bg-base-200">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl" href="/">The Inventory App</a>
  </div>
  <div class="flex-none">
    <button class="btn btn-square btn-ghost" onclick="my_modal_1.showModal()">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
    </button>
  </div>
</div>

  <div class="container max-w-xl mx-auto mt-4 p-2 ">

    <Inventory/>

  </div>



<!--DIALOG-->
  <dialog id="my_modal_1" class="modal">
  <form method="dialog" class="modal-box">
    <h3 class="font-bold text-lg">Settings</h3>  
    

  <div class="join w-full my-2">
    <span class="btn no-animation btn-active join-item" >API KEY</span>
    <input class="input input-bordered w-full join-item" v-on:change="inputApiSubmit" v-model="inputApiCookie" placeholder="Very long and nasty string"/>
  </div>
    
  <div class="join w-full my-2">
    <span class="btn no-animation btn-active join-item" > PARTY ID</span>
    <input class="input input-bordered w-full join-item" placeholder="The Fellowship of the Druid (optional)"/>
  </div>
    
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>


<footer class="footer footer-center p-4 mt-auto bg-base-200 text-base-content">
  <div>
    <p> © 2023 - Developed by <a class="link">jacksalici</a>, illustration by <a class="link" href="https://www.instagram.com/michelegalavotti/">Mich</a>. </p>
  </div>
</footer>
</div>

<img src="/drawing.jpg" class="max-w-sm mix-blend-multiply bottom-0 right-2 absolute z-[-1] opacity-70"/>

</template>
