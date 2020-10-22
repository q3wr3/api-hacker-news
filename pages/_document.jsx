import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
	    const initialProps = await Document.getInitialProps(ctx)
	    
	    return { ...initialProps }
	}

    render() {
        return (
        	<Html lang="en">
			  	<Head>
			  		<title>Hacker News.</title>
				    <meta charSet="utf-8" />
				    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
			 	</Head>
              	<body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        	);
    }
}