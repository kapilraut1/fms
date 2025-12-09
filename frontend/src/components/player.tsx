import { Player } from "@/type/Type";

type Props = {
	playerId: number | null;
	player: Player | null;
	editMode: boolean;
	assignPlayer: (slotKey: string, playerId: number | null) => void;
	eligiblePlayers: (slotKey: string) => Player[];
	slotKey: string;
};

const ShowPlayer = ({
	player,
	playerId,
	editMode,
	assignPlayer,
	eligiblePlayers,
	slotKey,
}: Props) => {
	return (
		<div className="flex flex-col items-center">
			{/* Jersey number */}
			<div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white dark:bg-gray-400 flex items-center justify-center">
				{player ? player.jerseyNumber : "Empty"}
			</div>

			{/* Name */}
			<div className="text-sm font-semibold mt-1 text-center">
				{player ? player.name : "No player"}
			</div>

			{/* Dropdown during edit */}
			{editMode && (
				<select
					className="mt-1 border rounded p-0.5 text-sm dark:bg-amber-600"
					value={playerId ?? ""}
					onChange={(e) =>
						assignPlayer(
							slotKey,
							e.target.value === ""
								? null
								: Number(e.target.value)
						)
					}
				>
					<option value="">Select player</option>

					{eligiblePlayers(slotKey).map((p) => (
						<option key={p.id} value={p.id}>
							{p.name} ({p.jerseyNumber})
						</option>
					))}

					{/* Keep already selected player available */}
					{player &&
						!eligiblePlayers(slotKey).some(
							(p) => p.id === player.id
						) && (
							<option value={player.id}>
								{player.name} ({player.jerseyNumber})
							</option>
						)}
				</select>
			)}
		</div>
	);
};

export default ShowPlayer;
