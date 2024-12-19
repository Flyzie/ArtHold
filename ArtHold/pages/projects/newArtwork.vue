<script setup lang="ts">
import useUserAlbums from "~/composables/useUserAlbums";
import { ref, computed } from "vue";
const { data } = useAuth();
const router = useRouter();
const route = useRoute();
const albums = await useUserAlbums(Number(data.value?.user.id));

const artworkTitle = ref<string>("");
const artworkDescription = ref<string>("");
const image = ref<File | null>(null);
const imageUrl = ref<string | null>(null);
const selectedAlbum = ref<number | null>(null);
const selectedTags = ref<{ id: number; name: string }[]>([]);

const query = route.query.artworkId;
const isEditing = ref(!!query);
const { data: existingArtwork, refresh } = await useArtwork(
  Number(query),
  false
);

onMounted(async () => {
  if (isEditing) {
    await refresh();
    artworkTitle.value = existingArtwork.value?.title || "";
    artworkDescription.value = existingArtwork.value?.description || "";
    imageUrl.value = existingArtwork.value?.artworkImage || null;
    selectedAlbum.value = existingArtwork.value?.albumID || null;
  }
});

const errors = ref({
  titleError: false,
  descriptionError: false,
  imageError: false,
  albumError: false,
});

const errorGate = computed(() => {
  return Object.values(errors.value).every((error) => !error);
});

const formSubmitted = ref(false);

watch([artworkTitle, artworkDescription, image, selectedAlbum], () => {
  if (formSubmitted.value) {
    checkForErrors();
  }
});

const checkForErrors = () => {
  errors.value.titleError = false;
  errors.value.descriptionError = false;
  errors.value.imageError = false;
  errors.value.albumError = false;

  if (artworkTitle.value === "") {
    errors.value.titleError = true;
  }
  if (image.value === null && !isEditing.value) {
    errors.value.imageError = true;
  }
  if (artworkDescription.value === "") {
    errors.value.descriptionError = true;
  }
  if (selectedAlbum.value === null) {
    errors.value.albumError = true;
  }

  console.log(errorGate.value);
};

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
  formSubmitted.value = true;
  checkForErrors();
  if (errorGate.value) {
    const formData = new FormData();
    formData.append("title", artworkTitle.value);
    formData.append("description", artworkDescription.value);
    if (image.value) {
      formData.append("image", image.value);
    }
    if (selectedAlbum.value) {
      formData.append("albumId", String(selectedAlbum.value));
    }
    if (selectedTags.value.length) {
      formData.append(
        "tags",
        JSON.stringify(selectedTags.value.map((tag) => tag.id))
      );
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
    router.push(`/${data.value?.user.id}`);
  } else {
    return;
  }
};

const handleEdit = async (e: any) => {
  formSubmitted.value = true;
  checkForErrors();
  if (errorGate.value) {
    const formData = new FormData();
    formData.append("title", artworkTitle.value);
    formData.append("description", artworkDescription.value);
    if (image.value) {
      formData.append("image", image.value);
    }
    if (selectedAlbum.value) {
      formData.append("albumId", String(selectedAlbum.value));
    }
    if (selectedTags.value.length) {
      formData.append(
        "tags",
        JSON.stringify(selectedTags.value.map((tag) => tag.id))
      );
    }

    for (const [k, v] of formData.entries()) {
      console.log(k, v);
    }

    const response = await $fetch("/api/artworkUtils/updateArtwork", {
      method: "PUT",

      body: formData,
      params: {
        artworkId: query,
      },
    });

    if (!response) {
      throw new Error("SOMETHING WRONG WITH EDITING");
    }
  } else {
    return;
  }
};

const addTag = (tag: { id: number; name: string }) => {
  if (!selectedTags.value.find((t) => t.id === tag.id)) {
    selectedTags.value.push(tag);
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
        @submit.prevent="handleEdit"
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
          :class="{ errorState: errors.titleError }"
        />
        <dropZone
          text="Click or drop your artwork here"
          @drop.prevent="handleDrop"
          @change="handleFileChange"
          class="mb-3"
          :class="{ errorState: errors.imageError }"
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
          :class="{ errorState: errors.descriptionError }"
        />
        <label
          for="album"
          class="w-full p-1 text-left bg-textPrimary text-textSecondary"
          >Assign to Album:</label
        >
        <select
          v-model="selectedAlbum"
          id="album"
          name="album"
          class="p-5 w-full rounded-sm mb-3"
          :class="{ errorState: errors.albumError }"
        >
          <option
            v-for="album in albums"
            :key="album.id"
            :value="album.id"
            class="rounded-sm"
          >
            {{ album.name }}
          </option>
        </select>
        <div class="flex justify-center gap-2 mb-2">
          <TagSelect
            component-name="select tags: "
            @update:selected-tag="addTag"
          ></TagSelect>
          <h1
            v-for="tag in selectedTags"
            :key="tag.id"
            class="p-2 bg-textSecondary text-textPrimary rounded-sm"
          >
            {{ tag.name }}
          </h1>
        </div>
        <input
          type="submit"
          class="text-2xl cursor-pointer bg-textSecondary p-5 w-7/12 rounded-md hover:bg-textPrimary hover:text-textSecondary"
          value="Upload"
        />
      </form>
    </div>
  </div>
</template>
<style scoped>
.errorState {
  border: 0.25rem, solid, #fc0352;
}
</style>
