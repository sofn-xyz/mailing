import { useRouter } from "next/router";
import cx from "classnames";
import Link from "next/link";

type PaginationControlProps = {
  total: number;
  page: number;
  pageSize: number;
};

const MAX_VISIBLE_PAGES = 5;

const PaginationControl: React.FC<PaginationControlProps> = ({
  total,
  page,
  pageSize,
}) => {
  const router = useRouter();
  // if there's one page or less, don't show the pagination control
  if (total <= pageSize) {
    return null;
  }
  const numPages = Math.ceil(total / pageSize);
  const pages = Array.from({ length: numPages }, (_, i) => i + 1);
  const visiblePages = pages.slice(
    Math.max(0, page - MAX_VISIBLE_PAGES / 2),
    Math.min(numPages, page + MAX_VISIBLE_PAGES / 2)
  );

  const getPageHref = (page: number) => {
    // current url with page query param
    const url = new URL(router.pathname, "http://localhost");
    if (page > 1) {
      url.searchParams.set("page", page.toString());
    } else {
      url.searchParams.delete("page");
    }
    return url.toString().split("http://localhost")[1];
  };

  const previousEnabled = page > 1;
  const nextEnabled = page < numPages;

  return (
    <div className="flex justify-center mt-8">
      <nav
        className="relative z-0 inline-flex shadow-sm space-x-2"
        aria-label="Pagination"
      >
        <Link legacyBehavior href={getPageHref(page - 1)}>
          <a
            className={cx(
              "relative inline-flex items-center px-3 py-1 rounded-2xl",
              {
                "cursor-not-allowed pointer-events-none": !previousEnabled,
                "hover:bg-gray-700": previousEnabled,
              }
            )}
            aria-label="Previous"
            aria-disabled={!previousEnabled}
          >
            <svg
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cx("inline origin-center rotate-90", {
                "stroke-slate-400": previousEnabled,
                "stroke-gray-600": !previousEnabled,
              })}
            >
              <path
                d="M1.5 1.5L4.5 4.5L7.5 1.5"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </Link>
        {visiblePages.map((p) => (
          <Link legacyBehavior href={getPageHref(p)} key={p}>
            <a
              className={cx(
                "relative inline-flex items-center px-3 py-1 text-sm font-medium rounded-2xl",
                {
                  // colors match the navbar
                  "text-black bg-white pointer-events-none": p === page,
                  "text-slate-400 hover:bg-gray-700": p !== page,
                }
              )}
            >
              {p}
            </a>
          </Link>
        ))}
        <Link legacyBehavior href={getPageHref(page + 1)}>
          <a
            className={cx(
              "relative inline-flex items-center px-3 py-1 rounded-2xl",
              {
                "cursor-not-allowed pointer-events-none": !nextEnabled,
                "hover:bg-gray-700": nextEnabled,
              }
            )}
            aria-label="Next"
            aria-disabled={!nextEnabled}
          >
            <svg
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cx("inline origin-center -rotate-90", {
                "stroke-slate-400": nextEnabled,
                "stroke-gray-600": !nextEnabled,
              })}
            >
              <path
                d="M1.5 1.5L4.5 4.5L7.5 1.5"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </Link>
      </nav>
    </div>
  );
};

export default PaginationControl;
