import React, { useContext, useState } from "react";
import { useForm, useToggle, upperFirst } from "@mantine/hooks";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
} from "@mantine/core";
import { GoogleButton, FacebookButton } from "../SocialButtons/SocialButtons";

// register form
// get pass strength
import { getStrength } from "./PasswordStrength/PasswordStrength";
import { PasswordStrength } from "./PasswordStrength/PasswordStrength";
import { authContext } from "../../context/authContext";
import { Value } from "sass";

interface IValidateFields {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export function AuthenticationForm(props: PaperProps<"div">) {
  const [type, toggle] = useToggle("login", ["login", "register"]);
  const setRegisterRules = (value: string): boolean => {
    if (type === "register") {
      return value.length < 2;
    }
    return value === value;
  };

  const {
    hasError,
    isLoading,
    facebookSignUpHandler,
    emailAndPasswordSignUpHandler,
    googleSignUpHandler,
  } = useContext(authContext);

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    validationRules: {
      firstName: (value) => setRegisterRules(value),
      lastName: (value) => setRegisterRules(value),
      email: (value) => /^\S+@\S+$/.test(value),
      password: (value) => getStrength(value) === 100,
    },
  });

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to Mantine, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton onClick={() => googleSignUpHandler(type)} radius="xl">
          Google
        </GoogleButton>
        <FacebookButton onClick={() => facebookSignUpHandler(type)} radius="xl">
          Facebook
        </FacebookButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit((values) => {
          emailAndPasswordSignUpHandler(type, values);
        })}
      >
        <Group direction="column" grow>
          {type === "register" && (
            <>
              <TextInput
                required
                label="First Name"
                placeholder="First Name"
                value={form.values.firstName}
                onChange={(event) =>
                  form.setFieldValue("firstName", event.currentTarget.value)
                }
                error={
                  form.errors.firstName &&
                  "First name must have at least 2 letters"
                }
              />
              <TextInput
                required
                label="Last Name"
                placeholder="Last Name"
                value={form.values.lastName}
                onChange={(event) =>
                  form.setFieldValue("lastName", event.currentTarget.value)
                }
                error={
                  form.errors.lastName &&
                  "Last name must have at least 2 letters"
                }
              />
            </>
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
          />
          {type === "login" && (
            <PasswordInput
              required
              label="Password"
              placeholder="Introduce your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={hasError && "Invalid password"}
            />
          )}

          {type === "register" && (
            <>
              <PasswordStrength
                formValue={form.values.password}
                handlerChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
              />
            </>
          )}
        </Group>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="gray"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" disabled={isLoading}>
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
