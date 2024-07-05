import { useState, useEffect } from "react";
import useAuth from "../contexts/authContext";
import { GridItem } from "./GridItem";
import { db, collection, getDocs } from "../firebase/firebase";

export function Grid() {
  const { currentUser } = useAuth();
  const [gridItems, setGridItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGridItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "forms"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Firestore response:", items);
        setGridItems(items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching grid items:", error);
        setLoading(false);
      }
    };

    fetchGridItems();
  }, []);

  const emailDomain = currentUser.email.split("@")[1].split(".")[0].toLowerCase();
  const renderAllItems = emailDomain === "atos";

  const matchingGridItems = renderAllItems 
    ? gridItems 
    : gridItems.filter((item) => item.customer.toLowerCase() === emailDomain);

  return (
    <div className="w-full h-full flex justify-center">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-12 [&>*]:p-1">
          {matchingGridItems.length > 0 ? (
            matchingGridItems.map((item) => (
              <GridItem
                key={item.id}
                title={item.title}
                customer={item.customer}
                src={item.src}
                allowFullScreen={item.allowFullScreen}
                width={item.width}
                height={item.height}
              />
            ))
          ) : (
            <p>Email domain does not match any customer.</p>
          )}
        </div>
      )}
    </div>
  );
}
