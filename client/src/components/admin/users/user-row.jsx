import { AVATAR_COLORS } from "../../../lib/constants";
import { addToast, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import TeamImage from "./team-image";
import { Link } from "react-router";
import { BsPassport, BsThreeDots } from "react-icons/bs";
import { displayDate } from "../../../lib/utils";
import { resetUserNameCooldown, resetUserTeamCooldown } from "../../../lib/api";

export const RenderUserCell = ({ user, columnKey }) => {
    const cellValue = user[columnKey];

    const resetRequest = async (user, nameRequest = true) => {
        const { displayName, uuid } = user;
        const request = nameRequest ? resetUserNameCooldown : resetUserTeamCooldown

        if (uuid == "") {
            return;
        }

        const response = await request(uuid);

        if (response.statusText == "OK") {
            addToast({
                title: 'Información',
                variant: 'bordered',
                color: 'success',
                timeout: 3000,
                description: `Se ha reiniciado la fecha de cambio de ${nameRequest ? 'nombre' : 'equipo'} para el usuario ${displayName ?? uuid}.`
            })
            return;
        }
        addToast({
            title: 'Error',
            variant: 'bordered',
            color: 'danger',
            timeout: 3000,
            description: `No se ha podido reiniciar la fecha de cambio de ${nameRequest ? 'nombre' : 'equipo'} para el usuario ${displayName ?? uuid}.`
        })
    }

    switch (columnKey) {
        case "displayName":
            return (
                <div className="flex flex-row flex-nowrap items-center gap-x-1">
                    <TeamImage team={user.team} />
                    <Chip classNames={{ base: AVATAR_COLORS[user.profileColor] }}>
                        {user.displayName ? user.displayName.substring(0, 1) : '.'}
                    </Chip>
                    {user.displayName ?? user.uuid.substring(0, 8)}
                </div>
            );
        case "collection":
            return (
                <Link to={`/admin/usuarios/${user.uuid}`} className="flex flex-row">
                    <BsPassport size={24} /><span className="my-auto">Ver</span> </Link>);
        case "lastLogin":
            return (
                <p className="text-bold text-small capitalize">{displayDate(user.lastLogin)}</p>
            );
        case "createdAt":
            return (
                <p className="text-bold text-small capitalize">{displayDate(user.createdAt)}</p>
            );
        case "nameUpdateDate":
            return (
                <p className="text-bold text-small capitalize">{displayDate(user.nameUpdateDate)}</p>
            );
        case "teamUpdateDate":
            return (
                <p className="text-bold text-small capitalize">{displayDate(user.teamUpdateDate)}</p>
            );
        case "actions":
            return (
                <div className="relative flex justify-end items-center gap-2">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light">
                                <BsThreeDots />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem onPress={() => resetRequest(user)} key="reset-name">Reiniciar Cambio de Nombre</DropdownItem>
                            <DropdownItem onPress={() => resetRequest(user, false)} key="reset-team">Reiniciar Cambio de Equipo</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            );
        default:
            return cellValue;
    }
}
