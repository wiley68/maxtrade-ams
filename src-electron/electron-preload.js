// This file is loaded in the renderer process before other scripts
import { contextBridge, ipcRenderer } from 'electron'
import { version } from '../package.json'

contextBridge.exposeInMainWorld('electron', {
  closeApp: () => ipcRenderer.send('close-app'),
  minimizeApp: () => ipcRenderer.send('minimize-app'),
  toggleMaximizeApp: () => ipcRenderer.send('toggle-maximize-app'),
  getAppVersion: () => version,
})
