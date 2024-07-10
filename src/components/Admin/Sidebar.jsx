import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Button
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    HomeIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    ChartBarIcon,
} from "@heroicons/react/24/solid";

export function AdminSidebar() {
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
                <ListItem>
                    <ListItemPrefix>
                        <ShieldCheckIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Gerenciar Permissões
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <ChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Gerenciar Dashboards
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <UserGroupIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Gerenciar Clientes
                    {/* <ListItemSuffix>
                        <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                    </ListItemSuffix> */}
                </ListItem>
            </List>
        </Card>
    );
}