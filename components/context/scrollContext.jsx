import { createContext, useState } from "react";

export const ScrollContext = createContext({ scrollToTop: false, setScrollToTop: (bool) => { } });
const MatchProvider = ({ children }) => {
    const [scrollToTop, setScrollToTop] = useState(false);
    return (
        <ScrollContext.Provider
            value={{
                scrollToTop, setScrollToTop
            }}
        >
            {children}
        </ScrollContext.Provider>
    );
};
export default MatchProvider;