import Header from "./Header";

interface LayoutProps {
    children: React.ReactNode
}

const Footer = () => {
    return (
        <footer>
            <p>Copyright © 2022 Theblockheader.com | Terms & Conditions</p>
        </footer>
    )
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <div className="content">
                {children}
            </div>
            <Footer />
        </>
    )
};
