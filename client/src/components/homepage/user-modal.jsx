import { useRevalidator } from "react-router";
import {
  Avatar,
  Divider,
  Form,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ButtonGroup,
  Image,
  Input,
} from "@heroui/react";
import { useState } from "react";
import {
  AVATAR_COLORS,
  TEAMS,
  TEAM_NAMES,
  TEAM_BTN_COLOR,
} from "../../lib/constants";
import { updateUserProfile } from "../../lib/api";
import { addToast } from "@heroui/toast";
import { TbPokeball } from "react-icons/tb";

function UserModal({ isOpen, onOpenChange, profile }) {
  const [newName, setNewName] = useState(profile.displayName ?? "");
  const [team, setTeam] = useState(profile.team ?? "none");
  const [selectedColor, setSelectedColor] = useState(profile.profileColor);
  const [isWelcome, setIsWelcome] = useState(!profile.displayName);
  const revalidator = useRevalidator();

  const resetForm = () => {
    setNewName(profile.displayName);
    setSelectedColor(profile.profileColor);
    setTeam(profile.team);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (
      profile.displayName == data.displayName &&
      profile.profileColor == data.profileColor &&
      profile.team == data.team
    ) {
      onOpenChange();
      return;
    }

    const res = await updateUserProfile(data);

    if (res.statusText === "OK") {
      if (res.data.length > 0) {
        res.data.map((error) =>
          addToast({
            title: "Información",
            variant: "bordered",
            color: "secondary",
            timeout: 10000,
            description: error.message,
          }),
        );
      }

      await revalidator.revalidate();
    }
    setIsWelcome(false);
    onOpenChange();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
        hideCloseButton
        isDismissable={false}
      >
        <Form onSubmit={onSubmit}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>
                  {" "}
                  {isWelcome ? "Bienvenido!" : "Mi Perfil"}
                </ModalHeader>
                <Divider />
                <ModalBody>
                  {isWelcome && (
                    <div className="mb-2 text-sm">
                      <p>
                        Antes de comenzar, ingresa tu nombre de entrenador y
                        equipo de Pokémon GO para poder participar en las
                        dinámicas de la comunidad.
                      </p>
                    </div>
                  )}
                  <Input
                    name="displayName"
                    size="md"
                    minLength={3}
                    maxLength={15}
                    isRequired
                    pattern="[a-zA-Z0-9]{3,15}"
                    label="Nombre de Entrenador"
                    description="Tu nombre de entrenador en Pokémon GO."
                    errorMessage="Por favor ingresa un nombre de entrenador válido."
                    onValueChange={setNewName}
                    value={newName}
                  />
                  <p>
                    <span className="font-semibold">Mi Equipo: </span>
                    {TEAM_NAMES[team]}
                  </p>
                  <ButtonGroup>
                    {TEAMS.map((_team) => {
                      const TeamImage = () =>
                        _team === "none" ? (
                          <TbPokeball size={24} />
                        ) : (
                          <Image className="size-8" src={`/${_team}.webp`} />
                        );

                      return (
                        <Button
                          key={_team}
                          className="flex flex-col h-14 gap-0.5"
                          variant={team == _team ? "bordered" : "flat"}
                          color={TEAM_BTN_COLOR[_team]}
                          onPress={() => setTeam(_team)}
                        >
                          <TeamImage />
                          {TEAM_NAMES[_team]}
                        </Button>
                      );
                    })}
                  </ButtonGroup>
                  <input readOnly name="team" hidden value={team} />
                  <p className="text-tiny text-neutral-500">
                    La informacion proporcionada podria requerir ser verificada
                    al momento de participar en las dinamicas de la comunidad en
                    persona.
                  </p>
                  <Divider />
                  <div className="mb-4">
                    <p>Elege un color para tu perfil.</p>
                  </div>

                  <div className="grid grid-flow-row grid-cols-6 gap-2 justify-items-center">
                    {AVATAR_COLORS.map((color, index) => (
                      <Avatar
                        as="button"
                        type="button"
                        className="cursor-pointer"
                        classNames={{
                          base: color,
                        }}
                        color="primary"
                        key={`color-${index}`}
                        isBordered={selectedColor == index}
                        onClick={() => setSelectedColor(index)}
                        showFallback
                      />
                    ))}
                    <input
                      readOnly
                      name="profileColor"
                      hidden
                      value={selectedColor}
                    />
                  </div>
                </ModalBody>
                <Divider />
                <ModalFooter className="flex flex-col">
                  {isWelcome && (
                    <p className="text-tiny">
                      Si lo deseas puedes actualizar tu perfil en cualquier
                      momento pulsando en el avatar de la parte superior derecha
                      de la página.
                    </p>
                  )}
                  <Button color="primary" type="submit">
                    Confirmar
                  </Button>
                  <Button
                    color="primary"
                    variant="light"
                    onPress={() => {
                      if (isWelcome) {
                        setIsWelcome(false);
                      }
                      resetForm();
                      onClose();
                    }}
                  >
                    {isWelcome ? "Mas Tarde" : "Cancelar"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Form>
      </Modal>
    </>
  );
}

export default UserModal;
