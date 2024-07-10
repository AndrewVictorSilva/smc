import { useState } from 'react';
import { AdminSidebar } from "./Sidebar";
import {AdminDashboard} from "../AdminDashboard";
import { Register } from '../auth/register';
import { Company } from '../Company';

export function Admin() {
    const [selectedComponent, setSelectedComponent] = useState('permissions');

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'permissions':
                return <Register />;
            case 'dashboards':
                return <AdminDashboard />;
            case 'clients':
                return <Company />;
            default:
                return <div>Select an option from the sidebar</div>;
        }
    };

    return (
        <div className="flex">
            <AdminSidebar setSelectedComponent={setSelectedComponent} />
            <div className="flex-grow p-4">
                {renderComponent()}
            </div>
        </div>
    );
}
