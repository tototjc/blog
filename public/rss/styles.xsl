<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" doctype-system="about:legacy-compat"/>
  <xsl:template match="/">
    <xsl:variable name="pageTitle"><xsl:value-of select="/rss/channel/title"/><xsl:text> Web Feed</xsl:text></xsl:variable>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title><xsl:copy-of select="$pageTitle"/></title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { width: 100vw; height: 100vh; font-family: system-ui, sans-serif; display: flex; flex-direction: column; place-items: center; place-content: center; text-align: center; font-size: 1rem; gap: 1em; padding: 5%; cursor: default; }
          svg { width: 5em; height: 5em; fill: #e82; }
          h1 { font-size: 1.5em; }
          input { font-family: monospace; font-size: 1em; text-align: center; padding: 0.25em 0.5em; border: 0.1em solid; border-radius: 0.25em; }
          a { color: #07f; text-decoration: underline; }
        </style>
      </head>
      <body>
        <svg viewBox="0 0 16 16">
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm1.5 2.5c5.523 0 10 4.477 10 10a1 1 0 1 1-2 0 8 8 0 0 0-8-8 1 1 0 0 1 0-2zm0 4a6 6 0 0 1 6 6 1 1 0 1 1-2 0 4 4 0 0 0-4-4 1 1 0 0 1 0-2zm.5 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
        </svg>
        <h1><xsl:copy-of select="$pageTitle"/></h1>
        <input title="RSS Link" type="url" readonly="true" size="30" onfocus="this.setSelectionRange(0,this.value.length)">
          <xsl:attribute name="value"><xsl:value-of select="concat(/rss/channel/link, 'rss.xml')"/></xsl:attribute>
        </input>
        <p>This is a RSS 2.0 (Really Simple Syndication) link.</p>
        <p>You can copy the URL of this page and paste it into your RSS reader to subscribe to this feed.</p>
        <a>
          <xsl:attribute name="href"><xsl:value-of select="/rss/channel/link"/></xsl:attribute>
          <xsl:text>← Back to Homepage</xsl:text>
        </a>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
