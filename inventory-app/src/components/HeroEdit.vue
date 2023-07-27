<script setup>
import { ref, watchEffect, onMounted, onUpdated, onBeforeMount } from "vue";
import { Deta } from "deta";

defineOptions({
    inheritAttrs:false
})

const emit = defineEmits(['fetchHero'])

const props = defineProps({
  dbHero: {
    type: Object
  },
  heroes: {
    type: Object   
  },
  single: {
    type: Boolean,
    default: false   
  }
})

const newHero = ref({});
const editHeroOption = ref(false);
const editHeroSubmit = ref(false);
const once = ref(true)

async function createHero() {
  await props.dbHero.put(
    {
      name: newHero.value.name,
      details: newHero.value.details,
      equipment: newHero.value.equipment,
      avatar: getAvatar(),
    },
    newHero.value.nick.trim()
  );
  emit('fetchHero')
  fillHero(false);

  if (props.single){
    once.value = true
  }else{
    newHero.value.nick = ""
  }
}

function getAvatar() {
  if (newHero.value.avatar) return newHero.value.avatar;
  else
    return (
      "https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=" +
      newHero.value.nick
    );
}

function fillHero(fill = true) {  
  if (fill) {
    props.heroes.forEach((element) => {
      if (newHero.value.nick == element.key) {
        newHero.value.avatar = element.avatar;
        newHero.value.name = element.name;
        newHero.value.equipment = element.equipment;
        newHero.value.details = element.details;

        editHeroSubmit.value = true;
      }
    });
  } else {
    //clear fields
    newHero.value.avatar = "";
    newHero.value.name = "";
    newHero.value.equipment = "";
    newHero.value.details = "";

    editHeroSubmit.value = false;
  }
}


onUpdated(()=>{
    if (props.single){
        newHero.value.nick = props.heroes[0].key
    }
})


</script>
<template>
  <div class="flex flex-col space-y-2">
    <div class="flex flex-row space-x-2">
    <div class="flex flex-col space-y-2 w-full">
      <input
        type="text"
        v-model="newHero.nick"
        placeholder="Nickname (unique for the party)"
        class="input input-bordered w-full input-md"
        v-on:input="newHero.nick = $event.target.value.toLowerCase().trim()"
        :class="{ '!bg-base-300': editHeroSubmit }"
        :disabled="editHeroSubmit || props.single"
      />

      <input
        v-model="newHero.avatar"
        type="text"
        placeholder="Link of the avatar (optional)"
        class="input input-bordered w-full input-md"
      />
    </div>

    <div class="avatar">
      <div class="w-24 mask mask-squircle">
        <img v-bind:src="getAvatar()" />
      </div>
    </div>
  </div>

  <div class="flex space-x-2">
    <button
      v-if="heroes?.some((e) => e.key == newHero.nick)"
      v-on:click="fillHero"
      class="btn btn-sm btn-outline"
      :disabled="editHeroSubmit"
    >
      Edit {{ newHero.nick }}
    </button>

    <span
      v-if="heroes?.some((e) => e.key == newHero.nick) && !editHeroSubmit && !single "
      class="my-auto text-primary"
      >Nickname must be unique!</span
    >

    <button
      v-if="editHeroSubmit"
      v-on:click="fillHero(false)"
      class="btn btn-sm btn-outline"
    >
      Back
    </button>
  </div>

  <input
    type="text"
    v-model="newHero.name"
    placeholder="Name or hero 'title'"
    class="input input-bordered w-full input-md"
  />
  <input
    type="text"
    v-model="newHero.details"
    placeholder="Details (class, race, etc)"
    class="input input-bordered w-full input-md"
  />
  <textarea
    v-model="newHero.equipment"
    placeholder="Basic equipment"
    class="textarea textarea-bordered w-full"
  />

  <div class="flex justify-end items-center">
    <button
      class="btn btn-primary"
      v-on:click="createHero()"
      :disabled="heroes?.some((e) => e.key == newHero.nick) && !editHeroSubmit"
    >
      <span v-if="!editHeroSubmit">Create {{ newHero.nick }}</span
      ><span v-else>Edit {{ newHero.nick }}</span>
    </button>
  </div>
  </div>
</template>
