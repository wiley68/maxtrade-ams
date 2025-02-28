import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import Store from 'electron-store'

const store = new Store()

// needed in case process is undefined under Linux
const platform = process.platform || os.platform()

const currentDir = fileURLToPath(new URL('.', import.meta.url))

let mainWindow

async function createWindow() {
  // Възстановяване на запазеното състояние на прозореца
  let windowState = store.get('windowState', {
    width: 1000,
    height: 600,
    left: undefined,
    top: undefined,
    maximized: false,
  })

  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(currentDir, 'icons/icon.png'), // tray icon
    width: windowState.width,
    height: windowState.height,
    x: windowState.left,
    y: windowState.top,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(
        currentDir,
        path.join(
          process.env.QUASAR_ELECTRON_PRELOAD_FOLDER,
          'electron-preload' + process.env.QUASAR_ELECTRON_PRELOAD_EXTENSION,
        ),
      ),
    },
  })

  if (windowState.maximized) {
    mainWindow.maximize()
  }

  if (process.env.DEV) {
    await mainWindow.loadURL(process.env.APP_URL)
  } else {
    await mainWindow.loadFile('index.html')
  }

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools()
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }

  // Запазване на позицията и размера при затваряне
  mainWindow.on('close', () => {
    let bounds = mainWindow.getBounds()
    store.set('windowState', {
      width: bounds.width,
      height: bounds.height,
      left: bounds.x,
      top: bounds.y,
      maximized: mainWindow.isMaximized(),
    })
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(createWindow)

ipcMain.on('close-app', () => {
  if (mainWindow) {
    mainWindow.close()
  }
})

ipcMain.on('minimize-app', () => {
  if (mainWindow) {
    mainWindow.minimize()
  }
})

ipcMain.on('toggle-maximize-app', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  }
})

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
