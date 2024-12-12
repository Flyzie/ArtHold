<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const { data } = useAuth();

const router = useRouter();

const userData = await useUser(Number(data.value?.user.id));

const name = ref(userData.value?.name || "");
const description = ref(userData.value?.description || "");
const image = ref<File | null>(null);
//const image = ref(userData.value?.image);

const errors = ref({
  nameError: false,
  descriptionError: false,
  imageError: false,
});

const errorGate = computed(() => {
  return Object.values(errors.value).every((error) => !error);
});

const formSubmitted = ref(false);

watch([name, description, image], () => {
  if (formSubmitted.value) {
    checkForErrors();
  }
});

const checkForErrors = () => {
  errors.value.nameError = false;
  errors.value.descriptionError = false;
  errors.value.imageError = false;

  if (name.value === "") {
    errors.value.nameError = true;
  }
  if (image.value === null) {
    errors.value.imageError = true;
  }
  if (description.value === "") {
    errors.value.descriptionError = true;
  }
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    image.value = target.files[0];
  }
};

const handleEdit = async (e: any) => {
  formSubmitted.value = true;
  checkForErrors();
  if (!errorGate) {
    const formData = new FormData(this);
    formData.append("id", String(data.value?.user.id));
    formData.append("name", name.value);
    formData.append("description", description.value);
    if (image.value) {
      formData.append("image", image.value);
    }

    for (const [k, v] of formData.entries()) {
      console.log(k, v);
    }

    const response = await fetch("/api/updateProfile", {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.statusMessage);
    }

    const useData = await response.json();
    console.log("User updated succesfully:", useData);

    router.push(`/${data.value?.user.id}`);
  } else {
    return;
  }
};

definePageMeta({
  middleware: ["redirect-if-not-authenticated"],
});
</script>

<template>
  <div
    class="bg-secondary min-w-fit w-1/3 h-max flex flex-col justify-center items-center p-5 rounded-md"
  >
    <h1 class="text-4xl text-textSecondary">Edit Profile</h1>
    <form
      @submit.prevent="handleEdit"
      class="flex flex-col justify-center items-center p-5 gap-2 w-full"
    >
      <label
        for="file"
        class="w-full p-1 text-left bg-textPrimary text-textSecondary"
        >Profile Picture:</label
      >
      <input
        type="file"
        placeholder="Your Profile Image"
        accept="image/*"
        id="file"
        name="file"
        class="p-5 w-full rounded-sm"
        @change="handleFileChange"
        :class="{ errorState: errors.imageError }"
      />
      <label
        for="name"
        class="w-full p-1 text-left bg-textPrimary text-textSecondary"
        >Your Nickname:</label
      >
      <input
        v-model="name"
        type="text"
        placeholder="name"
        id="name"
        name="name"
        class="p-5 w-full rounded-sm"
        :class="{ errorState: errors.nameError }"
      />
      <label
        for="description"
        class="w-full p-1 text-left bg-textPrimary text-textSecondary"
        >Description:</label
      >
      <input
        v-model="description"
        type="text"
        placeholder="description"
        id="description"
        name="description"
        class="p-5 w-full rounded-sm"
        :class="{ errorState: errors.descriptionError }"
      />
      <input
        type="submit"
        class="text-2xl cursor-pointer bg-textSecondary p-5 w-7/12 rounded-md hover:bg-textPrimary hover:text-textSecondary"
        value="Save Profile"
      />
    </form>
    <hr class="w-full my-4 border-t-2 border-textSecondary" />
  </div>
</template>
<style scoped>
.errorState {
  border: 0.25rem, solid, #fc0352;
}
</style>
