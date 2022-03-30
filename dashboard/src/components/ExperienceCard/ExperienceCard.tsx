import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'tabler-icons-react';
import {
    Card,
    Image,
    Text,
    Group,
    Badge,
    Button,
    ActionIcon,
    createStyles,
    useMantineTheme,
} from '@mantine/core';

import './ExperienceCard.css';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    section: {
        borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },

    like: {
        color: theme.colors.red[6],
    },

    label: {
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
    },
    }));

    interface BadgeCardProps {
    _id: string
    image: string;
    title: string;
    location: string;
    availableSlots: string;
    bookedSlots: string;
    level: string;
    // badges: {
    //     emoji: string;
    //     label: string;
    // }[];
    }

    export function ExperienceCard({ image, title, location, availableSlots, bookedSlots, level, _id }: BadgeCardProps) {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    // const features = badges.map((badge) => (
    //     <Badge
    //     color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
    //     key={badge.label}
    //     leftSection={badge.emoji}
    //     >
    //     {badge.label}
    //     </Badge>
    // ));

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
        <Card.Section>
            <Image src={image} alt={title} height={180} />
        </Card.Section>

        <Card.Section className={classes.section} mt="md">
            <Group position="apart">
            <Text size="lg" weight={500}>
                {title}
            </Text>
            <Badge size="sm">{location}</Badge>
            </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
            <div className="flex-row-between">
                <Text mt="md" className={classes.label} color="dimmed">
                Level: {level}
                </Text>
                <Text size="sm" mt="md" className={classes.label} color="dimmed">
                {bookedSlots}/{availableSlots} booked
                </Text>
            </div>
            {/* <Group spacing={7} mt={5}>
            {features}
            </Group> */}
        </Card.Section>

        <Group mt="xs">
            <Link to={`/experiences/${_id}`}>
                <Button radius="md" style={{ flex: 1 }}>
                Show details
                </Button>
            </Link>
            {/* <ActionIcon variant="default" radius="md" size={36}>
            <Heart size={18} className={classes.like} />
            </ActionIcon> */}
        </Group>
        </Card>
    );
}