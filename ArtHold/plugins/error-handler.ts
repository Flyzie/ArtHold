export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.error("Error:", error);
    console.error("Instance:", instance);
    console.error("Info:", info);
  };
});
