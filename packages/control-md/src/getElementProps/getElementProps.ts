export const getElementProps = <P extends object>(p: P): Exclude<P, 'node'> => {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {node, ...p2} = p
    return p2 as Exclude<P, 'node'>
}
