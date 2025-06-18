import { useRef } from "react";
import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Form,
    NavbarItem
} from "@heroui/react";
import { API_URL } from '../../lib/constants';
import { TbEdit, TbLogout, TbUserEdit } from "react-icons/tb";

function UserProfile({ profile }) {
    const avatarRef = useRef()
    const logoutRef = useRef()

    return (
        <>
            <NavbarItem justify="end" className="flex flex-row items-center gap-2">
                <div className="hidden sm:flex flex-col cursor-pointer" onClick={() => avatarRef?.current?.click()}>
                    <h1 className="text-sm">
                        Accediste como:
                    </h1>
                    <h2 className="font-bold text-xs">
                        {profile.displayName ?? 'Usuario de Google'}
                    </h2>
                </div>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            as='button'
                            className='cursor-pointer'
                            color={profile.displayName ? "primary" : "default"}
                            isBordered
                            name={profile.displayName}
                            ref={avatarRef}
                            showFallback
                        />
                    </DropdownTrigger>
                    <DropdownMenu variant="flat" >
                        <DropdownItem
                            textValue="Administrar"
                            key="admin"
                            href="/admin"
                            color="secondary"
                            hidden={!profile.isAdmin}
                            endContent={<TbEdit size={24} />}
                        >
                            Administrar
                        </DropdownItem>
                        <DropdownItem
                            textValue="Cambiar Nombre"
                            key="name change"
                            hidden={profile.displayName}
                            endContent={<TbUserEdit size={24} />}
                        >
                            Cambiar Nombre
                        </DropdownItem>
                        <DropdownItem
                            onPress={() => logoutRef?.current.click()}
                            textValue="Cerrar Sesión"
                            key="logout"
                            color="danger"
                            endContent={<TbLogout size={24} />}
                        >
                            Cerrar Sesión
                            <Form hidden action={`${API_URL}/logout`} method='post'>
                                <button type='submit' ref={logoutRef}>Logout</button>
                            </Form>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarItem>
        </>
    )
}

export default UserProfile
