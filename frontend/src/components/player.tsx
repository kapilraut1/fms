import { Props } from "@/type/Type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ShowPlayer = ({
  player,
  playerId,
  editMode,
  assignPlayer,
  eligiblePlayers,
  slotKey,
}: Props) => {
  const renderDropdown = () => {
    if (!editMode) {
      return;
    }

    if (assignPlayer === undefined) {
      return;
    }

    if (playerId === undefined) {
      return;
    }

    if (slotKey === undefined) {
      return;
    }

    if (eligiblePlayers === undefined) {
      return;
    }

    return (
      <Select
        value={playerId ? String(playerId) : ""}
        onValueChange={(value) =>
          assignPlayer &&
          assignPlayer(slotKey, value === "" ? null : Number(value))
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a player" defaultValue="" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Players</SelectLabel>

            {eligiblePlayers(slotKey).map((p) => (
              <SelectItem key={p.id} value={String(p.id)}>
                {p.name} ({p.jerseyNumber})
              </SelectItem>
            ))}
            {player &&
              !eligiblePlayers(slotKey).some((p) => p.id === player.id) && (
                <SelectItem value={String(player.id)}>
                  {player.name} ({player.jerseyNumber})
                </SelectItem>
              )}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {/* Jersey number */}
      <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white dark:bg-gray-400 flex items-center justify-center">
        {player ? (
          <Avatar className="object-fill size-19">
            <AvatarImage src={player.avatarUrl} />
            {player.avatarUrl ? (
              <AvatarFallback>{player.avatarUrl}</AvatarFallback>
            ) : (
              <AvatarFallback>NA</AvatarFallback>
            )}
          </Avatar>
        ) : (
          <h1>Empty</h1>
        )}
      </div>

      {/* Name */}
      <div className="text-sm font-semibold mt-1 text-center">
        {player ? player.name : "No player"}{" "}
        {!editMode && (
          <span className="bg-gray-500 w-6 h-6 rounded-full p-2 m-2">
            {player ? player.jerseyNumber : "Empty"}
          </span>
        )}
      </div>
      {renderDropdown()}
    </div>
  );
};

export default ShowPlayer;
