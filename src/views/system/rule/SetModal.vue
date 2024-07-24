<script setup lang="ts">
import { createRule, updateRule, type RuleInfo } from '@/api/system/rule';
import { useForm } from '@/components/Form';
import { useModalInner } from '@/components/Modal';

import { setSchemas } from './data';

const emits = defineEmits(['success', 'register']);

const [registerModal, { closeModal, setModalProps }] = useModalInner((data: RuleInfo) => {
  setModalProps({ title: data.id ? '编辑规则' : '新增规则' });
  if (data.id) {
    setPathsValue(data);
  }
});

const [registerForm, { validate, getPathsValue, setPathsValue }] = useForm({
  labelWidth: 200,
  schemas: setSchemas,
});

const handleSubmit = async () => {
  try {
    await validate();
    const result = getPathsValue();
    const params = {
      ...result,
      url: result.file[0].url,
      fileName: result.file[0].name,
    };
    result.id ? await updateRule(params) : await createRule(params);
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

<style scoped></style>
