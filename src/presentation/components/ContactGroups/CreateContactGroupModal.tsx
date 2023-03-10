import { Button, Container, Select, Textarea, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import React, { useEffect } from 'react';
import { InferType } from 'yup';
import {
  contactGroupSelector,
  createContactGroup,
} from '../../../application/state/features/contact_groups';
import { useAppDispatch, useAppSelector } from '../../../application/state/hooks/hooks';
import { showNotification } from '../../../application/utils/notifications';
import { contactGroupValidationSchema } from '../../../core/validations/contact_group_validation';

function CreateContactGroupModal() {
  const dispatch = useAppDispatch();
  const { pending, error } = useAppSelector(contactGroupSelector);
  const form = useForm<InferType<typeof contactGroupValidationSchema>>({
    initialValues: {
      name: '',
      description: '',
      status: 'active',
    },

    validate: yupResolver(contactGroupValidationSchema),
  });
  useEffect(() => {
    if (error !== undefined && error !== null) {
      showNotification({
        title: 'An error has occurred',
        message: 'We are unable to process your request at the moment',
        type: 'danger',
      });
    }
  }, [error]);

  return (
    <Container>
      <form
        onSubmit={form.onSubmit((values) => {
          dispatch(createContactGroup(values));
        })}
      >
        <TextInput
          label="Name"
          placeholder="Enter the group's name"
          required
          {...form.getInputProps('name')}
        />

        <Textarea
          mt={10}
          label="Description"
          placeholder="Enter the group's description"
          {...form.getInputProps('description')}
        />

        <Select
          mt={10}
          label="Status"
          placeholder="Pick one"
          data={[
            { value: 'active', label: 'Active' },
            { value: 'suspended', label: 'Suspended' },
          ]}
          {...form.getInputProps('status')}
        />

        <Button loading={pending} fullWidth mt="xl" type="submit">
          Create Group
        </Button>
      </form>
    </Container>
  );
}

export default CreateContactGroupModal;
