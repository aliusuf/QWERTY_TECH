/**
 * Wraps every word of an element in `.w > i` so the inner span can be
 * translated out of an overflow-hidden mask. Idempotent.
 */
export function splitWords(el: HTMLElement) {
  if (el.dataset.split === 'done') return Array.from(el.querySelectorAll<HTMLElement>('.w > i'))

  const words = (el.textContent || '').trim().split(/\s+/)
  el.textContent = ''
  el.classList.add('split')

  for (const word of words) {
    const mask = document.createElement('span')
    mask.className = 'w'
    const inner = document.createElement('i')
    inner.textContent = word
    mask.appendChild(inner)
    el.appendChild(mask)
    el.appendChild(document.createTextNode(' '))
  }

  el.dataset.split = 'done'
  return Array.from(el.querySelectorAll<HTMLElement>('.w > i'))
}
