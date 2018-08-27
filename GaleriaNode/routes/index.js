var express = require('express');
var router = express.Router();

//Código a insertar
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
router.use(fileUpload());
var mysql = require('mysql');
var db = require('../models/conexion');

/* GET home page. */
router.get('/', function (req, res, next) {
  db.query("SELECT * FROM imagenes", function (err, resultados) {
    if (err) throw err;
    res.render('index', { title: 'Galería', imagenes: resultados })
  });
});

router.get('/rfc', function(req, res, next) {

  var nombre = req.body.nombre;
  var paterno = req.body.paterno;
  var materno = req.body.materno;
  var dia = req.body.dia;
  var mes = req.body.mes;
  var anio = req.body.anio;

  function QuitarArticulos(palabra) 
  { 
    palabra=palabra.replace("DEL ","",palabra); 
    palabra=palabra.replace("LAS ","",palabra); 
    palabra=palabra.replace("DE ","",palabra); 
    palabra=palabra.replace("LA ","",palabra); 
    palabra=palabra.replace("Y ","",palabra); 
    palabra=palabra.replace("A ","",palabra); 
    return palabra; 
  }

  function EsVocal(letra) 
  { 
    if (letra == 'A' || letra == 'E' || letra == 'I' || letra == 'O' || letra == 'U' || letra == 'a' || letra == 'e' || letra == 'i' || letra == 'o' || letra == 'u'){
      return 1; }
    else {
      return 0; 
    }
  }

  function CalcularHomoclave(nombreCompleto, fecha, rfc) 
  { 
    //Guardara el nombre en su correspondiente numérico 
    //Agregamos un cero al inicio de la representación numérica del nombre 
    var nombreEnNumero="0";
    //La suma de la secuencia de nÃºmeros de nombreEnNumero 
    var valorSuma = 0; 
    //region Tablas para calcular la homoclave 
    var tablaRFC1 = [];
    tablaRFC1['&']='10'; 
    tablaRFC1['Ã‘']='10'; 
    tablaRFC1['A']='11'; 
    tablaRFC1['B']='12'; 
    tablaRFC1['C']='13'; 
    tablaRFC1['D']='14'; 
    tablaRFC1['E']='15'; 
    tablaRFC1['F']='16'; 
    tablaRFC1['G']='17'; 
    tablaRFC1['H']='18'; 
    tablaRFC1['I']='19'; 
    tablaRFC1['J']='21'; 
    tablaRFC1['K']='22'; 
    tablaRFC1['L']='23'; 
    tablaRFC1['M']='24'; 
    tablaRFC1['N']='25'; 
    tablaRFC1['O']='26'; 
    tablaRFC1['P']='27'; 
    tablaRFC1['Q']='28'; 
    tablaRFC1['R']='29'; 
    tablaRFC1['S']='32'; 
    tablaRFC1['T']='33'; 
    tablaRFC1['U']='34'; 
    tablaRFC1['V']='35'; 
    tablaRFC1['W']='36'; 
    tablaRFC1['X']='37'; 
    tablaRFC1['Y']='38'; 
    tablaRFC1['Z']='39'; 
    tablaRFC1['0']='00'; 
    tablaRFC1['1']='01'; 
    tablaRFC1['2']='02'; 
    tablaRFC1['3']='03'; 
    tablaRFC1['4']='04'; 
    tablaRFC1['5']='05'; 
    tablaRFC1['6']='06'; 
    tablaRFC1['7']='07'; 
    tablaRFC1['8']='08'; 
    tablaRFC1['9']='09'; 

    var tablaRFC2 = [];
    tablaRFC2[0]="1";
    tablaRFC2[1]="2";
    tablaRFC2[2]="3"; 
    tablaRFC2[3]="4"; 
    tablaRFC2[4]="5"; 
    tablaRFC2[5]="6"; 
    tablaRFC2[6]="7"; 
    tablaRFC2[7]="8";
    tablaRFC2[8]="9"; 
    tablaRFC2[9]="A"; 
    tablaRFC2[10]="B"; 
    tablaRFC2[11]="C"; 
    tablaRFC2[12]="D"; 
    tablaRFC2[13]="E"; 
    tablaRFC2[14]="F"; 
    tablaRFC2[15]="G"; 
    tablaRFC2[16]="H";
    tablaRFC2[17]="I"; 
    tablaRFC2[18]="J";
    tablaRFC2[19]="K"; 
    tablaRFC2[20]="L";
    tablaRFC2[21]="M"; 
    tablaRFC2[22]="N"; 
    tablaRFC2[23]="P"; 
    tablaRFC2[24]="Q";
    tablaRFC2[25]="R"; 
    tablaRFC2[26]="S"; 
    tablaRFC2[27]="T"; 
    tablaRFC2[28]="U"; 
    tablaRFC2[29]="V"; 
    tablaRFC2[30]="W";
    tablaRFC2[31]="X";
    tablaRFC2[32]="Y"; 
    tablaRFC2[33]="Z"; 
    
    var tablaRFC3 = [];
    tablaRFC3['A']=10; 
    tablaRFC3['B']=11; 
    tablaRFC3['C']=12; 
    tablaRFC3['D']=13; 
    tablaRFC3['E']=14; 
    tablaRFC3['F']=15; 
    tablaRFC3['G']=16; 
    tablaRFC3['H']=17; 
    tablaRFC3['I']=18; 
    tablaRFC3['J']=19; 
    tablaRFC3['K']=20; 
    tablaRFC3['L']=21; 
    tablaRFC3['M']=22; 
    tablaRFC3['N']=23; 
    tablaRFC3['O']=25; 
    tablaRFC3['P']=26; 
    tablaRFC3['Q']=27; 
    tablaRFC3['R']=28; 
    tablaRFC3['S']=29; 
    tablaRFC3['T']=30; 
    tablaRFC3['U']=31; 
    tablaRFC3['V']=32; 
    tablaRFC3['W']=33; 
    tablaRFC3['X']=34; 
    tablaRFC3['Y']=35; 
    tablaRFC3['Z']=36; 
    tablaRFC3['0']=0; 
    tablaRFC3['1']=1; 
    tablaRFC3['2']=2; 
    tablaRFC3['3']=3; 
    tablaRFC3['4']=4;
    tablaRFC3['5']=5; 
    tablaRFC3['6']=6; 
    tablaRFC3['7']=7; 
    tablaRFC3['8']=8; 
    tablaRFC3['9']=9; 
    tablaRFC3['']=24;
    tablaRFC3[' ']=37; 
    //Recorremos el nombre y vamos convirtiendo las letras en 
    //su valor numerico 
    var len_nombreCompleto=nombreCompleto.length; 
    for(var x=0; x<len_nombreCompleto; x++) 
    {
      c=nombreCompleto.substring(x,x+1);
      if (tablaRFC1[c] !== undefined && tablaRFC1[c]!== null){
        nombreEnNumero += tablaRFC1[c]; }
      else 
      nombreEnNumero +="00"; 
    }
    //Calculamos la suma de la secuencia de números 
    //calculados anteriormente 
    //la formula es: 
    //(el caracter actual multiplicado por diez) 
    //(mas el valor del caracter siguiente )
    //(y lo anterior multiplicado por el valor del caracter siguiente) 
    var n = nombreEnNumero.length - 1; 
    for (var i = 0; i < n; i++) 
    { 
      var prod1 = nombreEnNumero.substring(i, i + 2); 
      var prod2 = nombreEnNumero.substring(i + 1, i + 2); 
      valorSuma += prod1 * prod2;
    }
    //Los magic numbers que aparecen por ahí deben tener algún origen matemático 
    //relacionado con el algoritmo al igual que el proceso mismo de calcular el 
    //digito verificador. 
    var div = 0; 
    var mod = 0; 
    div = valorSuma % 1000; 
    mod = Math.floor(div / 34); //cociente 
    div = div - mod * 34; //residuo 
    var hc = tablaRFC2[mod];
    hc += tablaRFC2[div];
    rfc += hc;
    //Aquí empieza el cálculo del digito verificador basado en lo que tenemos del RFC 
    var sumaParcial = 0; 
    n=rfc.length; 
    for (var i = 0; i < n; i++) 
    { 
      var c=rfc.substring(i,i+1); 
      if (tablaRFC3[c] !== undefined && tablaRFC3[c]!== null) 
      { 
        sumaParcial += (tablaRFC3[c] * (14 - (i + 1)));
      } 
    }
    
    var moduloVerificador = sumaParcial % 11; 
    if (moduloVerificador == 0) {
    }     
    else 
    { 
      sumaParcial = 11 - moduloVerificador; 
      if (sumaParcial == 10){
        rfc += "A"; }
      else{
        rfc += sumaParcial; 
      } 
    }
    return rfc; 
  }

  function CalcularRFC(nombre,apellidoPaterno,apellidoMaterno,fecha) 
  { 
    /*Cambiamos todo a mayúsculas. 
    Quitamos los espacios al principio y final del nombre y apellidos*/ 


    nombre = nombre.trim().toUpperCase();
    apellidoPaterno =apellidoPaterno.trim().toUpperCase(); 
    apellidoMaterno =apellidoMaterno.trim().toUpperCase();

    
    //RFC que se regresará 
    var rfc = ""; 
    
    //Quitamos los arti­culos de los apellidos 
    apellidoPaterno = QuitarArticulos(apellidoPaterno); 
    apellidoMaterno = QuitarArticulos(apellidoMaterno); 
    //Agregamos el primer caracter del apellido paterno 
    rfc = apellidoPaterno.substring(0, 1); 
    //Buscamos y agregamos al rfc la primera vocal del primer apellido 
    var len_apellidoPaterno= apellidoPaterno.length; 
    for(var x = 1; x < len_apellidoPaterno; x++) 
    {
      var c = apellidoPaterno.substring(x,1); 
      if (EsVocal(c)) 
      {
        rfc += c; 
        break;
      }
    }
    //Agregamos el primer caracter del apellido materno 
    rfc += apellidoMaterno.substring(0, 1); 
    
    //Agregamos el primer caracter del primer nombre 
    rfc += nombre.substring(0, 1); 
    
    //agregamos la fecha ddmmyyyy
    rfc +=  fecha.substring(6,8) + fecha.substring(2,4) + fecha.substring(0,2); 
    
    //Le agregamos la homoclave al rfc 
    rfc = CalcularHomoclave(apellidoPaterno + " " + apellidoMaterno + " " + nombre, fecha, rfc); 
    return rfc; 
  }

  
  var fecha = dia + mes +anio;
  var resultat = "Tu RFC es " + CalcularRFC(nombre, paterno, materno, fecha);

  res.render('./NodeRFC', { title: 'RFC', RFCres: resultat });

  //res.render('./NodeRFC', { title: 'Express' });
});

router.get('/imc', function(req, res, next) {
  res.render('./NodeIMC', { title: 'Express' });
});

router.get('/crop', function(req, res, next) {
  res.render('./CropNode', { title: 'Express' });
});


router.post('/AgregarImagen', function(req, res, next) {

  if(!req.files){return res.status(400).send("No hay archivo");}
  let archivoASubir = req.files.imagen;
  archivoASubir.mv('public/images/' + req.files.imagen.name, function(err, resultados){
    if (err)
      return res.status(500).send(err);
  });

  var imagen = {
    nombre:req.body.nombre,
    descripcion:req.body.descripcion,
    imagen:req.files.imagen.name
  }

  console.log(imagen);

  db.query("INSERT INTO imagenes SET ?", imagen, function(err, resultados){

    console.log(resultados);

    res.redirect('/');

  });

});

module.exports = router;
