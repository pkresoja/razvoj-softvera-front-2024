<script setup lang="ts">
import { AuthService } from '@/services/auth.service';
import { MainService } from '@/services/main.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const email = ref<string>()
const password = ref<string>()

const router = useRouter()

function doLogin() {
    if (email.value == undefined || email.value == '') {
        alert('Email ne sme biti prazan')
        return
    }

    if (password.value == undefined || password.value == '') {
        alert('Lozinka ne sme biti prazna')
        return
    }

    MainService.login(email.value, password.value)
        .then(rsp => {
            AuthService.saveAuth(rsp.data)
            router.push({
                path: '/'
            })
        })
        .catch(e => alert(e.response.data.message))
}
</script>

<template>
    <form v-on:submit.prevent="doLogin">
        <div class="mb-3">
            <label for="email" class="form-label">Email adresa:</label>
            <input type="email" class="form-control" id="email" aria-describedby="help" v-model="email">
            <div id="help" class="form-text">Ukoliko nemate nalog obratite se administratoru.</div>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Lozinka:</label>
            <input type="password" class="form-control" id="password" v-model="password">
        </div>
        <button type="submit" class="btn btn-primary">
            Prijavi se
        </button>
    </form>
</template>