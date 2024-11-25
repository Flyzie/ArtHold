<script setup lang="ts">
import ProfileMenu from "~/components/profileMenu.vue";

const { status } = useAuth();

const loggedIn = computed(() => status.value === "authenticated");
</script>

<template>
  <div
    class="bg-primary w-full h-full min-h-screen flex flex-col items-center p-0 m-0"
  >
    <header
      class="w-full h-20 bg-gradient-to-b from-secondary to-primary flex justify-between items-center px-6 sticky top-0 z-40"
    >
      <div class="flex items-center space-x-4">
        <DropdownMenu>
          <template #dropdown>
            <div class="block md:hidden">
              <SearchBar />
            </div>
          </template>
        </DropdownMenu>
        <div class="hidden md:block">
          <SearchBar />
        </div>
        <tagList component-name="Filter By:"></tagList>
      </div>
      <NuxtLink
        :to="{ path: `/` }"
        class="absolute left-1/2 transform -translate-x-1/2"
      >
        <NuxtImg src="/logo.png" alt="site logo" class="w-12 h-max" />
      </NuxtLink>

      <NuxtLink
        v-if="!loggedIn"
        class="p-3 bg-textSecondary text-textPrimary rounded-md"
        :to="{ name: 'login' }"
        >Sign In</NuxtLink
      >
      <ProfileMenu v-else></ProfileMenu>
    </header>

    <slot />
  </div>
</template>
