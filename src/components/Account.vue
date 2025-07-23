<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field v-model="metka" :counter="50" label="Значение" variant="outlined"></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-select label="Тип записи" v-model="type"
          :items="['LDAP', 'Локальная ']" variant="outlined"></v-select>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field v-model="login" :counter="100" label="Значение" variant="outlined" required></v-text-field>
        </v-col>
        <v-col cols="12" md="3">
          <v-text-field :type="show1 ? 'text' : 'password'" v-model="password" :counter="100" label="Значение" variant="outlined" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1" required></v-text-field>
        </v-col>
        <v-col cols="12" md="1">
          <v-btn icon="mdi-delete" style="border-radius: 5px;" color="red" @click="deleteAccount"></v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef, type PropType } from 'vue';
import type { Account } from '@/types/types'
import { useAccountStore } from '@/stores/account';

const accountStore = useAccountStore()

const show1 = ref(false)
const type = shallowRef('')
const metka = ref<unknown[]>([])
const login = ref<string>('')
const password = ref<string | null>('')
const id = ref<number>(0)

const {accountData} = defineProps({
  accountData: {
    type: Object as PropType<Account>,
    required: true,
  }
})

onMounted(() => {
  metka.value = accountData.metka
  login.value = accountData.login
  password.value = accountData.password
  type.value = accountData.type
  id.value = accountData.id
})

function deleteAccount() {
  accountStore.deleteAccount(id.value)
}
</script>

<style scoped></style>
