export function formatCurrency(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function formatDecimal(value: number) {
  return value.toFixed(2);
}

export function formatDate(iso: string) {
  const date = new Date(iso);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function buildAvatarInitials(name: string) {
  const tokens = name
    .trim()
    .split(' ')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase());

  if (tokens.length >= 2) {
    return `${tokens[0]}${tokens[1]}`;
  }

  if (tokens.length === 1) {
    return tokens[0].slice(0, 2).padEnd(2, 'A');
  }

  return 'FF';
}
