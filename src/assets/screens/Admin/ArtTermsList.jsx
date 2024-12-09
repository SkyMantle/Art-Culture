import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ProfilePageContainer from "@components/Blocks/ProfilePageContainer";
import API from "../../../utils/api.js";
import Loading from "@components/Blocks/Loading.jsx";
import LoadingError from "@components/Blocks/LoadingError.jsx";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

const AdminArtTermsList = () => {
  const { t } = useTranslation();
  const [artTerms, setArtTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Error state

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => <a href={`/admin/art-terms/${info.row.getValue("id")}`}>{info.renderValue()}</a>,
      header: () => <span>{t("Код")}</span>,
    }),
    columnHelper.accessor("title_uk", {
      cell: (info) => <a href={`/admin/art-terms/${info.row.getValue("id")}`}>{info.renderValue()}</a>,
      header: () => <span>{t("Назва українською")}</span>,
    }),
    columnHelper.accessor("title_en", {
      header: () => <span>{t("Назва англійською")}</span>,
      cell: (info) => <a href={`/admin/art-terms/${info.row.getValue("id")}`}>{info.renderValue()}</a>,
    }),
    columnHelper.accessor("description_uk", {
      header: () => <span>{t("Опис українською")}</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("description_en", {
      header: () => <span>{t("Опис англійською")}</span>,
      cell: (info) => info.renderValue(),
    }),
  ];

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await API.get("/art-terms");
        setArtTerms(
          Array.isArray(response.data?.artTerms) ? response.data?.artTerms : []
        );
      } catch (err) {
        console.error("Loading error:", err);
        setError(t("Помилка завантаження"));
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);
  const table = useReactTable({
    data: artTerms,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <ProfilePageContainer>
      <h2>{t("Список термінів")}</h2>
      {loading ? (
        <Loading />
      ) : error ? (
        <LoadingError />
      ) : artTerms.length === 0 ? (
        <p>{t("Термінів немає")}</p>
      ) : (
        <>
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "sortable-header"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          </table>

          <div className="flex items-center gap-2">
            <button
              className="border rounded p-2"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
            <span className="flex items-center gap-1">
              {t("Сторінка_з", { qty: table.getState().pagination.pageIndex + 1, total: table.getPageCount()})}
            </span>
            <span className="flex items-center gap-1">
              | {t("Перейти до сторінки")}:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[2, 10, 20, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {t("Показати", { pageSize })}
                </option>
              ))}
            </select>
          </div>
          <div>
            {t("Показується_з_рядків", { qty: table.getRowModel().rows.length, total: table.getRowCount() })}
          </div>
        </>
      )}
    </ProfilePageContainer>
  );
};

export default AdminArtTermsList;
