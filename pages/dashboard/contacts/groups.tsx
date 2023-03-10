import { Badge, Button, Divider, Group, Loader, Table as _Table, Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconEye, IconPencil, IconTrash } from '@tabler/icons';
import { useEffect } from 'react';
import {
  contactGroupSelector,
  deleteContactGroupById,
  fetchContactGroups,
} from '../../../src/application/state/features/contact_groups';
import { useAppDispatch, useAppSelector } from '../../../src/application/state/hooks/hooks';
import { showNotification } from '../../../src/application/utils/notifications';
import CreateContactGroupModal from '../../../src/presentation/components/ContactGroups/CreateContactGroupModal';
import DashboardLayout from '../../../src/presentation/layouts/dashboard_layout';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Table = dynamic<React.ComponentProps<typeof _Table>>(
  () => import('@mantine/core').then((mod) => mod.Table),
  { ssr: false }
);

function ContactGroupsPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    data: { contactGroups },
    pending,
    error,
  } = useAppSelector(contactGroupSelector);

  const openCreateGroupModal = () =>
    modals.open({
      title: 'Create a new contact group',
      children: <CreateContactGroupModal />,
    });

  const openDeleteModal = (id: string) =>
    modals.openConfirmModal({
      title: 'Delete this group',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this group? This action is destructive and you will have
          to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: 'Delete group', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => {
        dispatch(deleteContactGroupById(id));
      },
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

  useEffect(() => {
    dispatch(fetchContactGroups());
  }, []);

  return (
    <DashboardLayout>
      <Group position="apart">
        <Title>Contact Groups</Title>
        <Button onClick={openCreateGroupModal}>Create Group</Button>
      </Group>
      <Table mt={30} striped highlightOnHover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Contacts</th>
            <th>Description</th>
            <th>Date Created</th>
            <th>Date Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <Divider />
        <tbody>
          {pending && <Loader variant="dots" />}
          {!pending &&
            contactGroups.map((group, index) => {
              return (
                <tr>
                  <td>{index + 1}.</td>
                  <td>{group.name}</td>
                  <td>
                    <Badge
                      variant="gradient"
                      gradient={{
                        from: group.status === 'active' ? 'indigo' : 'orange',
                        to: group.status === 'active' ? 'cyan' : 'red',
                      }}
                    >
                      {group.status}
                    </Badge>
                  </td>
                  <td>{group._count.contacts} Contacts</td>
                  <td>{group.description}</td>
                  <td>{new Date(group.created_at).toLocaleDateString()}</td>
                  <td>{new Date(group.updated_at).toLocaleDateString()}</td>
                  <td>
                    <Group>
                      <IconEye
                        onClick={() => {
                          router.push(`/dashboard/contacts/${group.id}`);
                        }}
                        size={14}
                        style={{ cursor: 'pointer' }}
                      />
                      <IconPencil size={14} style={{ cursor: 'pointer' }} color={'orange'} />
                      <IconTrash
                        onClick={() => {
                          openDeleteModal(group.id);
                        }}
                        size={14}
                        style={{ cursor: 'pointer' }}
                        color={'red'}
                      />
                    </Group>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </DashboardLayout>
  );
}

export default ContactGroupsPage;
