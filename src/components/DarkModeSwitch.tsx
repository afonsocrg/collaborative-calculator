import { LaptopOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Button, Popover } from "antd";
import { useState } from "react";
import colors from "tailwindcss/colors";
import { useSettings } from "../hooks/useSettings";

function PopoverItem({
  icon,
  label,
  onClick,
  selected,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  selected: boolean;
}) {
  return (
    <div
      className={`flex flex-row gap-2 items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 py-2 px-4 ${
        selected ? "font-semibold text-blue-500" : ""
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

function PopoverContent({ close }: { close: () => void }) {
  const { isDarkModeValue, setIsDarkMode } = useSettings();
  return (
    <div className="text-sm">
      <PopoverItem
        icon={<SunOutlined />}
        label="Light Mode"
        onClick={() => {
          setIsDarkMode(false);
          close();
        }}
        selected={isDarkModeValue === false}
      />
      <PopoverItem
        icon={<MoonOutlined />}
        label="Dark Mode"
        onClick={() => {
          setIsDarkMode(true);
          close();
        }}
        selected={isDarkModeValue === true}
      />
      <PopoverItem
        icon={<LaptopOutlined />}
        label="System Default"
        onClick={() => {
          setIsDarkMode(null);
          close();
        }}
        selected={isDarkModeValue === null}
      />
    </div>
  );
}

export function DarkModeSwitch() {
  const { isDarkMode, isDarkModeValue } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  const className =
    isDarkModeValue === null ? "text-gray-500" : "text-blue-500";

  const icon =
    isDarkMode === null ? (
      <LaptopOutlined className={className} />
    ) : isDarkMode ? (
      <MoonOutlined className={className} />
    ) : (
      <SunOutlined className={className} />
    );

  return (
    <Popover
      content={<PopoverContent close={() => setIsOpen(false)} />}
      trigger="click"
      open={isOpen}
      onOpenChange={setIsOpen}
      styles={{
        body: {
          paddingRight: 0,
          paddingLeft: 0,
          backgroundColor: isDarkMode ? colors.gray[950] : colors.gray[50],
        },
      }}
    >
      <Button shape="circle" icon={icon} color="default" variant="filled" />
    </Popover>
  );
}
