import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { Navbar, SegmentedControl, Container, Text, Button, Group, createStyles } from '@mantine/core';
import {
    ShoppingCart,
    License,
    Message2,
    BellRinging,
    Messages,
    Fingerprint,
    Key,
    Settings,
    TwoFA,
    Users,
    FileAnalytics,
    DatabaseImport,
    Receipt2,
    ReceiptRefund,
    Logout,
    SwitchHorizontal,
    } from 'tabler-icons-react';

import {authContext} from '../../context/authContext'
import ButtonsGroup from '../ButtonsGroup/ButtonsGroup'
import { signOut } from 'firebase/auth';

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');

    return {
    navbar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    },

    title: {
        textTransform: 'uppercase',
        letterSpacing: -0.25,
    },

    link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
        },
    },

    linkIcon: {
        ref: icon,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },

    linkActive: {
        '&, &:hover': {
        backgroundColor:
            theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
            : theme.colors[theme.primaryColor][0],
        color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
        [`& .${icon}`]: {
            color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
        },
        },
    },

    footer: {
        borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
        paddingTop: theme.spacing.md,
    },
    };
    });

    const tabs:any = {
    users: [
    { link: '', label: 'Notifications', icon: BellRinging },
    { link: '', label: 'Billing', icon: Receipt2 },
    { link: '', label: 'Security', icon: Fingerprint },
    { link: '', label: 'SSH Keys', icon: Key },
    { link: '', label: 'Databases', icon: DatabaseImport },
    { link: '', label: 'Authentication', icon: TwoFA },
    { link: '', label: 'Other Settings', icon: Settings },
    ],
    experiences: [
    { link: '', label: 'Orders', icon: ShoppingCart },
    { link: '', label: 'Receipts', icon: License },
    { link: '', label: 'Reviews', icon: Message2 },
    { link: '', label: 'Messages', icon: Messages },
    { link: '', label: 'Customers', icon: Users },
    { link: '', label: 'Refunds', icon: ReceiptRefund },
    { link: '', label: 'Files', icon: FileAnalytics },
    ],
    };

type CardProps = {
    section: string,
    setSection: any
}

const NavbarSegmented = ({ section, setSection }: CardProps): JSX.Element => {

    const { currentUser, signOut } = useContext(authContext);
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Orders');

    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate('/dashboard/auth');
    }

    useEffect(() => {
        navigate(`/dashboard/${section}`)
    }, [section])

    // const links = tabs[section].map((item:any) => (
    // <a
    //     className={cx(classes.link, { [classes.linkActive]: item.label === active })}
    //     href={item.link}
    //     key={item.label}
    //     onClick={(event) => {
    //     event.preventDefault();
    //     setActive(item.label);
    //     }}
    // >
    //     <item.icon className={classes.linkIcon} />
    //     <span>{item.label}</span>
    // </a>
    // ));

    return (
    <Navbar width={{ sm: 300 }} p="md" className={classes.navbar} sx={{position: 'sticky', top: 0, left: 0}}>
        <Navbar.Section >
           
        </Navbar.Section>
        <Navbar.Section>
            <ButtonsGroup />
        </Navbar.Section>
        {/* <Navbar.Section grow mt="xl">
        {links}
        </Navbar.Section> */}
        <Navbar.Section sx={{marginTop: 'auto'}}>
            <Button>+ CREATE</Button>
        </Navbar.Section>
        <Navbar.Section className={classes.footer} sx={{marginTop: 'auto'}}>
            <Text weight={500} size="sm" className={classes.title} color="dimmed" >
                {currentUser?.email}
            </Text>
            <Group sx={{ display: 'flex'}}>
            <a href="#" className={classes.link} onClick={handleLogout}>
                <Logout className={classes.linkIcon} />
                <span>{currentUser ? 'Log out' : 'Log in'}</span>
            </a>
            </Group>
        </Navbar.Section>
    </Navbar>
    );
}
export default NavbarSegmented;