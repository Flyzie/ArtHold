<script setup lang="ts">
const { status, signIn, signOut } = useAuth();

const email = ref("");
const password = ref("");

async function handleSignIn() {
  formSubmitted.value = true;
  checkForErrors();
  if (errorGate.value) {
    await signIn("github");
  } else {
    return;
  }
}

const errors = ref({
  emailError: false,
  passwordError: false,
});

const errorGate = computed(() => {
  return Object.values(errors.value).every((error) => !error);
});

const formSubmitted = ref(false);

watch([email, password], () => {
  if (formSubmitted.value) {
    checkForErrors();
  }
});

const checkForErrors = () => {
  errors.value.emailError = false;
  errors.value.passwordError = false;

  if (email.value === "") {
    errors.value.emailError = true;
  }
  if (password.value === null) {
    errors.value.passwordError = true;
  }
};

definePageMeta({
  middleware: ["redirect-if-authenticated"],
});
</script>

<template>
  <div
    class="bg-secondary min-w-fit w-1/3 h-max flex flex-col justify-center items-center p-5 rounded-md"
  >
    <h1 class="text-4xl text-textSecondary">Login</h1>
    <form
      @submit.prevent="($event) => signIn('credentials', { email, password })"
      class="flex flex-col justify-center items-center p-5 gap-5 w-full"
    >
      <input
        v-model="email"
        type="email"
        placeholder="email"
        id="email"
        name="email"
        class="p-5 w-full rounded-sm"
        :class="{ errorState: errors.emailError }"
      />
      <input
        v-model="password"
        type="text"
        placeholder="password"
        id="password"
        name="password"
        class="p-5 w-full rounded-sm"
        :class="{ errorState: errors.passwordError }"
      />
      <input
        type="submit"
        class="text-2xl cursor-pointer bg-textSecondary p-5 min-w-56 w-7/12 rounded-md hover:bg-textPrimary hover:text-textSecondary"
        value="LogIn"
      />
    </form>
    <button
      @click="handleSignIn"
      class="text-2xl gap-4 cursor-pointer flex justify-center items-center bg-white p-5 min-w-56 w-7/12 rounded-md hover:bg-textPrimary hover:text-textSecondary"
    >
      LogIn with github
      <Icon class="p-5" name="uil:github" style="color: black"></Icon>
    </button>
    <hr class="w-full my-4 border-t-2 border-textSecondary" />
    <div class="flex gap-2">
      <p class="text-white">Dont have an account?</p>
      <NuxtLink class="text-textSecondary" :to="{ name: 'register' }"
        >Sign Up Here!</NuxtLink
      >
    </div>
  </div>
</template>

<style scoped>
.errorState {
  border: 0.25rem, solid, #fc0352;
}
</style>
