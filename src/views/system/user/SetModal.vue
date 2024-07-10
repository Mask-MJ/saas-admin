<script setup lang="ts">
import type { UserInfo } from '@/stores/user';
// import { createUser, updateUser, type UserInfo } from '@/api/system/user';
import { useForm } from '@/components/Form';
import { useModalInner } from '@/components/Modal';

import { setSchemas } from './data';
import { client } from '@/utils';

const emits = defineEmits(['success', 'register']);
const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
  labelWidth: 100,
  schemas: setSchemas,
});

const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data: UserInfo) => {
  if (data.id) {
    setModalProps({ title: '编辑用户' });
    await setPathsValue(data);
  }
});

const handleSubmit = async () => {
  try {
    await validate();
    const result = getPathsValue();
    result.id
      ? await client.PATCH('/api/system/user/{id}', {
          params: { path: { id: result.id } },
          body: result,
        })
      : await client.POST('/api/system/user', { body: result });
    emits('success');
    closeModal();
  } catch (error) {
    console.warn(error);
  }
};
</script>

<template>
  <Modal title="新增用户" class="!w-120" @register="registerModal" @positive-click="handleSubmit">
    <Form @register="registerForm" />
  </Modal>
</template>

<style scoped></style>
