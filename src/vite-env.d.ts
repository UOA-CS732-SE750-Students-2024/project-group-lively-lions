/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_API_URL: string
    readonly VITE_SERVER_MONGODB_URI: string
  }
  
interface ImportMeta {
readonly env: ImportMetaEnv
}