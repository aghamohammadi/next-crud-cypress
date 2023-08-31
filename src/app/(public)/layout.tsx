
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { Envs } from '@/utils/config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: `${Envs.SITE_TITLE}`,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <div className="min-h-screen">
                {children}
            </div>

            <Footer />
        </>
    )
}
