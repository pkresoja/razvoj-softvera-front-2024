<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <div class="container">
    <RouterView />
    <footer class="mx-auto text-center">
      &copy; {{ year }} Univerzitet Singidunum - Razvoj Softvera
    </footer>
  </div>
</template>
