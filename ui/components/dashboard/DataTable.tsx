import type { ReactNode } from "react";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/site/EmptyState";

export type DataTableColumn<T> = {
  key: string;
  header: ReactNode;
  render: (row: T) => ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
  headerClassName?: string;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  keyExtractor: (row: T) => string | number;
  isLoading?: boolean;
  loadingMessage?: string;
  emptyTitle?: string;
  emptyMessage?: string;
};

const alignClass: Record<NonNullable<DataTableColumn<unknown>["align"]>, string> = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

export default function DataTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  loadingMessage = "Loading…",
  emptyTitle = "Nothing here yet",
  emptyMessage = "Once you add some, they'll show up here.",
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <Card className="p-0">
        <p className="p-6 text-sm text-offwhite/50">{loadingMessage}</p>
      </Card>
    );
  }

  if (data.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} />;
  }

  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-offwhite/10 text-xs uppercase tracking-wide text-sand">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`whitespace-nowrap px-6 py-4 font-medium ${alignClass[column.align ?? "left"]} ${column.headerClassName ?? ""}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-offwhite/5">
          {data.map((row) => (
            <tr key={keyExtractor(row)} className="transition-colors duration-200 hover:bg-offwhite/[0.03]">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-6 py-4 ${alignClass[column.align ?? "left"]} ${column.className ?? ""}`}
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
