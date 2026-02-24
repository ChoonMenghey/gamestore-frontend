import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import { GENRES_OPTIONS } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from  "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";

import { Game } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useTable } from "@refinedev/react-table";

const GamesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState("all");
  
  const genreFilters = genre === 'all' ? [] : [
    { field: 'genre', operator:'eq' as const, value: genre}
  ]
  const searchFilters = searchQuery ? [
    { field: 'name', operator: 'contains' as const, value: searchQuery }
  ]: [];
  const genreTable = useTable<Game>({
    columns: useMemo<ColumnDef<Game>[]>(() => [
        { 
            id: 'code', 
            accessorKey: 'code', 
            size: 75, 
            header: () => <p className="column-title ml-2">Code</p>,
            cell:({ getValue }) => <span>{getValue<string>()}</span>,
        },
        { 
            id: 'name', 
            accessorKey: 'name', 
            size: 100, 
            header: () => <p className="column-title ml-2">Name</p>,
            cell:({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
            filterFn: 'includesString',
        },
        { 
            id: 'price', 
            accessorKey: 'price', 
            size: 75, 
            header: () => <p className="column-title ml-2">Price</p>,
            cell:({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
        },
        { 
            id: 'description', 
            accessorKey: 'description', 
            size: 250, 
            header: () => <p className="column-title ml-2">Description</p>,
            cell:({ getValue }) => <span className="truncate line-clamp-2">{getValue<string>()}</span>,
        },
        { 
            id: 'genre', 
            accessorKey: 'genre', 
            size: 75, 
            header: () => <p className="column-title ml-2">Genre</p>,
            cell:({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
        }
    ], []),
    refineCoreProps: {
        resource: 'games',
        pagination: { pageSize: 10, mode: 'server'},
        filters: {
            permanent: [...genreFilters, ...searchFilters],
        },
        sorters: {
            initial: [
                { field: 'id', order: 'desc'}
            ]
        },
    }
  });

  return (
    <ListView>
      <Breadcrumb />

      <h1 className="page-title">Games</h1>

      <div className="intro-row">
        <p>Quick access to essential features and tools</p>

        <div className="action-row">
          <div className="search-field">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder="Search games"
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex p-2 gap-4 w-full sm:w-auto">
            <Select value={genre} onValueChange={(value) => setGenre(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {GENRES_OPTIONS.map((genre) => (
                  <SelectItem key={genre.value} value={genre.value}>
                    {genre.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <CreateButton />
          </div>
        </div>
      </div>

      <DataTable table={genreTable}/>
    </ListView>
  );
};

export default GamesList;