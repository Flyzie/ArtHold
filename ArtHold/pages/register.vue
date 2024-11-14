<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const { status, signIn } = useAuth();

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const router = useRouter();

const passwordType = ref("password");

const togglePasswordVisibility = () => {
  passwordType.value = passwordType.value === "password" ? "text" : "password";
};

async function handleSignIn() {
  await signIn("credentials", {
    redirect: false,
    email: email.value,
    password: password.value,
  });
  window.location.reload();
}

const handleRegister = async () => {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.statusMessage);
  }

  const data = await response.json();
  console.log("User created successfully:", data);

  // Redirect to login page after successful registration
  handleSignIn();
};

definePageMeta({
  middleware: ["redirect-if-authenticated"],
});
</script>

<template>
  <div
    class="bg-secondary min-w-fit w-1/3 h-max flex flex-col justify-center items-center p-5 rounded-md"
  >
    <h1 class="text-4xl text-textSecondary">Register</h1>
    <form
      @submit.prevent="handleRegister"
      class="flex flex-col justify-center items-center p-5 gap-5 w-full"
    >
      <input
        v-model="name"
        type="text"
        placeholder="Your Nickname"
        id="name"
        name="name"
        class="p-5 w-full rounded-sm"
      />
      <input
        v-model="email"
        type="email"
        placeholder="email"
        id="email"
        name="email"
        class="p-5 w-full rounded-sm"
      />
      <input
        v-model="password"
        :type="passwordType"
        placeholder="password"
        id="password"
        name="password"
        class="p-5 w-full rounded-sm"
      />

      <input
        v-model="confirmPassword"
        :type="passwordType"
        placeholder="Confirm Password"
        id="confirmPassword"
        name="confirmPassword"
        class="p-5 w-full rounded-sm"
      />
      <div class="w-full">
        <label for="checkbox" class="text-white">Show Passwords</label>
        <input class="ml-1" type="checkbox" @click="togglePasswordVisibility" />
      </div>
      <input
        type="submit"
        class="text-2xl cursor-pointer bg-textSecondary p-5 w-7/12 rounded-md hover:bg-textPrimary hover:text-textSecondary"
        value="Register"
      />
    </form>
    <hr class="w-full my-4 border-t-2 border-textSecondary" />
    <div class="flex gap-2">
      <p class="text-white">Already have an account?</p>
      <NuxtLink class="text-textSecondary" :to="{ name: 'login' }"
        >Login Here!</NuxtLink
      >
    </div>
  </div>
</template>

<style scoped></style>
