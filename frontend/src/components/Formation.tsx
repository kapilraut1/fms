import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Format, Formationobj } from "@/type/Type";
import { useGetFormation } from "../hooks/useGetFormation";

const Formation = ({ formation, setFormation }: Format) => {
  const { data } = useGetFormation();
  const form = (data ?? []).map((player: Formationobj) => player.formation);
  return (
    <div>
      <Select value={formation} onValueChange={setFormation}>
        <SelectTrigger className="md:w-30 w-21">
          <SelectValue placeholder="Select a formation" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Formations</SelectLabel>
            {form.map((p: string) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Formation;
