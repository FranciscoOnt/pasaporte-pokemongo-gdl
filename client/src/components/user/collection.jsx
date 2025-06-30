import { Button, CardBody, CardHeader, Divider, Image, DropdownTrigger, Dropdown, DropdownItem, DropdownMenu } from "@heroui/react";
import { useState, useMemo } from "react";
import { TbPokeball } from "react-icons/tb";
import CollectionList from "../collection/collection-list";

function CollectionTab({ profile }) {
    const { displayName, team } = profile;
    const [collection, setCollection] = useState(new Set(["2025"]))

    const selectedCollection = useMemo(
        () => Array.from(collection).join(", ").replace(/_/g, ""),
        [collection],
    );

    const TeamImage = () => (team === 'none' ?
        <TbPokeball size={28} />
        :
        <Image className="size-12" src={`/${team}.webp`} />
    )

    return (
        <>
            <CardHeader className="flex flex-col sm:flex-row gap-2 w-full justify-evenly">
                <div className="flex flex-row gap-2">
                    <TeamImage />
                    <p className="text-xl font-semibold my-auto">{displayName}</p>
                </div>
                <div className="flex flex-row gap-2" >
                    <p className="text-lg font-semibold my-auto">Colección: </p>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button className="capitalize" variant="bordered">
                                {selectedCollection}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            disallowEmptySelection
                            selectedKeys={collection}
                            selectionMode="single"
                            variant="flat"
                            onSelectionChange={setCollection}
                        >
                            <DropdownItem key="2025">2025</DropdownItem>
                            <DropdownItem key="2024">2024</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <CollectionList />
            </CardBody>
        </>
    )
}

export default CollectionTab
