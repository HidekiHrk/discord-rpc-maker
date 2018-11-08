const { Notification } = require('electron').remote;
const remel = require('electron').remote;
const config = require('./config.json');
const imglist = config.img_list;
const appid = config.app_id;
const RPC = require('discord-rpc');
const client = new RPC.Client({ transport: 'ipc' });

var side_bar_count = 0;

var current_image = "nothing";

var on_off = false;

function sideBarConstruct(){
	let sidebar = document.getElementById('sidebarul');
	for(x = 0; x < imglist.length; x++){
		let elm = imglist[x];
		let p = document.createElement('p');
		p.appendChild(document.createTextNode(elm.name));
		let li = document.createElement('li')
		li.id = elm.key;
		li.appendChild(p);
		li.addEventListener("click", function(){rpcSwitch(li.id)}, false);
		sidebar.appendChild(li);
	}
	let p1 = document.createElement('p');
	p1.appendChild(document.createTextNode('❎ Without Image'));
	let li1 = document.createElement('li');
	li1.id = 'nothing';
	li1.appendChild(p1);
	li1.addEventListener("click", function(){rpcSwitch('nothing')}, false);
	sidebar.appendChild(li1);
}
sideBarConstruct()

function visibility(obj){
	let target = document.getElementById('sidebar');
	switch(obj.id){
		case "sandwichmenu":
			switch(target.style.visibility){
				case 'hidden':
					target.style.visibility = 'visible';
					side_bar_count++
					break;
				case 'visible':
					target.style.visibility = 'hidden';
					side_bar_count = 0;
					break;
				default:
					target.style.visibility = 'hidden';
					side_bar_count = 0;
					break;
			}
			break;
		case "bodi":
			if(target.style.visibility == 'visible' && side_bar_count >= 2){
				target.style.visibility = 'hidden';
				side_bar_count = 0;
			}
			else if(side_bar_count == 1){
				side_bar_count++;
			}
			break;
	}
}

function rpcSwitch(id){
	current_image = id
	let obj = document.getElementById(id);
	console.log(current_image)
	let crc = document.getElementById('richatual');
	crc.innerHTML = `Current Rich: ${obj.childNodes[0].innerHTML}`;
} 

function rpcStart(){
	if(on_off){
		let noti = new Notification({title:'Alert!', body:'RPC Is already on!'});
		noti.show();
		setTimeout(function(){
			noti.close();
		}, 10000);
		noti.on('click', () => {
			remel.getCurrentWindow().show()
		});
	}
	let desc = document.getElementById('desc');
	let state = document.getElementById('state');
	let dets = document.getElementById('dets');
	if(desc.value != "" && state.value != "" && dets.value != ""){
		let actv = 	{
			details:dets.value,
			state:state.value,
			largeImageKey:current_image,
			largeImageText:desc.value,
			instance:false
		}
		client.setActivity(actv)
			.catch(console.error)
			.then(() => {
				let txt = document.getElementById('onofcolor');
				let circle = document.getElementById('onoficon');
				txt.innerHTML = 'on';
				txt.style.color = '#5f5';
				let rct = document.getElementById('richstate');
				rct.style.width = '80px';
				circle.style.backgroundColor = '#5f5';
				let notc = new Notification({title:actv.largeImageText, body:`${actv.state}\n${actv.details}`});
				notc.show()
				setTimeout(function(){
					notc.close();
				}, 10000)
				notc.on('click', () =>{
					remel.getCurrentWindow().show()
				});
			});
	}
	else{
		let notfc = new Notification({title:'Alert!', body:'You need to fill all fields before continue!'});
		notfc.show();
		setTimeout(function(){
			notfc.close();
		}, 10000);
		notfc.on('click', () => {
			remel.getCurrentWindow().show();
		})
	}
}

function rpcClose(){
	if(on_off){
		let noti = new Notification({title:'Alert!', body:'RPC is already off!'});
		noti.show();
		setTimeout(function(){
			noti.close();
		}, 10000);
		noti.on('click', () => {
			remel.getCurrentWindow().show();
		})
	}
	client.clearActivity()
		.catch(console.error)
		.then(() => {
			let txt = document.getElementById('onofcolor');
			let circle = document.getElementById('onoficon');
			txt.innerHTML = 'off';
			txt.style.color = '#f55';
			let rct = document.getElementById('richstate');
			rct.style.width = '80px';
			circle.style.backgroundColor = '#f55';
			let notf = new Notification({title:'RPC State', body:'RPC Ready!'});
			notf.show()
			setTimeout(function(){
				notf.close();
			}, 10000);
			notf.on('click', () => {
				remel.getCurrentWindow().show()
			});
		}
	)
}

client.on('ready', () => {
	let notf = new Notification({title:'RPC State', body:'RPC Ready!'});
	notf.show()
	let txt = document.getElementById('onofcolor');
	let circle = document.getElementById('onoficon');
	txt.innerHTML = 'ready';
	txt.style.color = '#ffeb55';
	let rct = document.getElementById('richstate');
	rct.style.width = '100px';
	circle.style.backgroundColor = '#ffeb55';
	setTimeout(function(){
		notf.close();
	}, 10000);
	notf.on('click', () => {
		remel.getCurrentWindow().show();
	})
});

client.login({ clientId: appid });