import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Button
} from "@material-tailwind/react";
import {
    HomeIcon,
    ShieldCheckIcon,
    ChartBarIcon,
    UserGroupIcon,
} from "@heroicons/react/24/solid";

export function AdminSidebar({ setSelectedComponent }) {
    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4 flex items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                    Admin Page
                </Typography>
                <a href="/">
                    <Button variant="outlined">
                        <HomeIcon className="h-5 w-5" />
                    </Button>
                </a>
            </div>
            <List>
                <ListItem onClick={() => setSelectedComponent('permissions')}>
                    <ListItemPrefix>
                        <ShieldCheckIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Gerenciar Permissões
                </ListItem>
                <ListItem onClick={() => setSelectedComponent('dashboards')}>
                    <ListItemPrefix>
                        <ChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Gerenciar Dashboards
                </ListItem>
                <ListItem onClick={() => setSelectedComponent('clients')}>
                    <ListItemPrefix>
                        <UserGroupIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Gerenciar Clientes
                </ListItem>
            </List>
        </Card>
    );
}
