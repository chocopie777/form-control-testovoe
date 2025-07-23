<template>
  <v-container>
    <div class="d-flex align-center">
      <span class="text-h5 mr-5 font-weight-bold">
        Учетные записи
      </span>
      <v-btn icon="mdi-plus" size="small" style="border-radius: 5px;" @click="createAccount" variant="outlined"></v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/account';

const accountStore = useAccountStore()
function createAccount() {
  accountStore.createAccount()
}
</script>

<style scoped></style>
