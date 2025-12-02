export interface TableProps<T extends { id: number }> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  actions?: (row: T) => React.ReactNode;
}
