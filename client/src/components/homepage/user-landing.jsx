import { CardBody, CardHeader, Divider, Tab, Tabs } from "@heroui/react";
import { CgCalendar } from "react-icons/cg";
import { TbRubberStamp } from "react-icons/tb";
import EventsTab from "../user/events-tab";
import CollectionTab from "../user/collection";

function UserLanding() {
    return (
        <>
            <CardBody>
                <Tabs fullWidth color="default" variant="solid" size='lg' radius="full">
                    <Tab
                        key="events"
                        title={
                            <div className="flex items-center space-x-2">
                                <CgCalendar />
                                <span>Eventos</span>
                            </div>
                        }
                    >
                        <EventsTab />
                    </Tab>
                    <Tab
                        key="collection"
                        title={
                            <div className="flex items-center space-x-2">
                                <TbRubberStamp />
                                <span>Mis Sellos</span>
                            </div>
                        }
                    >
                        <CollectionTab />
                    </Tab>
                </Tabs>
            </CardBody>
        </>
    )
}

export default UserLanding
