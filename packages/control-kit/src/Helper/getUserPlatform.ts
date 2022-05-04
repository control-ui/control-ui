export const getUserPlatform = (): string | undefined =>
    // @ts-ignore
    // eslint-disable-next-line deprecation/deprecation
    navigator?.userAgentData?.platform || navigator?.platform


export const getUserCtrlKey = (platform?: string): string | undefined =>
    platform?.startsWith('iP') ? undefined :
        platform?.startsWith('Mac') ? '⌘' : 'CTRL'
