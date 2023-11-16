"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "../../../../payload-types";
import { fetchHeader } from "../../../_api/globals";

import styles from "./navbar.module.css";

export const Navbar = () => {
  const [headerData, setHeaderData] = useState<Header | null>(null);

  useEffect(() => {
    const callApiHeader = async () => {
      const data = await fetchHeader();
      setHeaderData(data);
    };

    callApiHeader();
  }, []);

  return (
    <>
      <header className={styles.navbar}>
        <nav>
          <ul>
            {headerData &&
              headerData.navItems.map((item) => {
                return (
                  <Link key={item.link.label} href={item.link.label}>
                    <li>{item.link.label}</li>
                  </Link>
                );
              })}
          </ul>
        </nav>
      </header>
    </>
  );
};
