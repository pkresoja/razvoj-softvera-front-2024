<script setup lang="ts">
import NavbarLinkVue from '@/components/NavbarLink.vue';
import { AuthService } from '@/services/auth.service';
import { useRouter } from 'vue-router';

const router = useRouter()
function logout() {
    AuthService.clearAuth()
    router.push({
        path: '/login'
    })
}
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
                <ul class="navbar-nav" v-if="AuthService.hasAuth()">
                    <NavbarLinkVue to="/" name="Home" />
                    <NavbarLinkVue to="/ticket" name="Tickets" />
                    <NavbarLinkVue to="/about" name="About" />
                    <li class="nav-item">
                        <button class="nav-link" type="button" @click="logout">Logout</button>
                    </li>
                </ul>
                <ul class="navbar-nav" v-else>
                    <NavbarLinkVue to="/" name="Home" />
                    <NavbarLinkVue to="/about" name="About" />
                    <NavbarLinkVue to="/login" name="Login" />
                </ul>
            </div>
            <div class="navbar-text" v-if="AuthService.hasAuth()">
                <i class="fa-solid fa-user"></i> {{ AuthService.getUserEmail() }}
            </div>
        </div>
    </nav>
</template>