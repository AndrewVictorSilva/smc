import React, { useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { SimpleNavbar } from "../SimpleNavbar";
import { Sidebar } from "../Sidebar";

export function Home() {
  const [selectedChartUrl, setSelectedChartUrl] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  const handleSelectChart = (chartUrl) => {
    setSelectedChartUrl(chartUrl);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail("");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex gap-5 mt-8">
      <Sidebar onSelectChart={handleSelectChart} setInitialChartUrl={setSelectedChartUrl} />
      <div className="flex-grow">
        <SimpleNavbar chartUrl={selectedChartUrl} userEmail={userEmail} />
      </div>
    </div>
  );
}
