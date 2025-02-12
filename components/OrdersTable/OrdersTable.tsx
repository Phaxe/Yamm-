"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, FileSearch,ChevronRight,ChevronLeft } from "lucide-react";
import Image from "next/image";
import { removeHttpsPrefix } from "@/app/utils/formatURL";
import Link from "next/link";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";

type TableHeader = {
  key: string;
  label: string;
};

type TableRow = {
  [key: string]: any;
};

type OrdersTableProps = {
  tableHeaders: TableHeader[];
  tableRows: TableRow[];
  loading?: boolean;
  error?: string | null;
  tableClassName: string;
  onToggleActive?: (id: string) => void;
  onDecisionChange?: (id: string, decision: string) => void;
  onViewDetails?: (id: string) => void;
  totalPages: number;
  maxItems: number;
};

export default function OrdersTable({
  tableHeaders,
  tableRows,
  loading = false,
  error = null,
  onToggleActive,
  onDecisionChange,
  onViewDetails,
  tableClassName,
  totalPages,
  maxItems,
}: OrdersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * maxItems;
  const paginatedRows = tableRows.slice(startIndex, startIndex + maxItems);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`overflow-x-auto w-full  ${tableClassName}`}>
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-100 rounded-lg border">
            {tableHeaders.map((header) => (
              <th key={header.key} className="p-3 text-left">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t">
              {tableHeaders.map((header) => (
                <td key={header.key} className="p-3">
                  {header.key === "actions" ? (
                    onDecisionChange && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="lg"
                            className="w-36 h-10 flex items-center justify-between"
                          >
                            {row.decision
                              ? row.decision.charAt(0).toUpperCase() + row.decision.slice(1)
                              : "Change"}
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-36">
                          <DropdownMenuItem onClick={() => onDecisionChange(row.id, "reject")}>
                            Reject
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onDecisionChange(row.id, "accept")}>
                            Accept
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onDecisionChange(row.id, "escalate")}>
                            Escalate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )
                  ) : header.key === "store_logo" ? (
                    <Image src={row[header.key]} width={100} height={100} alt="Store-Logo" className="w-6 h-6" />
                  ) : header.key === "store_url" ? (
                    <a
                      href={row[header.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:underline"
                    >
                      {removeHttpsPrefix(row[header.key])}
                    </a>
                  ) : header.key === "active" ? (
                    onToggleActive && (
                      <Switch checked={row.active} onCheckedChange={() => onToggleActive(row.id)} />
                    )
                  ) : header.key === "view" ? (
                    onViewDetails && (
                      <Link href={`/orders/${row.id}`}>
                        <FileSearch className="w-6 h-6 text-center rounded hover:bg-gray-400 transition duration-200" />
                      </Link>
                    )
                  ) : (
                    row[header.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-end items-end self-end ">
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          {/* Left Arrow Icon */}
          <ChevronLeft className="h-4 w-4" />
        </PaginationPrevious>
      </PaginationItem>
      {Array.from({ length: totalPages }, (_, index) => (
        <PaginationItem key={index}>
          <Button
            variant={currentPage === index + 1 ? "default" : "outline"}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationNext
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          {/* Right Arrow Icon */}
          <ChevronRight className="h-4 w-4" />
        </PaginationNext>
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</div>

    </div>
  );
}
