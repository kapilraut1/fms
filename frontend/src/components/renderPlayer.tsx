// import { Playerid } from "@/type/Type";

// const slotToPositionMap: Record<string, string> = {
//   GK: "Goalkeeper",
//   DEF1: "Defender",
//   DEF2: "Defender",
//   DEF3: "Defender",
//   DEF4: "Defender",
//   MID1: "Midfielder",
//   MID2: "Midfielder",
//   MID3: "Midfielder",
//   MID4: "Midfielder",
//   FWD1: "Forward",
//   FWD2: "Forward",
// };

// type RenderPlayerProps = {
//   slotKey: string;
//   slots: Record<string, Playerid>; // slots object from StartingXI
// };

// export default function RenderPlayer({ slotKey, slots }: RenderPlayerProps) {
//   const player = slots[slotKey];
//   const expectedPosition = slotToPositionMap[slotKey];

//   if (!player || player.position !== expectedPosition) {
//     return (
//       <>
//         <div className="w-15 h-15 md:w-20 md:h-20 bg-white rounded-full dark:bg-gray-500 flex items-center justify-center text-center text-sm p-1">
//           Choose player
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <div className="w-15 h-15 rounded-full md:w-20 md:h-20 bg-white dark:bg-gray-500 flex items-center justify-center">
//         {player ? player.jerseyNumber : "Empty"}
//       </div>
//       <div className="text-sm font-semibold mt-1">
//         {player ? player.name : ""}
//       </div>
//       <div className="text-xs text-gray-700">
//         {player ? player.position : ""}
//       </div>
//     </>
//   );
// }
import { Playerid } from "@/type/type";

// const slotToPositionMap: Record<string, string> = {
//   GK: "Goalkeeper",
//   DEF1: "Defender",
//   DEF2: "Defender",
//   DEF3: "Defender",
//   DEF4: "Defender",
//   MID1: "Midfielder",
//   MID2: "Midfielder",
//   MID3: "Midfielder",
//   MID4: "Midfielder",
//   FWD1: "Forward",
//   FWD2: "Forward",
// };

type RenderPlayerProps = {
  slotKey: string;
  slots: Record<string, Playerid | null>;
};

export default function RenderPlayer({ slotKey, slots }: RenderPlayerProps) {
  const player = slots[slotKey];

  if (!player) {
    return (
      <div className="w-20 h-20 bg-white rounded-full dark:bg-gray-500 flex items-center justify-center text-center text-sm">
        Empty
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
        {player.jerseyNumber}
      </div>
      <div className="text-sm font-semibold mt-1">{player.name}</div>
      <div className="text-xs text-gray-700">{player.position}</div>
    </div>
  );
}
