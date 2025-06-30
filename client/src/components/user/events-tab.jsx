import { CardBody, CardHeader, Divider } from "@heroui/react";
import BigEventCard from "../event/event-card-big";

function EventsTab() {
    return (
        <>
            <CardBody>
                <div className="flex flex-tow gap-4">
                    
                </div>
                <div className="flex flex-col gap-4 md:px-8">
                    <BigEventCard event={{active: true}} />
                    <BigEventCard event={{active: false}}/>
                </div>
            </CardBody>
        </>
    )
}

export default EventsTab
