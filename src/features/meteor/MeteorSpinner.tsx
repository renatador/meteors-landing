import React from "react";
import {Spinner} from "react-bootstrap";

const MeteorSpinner = () => {
    return (
        <div>
            <Spinner animation="border" variant="outline-secondary" />
            <h6 className="outline-secondary">  Loading Meteors data</h6>
        </div>
    );
};
export default MeteorSpinner;