import { CardHeader } from "@heroui/react";
import { Link } from "react-router";
import { IoMdHome, IoIosArrowForward } from "react-icons/io";


function AdminHeader({ current, user }) {
    return (
        <>
            <CardHeader className="flex flex-row content-center flex-wrap gap-2">
                <Link className="cursor-pointer flex flex-row gap-1" to="/admin">
                    <IoMdHome size={24} className="fill-foreground-500" />
                    <h1 className='text-xl'>Administración</h1>
                </Link>
                <IoIosArrowForward size={16} className="fill-foreground-500" />
                {user ?
                    <Link className="cursor-pointer flex flex-row gap-1" to="/admin/usuarios">
                        <h1 className='text-xl'>{current}</h1>
                    </Link> :
                    <h1 className='text-xl'>{current}</h1>
                }
                {user && <><IoIosArrowForward size={16} className="fill-foreground-500" />
                    <h1 className='text-xl'>{user}</h1></>}
            </CardHeader>
        </>
    )
}

export default AdminHeader


