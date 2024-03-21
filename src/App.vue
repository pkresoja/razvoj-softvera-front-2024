<script setup lang="ts">
import NavbarLinkVue from './components/NavbarLink.vue';

const year = new Date().getFullYear()
</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <a class="navbar-brand" href="#"><i class="fa-solid fa-plane-departure"></i> TicketBrowse</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <NavbarLinkVue to="/" name="Home" />
          <NavbarLinkVue to="/about" name="About" />
        </ul>
      </div>
      <div class="navbar-text">
        Korisnik 123
      </div>
    </div>
  </nav>
  <div class="container">
    <RouterView />

    <footer class="mx-auto text-center">
      &copy; {{ year }} Univerzitet Singidunum - Razvoj Softvera
    </footer>
  </div>
</template>
