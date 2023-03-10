import {
  Avatar,
  Burger,
  Container,
  Group,
  Menu,
  rem,
  Tabs,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconLogout } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { UserAccount } from '../../../../types';
import { useStyles } from './Navbar.styles';

export interface NavbarTab {
  name: string;
  path: string;
}

interface NavbarProps {
  user: UserAccount | null;
  tabs: NavbarTab[];
}

export function Navbar({ user, tabs }: NavbarProps) {
  const { classes, theme, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const router = useRouter();

  const getSelectedTab = () => {
    const path = router.pathname;
    return tabs.find((tab) => tab.path === path)?.name;
  };

  const items = tabs.map((tab) => (
    <Tabs.Tab
      onClick={() => {
        router.push(tab.path);
      }}
      value={tab.name}
      key={tab.path}
    >
      {tab.name}
    </Tabs.Tab>
  ));

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size={'lg'}>
        <Group position="apart">
          <MantineLogo size={28} inverted />

          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
            color={theme.white}
          />

          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group spacing={7}>
                  <Avatar alt={`${user?.first_name} ${user?.last_name}`} radius="xl" size={20} />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1, color: theme.white }} mr={3}>
                    {`${user?.first_name} ${user?.last_name}`}
                  </Text>
                  <IconChevronDown size={rem(12)} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5} />}>Logout</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      <Container size={'lg'}>
        <Tabs
          defaultValue={getSelectedTab() ?? 'Home'}
          variant="outline"
          classNames={{
            root: classes.tabs,
            tabsList: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>
    </div>
  );
}
