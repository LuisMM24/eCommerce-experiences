import React, { useState, useEffect } from 'react';
import { createStyles, Group, Button } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    button: {
        borderRadius: 0,

        '&:not(:first-of-type)': {
        borderLeftWidth: 0,
        },

        '&:first-of-type': {
        borderTopLeftRadius: theme.radius.sm,
        borderBottomLeftRadius: theme.radius.sm,
        },

        '&:last-of-type': {
        borderTopRightRadius: theme.radius.sm,
        borderBottomRightRadius: theme.radius.sm,
        },
    },
    }));

const  ButtonsGroup = () => {
    const { classes } = useStyles();

    const urlParam1 = useLocation().pathname.split('/').reverse()[0];
    const urlParam2 = useLocation().pathname.split('/').reverse()[1];

    return (
        <Group grow spacing={0}>
            <Button variant={(urlParam1 === 'users' || urlParam2 === 'users') ? 'filled' : 'default'} className={classes.button} component={Link} to="/dashboard/users">
                Users
            </Button>
            <Button variant={(urlParam1 === 'experiences' || urlParam2 === 'experiences') ? 'filled' : 'default'} className={classes.button} component={Link} to="/dashboard/experiences">
                Experiences
            </Button>
        </Group>
    );
}

export default ButtonsGroup;