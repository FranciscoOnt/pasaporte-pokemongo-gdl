import { Image } from "@heroui/react";
import { TbRubberStamp } from "react-icons/tb";

function BadgeList({ children }) {
  return (
    <>
      <div className="mb-4 grid gap-y-4 p-2 grid-flow-row grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 w-full justify-evenly content-center align-middle">
        {children}
      </div>
    </>
  );
}

export default BadgeList;
