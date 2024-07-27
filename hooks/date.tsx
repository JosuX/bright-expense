"use client"

import { useState, useEffect } from "react";

const useDate = () => {
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(
    () => setFormattedDate(new Date()),
    []
  );

  return formattedDate;
};

export default useDate;