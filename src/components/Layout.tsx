import { GithubOutlined, SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ReactNode } from "react";
import { version } from "../../package.json";
import { useSettings } from "../hooks/useSettings";
import { SettingsModal } from "./SettingsModal";

interface LayoutProps {
  children: ReactNode;
}
export function Layout({ children }: LayoutProps) {
  const { openSettings } = useSettings();

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="absolute top-3 right-3 flex flex-row gap-2 items-center">
          <span className="text-xs text-gray-500">v{version}</span>
          <Button
            shape="circle"
            icon={<GithubOutlined />}
            href="https://github.com/afonsocrg/collaborative-calculator"
            target="_blank"
            color="default"
            variant="filled"
          />
          <Button
            shape="circle"
            icon={<SettingOutlined />}
            color="default"
            variant="filled"
            onClick={openSettings}
          />
        </div>
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {children}
            <SettingsModal />
          </div>
        </div>
      </div>
    </>
  );
}
