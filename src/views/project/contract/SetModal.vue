<script setup lang="ts">
import { createContract, updateContract, type ContractInfo } from '@/api/project/contract';
import { useForm } from '@/components/Form';
import { useModalInner } from '@/components/Modal';
import dayjs from 'dayjs';

import { setSchemas } from './data';

const emits = defineEmits(['success', 'register']);

const [registerModal, { closeModal, setModalProps }] = useModalInner(async (data: ContractInfo) => {
  setModalProps({ title: data.id ? '编辑项目' : '新增项目' });
  if (data.id) {
    // 把合同时间转为时间戳
    data.contractTime = dayjs(data.contractTime).valueOf();
    await setPathsValue(data);
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
    result.id ? await updateContract(result) : await createContract(result);
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
