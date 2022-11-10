import React from "react";

interface PropiedadesDashboard {

}

interface EstadoDashboard {

}

export default class Dashboard extends React.Component<PropiedadesDashboard, EstadoDashboard> {
    render() {
        return (
            <h1 className="float-up">Dashboard</h1>
        );
    }
}