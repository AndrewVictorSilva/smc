import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    Input,
    Typography,
} from "@material-tailwind/react";

import { UserPlusIcon } from "@heroicons/react/24/solid";
import { Register } from "../auth/register";
export function SubscriptionPopover() {
    return (
        <Popover placement="bottom">
            <PopoverHandler>
                <Button className="flex items-center gap-2">
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                    Usuário
                </Button>
            </PopoverHandler>
            <PopoverContent className="w-96">

                <Register />


            </PopoverContent>
        </Popover>
    );
}