import { GithubOutlined, SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { version } from "../../package.json";
import { useSettings } from "../hooks/useSettings";
import { DarkModeSwitch } from "./DarkModeSwitch";

export function TopBar() {
  const { openSettings } = useSettings();

  return (
    <div className="flex flex-row gap-2 items-center justify-end py-2 px-2">
      <span className="text-xs text-gray-500">v{version}</span>
      <Button
        shape="circle"
        icon={<GithubOutlined />}
        href="https://github.com/afonsocrg/collaborative-calculator"
        target="_blank"
        color="default"
        variant="filled"
      />
      <DarkModeSwitch />
      <Button
        shape="circle"
        icon={<SettingOutlined />}
        color="default"
        variant="filled"
        onClick={openSettings}
      />
    </div>
  );
}
