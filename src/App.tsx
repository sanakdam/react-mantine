import { Button, Checkbox, Chip, Container, Divider, Flex, Grid, Group, Modal, SimpleGrid, Switch, Text, createStyles, useMantineTheme } from "@mantine/core"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import { ChangeEvent, FC, useCallback, useState } from "react"
import AppProvider from "./AppProvider"

const useStyles = createStyles((theme) => ({
  modalHeader: {
    justifyContent: "space-between",
    backgroundColor: theme.colors.green[6]
  }
}))

interface Personalize {
  name: string
  disabled: boolean
}

const PersonalizeItem: FC<Personalize> = (props) => {
  const theme = useMantineTheme()
  const [checked, setChecked] = useState<boolean>(false)

  const handleChangeCheckbox = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.currentTarget.checked)
  }, [setChecked])

  return (
    <Group>
      <Checkbox
        checked={checked}
        onChange={handleChangeCheckbox}
        labelPosition="right"
        label={props.name}
        color="green.6"
        disabled={props.disabled}
        styles={{
          label: { color: theme.colors.gray[6] },
          input: {
            ":checked": {
              backgroundColor: theme.colors.green[1]
            }
          },
          icon: {
            color: `${theme.colors.green[6]} !important`
          }
        }}
      />

      {
        props.disabled && (
          <Chip
            disabled
            size="xs"
            styles={{
              label: {
                fontWeight: "bold",
                "&[data-disabled]": {
                  color: `${theme.colors.red[8]} !important`,
                  backgroundColor: `${theme.colors.red[1]} !important`
                }
              }
            }}
          >
            DISABLED
          </Chip>
        )
      }
    </Group>
  )
}

const personalizes: Array<Personalize> = [
  {
    name: "LinkedIn Bio",
    disabled: false
  },
  {
    name: "List of past jobs",
    disabled: false
  },
  {
    name: "Years of experience",
    disabled: false
  },
  {
    name: "Current job description",
    disabled: true
  },
  {
    name: "Current experience",
    disabled: false
  },
  {
    name: "Current job specialities",
    disabled: true
  }
]

const AppRoot: FC = () => {
  const { classes, theme } = useStyles()
  const [opened, { open, close }] = useDisclosure(false)
  const isMobile = useMediaQuery("(max-width: 680px)")
  const [checked, setChecked] = useState<boolean>(false)

  const handleChangeSwitch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.currentTarget.checked)
  }, [setChecked])

  return (
    <Container>
      <Modal.Root
        opened={opened}
        onClose={close}
        fullScreen={isMobile}
        transitionProps={{ transition: "fade", duration: 200 }}
        size="xl"
        centered
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header className={classes.modalHeader}>
            <Text color="gray.0" size="md">Personalization Settings:</Text>

            <Switch
              labelPosition="left"
              label="Use Account Research"
              checked={checked}
              onChange={handleChangeSwitch}
              size="sm"
              color="gray.0"
              styles={{
                thumb: { backgroundColor: checked ? theme.colors.green[6] : theme.white },
                label: { color: theme.white }
              }}
            />
          </Modal.Header>
          <Modal.Body p="0">
            <Flex direction="column" px="3rem" py="xl" gap="lg">
              <Text weight="bold" size="lg" color="gray.7">Profile:</Text>

              <SimpleGrid cols={2} spacing="lg">
                {
                  personalizes.map((item, index) => (
                    <PersonalizeItem
                      key={index}
                      name={item.name}
                      disabled={item.disabled}
                    />
                  ))
                }
              </SimpleGrid>
              <Divider />

              <Text weight="bold" size="lg" color="gray.7">Account:</Text>

              <SimpleGrid cols={2} spacing="lg">
                {
                  personalizes.map((item, index) => (
                    <PersonalizeItem
                      key={index}
                      name={item.name}
                      disabled={item.disabled}
                    />
                  ))
                }
              </SimpleGrid>
            </Flex>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>

      <Button color="green.6" onClick={open}>
        Click to Personalize
      </Button>
    </Container>
  )
}

const App: FC = () => {
  return (
    <AppProvider>
      <AppRoot />
    </AppProvider>
  )
}

export default App