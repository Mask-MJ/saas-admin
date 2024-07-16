<script setup lang="ts">
import { createUnit, updateUnit, type UnitInfo } from '@/api/system/unit';
import { useForm } from '@/components/Form';
import { useModalInner } from '@/components/Modal';

import { setSchemas } from './data';

const emits = defineEmits(['success', 'register']);

const [registerModal, { closeModal, setModalProps }] = useModalInner((data: UnitInfo) => {
  console.log(data);
  if (data.id) {
    setModalProps({ title: '编辑单位' });
    setPathsValue(data);
  }
});

const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
  labelWidth: 100,
  schemas: setSchemas,
});

const handleSubmit = async () => {
  try {
    await validate();
    const result = getPathsValue();
    result.id ? await updateUnit(result) : await createUnit(result);
    emits('success');
    closeModal();
  } catch (error) {
    console.warn(error);
  }
};
</script>

<template>
  <Modal title="新增单位" class="!w-100" @register="registerModal" @positive-click="handleSubmit">
    <Form @register="registerForm" />
  </Modal>
</template>

<style scoped></style>
