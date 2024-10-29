<script setup></script>

<template>
  <div
    class="bg-secondary min-w-fit w-1/3 h-max flex flex-col justify-center items-center p-5 rounded-md"
  >
    <h1 class="text-4xl text-textSecondary">Register</h1>
    <form class="flex flex-col justify-center items-center p-5 gap-5 w-full">
      <input
        type="text"
        placeholder="nickname"
        id="nickname"
        name="nickname"
        class="p-5 w-full rounded-sm"
      />
      <input
        type="text"
        placeholder="password"
        id="password"
        name="password"
        class="p-5 w-full rounded-sm"
      />
      <input
        type="text"
        placeholder="Confirm Password"
        id="confirmPassword"
        name="confirmPassword"
        class="p-5 w-full rounded-sm"
      />
      <input
        type="submit"
        class="text-2xl cursor-pointer bg-textSecondary p-5 w-7/12 rounded-md hover:bg-textPrimary hover:text-textSecondary"
        value="Register"
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
