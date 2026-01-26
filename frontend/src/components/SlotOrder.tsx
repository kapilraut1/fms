import { useEffect } from "react";
import { LocalSlots, FormationType } from "@/type/Type";
function slotFormation(formation: string) {
  if (!formation || typeof formation !== "string") {
    formation = "4-4-2";
  }
  const [def, mid, fwd] = formation.split("-").map(Number);

  return {
    GK: ["GK"],
    DEF: Array.from({ length: def }, (_, i) => `DEF${i + 1}`),
    MID: Array.from({ length: mid }, (_, i) => `MID${i + 1}`),
    FWD: Array.from({ length: fwd }, (_, i) => `FWD${i + 1}`),
  };
}
const Slotorder = ({ formation, setLocalSlots, renderSlot }: FormationType) => {
  useEffect(() => {
    const slotOrder = slotFormation(formation);
    const allowedSlots = [
      ...slotOrder.GK,
      ...slotOrder.DEF,
      ...slotOrder.MID,
      ...slotOrder.FWD,
    ];

    setLocalSlots((prevLocalSlots) => {
      const newLocalSlots: LocalSlots = {};
      allowedSlots.forEach((slot) => {
        newLocalSlots[slot] = prevLocalSlots[slot] || null;
      });
      return newLocalSlots;
    });
  }, [formation, setLocalSlots]);

  const SLOT_ORDER = slotFormation(formation);
  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-6">
      <div className="flex justify-center gap-4">
        {SLOT_ORDER.FWD.map(renderSlot)}
      </div>

      <div className="flex justify-center gap-4">
        {SLOT_ORDER.MID.map(renderSlot)}
      </div>

      <div className="flex justify-center gap-4">
        {SLOT_ORDER.DEF.map(renderSlot)}
      </div>

      <div className="flex justify-center gap-4">
        {SLOT_ORDER.GK.map(renderSlot)}
      </div>
    </div>
  );
};

export default Slotorder;
