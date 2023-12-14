import vue from '@vitejs/plugin-vue'
import createCompression from './compression'

// createCompression hmr
export default function createVitePlugins (viteEnv, isBuild = false) {
  const vitePlugins = [vue()]
  isBuild && vitePlugins.push(...createCompression(viteEnv))
  return vitePlugins
}
