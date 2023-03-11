import { Scope } from "i18n-js/typings";
import { useEffect, useState } from "react"
import i18n from "../locales/LocalesController";

export const useLocales = (scope: Scope) : string => {
    const [text, setText] = useState<string>(i18n.t(scope));
    useEffect(() => {
        const unsubscribe = i18n.onChange(() => {
            setText(i18n.t(scope));
        });
        return unsubscribe;
    }, [])
    return text;
}