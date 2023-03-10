import { Badge, Box, Card, Divider, Group, Loader, Table, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import {
  contactGroupSelector,
  fetchContactGroupById,
} from '../../../src/application/state/features/contact_groups';
import { useAppDispatch, useAppSelector } from '../../../src/application/state/hooks/hooks';
import DashboardLayout from '../../../src/presentation/layouts/dashboard_layout';

function ContactListPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    pending,
    error,
    data: { contactGroup },
  } = useAppSelector(contactGroupSelector);

  const { id } = router.query;

  useEffect(() => {
    if (id !== null && id !== undefined) {
      dispatch(fetchContactGroupById(id.toString()));
    }
  }, [id]);

  console.log(contactGroup);
  return (
    <DashboardLayout>
      {pending && <Loader variant="dots" />}

      {!pending && contactGroup != null && (
        <Card>
          <Group position="apart">
            <Box>
              <Box>
                <Title order={6}>Name:</Title>
                <Text color={'dimmed'}>{contactGroup.name}</Text>
              </Box>
              <Box my={10}>
                <Title order={6}>Description:</Title>
                <Text color={'dimmed'}>{contactGroup.description}</Text>
              </Box>
            </Box>
            <Box>
              <Box my={10}>
                <Title order={6}>Date Created:</Title>
                <Text color={'dimmed'}>
                  {new Date(contactGroup.created_at).toLocaleDateString()}
                </Text>
              </Box>
              <Box my={10}>
                <Title order={6}>Date Updated:</Title>
                <Text color={'dimmed'}>
                  {new Date(contactGroup.updated_at).toLocaleDateString()}
                </Text>
              </Box>
            </Box>
          </Group>

          <Title order={3} my={10}>
            Contacts
          </Title>

          <Table mt={30} striped highlightOnHover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
                <th>Date Created</th>
                <th>Date Updated</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <Divider />
            <tbody>
              {pending && <Loader variant="dots" />}
              {!pending &&
                contactGroup.contacts.map((contact, index) => {
                  return (
                    <tr>
                      <td>{index + 1}.</td>
                      <td>{`${contact.contact.surname},  ${contact.contact.other_names}`}</td>
                      <td>
                        <Badge
                          variant="gradient"
                          gradient={{
                            from: contact.contact.status === 'active' ? 'indigo' : 'orange',
                            to: contact.contact.status === 'active' ? 'cyan' : 'red',
                          }}
                        >
                          {contact.contact.status}
                        </Badge>
                      </td>

                      <td>{new Date(contact.contact.created_at).toLocaleDateString()}</td>
                      <td>{new Date(contact.contact.updated_at).toLocaleDateString()}</td>
                      <td>{`${contact.contact.created_by?.first_name} ${contact.contact.created_by?.last_name}`}</td>
                      <td>
                        {/* <Group>
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
                          /> */}
                        {/* </Group> */}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Card>
      )}
    </DashboardLayout>
  );
}

export default ContactListPage;
