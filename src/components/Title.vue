<script setup>
defineProps({
  extended: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'The Inventory App'
  }
})
</script><template>
  <div
    class="hero rounded-xl bg-base-200 mt-2"
    style="background-image: url(/drawing.jpg); background-position: 0px -120px"
  >
    <div class="hero-overlay bg-primary-content rounded-xl bg-opacity-60"></div>
    <div class="hero-content flex-col text-center py-10 text-base-100">
      <h1 class="text-4xl md:text-6xl font-serif font-bold">{{title}}</h1>
      <h2 v-if="extended" class="text-xl font-bold" style="text-wrap: balance">Manage your favorite RPG hero items like a breeze!</h2>
    </div>
  </div>



<div class="card md:card-side mt-2 mx-auto " v-if="extended">
  <figure >
    <img src="/screenshot3.png" alt="Hero screenshot"/>
  </figure>
  <div class="card-body">
    <div class="text-xl my-auto font-serif md:text-xl" >The Inventory App is a fast, open-source and 100% free way to track the equipment of your role-playing games characters.  </div>

    
  </div>
</div>




</template>
