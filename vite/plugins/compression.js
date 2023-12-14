import compression from 'vite-plugin-compression'

// createCompression
export default function createCompression (env) {
  return [
    compression({
      ext: '.gz',
      deleteOriginFile: false,
    }),
  ]
}
