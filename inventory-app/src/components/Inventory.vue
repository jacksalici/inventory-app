
<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import {Deta} from 'deta'


const items = ref()

const error = ref("")

let deta;


watchEffect(async () => {
  try{
    deta = Deta(localStorage.DETA_API_KEY);
    const dbInventory = deta.Base("inventory");
    let res = await dbInventory.fetch();
    items.value = res.items
    console.log(items.value)
  }catch (e){
    error.value = "Please check the API key in the menu options."
    console.error(e)
  }

})


function connect(){
  
}

</script>


<template>

<div v-if="error">
  <div class="alert alert-warning">
  <span>{{ error }}</span>
  <a class="btn btn-outline" href="/">RELOAD PAGE</a>

</div>
</div>
<div>
<select class="select select-bordered w-full">
  <option disabled selected>Hero</option>
  <option>Large Apple</option>
  <option>Large Orange</option>
  <option>Large Tomato</option>
</select>
</div>

<div class="overflow-x-auto mt-8">

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
        <td>0
        </td>
        <td> <button class="btn btn-circle mr-2">+</button>
          <button class="btn btn-circle">-</button></td>

      </tr>

    </tbody>

</table>
</div>

<div class="join my-12 w-full">
    
  <input class="input input-bordered join-item w-full" placeholder="Add new item"/>

  <select class="select select-bordered join-item">
    <option disabled selected>Hero</option>
    <option>Sci-fi</option>
    <option>Drama</option>
    <option>Action</option>
  </select>
  <button class="btn join-item">ADD</button>
</div>
  
</template>

