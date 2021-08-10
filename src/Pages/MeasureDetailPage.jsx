import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";

function MeasureDetailPage() {
    let { id } = useParams();

    return (
        <div>
            Measure Detail PAGE - Measure {id}
        </div>
    )
}

export default MeasureDetailPage;