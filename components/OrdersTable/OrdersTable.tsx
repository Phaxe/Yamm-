"use client";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, FileSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { removeHttpsPrefix } from "@/app/utils/formatURL"; // Import the utility function

type TableHeader = {
  key: string;
  label: string;
};

type TableRow = {
  [key: string]: any; // Flexible row data
};

type OrdersTableProps = {
  tableHeaders: TableHeader[];
  tableRows: TableRow[];
  loading?: boolean;
  error?: string | null;
  tableClassName:string;
  onToggleActive?: (id: string) => void;
  onDecisionChange?: (id: string, decision: string) => void;
  onViewDetails?: (id: string) => void;
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
}: OrdersTableProps) {
  const router = useRouter();

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={`overflow-x-auto rounded-lg border ${tableClassName}`} >
      <table className="w-[1300px] border border-gray-200  rounded-lg">
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
          {tableRows.map((row, rowIndex) => (
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
                          <DropdownMenuItem
                            className="w-full text-center"
                            onClick={() => onDecisionChange(row.id, "reject")}
                          >
                            Reject
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="w-full text-center"
                            onClick={() => onDecisionChange(row.id, "accept")}
                          >
                            Accept
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="w-full text-center"
                            onClick={() => onDecisionChange(row.id, "escalate")}
                          >
                            Escalate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      )
             
                 
                  ) : header.key === "store_logo" ? (
                    <Image
                      src={row[header.key]}
                      width={100}
                      height={100}
                      alt="Store-Logo"
                      className="w-6 h-6"
                    />
                  ) : header.key === "store_url" ? (
                    // Use the utility function to remove "https://"
                    <a
                    href={row[header.key]} // Use the full URL with https://
                    target="_blank" // Open in a new tab
                    rel="noopener noreferrer" // Security best practice
                    className="text-black hover:underline"
                  >
                    {removeHttpsPrefix(row[header.key])} 
                  </a>

                  ) :header.key === "active" ? (
                    onToggleActive && (
                        <Switch
                          checked={row.active}
                          onCheckedChange={() => onToggleActive(row.id)}
                        />
                      )
                  
                  )  :header.key === "view" ? (
                    onViewDetails && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onViewDetails(row.id)}
                        >
                           
                          <FileSearch className="w-5 h-5" />
                        </Button>
                      )
                    
                  ):(
                    row[header.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}