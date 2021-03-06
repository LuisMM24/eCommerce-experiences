import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

// register form
// get pass strength
import { authContext } from "../../context/authContext";

export function AuthenticationForm(props: PaperProps<"div">) {
  const [type, toggle] = useToggle("login", ["login", "register"]);
  const navigate = useNavigate();
  const setRegisterRules = (value: string): boolean => {
    // if (type === "register") {
    //   return value.length < 2;
    // }
    return value === value;
  };

  const {
    currentUser,
    hasError,
    isLoading,
    emailAndPasswordSignUpHandler
  } = useContext(authContext);

  useEffect(() => {
    if (currentUser) navigate("/dashboard/experiences");
  }, [currentUser, navigate]);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
      // password: (value) => getStrength(value) === 100,
    },
  });
  
  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" weight={500}>
        Dashboard Log In
      </Text>

      <form
        onSubmit={form.onSubmit((values) => {
          emailAndPasswordSignUpHandler(type, values);
        })}
      >
        <Group direction="column" grow>
          {/* {type === "register" && (
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
          )} */}

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

          {/* {type === "register" && (
            <>
              <PasswordStrength
                formValue={form.values.password}
                handlerChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
              />
            </>
          )} */}
        </Group>

        <Group position="apart" mt="xl">
          {/* <Anchor
            component="button"
            type="button"
            color="gray"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor> */}
          <Button type="submit" disabled={isLoading}>
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
