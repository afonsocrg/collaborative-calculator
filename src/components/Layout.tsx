import { ReactNode } from "react";
import { SettingsModal } from "./SettingsModal";
import { TopBar } from "./TopBar";

interface LayoutProps {
  children: ReactNode;
}
export function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <TopBar />
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {children}
            <SettingsModal />
          </div>
        </div>
      </div>
    </>
  );
}
