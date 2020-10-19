const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const client = require('discord-rich-presence')('767787845199986739');
let window;
const starttime = new Date();
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
  window = win;
  win.once('ready-to-show', () => {
    win.show()
    setActivity();

  setInterval(() => {
      setActivity();
  }, 10000);
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

function setActivity() {
  let state = "In menu";
  let details = window.title.split(" - ").length == 1 ? "YouTube" : function(){let s = window.title.split(" - ");s.pop(); return s.join(" ")}();
  details = details.length < 2 ? "YouTube" : details; 
  let split = window.webContents.getURL().split("/");
  if(split[split.length-1].startsWith("watch")) {
    state = "Watching a video"
  }
  client.updatePresence({
      state: details,
      details: state,
      startTimestamp: starttime,
      largeImageKey: 'yt'
  });
}
