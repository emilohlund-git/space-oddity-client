function convertSmileysToEmoji(message: String) {
  const smileyMap: Record<string, string> = {
    ':D': '😄',
    ':)': '🙂',
    ':(': '🙁',
    ':\'D': '😂',
    ':P': '😋',
    ';)': '😉',
    ':*': '😘',
    ':\'(': '😢',
    ':O': '😧',
  };

  const regexPattern = Object.keys(smileyMap).map(escapeRegex).join('|');
  const regex = new RegExp(regexPattern, 'g');

  return message.replace(regex, (match) => smileyMap[match]);
}

function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export { convertSmileysToEmoji };

