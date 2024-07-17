import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    Input,
    Typography,
} from "@material-tailwind/react";

import { UserPlusIcon } from "@heroicons/react/24/solid";
export function SubscriptionPopover() {
    return (
        <Popover placement="bottom">
            <PopoverHandler>
                <Button className="flex items-center gap-2">
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4"/>
                    Usuário
                </Button>
            </PopoverHandler>
            <PopoverContent className="w-96">
                <Typography variant="h6" color="blue-gray" className="mb-6">
                    Cadastrar Novo Usuário
                </Typography>

                <form action="">
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-1 font-bold"
                    >
                        Email
                    </Typography>
                    <div className="flex gap-2">
                        <Input
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                </form>


                <Button variant="gradient" className="flex-shrink-0">
                    Subscribe
                </Button>
            </PopoverContent>
        </Popover>
    );
}