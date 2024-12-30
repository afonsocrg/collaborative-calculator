import { Modal, Select } from "antd";
import { useSettings } from "../hooks/useSettings";
import { CURRENCIES, getCurrencySymbol } from "../utils/currencies";

export function SettingsModal() {
  const { currency, setCurrency, isSettingsOpen, closeSettings } =
    useSettings();
  return (
    <Modal
      open={isSettingsOpen}
      onCancel={() => closeSettings()}
      footer={false}
      title="Settings"
    >
      <div className="flex flex-row gap-2 items-center mt-4">
        <p>Currency:</p>
        <div className="grow">
          <Select
            className="w-full"
            showSearch
            value={currency}
            onChange={(value) => setCurrency(value)}
            options={CURRENCIES.map((code) => ({
              value: code,
              label: `${code} (${getCurrencySymbol(code)})`,
            }))}
          />
        </div>
      </div>
    </Modal>
  );
}
