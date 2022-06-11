import React, { useContext, useEffect, useState } from 'react'
import { MatchContext } from '../context/rightSectionData'
import { ThemeContext } from '../context/themeContext'

interface righProps {
    type: string;
}
const RightSwitchComponent = ({ type }: righProps) => {
    const [active, setActive] = useState('wwe')
    const [matchCardData, setMatchCardData] = useState([])
    console.log()
    const { theme } = useContext(ThemeContext)
    const { MatchCardWWE, currentChamps, ppvResults } = useContext(MatchContext)
    const handleChangeType = (text: any) => {
        setActive(text)
    }



    useEffect(() => {
        if (type === 'matchcard') {
            setMatchCardData(MatchCardWWE)
        } else if (type === 'champions') {
            setMatchCardData(ppvResults)
        } else if (type === 'ppvresults') {
            setMatchCardData(currentChamps)
        }
    }, [MatchCardWWE, active, currentChamps, ppvResults])

    console.log(matchCardData)

    return (
        <div style={{ transition: 'all ease 0.5s', boxShadow: `0px 0px 10px 2px ${theme === 'light' ? ' #e5e5e5' : '#111111'}` }} className='rounded-[4px] overflow-hidden flex flex-col w-full'>
            <div className="flex w-full">
                <button
                    style={{ transition: 'all ease 0.2s' }}
                    onClick={() => handleChangeType('wwe')}
                    className={`font-bold font-khand-headers text-lg ${active === 'wwe' ? 'bg-[#d62c40] border-b border-[#d62c40] text-[#fff]' : theme === 'dark' ? 'bg-main-black' : 'bg-[#fafafa] border-b text-[#222] '} ${theme === 'light' ? '' : 'text-[#fff]   bg-light-black'} py-4 px-8 flex-1`}>WWE</button>
                <button
                    style={{ transition: 'all ease 0.2s' }}
                    onClick={() => handleChangeType('aew')}
                    className={`font-bold font-khand-headers text-lg ${active === 'aew' ? 'bg-[#d62c40] border-b border-[#d62c40] text-[#fff]' : theme === 'dark' ? 'bg-main-black' : 'bg-[#fafafa] border-b text-[#222] '} ${theme === 'light' ? ' ' : 'text-[#fff]   bg-light-black'} py-4 px-8 flex-1`}>AEW</button>
                <button
                    style={{ transition: 'all ease 0.2s' }}
                    onClick={() => handleChangeType('impact')}
                    className={`font-bold font-khand-headers text-lg ${active === 'impact' ? 'bg-[#d62c40] border-b border-[#d62c40] text-[#fff]' : theme === 'dark' ? 'bg-main-black' : 'bg-[#fafafa] border-b text-[#222] '} ${theme === 'light' ? '' : 'text-[#fff]   bg-light-black'} py-4 px-8 flex-1`}>IMPACT</button>
            </div>
            <div style={{ transition: 'all ease 0.5s' }} className={`${theme === 'light' ? ' bg-white text-[#222] ' : " bg-main-light"} h-[400px] overflow-y-scroll  p-2 `}>
                <div className="flex flex-col ">
                    {matchCardData.map((data: any, index) => (
                        <div key={index}>
                            {active === 'wwe' && data[0] != null && data[0] && data[0].length > 0 ?
                                <div key={index + 1092 + data[0]} className={`${Number(index) % 2 != 0 && theme === 'light' ? 'bg-[#efefef]' : Number(index) % 2 != 0 && theme === 'dark' ? 'bg-[#171717] text-white' : theme === 'dark' ? 'bg-main-light' : 'bg-[#fff] '}  flex flex-col text-center py-2 `}>
                                    <div className="flex flex-col">
                                        <h1 style={{ transition: 'all ease 0.2s' }} className={`font-bold ${theme === 'light' ? `${index === 0 ? 'font-bold underline font-khand-headers text-[18px]' : 'text-[14px] font-duru-sans '} text-[#222]'` : `${index === 0 && 'font-bold underline'} text-[#fff]`}  uppercase`}>{data[0] != undefined && data[0].split('\n')[0]}</h1>
                                        <h1 style={{ transition: 'all ease 0.2s' }} className={`${theme === 'light' ? `${index === 0 ? 'font-bold underline font-khand-headers' : 'font-duru-sans '} text-[#222]'` : `${index === 0 && 'font-bold underline'} text-[#fff]`} text-[14px]`}>{data[0] != undefined && data[0].split('\n')[1]}</h1>
                                    </div>
                                </div> : active === 'aew' && data[1] != null && data[1] && data[1].length > 0 ?
                                    <div key={index + 1092 + data[1]} className={`${Number(index) % 2 === 1 && theme === 'light' ? 'bg-[#efefef]' : Number(index) % 2 === 0 && theme === 'dark' ? 'bg-[#171717] text-white' : theme === 'dark' ? 'bg-main-light' : 'bg-[#fff] '}  flex flex-col text-center py-2 `}>
                                        <div className="flex flex-col">
                                            <h1 style={{ transition: 'all ease 0.2s' }} className={` font-bold ${theme === 'light' ? `${index === 0 ? 'font-bold underline font-khand-headers text-[18px]' : 'text-[14px] font-duru-sans '} text-[#222]'` : `${index === 0 && 'font-bold underline'} text-[#fff]`} uppercase`}>{data[1] != undefined && data[1].split('\n')[0]}</h1>
                                            <h1 style={{ transition: 'all ease 0.2s' }} className={` ${theme === 'light' ? `${index === 0 ? 'font-bold underline font-khand-headers' : 'font-duru-sans '} text-[#222]'` : `${index === 0 && 'font-bold underline'} text-[#fff]`} text-[14px]`}>{data[1] != undefined && data[1].split('\n')[1]}</h1>
                                        </div>
                                    </div> : active === 'impact' && data[2] != null && data[2] && data[2].length > 0 ?
                                        <div key={index + 1092 + data[2]} className={`${Number(index) % 2 === 1 && theme === 'light' ? 'bg-[#efefef]' : Number(index) % 2 === 0 && theme === 'dark' ? 'bg-[#171717] text-white' : theme === 'dark' ? 'bg-main-light' : 'bg-[#fff] '}  flex flex-col text-center py-2 `}>
                                            <div className="flex flex-col">

                                                <h1 style={{ transition: 'all ease 0.2s' }} className={`font-bold ${theme === 'light' ? `${index === 0 ? 'font-bold underline font-khand-headers text-[18px]' : 'text-[14px] font-duru-sans '} text-[#222]'` : `${index === 0 && 'font-bold underline'} text-[#fff]`} uppercase`}>{data[2] != undefined && data[2].split('\n')[0]}</h1>
                                                <h1 style={{ transition: 'all ease 0.2s' }} className={`${theme === 'light' ? `${index === 0 ? 'font-bold underline font-khand-headers' : 'font-duru-sans '} text-[#222]'` : `${index === 0 && 'font-bold underline'} text-[#fff]`} text-[14px]`}>{data[2] != undefined && data[2].split('\n')[1]}</h1>
                                            </div>
                                        </div> : ''}
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default RightSwitchComponent