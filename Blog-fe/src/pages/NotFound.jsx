import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performanceEntries = performance.getEntriesByType("navigation");

    if (
      performanceEntries.length > 0 &&
      performanceEntries[0].type === "reload"
    ) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
      404: Page not found
    </h1>
  );
};

export default NotFound;
