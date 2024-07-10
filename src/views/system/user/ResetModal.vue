<script setup lang="ts">
import { useForm } from '@/components/Form';
import { useModalInner } from '@/components/Modal';

import { resetSchemas } from './data';
import { client } from '@/utils';

const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
  labelWidth: 100,
  schemas: resetSchemas,
});
const [registerModal, { closeModal }] = useModalInner(async (data) => {
  setPathsValue(data);
});

const handleSubmit = async () => {
  try {
    await validate();
    const result = getPathsValue();
    await client.PATCH('/api/system/user/{id}', {
      params: { path: { id: result.id } },
      body: result,
    });
    window.$message.success(`修改成功`);
    closeModal();
  } catch {
    window.$message.error('操作失败');
  }
};
</script>

<template>
  <Modal title="重置密码" @register="registerModal" @positive-click="handleSubmit">
    <Form @register="registerForm" />
  </Modal>
</template>
