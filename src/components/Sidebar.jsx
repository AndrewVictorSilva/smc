import React, { useEffect, useState } from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { db, getDocs, collection, doc, getDoc } from "../firebase/firebase";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export function Sidebar({ onSelectChart, setInitialChartUrl }) {
  const [open, setOpen] = useState(0);
  const [openAlert, setOpenAlert] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [forms, setForms] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserCompanies(user.uid);
      } else {
        setCompanies([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const fetchUserCompanies = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userCompanies = userData.company || [];
        const companySnapshot = await getDocs(collection(db, "companies"));
        const formSnapshot = await getDocs(collection(db, "forms"));

        const companies = companySnapshot.docs
          .filter(doc => userCompanies.includes(doc.id))
          .map(doc => ({ id: doc.id, name: doc.data().name }));

        const forms = formSnapshot.docs.reduce((acc, doc) => {
          const data = doc.data();
          if (!acc[data.customer]) {
            acc[data.customer] = [];
          }
          acc[data.customer].push({ id: doc.id, title: data.title, src: data.src });
          return acc;
        }, {});

        setCompanies(companies);
        setForms(forms);

        // Set initial chart URL if companies and forms are available
        if (companies.length > 0 && forms[companies[0].name]?.length > 0) {
          setInitialChartUrl(forms[companies[0].name][0].src);
        } else {
          setInitialChartUrl(null); // No companies or forms available
        }
      }
    } catch (error) {
      console.error("Error fetching user companies: ", error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer} className="overflow-auto">
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-4rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="blue-gray">
              Relatórios
            </Typography>
          </div>
          <List>
            {companies.map((company, index) => (
              <Accordion
                key={company.id}
                open={open === index + 1}
                icon={
                  <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${open === index + 1 ? "rotate-180" : ""
                      }`}
                  />
                }
              >
                <ListItem className="p-0" selected={open === index + 1}>
                  <AccordionHeader
                    onClick={() => handleOpen(index + 1)}
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix>
                      <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="mr-auto font-normal">
                      {company.name}
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List className="p-0">
                    {forms[company.name]?.map((form) => (
                      <ListItem
                        key={form.id}
                        onClick={() => onSelectChart(form.src)}
                        className="cursor-pointer"
                      >
                        <ListItemPrefix>
                          <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                        </ListItemPrefix>
                        {form.title}
                      </ListItem>
                    ))}
                  </List>
                </AccordionBody>
              </Accordion>
            ))}
          </List>
          <Alert
            open={openAlert}
            className="mt-auto"
            onClose={() => setOpenAlert(false)}
          >
            <CubeTransparentIcon className="mb-4 h-12 w-12" />
            <Typography variant="h6" className="mb-1">
              Essa aplicação ainda está sendo construída!
            </Typography>
            <Typography variant="small" className="font-normal opacity-80">
              Alguns bugs e desalinhamentos podem ser encontrados. <br />
              Mas fique tranquilo(a), nosso time está trabalhando para corrigí-los.
            </Typography>
            <div className="mt-4 flex gap-3">
              <Typography
                as="a"
                href="#"
                variant="small"
                className="font-medium opacity-80"
                onClick={() => setOpenAlert(false)}
              >
                Dispensar
              </Typography>
            </div>
          </Alert>
        </Card>
      </Drawer>
    </>
  );
}
