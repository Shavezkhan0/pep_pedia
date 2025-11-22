"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Popover from "@radix-ui/react-popover";
import { IoHomeOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import { PiCalculatorThin } from "react-icons/pi";
import { IoIosMore } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";
import { IoCafeOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import Calculator from "./Calculator";
import RequestPeptide from "./RequestPeptide";
import Assistant from "./Assistant";

export default function Navbar() {
  const pathname = usePathname();
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [requestPeptideOpen, setRequestPeptideOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="shrink-0">
              <Link href="/" className="text-blue-600 text-[16px] font-bold">
                PepPedia
              </Link>
            </div>

            {/* Navigation Links and Login Button */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-8">
                <Link
                  href="/"
                  className="text-gray-600 text-sm font-normal"
                >
                  Home
                </Link>
                <Link
                  href="/browse"
                  className="text-gray-600 text-sm font-normal"
                >
                  Browse
                </Link>
                <button
                  onClick={() => setCalculatorOpen(true)}
                  className="text-gray-600 text-sm font-normal hover:text-gray-900"
                >
                  Calculator
                </button>
                <button
                  onClick={() => setRequestPeptideOpen(true)}
                  className="text-gray-600 text-sm font-normal hover:text-gray-900 cursor-pointer"
                >
                  Request Peptide
                </button>
              </div>

              {/* Login Button */}
              <Link
                href="/login"
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-normal"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="bg-white rounded-4xl shadow-lg px-2 py-2">
          <div className="flex items-center justify-around">
            {/* Home */}
            <Link
              href="/"
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 ${
                pathname === "/" ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <IoHomeOutline className="w-6 h-6" />
              <span className="text-xs font-normal">Home</span>
            </Link>

            {/* Browse */}
            <Link
              href="/browse"
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 ${
                pathname === "/browse" ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <IoSearchOutline className="w-6 h-6" />
              <span className="text-xs font-normal">Browse</span>
            </Link>

            {/* Assistant */}
            <button
              onClick={() => setAssistantOpen(true)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 ${
                assistantOpen ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <FiMessageCircle className="w-6 h-6" />
              <span className="text-xs font-normal">Assistant</span>
            </button>

            {/* Calculator */}
            <button
              onClick={() => setCalculatorOpen(true)}
              className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 hover:text-blue-600 transition-colors cursor-pointer ${
                calculatorOpen ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <PiCalculatorThin className="w-6 h-6" />
              <span className="text-xs font-normal">Calculator</span>
            </button>

            {/* More */}
            <Popover.Root open={moreOpen} onOpenChange={setMoreOpen}>
              <Popover.Trigger asChild>
                <button
                  className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-full bg-gray-100 ${
                    moreOpen ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  <IoIosMore className="w-6 h-6" />
                  <span className="text-xs font-normal">More</span>
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  className="bg-white rounded-xl shadow-lg p-2 min-w-[200px] z-50 border border-gray-200"
                  side="top"
                  sideOffset={10}
                  align="end"
                >
                  <div className="flex flex-col">
                    <Link
                      href="/login"
                      onClick={() => setMoreOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <IoPersonOutline className="w-5 h-5 text-blue-500" />
                      <span className="text-sm text-blue-500 font-normal">Log In</span>
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={() => {
                        setRequestPeptideOpen(true);
                        setMoreOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 transition-colors cursor-pointer text-left"
                    >
                      <IoAddOutline className="w-5 h-5 text-gray-900" />
                      <span className="text-sm text-gray-900">Request Peptide</span>
                    </button>
                    <Link
                      href="/support"
                      onClick={() => setMoreOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <IoCafeOutline className="w-5 h-5 text-gray-900" />
                      <span className="text-sm text-gray-900">Support PepPedia</span>
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setMoreOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <IoMailOutline className="w-5 h-5 text-gray-900" />
                      <span className="text-sm text-gray-900">Contact</span>
                    </Link>
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
        </div>
      </nav>

      {/* Calculator Modal */}
      <Calculator open={calculatorOpen} onOpenChange={setCalculatorOpen} />
      
      {/* Request Peptide Modal */}
      <RequestPeptide open={requestPeptideOpen} onOpenChange={setRequestPeptideOpen} />
      
      {/* Assistant Modal */}
      <Assistant open={assistantOpen} onOpenChange={setAssistantOpen} />
    </>
  );
}

