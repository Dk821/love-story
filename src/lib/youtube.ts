/**
 * Turns anything a person might paste — a watch link, a youtu.be link, a Shorts or
 * embed link, or the bare 11-character id — into the video id. Returns '' if none is found.
 */
export function youtubeId(input: string): string {
  const value = input.trim()
  if (!value) return ''
  if (/^[\w-]{11}$/.test(value)) return value
  try {
    const u = new URL(value)
    const host = u.hostname.replace(/^(www|m)\./, '')
    let id = ''
    if (host === 'youtu.be') {
      id = u.pathname.split('/')[1] ?? ''
    } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      id =
        u.searchParams.get('v') ??
        u.pathname.match(/^\/(?:embed|shorts|live|v)\/([\w-]+)/)?.[1] ??
        ''
    }
    return /^[\w-]{11}$/.test(id) ? id : ''
  } catch {
    return ''
  }
}
