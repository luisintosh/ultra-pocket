function copyToClipboard(value: string) {
  return navigator.clipboard.writeText(value);
}

export default copyToClipboard;
