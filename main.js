/*var http = require('http'),
	server = http.createServer(function(req,res){
		console.log(req.headers);
		console.log(req.url);
		res.writeHead(200,{'content-type':'text/plain'});
		res.write('Hello World');
		res.end();
	});

	server.listen(8080);
	console.log('Listening on port 8080');*/
var express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

var mysql = require('mysql');
var fs = require('fs');
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	database:'restoranservicebd',
	dateStrings: 'date',
	port:3306,
	 });
connection.connect();
var array_IMG = [];

connection.query('select * from zakaz',function(error,result){
	var array_IMG = [];
    var array_zakazi = result;
	console.log(array_zakazi.id_mesta);

app.disable('x-powered-by');

var store = {
	glavnaya:{
		page: 'Главная'
	},
	oformlenie_zakaza:{
		page: 'Оформление заказов'
	},
	zakazi:{
		page:'Заказы',
		arr_zakazi: array_zakazi
	}
},storeKeys = Object.keys(store);
console.log(storeKeys);
app.use(function(req,res,next){
	console.log('%s %s',req.method,req.url);
	next();
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({encoded:true}));

app.get('/glavnaya',function(req,res){
var store = {
	glavnaya:{
		page: 'Главная'
	},
	oformlenie_zakaza:{
		page: 'Оформление заказов'
	},
	zakazi:{
		page:'Заказы',
		arr_zakazi: array_zakazi
	}
},storeKeys = Object.keys(store);
	var page = 'glavnaya', data;
	if(!page) page = 'glavnaya';
	data = store[page];
	if(!data) {
		res.redirect('/');
		return; }
	data.links = storeKeys;
	console.log(array_IMG);
	//data.links = storeKeys;
	res.render('glavnaya.jade',data);
});

button_array = [10];
for(var i=0;i<10;i++){
	    	button_array[i] = i+1;
	    }

app.get('/oformlenie_zakaza',function(req,res){
var store = {
	glavnaya:{
		page: 'Главная'
	},
	oformlenie_zakaza:{
		page: 'Оформление заказов'
	},
	zakazi:{
		page:'Заказы',
		arr_zakazi: array_zakazi
	}
},storeKeys = Object.keys(store);
	var page = 'oformlenie_zakaza', data;
	if(!page) page = 'glavnaya';
	data = store[page];
	if(!data) {
		res.redirect('/');
		return; }
    data.button_array = button_array;
	data.links = storeKeys;
	console.log(array_zakazi);
	//data.links = storeKeys;
	res.render('vibor_stolika.jade',data);
});

app.get('/zakazi',function(req,res){
connection.query('select nazv_bluda,ves_porcii,foto_bluda,id_zakaza,id_stolika,summa_zakaza,date from menu,zakaz where(zakaz.id_bluda=menu.id_bluda)',function(error,result){
var array_zakazi = result;
console.log(result);		
var store = {
	glavnaya:{
		page: 'Главная'
	},
	oformlenie_zakaza:{
		page: 'Оформление заказов'
	},
	zakazi:{
		page:'Заказ билетов',
		arr_zakazi: array_zakazi
	}
},storeKeys = Object.keys(store);
	var page = 'zakazi', data;
	if(!page) page = 'glavnaya';
	data = store[page];
	if(!data) {
		res.redirect('/');
		return; }
	data.links = storeKeys;
	console.log(array_IMG);
	//data.links = storeKeys;
	res.render('zakazi.jade',data);
});
});

app.use('/:page', express.static(__dirname + '/public'));
app.get('/:page?',function(req,res){
	var page = req.params.page, data;
	if(!page) page = 'glavnaya';
	data = store[page];
	if(!data) {
		res.redirect('/');
		return; }
	data.links = storeKeys;
	data.query = req.query; 
	res.render('glavnaya.jade', data);
		
});

app.get('/oformlenie_zakaza/:stolik',function(req,res){
	    var data = req.body;
		res.render('vibor_kategorii.jade',data);

});

app.use('/oformlenie_zakaza/:stolik', express.static(__dirname + '/public'));

app.get('/oformlenie_zakaza/:stolik/:kategoria',function(req,res){
	connection.query('select id_bluda,nazv_bluda,cena,foto_bluda from menu where(id_tipa=("'+req.params.kategoria+'"))',function(error,result){
	var menu = result;
	console.log(menu);
	    var data = req.body;
	    var id_stolika = req.params.stolik;
	    var kategoria = req.params.kategoria;
	    data.id_stolika = id_stolika;
	    data.kategoria = kategoria;
        data.menu = menu;
		res.render('oformlenie_zakaza.jade',data);

});
});

app.post('/oformlenie_zakaza',function(req,res){
	var data = req.body;
	console.log(data);
	if(data.id_stolika && data.id_bluda && data.summa_zakaza && data.date){
		connection.query('insert into zakaz SET ?',data,function(error,result){
           console.log(data);
           if(error){console.log(error);}
		});
	}
	res.redirect('/oformlenie_zakaza');
});


module.exports.button_array = button_array;
});

var server = app.listen(8080,function(){
	console.log('Listening on port 8080');
});

 

