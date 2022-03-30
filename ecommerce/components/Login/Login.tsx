import React from "react";
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
  Checkbox,
  Anchor,
} from "@mantine/core";
import { GoogleButton, FacebookButton } from "../SocialButtons/SocialButtons";

// register form
// get pass strength
import { getStrength } from "./PasswordStrength/PasswordStrength";
import { PasswordStrength } from "./PasswordStrength/PasswordStrength";

export function AuthenticationForm(props: PaperProps<"div">) {
  const [type, toggle] = useToggle("login", ["login", "register"]);
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    validationRules: {
      firstName: (value) => value.length > 2,
      lastName: (value) => value.length > 2,
      email: (val) => /^\S+@\S+$/.test(val),
      password: (value) => getStrength(value) === 100,
    },
  });

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Welcome to Mantine, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl">Google</GoogleButton>
        <FacebookButton radius="xl">Facebook</FacebookButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
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
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
  );
}
