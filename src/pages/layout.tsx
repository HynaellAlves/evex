import Header from "@/components/Header";

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
}

export default function Layout(props: LayoutProps) {
    return (
        <div className={props.className}>
            <Header/>
            {/* Aqui vai o header e o footer */}
            {props.children}
        </div>
    )
}