import React from "react";
import {LoadingCircular} from "@control-ui/kit/Loading/LoadingCircular";

export const loading = (title) => (props) => <LoadingCircular {...props} title={title}/>;
