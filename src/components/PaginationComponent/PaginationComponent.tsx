import styles from "./PaginationComponent.module.css";

type PaginationProps = {
  total: number;
  size?: number;
  from?: number;
  onPageChange: (newFrom: number) => void;
};

export const Pagination = ({
  total,
  size = 25,
  from = 0,
  onPageChange,
}: PaginationProps) => {
  const pageCount = Math.ceil(total / size);
  const currentPage = Math.floor(from / size) + 1;

  return (
    <div className={styles.pagination}>
      <button
        disabled={from <= 0}
        onClick={() => onPageChange(Math.max(0, from - size))}
        className={styles.button}>
        Previous
      </button>
      <span>
        Page {currentPage} of {pageCount}
      </span>
      <button
        disabled={from + size >= total}
        onClick={() => onPageChange(from + size)}
        className={styles.button}>
        Next
      </button>
    </div>
  );
};
