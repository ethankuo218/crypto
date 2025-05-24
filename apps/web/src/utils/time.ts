function parseToUTC(dateString: string): Date {
  // If the string is in 'YYYY-MM-DD HH:mm:ss' format, treat as UTC
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(dateString)) {
    return new Date(dateString.replace(' ', 'T') + 'Z');
  }
  return new Date(dateString);
}

export const formatTime = (isoDateString: string): string => {
  const date = parseToUTC(isoDateString);
  if (isNaN(date.getTime())) {
    return 'Unknown time';
  }

  // Format for Taiwan locale
  return date.toLocaleString('zh-TW', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export const formatTimeAgo = (isoDateString: string): string => {
  const date = parseToUTC(isoDateString);
  if (isNaN(date.getTime())) {
    return 'Unknown time';
  }

  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
};
