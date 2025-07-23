import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Account } from '@/types/types'

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<Account[]>([])

  function createAccount() {
    const data = {
      id: Date.now(),
      metka: [],
      type: 'Локальная',
      login: '',
      password: '',
    }

    accounts.value.push(data)
  }

  function deleteAccount(id: number) {
    accounts.value = accounts.value.filter(item => item.id !== id)
  }

  return { accounts, createAccount, deleteAccount }
})
