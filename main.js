const { app, BrowserWindow, Notification } = require('electron');

function createWindow() {
	win = new BrowserWindow({width:500, height: 300, resizable:false, autoHideMenuBar:true, icon:`${__dirname}/img/icon.png`});
	//win.loadURL('https://accounts.google.com/ServiceLogin?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Fhl%3Dpt%26next%3Dhttps%253A%252F%252Fmusic.youtube.com%252F%26feature%3D__FEATURE__%26app%3Ddesktop%26action_handle_signin%3Dtrue&service=youtube&ltmpl=music&uilel=3&hl=pt-BR&passive=true');
	win.setMenu(null)
	win.loadFile(`${__dirname}/front_end/index.html`);
	win.on('closed', () => {
		win = null;
	});
}

app.on('ready', () =>{
	createWindow();
})

app.on('window-all-closed', () =>{
	app.quit()
});

app.on('activate', () =>{
	if(win === null){
		createWindow()
	};
})