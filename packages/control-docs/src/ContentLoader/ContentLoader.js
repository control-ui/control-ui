import React from "react";
import {useDocs} from "@control-ui/docs/DocsProvider";
import {PROCESS_ERROR, PROCESS_NOT_FOUND, PROCESS_START, PROCESS_SUCCESS} from "@control-ui/kit/Process";

const loadedFiles = {};

export const contentLoader = (loader, id, activeDoc, cb) => {
    if(loadedFiles[id]) {
        cb(loadedFiles[id], true);
        return;
    }
    try {
        loader(id, activeDoc)
            .then(data => {
                fetch(data.default)
                    .then(response => response.text())
                    .then(text => {
                        loadedFiles[id] = text;
                        cb(text, true);
                    })
                    .catch((e) => {
                        console.error(e)
                        cb(null, false);
                    });
            })
            .catch((e) => {
                cb(null, e.code);
            });
    } catch(e) {
        cb(null, 404);
    }
};

export const useContentLoader = (id, activeDoc) => {
    const {loader} = useDocs();
    const [progress, setProgress] = React.useState('');
    const [loadedDoc, setLoadedDoc] = React.useState('');

    if(!loader) {
        console.error('useContentLoader: missing `loader`, did you forget the `DocsProvider`?')
    }

    React.useEffect(() => {
        setProgress(PROCESS_START);
        contentLoader(loader, id, activeDoc, (data, status) => {
            if(status === true) {
                setLoadedDoc(data);
                setProgress(PROCESS_SUCCESS);
            } else {
                setProgress(status === 'MODULE_NOT_FOUND' ? PROCESS_NOT_FOUND : PROCESS_ERROR);
                setLoadedDoc('');
            }
        })
    }, [setLoadedDoc, id]);

    return {
        content: loadedDoc,
        progress,
    }
};
