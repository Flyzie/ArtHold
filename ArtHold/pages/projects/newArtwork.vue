<script setup lang="ts">
import { ref, computed } from "vue";
const { data } = useAuth();
const router = useRouter();

const artworkTitle = ref("");
const artworkDescription = ref("");
const image = ref<File | null>(null);
const imageUrl = ref<string | null>(null);

const handleDrop = (e: DragEvent) => {
  const file = e.dataTransfer?.files[0];
  if (file) {
    image.value = file;
    imageUrl.value = URL.createObjectURL(file);
  }
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    image.value = target.files[0];
    imageUrl.value = URL.createObjectURL(target.files[0]);
  }
};

const handleUpload = async (e: any) => {
  try {
    const formData = new FormData();
    formData.append("userId", String(data.value?.user.id));
    formData.append("title", artworkTitle.value);
    formData.append("description", artworkDescription.value);
    if (image.value) {
      formData.append("image", image.value);
    }

    for (const [k, v] of formData.entries()) {
      console.log(k, v);
    }

    const response = await fetch("/api/artwork", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.statusMessage);
    }

    const useData = await response.json();
    console.log("Artwork Created succesfully:", useData);
    router.push(`/user/${data.value?.user.id}`);
  } catch (error) {
    console.error("Artwork Creation failed", error);
  }
};

definePageMeta({
  middleware: ["redirect-if-not-authenticated"],
});
</script>
<template>
  <div class="w-full px-5 h-full">
    <div class="w-full p-5 h-full bg-secondary rounded-md">
      <form
        @submit.prevent="handleUpload"
        class="flex flex-col justify-center items-center p-5 w-full"
      >
        <label
          for="title"
          class="w-full p-1 text-left bg-textPrimary text-textSecondary"
          >Title:</label
        >
        <input
          v-model="artworkTitle"
          type="text"
          placeholder="Name your Artwork"
          id="title"
          name="title"
          class="p-5 w-full rounded-sm mb-3"
        />
        <dropZone
          text="Click or drop your artwork here"
          @drop.prevent="handleDrop"
          @change="handleFileChange"
          class="mb-3"
        ></dropZone>
        <div
          v-if="imageUrl"
          class="w-full bg-textPrimary p-5 rounded-md flex justify-center items-center mb-3"
        >
          <NuxtImg
            fit="cover"
            width="400"
            height="400"
            :src="imageUrl"
          ></NuxtImg>
        </div>
        <label
          for="description"
          class="w-full p-1 text-left bg-textPrimary text-textSecondary"
          >Description:</label
        >
        <input
          v-model="artworkDescription"
          type="text"
          placeholder="Describe your Artwork"
          id="description"
          name="description"
          class="p-5 w-full h-32 rounded-sm mb-3 text-wrap"
        />
        <input
          type="submit"
          class="text-2xl cursor-pointer bg-textSecondary p-5 w-7/12 rounded-md hover:bg-textPrimary hover:text-textSecondary"
          value="Upload"
        />
      </form>
    </div>
  </div>
</template>
<style scoped></style>
