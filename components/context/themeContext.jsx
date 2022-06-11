import { getCookie, getCookies } from "cookies-next";
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({ theme: 'light', show: false, setShow: (text) => { }, setTheme: (text) => { } });
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [show, setShow] = useState(false);
    useEffect(() => {
        getCookies();
        if (!getCookie('theme') || getCookie('theme') === 'light') {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }, [theme])
    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                show,
                setShow
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
export default ThemeProvider;