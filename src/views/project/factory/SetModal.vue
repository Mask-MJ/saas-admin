<script setup lang="ts">
import { createFactory, updateFactory, type FactoryInfo } from '@/api/project/factory';
import { useForm } from '@/components/Form';
import { useModalInner } from '@/components/Modal';
import { setSchemas } from './data';

const emits = defineEmits(['success', 'register']);

const [registerModal, { closeModal, setModalProps }] = useModalInner((data: FactoryInfo) => {
  setModalProps({ title: data.id ? '编辑工厂' : '新增工厂' });
  if (data.id) {
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
    result.id ? await updateFactory(result) : await createFactory(result);
    emits('success');
    closeModal();
  } catch (error) {
    console.warn(error);
  }
};
</script>

<template>
  <Modal class="!w-100" @register="registerModal" @positive-click="handleSubmit">
    <Form @register="registerForm" />
  </Modal>
</template>

<style lang="" scoped></style>
