import Head from "next/head";

export const Layout = ({children}) => (
    <>
        <Head>
            <title>Customer App</title>
        </Head>
        {children}
    </>
)