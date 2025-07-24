<template>
  <v-form>
    <v-container>
      <v-form ref="form">
        <v-row>
          <v-col cols="12" md="3">
            <span cols="3" class="opacity-50 d-flex d-md-none mb-5">Метки</span>
            <v-text-field v-model="metka" :counter="50" label="Значение" variant="outlined" @blur="handleBlur"
              :rules="metkaRules" validate-on="blur"></v-text-field>
          </v-col>
          <v-col cols="12" md="2">
            <span cols="3" class="opacity-50 d-flex d-md-none mb-5">Тип записи</span>
            <v-select label="Тип записи" v-model="type" :items="['LDAP', 'Локальная ']" variant="outlined"></v-select>
          </v-col>
          <v-col cols="12" md="">
            <span cols="3" class="opacity-50 d-flex d-md-none mb-5">Логин</span>
            <v-text-field v-model="login" :counter="100" label="Значение" variant="outlined" @blur="handleBlur"
              :rules="loginRules" validate-on="blur" required></v-text-field>
          </v-col>
          <v-col cols="12" md="3" v-if="password !== null">
            <span cols="3" class="opacity-50 d-flex d-md-none mb-5">Пароль</span>
            <v-text-field :type="show1 ? 'text' : 'password'" v-model="password" :counter="100" label="Значение"
              variant="outlined" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1"
              @blur="handleBlur" :rules="passwordRules" validate-on="blur" required></v-text-field>
          </v-col>
          <v-col cols="12" md="1">
            <v-btn class="w-100" icon="mdi-delete" style="border-radius: 5px;" color="red"
              @click="deleteAccount"></v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { onMounted, ref, shallowRef, watch, type PropType } from 'vue';
import type { Account } from '@/types/types'
import { useAccountStore } from '@/stores/account';

const accountStore = useAccountStore()

const form = ref()
const show1 = ref(false)
const type = shallowRef('')
const metka = ref<string>('')
const login = ref<string>('')
const password = ref<string | null>('')
const id = ref<number>(0)

const loginRules = [
  (value: string) => {
    if (value) return true

    return 'Login is required.'
  },
  (value: string) => {
    if (value?.length <= 100) return true

    return 'Login must be less than 100 characters.'
  },
]

const passwordRules = [
  (value: string) => {
    if (value) return true

    return 'Password is required.'
  },
  (value: string) => {
    if (value?.length <= 100) return true

    return 'Password must be less than 100 characters.'
  },
]

const metkaRules = [
  (value: string) => {
    if (value?.length <= 50) return true

    return 'Metki must be less than 50 characters.'
  },
]

const { accountData } = defineProps({
  accountData: {
    type: Object as PropType<Account>,
    required: true,
  }
})

onMounted(() => {
  metka.value = accountData.metka.map(item => item.text).join(';')
  login.value = accountData.login
  password.value = accountData.password
  type.value = accountData.type
  id.value = accountData.id
})

watch(type, () => {
  if (type.value === 'LDAP') {
    password.value = null
  } else {
    if (!password.value) {
      password.value = ''
    }
  }
  editAccount()
})

function handleBlur() {
  const isValidLogin = loginRules.every(rule => rule(login.value) === true);
  const isValidPassword = password.value === null ? true: passwordRules.every(rule => rule(password.value || '') === true);
  const isValidMetka = metkaRules.every(rule => rule(metka.value) === true);

  if (isValidLogin && isValidPassword && isValidMetka) {
    editAccount()
  }
  form.value.validate()
}

function editAccount() {
  accountStore.editAccount(id.value, {
    id: id.value,
    type: type.value,
    metka: metka.value.split(';').map(item => ({ text: item })),
    login: login.value,
    password: password.value,
  })
}

function deleteAccount() {
  accountStore.deleteAccount(id.value)
}
</script>

<style scoped></style>
