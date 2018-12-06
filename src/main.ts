import { app, BrowserWindow, systemPreferences, Tray } from 'electron';
import * as path from 'path';

let window: BrowserWindow;
let tray: Tray;

app.dock.hide();

// Wait until the app is ready
app.once('ready', () => {

  // Create a new tray
  const icon =
    systemPreferences.isDarkMode()
      ? path.join('assets', 'icon', 'dark.png')
      : path.join('assets', 'icon', 'light.png');
  tray = new Tray(icon);
  tray.on('right-click', toggleWindow);
  tray.on('double-click', toggleWindow);
  tray.on('click', () => toggleWindow());

  // Create a new window
  window = new BrowserWindow({
    frame: false,
    fullscreenable: false,
    height: 450,
    show: false,
    webPreferences: {
      backgroundThrottling: false,
    },
    width: 300,
  });

  window.loadFile(path.join(__dirname, '../index.html'));

  window.once('ready-to-show', () => {
    const position = getWindowPosition();
    window.setPosition(position.x, position.y, false);
    window.show();
    window.focus();
  });

  // Hide the window when it loses focus
  window.on('blur', () => {
    window.hide();
  });
});

const getWindowPosition = () => {
  const windowBounds = window.getBounds();
  const trayBounds = tray.getBounds();

  // Center window horizontally below the tray icon
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(trayBounds.y + trayBounds.height + 4);

  return { x, y };
};

// toggle window
const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide();
  } else {
    showWindow();
  }
};

const showWindow = () => {
  const position = getWindowPosition();
  window.setPosition(position.x, position.y, false);
  window.show();
  window.focus();
};

// import { app, BrowserWindow } from 'electron';
// import * as path from 'path';

// let mainWindow: Electron.BrowserWindow;

// function createWindow() {
//   // Create the browser window.
//   mainWindow = new BrowserWindow({
//     height: 600,
//     width: 800,
//   });

//   // and load the index.html of the app.
//   mainWindow.loadFile(path.join(__dirname, '../index.html'));

//   // Open the DevTools.
//   mainWindow.webContents.openDevTools();

//   // Emitted when the window is closed.
//   mainWindow.on('closed', () => {
//     // Dereference the window object, usually you would store windows
//     // in an array if your app supports multi windows, this is the time
//     // when you should delete the corresponding element.
//     mainWindow = null;
//   });
// }

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.on('ready', createWindow);

// // Quit when all windows are closed.
// app.on('window-all-closed', () => {
//   // On OS X it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   // On OS X it"s common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (mainWindow === null) {
//     createWindow();
//   }
// });

// // In this file you can include the rest of your app"s specific main process
// // code. You can also put them in separate files and require them here.
