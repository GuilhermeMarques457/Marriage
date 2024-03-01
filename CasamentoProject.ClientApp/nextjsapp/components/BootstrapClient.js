"use client";

import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";

function BootstrapClient() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return null;
}

export default BootstrapClient;
