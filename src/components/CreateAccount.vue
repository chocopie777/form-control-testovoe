<template>
  <div class="d-flex align-center mt-10 justify-center">
    <span class="text-h6 mr-5 font-weight-bold">
      Учетные записи
    </span>
    <v-btn icon="mdi-plus" size="small" style="border-radius: 5px;" @click="createAccount"></v-btn>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/account';

const accountStore = useAccountStore()
function createAccount() {
  accountStore.createAccount()
}
</script>

<style scoped></style>
