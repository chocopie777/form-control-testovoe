<script setup lang="ts">
import { onMounted } from 'vue';
import Account from './components/Account.vue';
import AccountTitle from './components/AccountTitle.vue';
import CreateAccount from './components/CreateAccount.vue';
import Tip from './components/Tip.vue';
import { useAccountStore } from './stores/account';

const accountStore = useAccountStore()

onMounted(() => {
  const accountsLS = localStorage.getItem('accounts');
  if (accountsLS) {
    accountStore.setAccounts(JSON.parse(accountsLS));
  }
})
</script>

<template>
  <v-app>
    <v-main>
      <v-container max-width="1200">
        <CreateAccount />
        <Tip />
        <AccountTitle />
        <Account v-for="account in accountStore.accounts" :key="account.id" :account-data="account" />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
