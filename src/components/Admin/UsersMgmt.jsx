import { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { SubscriptionPopover } from "./SubscriptionPopover";
import { UserModal } from './UserModal';
import { ConfirmDialog } from './ConfirmDialog'; // Import the ConfirmDialog component
import { getAllUsersInfo, deleteUserInfo } from "../../firebase/roles"; // Adjust the import based on your file structure

const TABS = [
  { label: "All", value: "all" },
  { label: "Admin", value: "admin" },
  { label: "Usuário", value: "user" },
];

const TABLE_HEAD = ["Email", "Cliente", "Função"];

const ITEMS_PER_PAGE = 10;

export function UsersMgmt() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedTab, setSelectedTab] = useState("all"); // State for selected tab
  const [sortOrder, setSortOrder] = useState("asc"); // State for sorting order
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false); // State for confirmation dialog

  useEffect(() => {
    const fetchUsersInfo = async () => {
      try {
        const usersData = await getAllUsersInfo();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUsersInfo();
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsConfirmDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedUser) {
      try {
        await deleteUserInfo(selectedUser.email); // Delete user from Firestore
        setUsers(users.filter(user => user.email !== selectedUser.email)); // Update state
        setIsConfirmDialogOpen(false);
        setSelectedUser(null);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setIsConfirmDialogOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) => {
    if (selectedTab === "all") return true;
    return user.role === selectedTab;
  });

  const sortedUsers = filteredUsers.sort((a, b) => {
    const nameA = a.email.toLowerCase();
    const nameB = b.email.toLowerCase();
    if (sortOrder === "asc") {
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    } else {
      return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
    }
  });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(sortedUsers.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDeleteUser = async (email) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUserInfo(email);
        alert("User deleted successfully.");
      } catch (error) {
        alert(`Error deleting user: ${error.message}`);
      }
    }
  };

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Gestão de Acessos
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Controle dos usuários da aplicação.
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <SubscriptionPopover />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value={selectedTab} className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => {
                    setSelectedTab(value);
                    setCurrentPage(1); // Reset to the first page when switching tabs
                  }}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  onClick={() => {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index === 0 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map(({ email, company, role, name }, index) => {
                const isLast = index === paginatedUsers.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={email}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name || email}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        {company && company.length > 0 ? (
                          company.map((comp, idx) => (
                            <Typography
                              key={idx}
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {comp}
                            </Typography>
                          ))
                        ) : (
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            No companies
                          </Typography>
                        )}
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={role === "admin" ? "admin" : "user"}
                          color={role === "admin" ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton
                          variant="text"
                          onClick={() =>
                            openModal({ email, company, role })
                          }
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Delete User">
                        <IconButton
                          variant="text"
                          onClick={() => handleDeleteUser(email)} // Pass the user's email
                        >
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={TABLE_HEAD.length} className="text-center p-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </CardFooter>
      <UserModal
        isOpen={isModalOpen}
        user={selectedUser}
        onClose={closeModal}
      />
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </Card>
  );
}
