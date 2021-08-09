import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";

function EventDetailPage() {
    let { id } = useParams();

    return (
        <div>
            EVENTS Detail PAGE - EVENT {id}
        </div>
    )
}

export default EventDetailPage;