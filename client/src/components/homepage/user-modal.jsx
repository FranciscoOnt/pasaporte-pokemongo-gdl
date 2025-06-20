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
    Input,
} from "@heroui/react";
import { useState } from "react";
import { AVATAR_COLORS } from "../../lib/constants";
import { updateUserProfile } from "../../lib/api"
import { addToast } from "@heroui/toast";

function UserModal({ isOpen, onOpenChange, profile }) {
    const [newName, setNewName] = useState(profile.displayName ?? "")
    const [selectedColor, setSelectedColor] = useState(profile.profileColor)
    const [isWelcome, setIsWelcome] = useState(!profile.displayName);
    const revalidator = useRevalidator();

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));

        if (profile.displayName == data.displayName &&
            profile.profileColor == data.profileColor) {
            onOpenChange()
            return;
        }

        const res = await updateUserProfile(data)

        if (res.statusText === "OK") {
            if (res.data.length > 0) {
                res.data.map(error => addToast({
                    title: 'Información',
                    variant: 'bordered',
                    color: 'secondary',
                    timeout: 10000,
                    description: error.message
                }))
            }
            revalidator.revalidate()
            onOpenChange()
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange} hideCloseButton isDismissable={false}>
                <Form onSubmit={onSubmit}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader > {isWelcome ? "Bienvenido!" : "Mi Perfil"}</ModalHeader>
                                <Divider />
                                <ModalBody>
                                    {isWelcome &&
                                        <div className="mb-4">
                                            <p>Antes de comenzar, ingresa tu nombre de entrenador de Pokémon GO para poder participar en las dinámicas de la comunidad.</p>
                                        </div>
                                    }
                                    <Input
                                        name="displayName"
                                        size="lg"
                                        minLength={3}
                                        maxLength={15}
                                        isRequired
                                        pattern="[a-zA-Z0-9]{3,15}"
                                        label="Nombre de Entrenador"
                                        description="Asegurate de que coincide con tu nombre en Pokémon GO."
                                        errorMessage="Pof favor ingresa un nombre de entrenador válido."
                                        onValueChange={setNewName}
                                        value={newName}
                                    />
                                    <Divider />
                                    <div className="mb-4">
                                        <p>Elege un color para tu perfil.</p>
                                    </div>

                                    <div className="grid grid-flow-row grid-cols-6 gap-2 justify-items-center">
                                        {AVATAR_COLORS.map((color, index) =>
                                            <Avatar
                                                as='button'
                                                type="button"
                                                className='cursor-pointer'
                                                classNames={{
                                                    base: color
                                                }}
                                                color="primary"
                                                key={`color-${index}`}
                                                isBordered={selectedColor == index}
                                                onClick={() => setSelectedColor(index)}
                                                showFallback
                                            />)}
                                        <input readOnly name="profileColor" hidden value={selectedColor} />
                                    </div>
                                </ModalBody>
                                <Divider />
                                <ModalFooter className="flex flex-col">
                                    {isWelcome &&
                                        <p className="text-sm">Si lo deseas puedes actualizar tu perfil en cualquier momento pulsando en el avatar de la parte superior derecha de la página.</p>
                                    }
                                    <Button color="primary" type="submit">
                                        Confirmar
                                    </Button>
                                    <Button
                                        color="primary"
                                        variant="light"
                                        onPress={() => {
                                            if (isWelcome) {
                                                setIsWelcome(false)
                                            }
                                            setNewName(profile.displayName)
                                            setSelectedColor(profile.profileColor)
                                            onClose()
                                        }}
                                    >
                                        {isWelcome ? "Mas Tarde" : "Cancelar"}
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Form>
            </Modal >
        </>
    );
}

export default UserModal
