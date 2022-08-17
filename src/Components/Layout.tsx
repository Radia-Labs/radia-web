import {Layout as AppLayout} from "./styles";

type Props = {
    children: JSX.Element
}
const Layout = ({ children }: Props) => (
    <AppLayout>
        {children}
    </AppLayout>
)


export default Layout;