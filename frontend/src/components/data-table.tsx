"use client";

import * as React from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTable } from "./useReactTable";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  Row,
  SortingState,
} from "@tanstack/react-table";

import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";

const schema = z.object({
  id: z.number(),
  name: z.string(),
  position: z.enum(["Goalkeeper", "Defender", "Midfielder", "Forward"]),
  jerseyNumber: z.number().int(),
  age: z.number().int(),
  avatarUrl: z.string().optional(),
  nationality: z.string().optional(),
});

//getColumn function type
const getColumns = (
  handleEdit: (player: z.infer<typeof schema>) => void // ✅ FIXED
): ColumnDef<z.infer<typeof schema>>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => {
      const position = row.original.position;

      const colors: Record<string, string> = {
        Goalkeeper: "bg-yellow-200 text-yellow-900",
        Defender: "bg-blue-200 text-blue-900",
        Midfielder: "bg-green-200 text-green-900",
        Forward: "bg-red-200 text-red-900",
      };

      return (
        <Badge variant="outline" className={`px-2 ${colors[position]}`}>
          {position}
        </Badge>
      );
    },
  },
  {
    accessorKey: "jerseyNumber",
    header: "Jersey",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "nationality",
    header: "Nationality",
  },
  {
    accessorKey: "avatarUrl",
    header: "Avatar",
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.original.avatarUrl} />
        <AvatarFallback>Avatar</AvatarFallback>
      </Avatar>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <IconDotsVertical />
          </Button>
        </DropdownMenuTrigger>

        {/* Edit concept  */}
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onClick={() => handleEdit(row.original)}>
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      ref={setNodeRef}
      data-dragging={isDragging}
      className="relative z-0 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function DataTable({
  data: initialData,
  handleEdit, // handleEdit passed to Parent Component Player
}: {
  data: z.infer<typeof schema>[];
  handleEdit: (player: z.infer<typeof schema>) => void; // ✅ FIXED
}) {
  const [data, setData] = React.useState(initialData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = getColumns(handleEdit);

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data.map((p) => p.id),
    [data]
  );

  const table = useTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((old) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(old, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="rounded-lg border overflow-hidden mx-3.5">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <Table>
          <TableHeader className="bg-orange-500 sticky top-0">
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              <SortableContext
                items={dataIds}
                strategy={verticalListSortingStrategy}
              >
                {table.getRowModel().rows.map((row) => (
                  <DraggableRow row={row} key={row.id} />
                ))}
              </SortableContext>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center h-20"
                >
                  No players found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DndContext>

      {/* pagination footer */}
      <div className="flex items-center justify-end px-4">
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>

            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
