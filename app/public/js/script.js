if(window.location.pathname=='/oformlenie_zakaza'){
	for(var i=1;i<=10;i++){
		document.getElementById(i+'').addEventListener('click',getStolikHttp,false);
	}
}
function getStolikHttp(){
			console.log(this.id);
			window.location.pathname+='/'+this.id;
		}
for(var i=0;i<10;i++){
	if(window.location.pathname=='/oformlenie_zakaza/'+i){
		for(var j=101;j<=104;j++){
		document.getElementById(j+'').addEventListener('click',getKategoriaHttp,false);
		}
	}
function getKategoriaHttp(){
			console.log(this.id);
			window.location.pathname+='/'+this.id;
		}
}
for(var j=101;j<=104;j++){
for(var i=0;i<10;i++){
	if(window.location.pathname=='/oformlenie_zakaza/'+i+'/'+j){
		if(j==101){
		for(var k=301;k<=304;k++){
		document.getElementById(k+'').addEventListener('click',getBludoHttp,false);
		}
	}
	if(j==102){
		for(var k=305;k<=308;k++){
		document.getElementById(k+'').addEventListener('click',getBludoHttp,false);
		}
	}
	if(j==103){
		for(var k=309;k<=312;k++){
		document.getElementById(k+'').addEventListener('click',getBludoHttp,false);
		}
	}
	if(j==104){
		for(var k=313;k<=316;k++){
		document.getElementById(k+'').addEventListener('click',getBludoHttp,false);
		}
	}
function getBludoHttp(){
			console.log(this.id);
			//window.location.pathname+='/'+this.id;
			window.summa_zakaza = this.childNodes[6].value;
			window.id_bluda = this.childNodes[4].value;
			document.getElementById('summa_zakaza').value = summa_zakaza;
			document.getElementById('id_blud').value= id_bluda;
		}
document.getElementById('time').addEventListener('click',time,false);
function time(){
    var currentdate = new Date(); 
    var datetime = ''+ currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    document.getElementById('date').value = datetime;
    console.log(datetime);
}
	}
}
}






