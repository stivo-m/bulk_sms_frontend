import { AppShell, Container } from '@mantine/core';
import React, { use } from 'react';
import { authStateSelector } from '../../application/state/features/auth';
import { useAppSelector } from '../../application/state/hooks/hooks';
import { Navbar } from '../components/Navbar/Navbar';

type Props = {
  children: React.ReactNode;
};

const tabData = {
  tabs: [
    {
      name: 'Home',
      path: '/dashboard',
    },
    {
      name: 'Contact Groups',
      path: '/dashboard/contacts/groups',
    },
    {
      name: 'Messages',
      path: '/dashboard/messages',
    },
  ],
};

function DashboardLayout({ children }: Props) {
  const {
    data: { user },
  } = useAppSelector(authStateSelector);
  return (
    <AppShell
      header={<Navbar tabs={tabData.tabs} user={user} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <Container size={'lg'} sx={{ marginTop: '8rem' }}>
        {children}
      </Container>
    </AppShell>
  );
}

export default DashboardLayout;
