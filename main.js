const { app, BrowserWindow, Menu, MenuItem } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
    thickFrame: true,
    show: false,
    icon: "icons/logo.ico"
  })
  win.webContents.on('did-finish-load',()=>{
    console.log(win.webContents)
    win.setTitle("YouTube Desktop by @raikasdev")
  })
  win.once('ready-to-show', () => {
    win.show()
  })
  win.loadURL('https://youtube.com', {userAgent: 'Chrome'})
  const menu = new Menu()
  menu.append(new MenuItem({ label: '<--', click() { win.webContents.goBack() } }))
  menu.append(new MenuItem({ type: 'separator' }))
  menu.append(new MenuItem({ label: '-->', click() { win.webContents.goForward() } }))
  menu.append(new MenuItem({ type: 'separator' }))
  menu.append(new MenuItem({ role: "reload", label: 'Reload', click() { console.log('Reloading') } }))
  win.setMenu(menu);
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})