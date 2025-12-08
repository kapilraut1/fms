/* eslint-disable @typescript-eslint/no-explicit-any */
import RenderPlayer from "./renderPlayer";
export default function SlotBox({
  slotKey,
  slots,
  editMode,
  activeSlot,
  setActiveSlot,
}: any) {
  return (
    <div
      onClick={() => editMode && setActiveSlot(slotKey)}
      className={`cursor-pointer p-2 rounded-lg ${
        activeSlot === slotKey ? "bg-white/40" : ""
      }`}
    >
      <RenderPlayer slotKey={slotKey} slots={slots} />
    </div>
  );
}
