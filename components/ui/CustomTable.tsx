'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Pagination from '../Pagination';
import { MetaData } from '@/types/global';

interface columnsExtraProps {
  accessorKey?: string;
}

type ExtendedColumnDef<TData, TValue> = ColumnDef<TData, TValue> &
  columnsExtraProps;

interface DataTableProps<TData, TValue> {
  columns: ExtendedColumnDef<TData, TValue>[];
  data: TData[];
  metaData: MetaData;
  loading?: boolean;
}

const CustomTable = <TData, TValue>({
  columns,
  data,
  metaData,
  loading,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
  });

  return (
    <>
      {loading ? (
        <div className="flex gap-5 flex-col w-full mt-2">
          {/* {Array.from({ length: 20 }).map((_, index) => (
            <Skeleton className="h-4 w-full mt-2" key={index} />
          ))} */}
        </div>
      ) : (
        <div className="w-full px-6">
          <Table className={`border border-gray-100`}>
            {table.getRowModel().rows?.length ? (
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border-gray-100">
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          <div className="px-[24px] text-gray-500 uppercase text-[14px] font-semibold">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
            ) : (
              <></>
            )}
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row: any) => (
                  <>
                    <TableRow
                      className={`border-gray-100 cursor-pointer text-textPrimary font-medium`}
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell: any) => {
                        return (
                          <TableCell
                            key={cell.id}
                            className="p-0 px-2 border-none whitespace-normal"
                          >
                            <div className="text-[#4D5359] px-[24px] py-3">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </div>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </>
                ))
              ) : (
                <TableRow className="border-none">
                  <TableCell
                    colSpan={columns?.length}
                    className="flex items-center justify-center flex-col bg-white w-full h-[300px] text-center text-body-large"
                  >
                    <div>👀</div>
                    No Records to display
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {/* Pagination */}
          {table.getRowModel().rows?.length > 0 && (
            <Pagination metaData={metaData} />
          )}
        </div>
      )}
    </>
  );
};

export default CustomTable;
