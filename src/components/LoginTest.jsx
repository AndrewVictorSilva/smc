import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { SimpleNavbar } from "./SimpleNavbar";
import { Sidebar } from "./Sidebar";

export function LoginTest() {
  const [selectedChartUrl, setSelectedChartUrl] = useState("https://app.powerbi.com/view?r=eyJrIjoiZGNhMzlmOTYtNjRlMy00ZmJiLWExNGQtN2Q3ODA2M2E4MDFhIiwidCI6IjMzNDQwZmM2LWI3YzctNDEyYy1iYjczLTBlNzBiMDE5OGQ1YSIsImMiOjh9");
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
    })
    return () => unsubscribe()
  }, [])

  return (
    <div className="flex gap-5 mt-4">
      <Sidebar onSelectChart={handleSelectChart} />
      <SimpleNavbar chartUrl={selectedChartUrl} userEmail={userEmail} />
    </div>

  )
}