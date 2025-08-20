import { Image } from "@heroui/react";
import { TbPokeball } from "react-icons/tb";

const TeamImage = ({ team }) =>
  team === "none" ? (
    <TbPokeball className="stroke-neutral-400" size={32} />
  ) : (
    <Image removeWrapper className="size-8 shrink-0" src={`/${team}.webp`} />
  );

export default TeamImage;
