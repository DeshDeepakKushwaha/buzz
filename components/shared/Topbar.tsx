"use client";

import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "./SidebarContext";

function Topbar() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const handleToggle = (e) => {
    e.preventDefault(); // Prevents navigation to "/"
    toggleSidebar();
  };

  return (
    <nav className="custom-scrollbar topbar transition-all duration-300 overflow-visible">
      <div className="flex items-center justify-between py-4 px-2">
        <Link href="/" onClick={handleToggle} className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="BUZZ"
            width={35}
            height={35}
            className="cursor-pointer"
          />
         {isSidebarOpen && (
        <span className="hidden lg:inline text-lg font-bold text-light-1">
          Buzz
        </span>
      )}
        </Link>
      </div>

      <div className="flex items-center gap-1">
        {/* Mobile SignOut */}
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        {/* Organization Switcher */}
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
}

export default Topbar;
