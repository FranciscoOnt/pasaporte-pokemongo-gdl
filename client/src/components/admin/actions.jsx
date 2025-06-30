import { Card, Listbox, ListboxItem, ListboxSection, Spinner } from "@heroui/react";
import AdminActionCard from "./action-card";
import { CgCalendar } from "react-icons/cg";
import { VscLocation } from "react-icons/vsc";
import { FaRegUserCircle } from "react-icons/fa";
import { TbRubberStamp } from "react-icons/tb";
import { BsPassport } from "react-icons/bs";
import { SiGithubsponsors } from "react-icons/si";



function AdminActions() {

    return (
        <>
            <div className="flex flex-col flex-wrap sm:flex-row w-full gap-2 justify-between">
                <AdminActionCard
                    icon={<CgCalendar size={24} />}
                    title={"Eventos"}
                    link={"/admin/eventos"}
                    loading={true}
                >
                    Events Content
                </AdminActionCard>
                <AdminActionCard
                    icon={<VscLocation size={24} />}
                    title={"Lugares"}
                    link={"/admin/lugares"}
                    loading={true}
                >
                    Sites Content
                </AdminActionCard>
                <AdminActionCard
                    icon={<FaRegUserCircle size={24} />}
                    title={"Usuarios"}
                    link={"/admin/usuarios"}
                    loading={true}
                >
                    Users Content
                </AdminActionCard>
                <AdminActionCard
                    icon={<TbRubberStamp size={24} />}
                    title={"Sellos"}
                    link={"/admin/sellos"}
                    loading={true}
                >
                    Seals Content
                </AdminActionCard>
                <AdminActionCard
                    icon={<BsPassport size={24} />}
                    title={"Colecciones"}
                    link={"/admin/colleciones"}
                    loading={true}
                >
                    Collections Content
                </AdminActionCard>
                <AdminActionCard
                    icon={<SiGithubsponsors  size={24} />}
                    title={"Patrocinadores"}
                    link={"/admin/patrocinadores"}
                    loading={true}
                >
                    Sponsors Content
                </AdminActionCard>
            </div>
        </>
    )
}

export default AdminActions
