<script setup lang="ts">
const { status, data, signOut } = useAuth();

const userData = await useUser(Number(data.value?.user?.id));

const isOpen = ref(false);
const userName = computed(() => userData.value?.name || "");
const userImage = computed(() => userData.value?.image || "");

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

async function handleSignOut() {
  const { error } = await signOut();

  if (error) {
    console.error(error);
    return;
  }
}

const closeDropdown = (event: any) => {
  if (!event.target.closest(".dropdown-menu")) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<template>
  <div class="dropdown-menu aspect-square flex justify-center">
    <button
      class="rounded-full min-w-10 aspect-square"
      @click="toggleDropdown"
      type="button"
      aria-expanded="true"
    >
      <NuxtImg
        :src="userImage"
        fit="cover"
        width="50"
        height="50"
        class="ry rounded-full min-w-10 aspect-square"
      />
    </button>

    <div
      v-if="isOpen"
      class="z-10 absolute right-6 top-14 origin-bottom-left mt-2 w-52 rounded-sm shadow-md bg-textSecondary focus:outline-none animate-fade-down animate-once animate-duration-100 animate-ease-linear animate-normal"
    >
      <div
        v-if="status === 'authenticated'"
        class="p-4 min-h-20 flex justify-start items-center bg-cover bg-center bg-textPrimary"
      >
        <NuxtImg
          :src="userImage"
          fit="cover"
          width="100"
          height="100"
          class="bg-textSecondary rounded-full min-w-10 aspect-square mx-3 ml-0"
        ></NuxtImg>
        <h1 class="text-2xl text-textSecondary">{{ userName }}</h1>
      </div>
      <div
        class="p-2 gap-8 flex justify-start items-center hover:bg-primary hover:text-textSecondary"
      >
        <NuxtImg
          src="/upload-window-svgrepo-black-com.svg"
          alt="Upload"
          class="w-6 h-max"
        />
        <NuxtLink :to="{ path: `/user/${data?.user.id}` }">My Profile</NuxtLink>
      </div>
      <div
        class="p-2 gap-8 flex justify-start items-center hover:bg-primary hover:text-textSecondary"
      >
        <NuxtImg
          src="/service-contract-svgrepo-com.svg"
          alt="terms"
          class="w-6 h-max"
        />
        <button @click="handleSignOut">Sign Out</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-cover {
  background-size: cover;
}
.bg-center {
  background-position: center;
}
</style>
