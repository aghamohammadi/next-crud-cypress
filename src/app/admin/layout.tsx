
import Header from '@/components/layout/header-admin'
import { Envs } from '@/utils/config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: `Admin | ${Envs.SITE_TITLE}`,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <div className="py-5 min-h-screen">
                {children}
            </div>
        </>
    )
}
