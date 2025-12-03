export const normalizeDate = (isoString: string): string => {
  if (!isoString) return '';

  if (!isoString.includes('T')) {
    const [y, m, d] = isoString.split('-');
    return `${d}/${m}/${y}`;
  }

  const datePart = isoString.split('T')[0];
  const [y, m, d] = datePart.split('-');
  return `${d}/${m}/${y}`;
};
