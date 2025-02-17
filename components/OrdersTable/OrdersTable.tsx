"use client";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  FileSearch,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";
import { removeHttpsPrefix } from "@/lib/utils/formatURL";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
//Table header type
type TableHeader = {
  key: string;
  label: string;
};
//Table row type
type TableRow = {
  [key: string]: any;
};
//Table props type
type OrdersTableProps = {
  tableHeaders: TableHeader[];
  tableRows: TableRow[];
  loading?: boolean;
  error?: string | null;
  tableClassName: string;
  onToggleActive?: (id: string) => void;
  onDecisionChange?: (id: string, decision: string) => void;
  deleteOrder?: (id:string) => void,
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
  deleteOrder,
  tableClassName,
  totalPages,
  maxItems,
}: OrdersTableProps) {
//to handle table pagination startIndex and maxItems are passed dynamicly 
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * maxItems;
  const paginatedRows = tableRows.slice(startIndex, startIndex + maxItems);
console.log(tableRows);

  // Function to get color classes based on decision
  const getDecisionStyles = (decision: string | null) => {
    switch (decision) {
      case "reject":
        return {
          textColor: "text-red-600",
          bgColor: "bg-red-100",
          Icon: XCircle,
        };
      case "accept":
        return {
          textColor: "text-green-600",
          bgColor: "bg-green-100",
          Icon: CheckCircle,
        };
      case "escalate":
        return {
          textColor: "text-yellow-600",
          bgColor: "bg-yellow-100",
          Icon: AlertTriangle,
        };
      default:
        return {
          textColor: "text-gray-600",
          bgColor: "bg-gray-100",
          Icon: ChevronDown, // Default icon
        };
    }
  };
  // To handle data while loading can add loading indicator later...
  if (loading) return <p>Loading data...</p>;

  // To handle error coming from the server can be adjust in the future for better error displaying
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`overflow-x-auto w-full rounded-lg ${tableClassName}`}>
      <table className="w-full border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-200 rounded-lg border">
               {/* table headers labels */}
            {tableHeaders.map((header) => (
              <th key={header.key} className="p-3 text-left">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
           {/* displaying data depending on paginations rules */}
          {paginatedRows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t">
              {tableHeaders.map((header) => (
                <td key={header.key} className="p-3 max-w-[150px] truncate" title={row[header.key] ? String(row[header.key]) : undefined} >
                   {/* dynamicly showing rows depending on the header.key values from tableHeaders prop */}
                  {header.key === "actions" ? (
                    //DropdownMenu from shadcn to handle the decision change function
                    onDecisionChange && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="lg"
                            className={`w-[100px] p-2 h-10 flex items-center justify-start ${
                              row.decision
                                ? getDecisionStyles(row.decision).textColor
                                : "text-gray-600"
                            }`}
                          >
                            {row.decision
                              ? row.decision.charAt(0).toUpperCase() +
                                row.decision.slice(1)
                              : "Change"}
                            <ChevronDown className=" h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-36">
                          <DropdownMenuItem
                            onClick={() => onDecisionChange(row.id, "reject")}
                            className="text-red-600 hover:bg-red-100 flex items-center gap-2"
                          >
                            <XCircle className="h-4 w-4 text-red-600" />
                            Reject
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => onDecisionChange(row.id, "accept")}
                            className="text-green-600 hover:bg-green-100 flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Accept
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => onDecisionChange(row.id, "escalate")}
                            className="text-yellow-600 hover:bg-yellow-100 flex items-center gap-2"
                          >
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            Escalate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )
                  ) : header.key === "store_logo" ? (
                    //LOGO colmun *******
                    <Image
                    loading="lazy"
                      src={row[header.key]}
                      width={100}
                      height={100}
                      alt="Store-Logo"
                      className="w-12 h-12 object-cover"
                    />
                  ) : header.key === "store_url" ? (
                     //Link colmun *******
                    <Link
                      href={row[header.key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:underline"
                    >
                      {removeHttpsPrefix(row[header.key])}
                    </Link>
                  ) : header.key === "active" ? (
                    onToggleActive && (
                       //switch colmun *******
                      <Switch
                        checked={row.active}
                        onCheckedChange={() => onToggleActive(row.id)}
                      />
                    )
                  ) : header.key === "view" ? (
                     //View colmun *******
                    <Link href={`/orders/${row.id}`}>
                      <FileSearch className="w-6 h-6 text-center rounded hover:bg-gray-400 transition duration-200" />
                    </Link>
                  )  : header.key === "delete" ? (
                    //View colmun *******
                    <Trash2
                    className="text-red-500 cursor-pointer"
                    onClick={() => {
                      if (deleteOrder) {
                        deleteOrder(row.id);
                      }
                    }}
                  />
                 ) : (
                   row[header.key]
                 )
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-end items-end self-end ">
          {/* table pagination using shadcn components  */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                aria-disabled={currentPage === 1}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              >
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
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                aria-disabled={currentPage === totalPages}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              >
                <ChevronRight className="h-4 w-4" />
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
