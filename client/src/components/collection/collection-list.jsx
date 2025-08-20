import { TbRubberStamp } from "react-icons/tb";
import Badge from "./badge.jsx";
import { Divider } from "@heroui/react";
import SmallEvent from "./small-event.jsx";
import BadgeList from "./badge-list.jsx";

function CollectionList({ collection }) {
  return (
    <>
      <div className="flex flex-row w-full pb-2 gap-4 mt-4">
        <TbRubberStamp size={24} />
        <p className="font-semibold">Día de la Comunidad</p>
      </div>
      <BadgeList>
        <Badge badge={{ obtained: true }} />
        <Badge />
        <Badge />
        <Badge />
        <Badge badge={{ obtained: true }} />
        <Badge />
        <Badge />
        <Badge />
        <Badge />
        <Badge />
        <Badge />
        <Badge />
        <Badge />
      </BadgeList>
      <Divider />
      <div className="flex flex-row w-full pb-2 gap-4 mt-4">
        <TbRubberStamp size={24} />
        <p className="font-semibold">Día de la Comunidad Clásico</p>
      </div>
      <BadgeList>
        <Badge />
        <Badge />
        <Badge />
        <Badge />
        <Badge />
      </BadgeList>
      <Divider />
      <div className="mb-4 flex flex-row w-full flex-wrap pb-2 gap-2 mt-4">
        <SmallEvent event={{ name: "GO Fest" }} />
        <SmallEvent event={{ name: "GO Tour" }} />
        <SmallEvent event={{ name: "GO Wild Area" }} />
        <SmallEvent event={{ name: "GO Placeholder" }} />
      </div>
      <Divider />
      <div className="flex flex-row w-full pb-2 gap-4 mt-4">
        <TbRubberStamp size={24} />
        <p className="font-semibold">Otros Eventos</p>
      </div>
      <BadgeList>
        <Badge />
        <Badge />
        <Badge />
        <Badge />
        <Badge />
      </BadgeList>
    </>
  );
}

export default CollectionList;
