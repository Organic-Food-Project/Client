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
import { Suspense } from 'react';
import { cn } from '@/lib/utils';

interface columnsExtraProps {
  accessorKey?: string;
}

type ExtendedColumnDef<TData, TValue> = ColumnDef<TData, TValue> &
  columnsExtraProps;

interface DataTableProps<TData, TValue> {
  columns: ExtendedColumnDef<TData, TValue>[];
  data: TData[];
  metaData?: MetaData;
  headerClassName?: string;
  loading?: boolean;
}

const CustomTable = <TData, TValue>({
  columns,
  data,
  metaData,
  headerClassName,
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
          <Table className={`border border-gray-100`}>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className={cn('border-gray-100', headerClassName)}
                >
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
          </Table>

          <TableBody className="space-y-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-[30px] bg-gray-100 animate-pulse"
              />
            ))}
          </TableBody>
        </div>
      ) : (
        <div className="w-full">
          <Table className={`border border-gray-100`}>
            {table.getRowModel().rows?.length ? (
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className={cn('border-gray-100', headerClassName)}
                  >
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
          {metaData && table.getRowModel().rows?.length > 0 && (
            <Suspense fallback={<div>Loading Pagination...</div>}>
              <Pagination metaData={metaData} />
            </Suspense>
          )}
        </div>
      )}
    </>
  );
};

export default CustomTable;
