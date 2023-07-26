<script setup>
import { ref, watchEffect, onMounted } from "vue";

const inputApiCookie = ref(localStorage.DETA_API_KEY);
const inputPartyIdCookie = ref(localStorage.DETA_PARTY_ID);

</script>

<template>

<img
    src="/drawing.jpg"
    class="max-w-sm mix-blend-multiply bottom-16 right-0 fixed z-[-1] opacity-20"
  />


  <div class="flex flex-col min-h-screen ">
    <div class="navbar bg-base-200">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case font-serif text-2xl" href="/"
          >The Inventory App</a
        >
      </div>
      <div class="flex-none">
        <button
          class="btn btn-square btn-ghost"
          onclick="menu_modal.showModal()"
        >
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>

    <div class="container max-w-2xl mb-auto mx-auto self-stretch p-2">
      <router-view />
    </div>

    <footer
      class="footer footer-center p-4 bg-base-200 text-base-content"
    >
      <div>
        <p>
          © 2023 - Developed by <a class="link">jacksalici</a>, illustration by
          <a class="link" href="https://www.instagram.com/michelegalavotti/"
            >Mich</a
          >.
        </p>
      </div>
    </footer>

  </div>

  <!--DIALOG-->
  <dialog id="menu_modal" class="modal">
      <form method="dialog" class="modal-box">
        <h3 class="font-bold text-lg">
          Settings 
        </h3>

        

        <div class="modal-action">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </div>
      </form>
    </dialog>
  
</template>
