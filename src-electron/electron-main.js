import { app, BrowserWindow, ipcMain, Menu, Tray } from 'electron'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import Store from 'electron-store'

const store = new Store()

const platform = process.platform || os.platform()

const currentDir = fileURLToPath(new URL('.', import.meta.url))

let mainWindow
let tray

async function createWindow() {
  let windowState = store.get('windowState', {
    width: 1000,
    height: 600,
    left: undefined,
    top: undefined,
    maximized: false,
  })

  mainWindow = new BrowserWindow({
    icon: path.resolve(currentDir, 'icons/icon.png'),
    width: windowState.width,
    height: windowState.height,
    x: windowState.left,
    y: windowState.top,
    frame: false,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      preload: path.resolve(
        currentDir,
        path.join(
          process.env.QUASAR_ELECTRON_PRELOAD_FOLDER,
          'electron-preload' + process.env.QUASAR_ELECTRON_PRELOAD_EXTENSION,
        ),
      ),
    },
  })

  Menu.setApplicationMenu(null)

  if (windowState.maximized) {
    mainWindow.maximize()
  }

  if (process.env.DEV) {
    await mainWindow.loadURL(process.env.APP_URL)
  } else {
    await mainWindow.loadFile('index.html')
  }

  if (process.env.DEBUGGING) {
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }

  mainWindow.on('minimize', (event) => {
    event.preventDefault()
    mainWindow.hide()
  })

  mainWindow.on('close', (event) => {
    if (!app.isQuiting) {
      event.preventDefault()
      let bounds = mainWindow.getBounds()
      store.set('windowState', {
        width: bounds.width,
        height: bounds.height,
        left: bounds.x,
        top: bounds.y,
        maximized: mainWindow.isMaximized(),
        nodeIntegration: false,
      })
      mainWindow.hide()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()
  createTray()
})

function createTray() {
  const trayIconPath = path.resolve(currentDir, 'icons/icon.png')
  tray = new Tray(trayIconPath)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Покажи',
      click: () => {
        mainWindow.show()
      },
    },
    {
      label: 'Скрий',
      click: () => {
        mainWindow.hide()
      },
    },
    {
      label: 'Изход',
      click: () => {
        tray.destroy()
        app.isQuiting = true
        setTimeout(() => {
          app.exit()
        }, 500)
      },
    },
  ])

  tray.setToolTip('MaxtradeAMS')
  tray.setContextMenu(contextMenu)

  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })
}

ipcMain.on('close-app', () => {
  if (mainWindow) {
    mainWindow.close()
  }
})

ipcMain.on('exit-app', () => {
  if (mainWindow) {
    tray.destroy()
    app.isQuiting = true
    setTimeout(() => {
      app.exit()
    }, 500)
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
