<script setup>
import { ref, watchEffect, onMounted } from "vue";
import { Deta } from "deta";

const items = ref();
const heroes = ref();

const error = ref("");

let deta,
  dbHero = null;

watchEffect(async () => {
  try {
    deta = Deta(localStorage.DETA_API_KEY);
    let id = "";
    if (localStorage.DETA_PARTY_ID) {
      id = "-" + localStorage.DETA_PARTY_ID;
    }
    dbHero = deta.Base("heroes" + id);
    let res = await dbHero.fetch();
    items.value = res.items;
    console.log(items.value);
  } catch (e) {
    error.value = "Please check the API key in the menu options.";
    console.error(e);
  }
});
</script>

<template>
  <div v-if="error">
    <div class="alert alert-warning">
      <span>{{ error }}</span>
      <a class="btn btn-outline" href="/">RELOAD PAGE</a>
    </div>
  </div>

  <div v-else class="overflow-x-auto mt-8">
    <table class="table text-lg">
      <thead>
        <tr>
          <th></th>
          <th>Object</th>
          <th>Quantity</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, index) in items">
          <th>{{ index }}</th>
          <td>{{ item.thing }}</td>
          <td>0</td>
          <td>
            <button class="btn btn-sm mr-2">
              <i class="fa-solid fa-ellipsis"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="join my-12 w-full">
    <input
      class="input input-bordered join-item w-full"
      placeholder="Add new item"
    />

    <select class="select select-bordered join-item">
      <option disabled selected>Hero</option>
      <option>Sci-fi</option>
      <option>Drama</option>
      <option>Action</option>
    </select>
    <button class="btn join-item">ADD</button>
  </div>
</template>
