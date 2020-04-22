<template>
  <div class="bg-dark-blue w-full text-center pt-5 pb-4">
    <div>
      <p class="text-white text-sm">
        All content on this site is free to use and licensed under a
        <span
          class="font-semibold"
        >Creative Commons Attribution</span>
      </p>
      <p class="text-white text-sm mt-2">
        &copy; {{year}} copyright
        <a
          class="text-white hover:underline"
          href="https://michalmuller.tech/"
          target="_blank"
        >
          <span class="font-semibold">Michal Muller</span>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    year() {
      const date = new Date();
      return date.getFullYear();
    }
  }
};
</script>

<style>
</style>
