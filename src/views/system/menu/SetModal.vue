<script setup lang="ts">
import { createMenu, updateMenu, type MenuInfo } from '@/api/system/menu'
import { useForm } from '@/components/Form'
import { useModalInner } from '@/components/Modal'

import { setSchemas } from './data'

const emits = defineEmits(['success', 'register'])

const [registerModal, { closeModal, setModalProps }] = useModalInner((data: MenuInfo) => {
  if (data.id) {
    setModalProps({ title: '编辑菜单' })
    setPathsValue(data)
  }
})

const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
  labelWidth: 100,
  schemas: setSchemas
})

const handleSubmit = async () => {
  try {
    await validate()
    const result = getPathsValue()
    result.id ? await updateMenu(result) : await createMenu(result)
    emits('success')
    closeModal()
  } catch (error) {
    console.warn(error)
  }
}
</script>

<template>
  <Modal title="新增菜单" class="!w-100" @register="registerModal" @positive-click="handleSubmit">
    <Form @register="registerForm" />
  </Modal>
</template>

<style scoped></style>
