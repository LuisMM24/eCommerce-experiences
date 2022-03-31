import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import {
  createStyles,
  Header,
  Button,
  Menu,
  Group,
  Center,
  Burger,
  Image,
  UnstyledButton,
  Avatar,
  Text,
  Container,
} from "@mantine/core";
import { Settings, Logout } from "tabler-icons-react";
import { useBooleanToggle } from "@mantine/hooks";
import { ChevronDown } from "tabler-icons-react";
import { authContext } from "../../context/authContext";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors.white,
    borderBottom: "1px solid rgb(233, 236, 239)",
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  userMenu: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  user: {
    color: theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
    },
  },
  userActive: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[2],
  },
  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.black,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[1],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

interface HeaderSearchProps {
  links: {
    link: string;
    label: string;
    links?: { link: string; label: string }[];
  }[];
}

export function HeaderMenuColored({ links }: HeaderSearchProps) {
  const { currentUser, signOut } = useContext(authContext);
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { classes, theme, cx } = useStyles();
  const router = useRouter();

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));
    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          delay={0}
          transitionDuration={0}
          placement="end"
          gutter={1}
          control={
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <ChevronDown size={12} />
              </Center>
            </a>
          }
        >
          {menuItems}
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Header height={56} className={classes.header} mb={120}>
      <Container>
        <div className={classes.inner}>
          <Image
            width={100}
            src="https://i.ibb.co/k0V3FVG/logo.png"
            alt="logo"
          />

          <Group spacing={5} className={classes.links}>
            {items}
            {currentUser && (
              <Menu
                size={260}
                placement="end"
                transition="pop-top-right"
                className={classes.userMenu}
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
                control={
                  <UnstyledButton
                    className={cx(classes.user, {
                      [classes.userActive]: userMenuOpened,
                    })}
                  >
                    <Group spacing={7}>
                      <Avatar
                        src={currentUser.photoURL}
                        alt={"luis"}
                        radius="xl"
                        size={20}
                      />
                      <Text
                        weight={500}
                        size="sm"
                        sx={{ lineHeight: 1, color: theme.black }}
                        mr={3}
                      >
                        {currentUser.displayName
                          ? currentUser.displayName
                          : currentUser.email}
                      </Text>
                      <ChevronDown size={12} />
                    </Group>
                  </UnstyledButton>
                }
              >
                <Menu.Label>Settings</Menu.Label>
                <Menu.Item icon={<Settings size={14} />}>
                  Account settings
                </Menu.Item>
                <Menu.Item
                  onClick={async () => await signOut()}
                  icon={<Logout size={14} />}
                >
                  Logout
                </Menu.Item>
              </Menu>
            )}
            {!currentUser && (
              <Button
                variant="gradient"
                gradient={{ from: "indigo", to: "cyan" }}
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            )}
          </Group>

          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />
        </div>
      </Container>
    </Header>
  );
}
