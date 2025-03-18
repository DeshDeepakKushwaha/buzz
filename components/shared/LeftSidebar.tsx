"use client";

import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { sidebarLinks } from "@/constants";
import { useSidebar } from "./SidebarContext";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();

  const { isSidebarOpen } = useSidebar();

  return (
    <section
      className={`custom-scrollbar leftsidebar transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-20"
      } overflow-visible`}
    >
      {/* ✅ Logo Section */}
      <div className="flex items-center justify-between py-4 px-2">
        {/* Add Logo or Title */}
      </div>

      {/* ✅ Sidebar Links */}
      <div className="flex w-full flex-1 flex-col gap-6 px-2">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          const route =
            link.route === "/profile" ? `${link.route}/${userId}` : link.route;

          return (
            <Link
              href={route}
              key={link.label}
              className={`flex items-center gap-4 p-2 rounded-md transition-colors ${
                isActive ? "bg-primary-500" : "hover:bg-gray-800"
              }`}
            >
              <div className="min-w-[24px] flex items-center justify-center">
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />
              </div>
              {isSidebarOpen && (
                <p className="text-light-1 max-lg:hidden">{link.label}</p>
              )}
            </Link>
          );
        })}
      </div>

      {/* ✅ Logout Section */}
      <div className="mt-10 px-2">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer items-center gap-4 p-2 rounded-md hover:bg-gray-800 transition-colors">
              <div className="min-w-[24px] flex items-center justify-center">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
              {isSidebarOpen && (
                <p className="text-light-2 max-lg:hidden">Logout</p>
              )}
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
