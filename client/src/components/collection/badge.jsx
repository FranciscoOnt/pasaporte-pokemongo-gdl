import { Image } from "@heroui/react";
import { TbRubberStamp } from "react-icons/tb";

function Badge({ badge = {} }) {
    const { title = 'MES', subtitle = '', obtained = false } = badge;
    return (
        <>
            <div className="relative flex rounded-xl bg-default-200 size-16 md:size-24 justify-self-center content-evenly flex-wrap">
                { obtained && <div className="absolute translate-x-2 md:translate-x-4 translate-y-2 md:translate-y-4 !opacity-90 rotate-12 size-12 md:size-16"><Image src='/seal-default.png' /></div> }
                <p className="w-full text-center text-tiny text-foreground-400">MES</p>
                <TbRubberStamp className='mx-auto opacity-10' size={32} />
                <p className="w-full text-center text-tiny text-foreground-400">Día 2</p>
            </div>
        </>
    )
}

export default Badge
