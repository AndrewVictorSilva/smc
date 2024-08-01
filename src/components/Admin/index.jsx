import { useState } from 'react';
import { AdminSidebar } from "./Sidebar";
import {AdminDashboard} from "../AdminDashboard";
import { Register } from '../auth/register';
import { Company } from '../Company';
import { UsersMgmt } from './UsersMgmt';

export function Admin() {
    const [selectedComponent, setSelectedComponent] = useState('permissions');

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'permissions':
                return <UsersMgmt />;
            case 'dashboards':
                return <AdminDashboard />;
            case 'clients':
                return <Company />;
            case 'register':
                return <Register />;
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
