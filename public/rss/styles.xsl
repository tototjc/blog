<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" doctype-system="about:legacy-compat"/>
  <xsl:template match="/">
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>
          <xsl:value-of select="/rss/channel/title"/>
          <xsl:text> Web Feed</xsl:text>
        </title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            width: 100vw;
            height: 100vh;
            font-family: system-ui, sans-serif;
            display: flex;
            flex-direction: column;
            place-items: center;
            place-content: center;
            text-align: center;
            font-size: 1rem;
            gap: 1em;
            padding: 5%;
            cursor: default;
          }

          svg {
            width: 5em;
            height: 5em;
            fill: #e82;
          }

          h1 {
            font-size: 1.5em;
          }

          input {
            font-family: monospace;
            font-size: 1em;
            text-align: center;
            padding: 0.25em 0.5em;
            border: 0.05em solid;
            border-radius: 0.25em;
          }

          a {
            color: #07f;
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <svg viewBox="0 0 512 512">
          <path d="M432 32H80c-26.51 0-48 21.49-48 48v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM144 416c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm157.533 0h-34.335c-6.011 0-11.051-4.636-11.442-10.634-5.214-80.05-69.243-143.92-149.123-149.123-5.997-.39-10.633-5.431-10.633-11.441v-34.335c0-6.535 5.468-11.777 11.994-11.425 110.546 5.974 198.997 94.536 204.964 204.964.352 6.526-4.89 11.994-11.425 11.994zm103.027 0h-34.334c-6.161 0-11.175-4.882-11.427-11.038-5.598-136.535-115.204-246.161-251.76-251.76-6.157-.253-11.039-5.267-11.039-11.428V107.44c0-6.454 5.338-11.664 11.787-11.432 167.83 6.025 302.21 141.191 308.205 308.205.232 6.449-4.978 11.787-11.432 11.787z"/>
        </svg>
        <h1>
          <xsl:value-of select="/rss/channel/title"/>
          <xsl:text> Web Feed</xsl:text>
        </h1>
        <input type="url" readonly="true" size="30" onfocus="this.setSelectionRange(0,this.value.length)">
          <xsl:attribute name="value">
            <xsl:value-of select="/rss/channel/link"/>
            <xsl:text>rss.xml</xsl:text>
          </xsl:attribute>
        </input>
        <p>This is a RSS 2.0 (Really Simple Syndication) link.</p>
        <p>You can copy the URL of this page and paste it into your RSS reader to subscribe to this feed.</p>
        <a>
          <xsl:attribute name="href">
            <xsl:value-of select="/rss/channel/link"/>
          </xsl:attribute>
          <xsl:text>← Back to Homepage</xsl:text>
        </a>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
