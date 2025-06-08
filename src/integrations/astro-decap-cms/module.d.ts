declare module 'astro-decap-cms:config' {
  const config: import('./type').Config
  export = config
}

declare module 'decap-cms-app/dist/decap-cms-app.js' {
  import CMS from 'decap-cms-app'
  export default CMS
}
