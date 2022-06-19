/*Header Component*/

import React from "react";
import Button from "./Button";
import {Link} from "react-router-dom";

const Header = ({onAddSurvey, showAddSurvey, title}) => {
    return (
        <header className="header">
            <h1>
                {title}
            </h1>
            <Link to="/AddSurvey">
                <Button
                    color={showAddSurvey
                    ? "red"
                    : "purple"}
                    text={showAddSurvey
                    ? "Done"
                    : "Add Survey"}
                    onClick={onAddSurvey}/>
            </Link>
        </header>
    );
};

export default Header;