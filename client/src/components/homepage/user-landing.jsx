import { CardBody, CardHeader, Divider, Tab, Tabs } from "@heroui/react";
import { CgCalendar } from "react-icons/cg";
import { TbRubberStamp } from "react-icons/tb";
import EventsTab from "../user/events-tab";
import CollectionTab from "../user/collection";

function UserLanding({ profile }) {
  return (
    <>
      <CardBody>
        <Tabs fullWidth color="default" variant="solid" size="lg" radius="full">
          <Tab
            key="eventos"
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
            key="sellos"
            title={
              <div className="flex items-center space-x-2">
                <TbRubberStamp />
                <span>Mis Sellos</span>
              </div>
            }
          >
            <CollectionTab profile={profile} />
          </Tab>
        </Tabs>
      </CardBody>
    </>
  );
}

export default UserLanding;
