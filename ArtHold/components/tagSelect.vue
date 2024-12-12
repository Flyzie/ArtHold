<script setup lang="ts">
const router = useRouter();
const tags = await useTags();
const isOpen = ref(false);
const selectedTag = ref("");

const props = defineProps({
  componentName: {
    type: String,
    required: true,
  },
  selectedTag: {
    type: String,
  },
});

const emit = defineEmits(["update:selectedTag"]);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = (event: any) => {
  if (!event.target.closest(".dropdown-menu")) {
    isOpen.value = false;
  }
};

const setTag = (tag: { id: number; name: string }) => {
  selectedTag.value = tag.name;
  isOpen.value = false;
  emit("update:selectedTag", tag);
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<template>
  <div class="dropdown-menu relative bg-textSecondary rounded-sm min-w-20 flex">
    <button
      class="p-2 w-full hover:bg-textPrimary hover:text-textSecondary"
      @click="toggleDropdown"
      type="button"
    >
      {{ props.componentName }}
    </button>
    <h1 class="flex justify-center items-center p-2">
      {{ props.selectedTag }}
    </h1>
    <ul v-if="isOpen" class="bg-textSecondary rounded-sm absolute left-16">
      <li
        v-for="tag in tags"
        :key="tag.id"
        @click="setTag({ id: tag.id, name: tag.name })"
        class="p-1 w-full hover:bg-textPrimary hover:text-textSecondary cursor-pointer"
      >
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
