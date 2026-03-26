/**
 * Returns the image URL as-is. Mock data uses https:// picsum.photos URLs
 * which don't require proxying or hotlink workarounds.
 */
export function proxyImageUrl(url: string): string {
  return url ?? '';
}

export function coverImageUrl(url: string, _quality: 'hd' | 'normal'): string {
  return url ?? '';
}
