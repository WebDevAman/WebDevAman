import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { ThemeContext } from '../context/themeContext'

const TopMenuBar = () => {
    const mobLinks = [
        {
            link: '/tag/aew',
            label: 'AEW'
        },
        {
            link: '/tag/wwe',
            label: 'WWE'
        },
        {
            link: '/?link=ppv-schedule',
            label: 'PPV Schedule'
        },
        {
            link: '/?link=match-card',
            label: 'Match Card'
        },
        {
            link: '/?link=ppv-results',
            label: 'Quick Results'
        },
        {
            link: '/?link=video',
            label: 'Video'
        },
    ]

    const { theme } = useContext(ThemeContext)



    const router = useRouter()
    return (
        <nav className={`sm:hidden py-2  flex overflow-x-scroll w-full ${theme === 'light' ? 'bg-[#fff]' : 'bg-main-black'} `}>
            {mobLinks.map(link => (
                <div onClick={() => router.push(link.link)} style={{ whiteSpace: 'nowrap' }} className={`cursor-pointer flex-1 ${theme === 'light' ? 'bg-[#efefef] border-gray-300 text-gray-500' : 'bg-light-black text-[#888] border-[#888]'} px-2 mx-[6px] text-[14px] rounded-full text-[12px] font-exo-nav font-semibold py-1 `}>
                    {link.label}
                </div>
            ))}

        </nav>
    )
}

export default TopMenuBar