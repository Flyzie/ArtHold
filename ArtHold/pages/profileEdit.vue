<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const { status, signIn } = useAuth();

const name = ref("");
const description = ref("");
const image = ref("");
</script>

<template>
  <div
    class="bg-secondary min-w-fit w-1/3 h-max flex flex-col justify-center items-center p-5 rounded-md"
  >
    <h1 class="text-4xl text-textSecondary">Edit Profile</h1>
    <form
      @submit.prevent=""
      class="flex flex-col justify-center items-center p-5 gap-5 w-full"
    >
      <input
        type="file"
        placeholder="Your Profile Image"
        id="file"
        name="file"
        class="p-5 w-full rounded-sm"
      />
      <input
        v-model="name"
        type="text"
        placeholder="name"
        id="name"
        name="name"
        class="p-5 w-full rounded-sm"
      />
      <input
        v-model="description"
        type="text"
        placeholder="description"
        id="description"
        name="description"
        class="p-5 w-full rounded-sm"
      />
      <input
        type="submit"
        class="text-2xl cursor-pointer bg-textSecondary p-5 w-7/12 rounded-md hover:bg-textPrimary hover:text-textSecondary"
        value="Save Profile"
      />
    </form>
    <hr class="w-full my-4 border-t-2 border-textSecondary" />
    <div class="flex gap-2">
      <p class="text-textPrimary">Already have an account?</p>
      <NuxtLink class="text-textSecondary" :to="{ name: 'login' }"
        >Login Here!</NuxtLink
      >
    </div>
  </div>
</template>
<style scoped></style>
