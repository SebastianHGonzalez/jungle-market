import React from 'react';
import Document, {
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document<any> {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      // wraps the collectStyles provider around our <App />.
      ctx.renderPage = () => originalRenderPage({
        // eslint-disable-next-line react/jsx-props-no-spreading
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

      // extract the initial props that may be present.
      const initialProps = await Document.getInitialProps(ctx);

      // returning the original props together with our styled components.
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html lang="es-AR">
        <Head>
          {this.props.styleTags /* rendering the actually stylesheet */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
