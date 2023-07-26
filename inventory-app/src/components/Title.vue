<script setup>
defineProps({
  extended: {
    type: Boolean,
    default: false
  }
})
</script><template>
  <div
    class="hero rounded-xl bg-base-200 mt-2"
    style="background-image: url(/drawing.jpg); background-position: 0px -120px"
  >
    <div class="hero-overlay bg-primary-content rounded-xl bg-opacity-60"></div>
    <div class="hero-content flex-col text-center py-10 text-base-100">
      <h1 class="text-4xl font-bold">The Inventory App</h1>
      <h2 v-if="extended" class="text-xl font-bold"> Manage your favorite RPG hero items like a breeze!</h2>
    </div>
  </div>

  <div class="card card-side bg-primary mt-4">
  <figure  class="max-w-[250px]"><img src="/hero2.png" alt="Hero screeshot" /></figure>
  <div class="card-body">
    <p class="text-lg font-medium">The Inventory App is a fast and 100% free way to track the equipments of your role-play-games  </p>
  </div>
</div>

</template>
