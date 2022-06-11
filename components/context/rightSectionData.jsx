import { createContext, useState } from "react";

export const MatchContext = createContext({ currentChamps: [], setCurrentChamps: ([]) => { }, setMatchCardWWE: ([]) => { }, setPpvResults: ([]) => { }, setMatchCardAEW: ([]) => { }, setMatchCardIMPACT: ([]) => { }, ppvResults: [], MatchCardWWE: [], MatchCardAEW: [], MatchCardIMPACT: [] });
const MatchProvider = ({ children }) => {
    const [MatchCardWWE, setMatchCardWWE] = useState([]);
    const [MatchCardAEW, setMatchCardAEW] = useState([]);
    const [MatchCardIMPACT, setMatchCardIMPACT] = useState([]);
    const [currentChamps, setCurrentChamps] = useState([]);
    const [ppvResults, setPpvResults] = useState([]);

    return (
        <MatchContext.Provider
            value={{
                currentChamps, ppvResults, setPpvResults, setCurrentChamps, MatchCardWWE, setMatchCardWWE, setMatchCardAEW, setMatchCardIMPACT, MatchCardAEW, MatchCardIMPACT
            }}
        >
            {children}
        </MatchContext.Provider>
    );
};
export default MatchProvider;