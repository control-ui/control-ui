export const findScrollParent = (element: HTMLElement): HTMLElement | null => {
    if(!element) return null

    if(element.scrollHeight > element.clientHeight) {
        return element
    }

    return findScrollParent(element.parentNode as HTMLElement)
}
