import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <Link href="dashboard">
        <a>Dashboard</a>
      </Link>
    </>
  );
};

export default HomePage;
