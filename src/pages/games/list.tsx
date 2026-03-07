import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import { GENRES_OPTIONS } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";

import { Genre } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useTable } from "@refinedev/react-table";
import { Badge } from "@/components/ui/badge";

type GameListItems = {
  id: number;
  title: string;
  status: "Available" | "Pending" | "Not Available";
  bannerUrl?: string;
  price: number;
  genre: Genre;
  description: string;
}

const GamesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");

  const genreFilters = selectedGenre === 'all' ? [] : [
    { field: 'genre', operator: 'eq' as const, value: selectedGenre }
  ]
  const searchFilters = searchQuery ? [
    { field: 'name', operator: 'contains' as const, value: searchQuery }
  ] : [];

  const gameColumns = useMemo<ColumnDef<GameListItems>[]>(() => [
    {
      id: "banner",
      accessorKey: "bannerUrl",
      size: 120,
      header: () => <p className="column-title ml-2">Banner</p>,
      cell: ({ getValue }) => {
        const bannerUrl = getValue<string>();

        return bannerUrl ? (
          <img
            src={bannerUrl}
            alt="Class banner"
            className="ml-2 h-10 w-10 rounded-md object-cover"
            loading="lazy"
          />
        ) : (
          <span className="text-muted-foreground ml-2">No image</span>
        );
      },
    },
    {
      id: 'title',
      accessorKey: 'title',
      size: 150,
      header: () => <p className="column-title ml-2">Title</p>,
      cell: ({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
      filterFn: 'includesString',
    },
    {
      id: "status",
      accessorKey: "status",
      size: 140,
      header: () => <p className="column-title">Status</p>,
      cell: ({ getValue }) => {
        const status = getValue<"Available" | "Pending" | "Not Available">();
        const variant = status === "Available" ? "default" : "secondary";

        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
      id: 'price',
      accessorKey: 'price',
      size: 50,
      header: () => <p className="column-title ml-2">Price</p>,
      cell: ({ getValue }) => {
        const price = getValue<number>();
        return <span className="text-foreground">${price.toFixed(2)}</span>;
      },
    },
    {
      id: 'genre',
      accessorKey: 'genre.name',
      size: 100,
      header: () => <p className="column-title ml-2">Genre</p>,
      cell: ({ getValue }) => <span className="text-foreground">{getValue<string>()}</span>,
    },
    {
      id: 'description',
      accessorKey: 'description',
      size: 150,
      header: () => <p className="column-title ml-2">Description</p>,
      cell: ({ getValue }) => <span className="truncate line-clamp-2">{getValue<string>()}</span>,
    },
  ], []);

  const gamesTable = useTable<GameListItems>({
    columns: gameColumns,
    refineCoreProps: {
      resource: 'games',
      pagination: { 
        pageSize: 10, 
        mode: 'server' 
      },
      filters: {
        permanent: [...genreFilters, ...searchFilters],
      },
      sorters: {
        initial: [
          { 
            field: 'id', 
            order: 'desc' 
          }
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

        <div className="actions-row">
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

          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={selectedGenre} onValueChange={(value) => setSelectedGenre(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                {GENRES_OPTIONS.map((genre) => (
                  <SelectItem key={genre.value} value={genre.label}>
                    {genre.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <CreateButton />
          </div>
        </div>
      </div>

      <DataTable table={gamesTable} />
    </ListView>
  );
};

export default GamesList;