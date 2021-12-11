import React from "react";

const DocsContext = React.createContext({docs: []});
/**
 * @return {{routes:{}}}
 */
export const useDocs = () => {
    return React.useContext(DocsContext);
};

/*
 * React.Children children
 * function(file: string): Promise<any> loader
 */
export const DocsProvider = ({children, loader}) => {
    return <DocsContext.Provider value={{loader}}>
        {children}
    </DocsContext.Provider>
};
