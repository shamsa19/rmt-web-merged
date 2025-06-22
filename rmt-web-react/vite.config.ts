import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@fullcalendar/common',
      '@fullcalendar/daygrid',
      '@fullcalendar/timegrid',
      '@fullcalendar/resource-timeline',
      '@fullcalendar/interaction'
    ]
  }
})
