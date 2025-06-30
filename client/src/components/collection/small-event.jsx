import { Divider } from "@heroui/react";
import { TbRubberStamp } from "react-icons/tb";
import Badge from "./badge";

function SmallEvent({ event }) {
    const { name } = event;

    return (
        <>
            <div className="flex flex-col grow-0 basis-[calc((1/2*100%)-8px)] sm:basis-[calc((1/4*100%)-8px)] overflow-hidden">
                <div className="flex flex-row w-full pb-2 gap-2 mt-4 overflow-hidden">
                    <TbRubberStamp size={24} />
                    <p className="font-semibold overflow-hidden truncate">{name}</p>
                </div>
                <Divider />
                <div className="grid gap-4 p-2 grid-flow-row grid-cols-2 w-full justify-evenly content-center align-middle">
                    <Badge />
                    <Badge />
                </div>
            </div>
        </>
    )
}

export default SmallEvent
