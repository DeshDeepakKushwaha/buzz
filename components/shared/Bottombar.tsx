"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs"; // ✅ Import useAuth

import { sidebarLinks } from "@/constants";

function Bottombar() {
  const pathname = usePathname();
  const { userId } = useAuth(); // ✅ Get userId

  return (
    <section className="bottombar fixed bottom-0 left-0 w-full bg-dark-2 z-50">
      <div className="bottombar_container flex justify-around py-2">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          // ✅ Append userId to profile route
          const route =
            link.route === "/profile" ? `${link.route}/${userId}` : link.route;

          return (
            <Link
              href={route}
              key={link.label}
              className={`bottombar_link ${
                isActive ? "bg-primary-500" : "hover:bg-gray-800"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={16}
                height={16}
                className="object-contain"
              />
              <p className="text-subtle-medium text-light-1 max-sm:hidden">
                {link.label.split(/\s+/)[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Bottombar;
