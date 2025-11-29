"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";

export default function NavBarWrapper() {
    const pathname = usePathname();

    // Don't show NavBar on the home page
    if (pathname === "/") {
        return null;
    }

    return <NavBar />;
}
