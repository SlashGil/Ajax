var x;
x=$(document);
x.ready(inicializarEventos);


function inicializarEventos()
{
	
		
		
$('#boton1').click(function(){ 

var datos={
	ext_url: 'https://gsc.siat.sat.gob.mx/PTSC/COBRR32DPublico/consultaPublico.xhtml', 
	busquedaPorRfcForm:'busquedaPorRfcForm',
	'busquedaPorRfcForm:txtRfc':'IHO060725FY6', 
	'busquedaPorRfcForm:txtCurp':'',
	'busquedaPorRfcForm:btnBuscar':'',
	javax_faces_View:'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' }; 
// alert('va');

	$.ajax({
		method: 'POST',
		url: 'http://localhost/z1/uno.php', // link to your PHP file
		data: datos,
		success: function(data) {
			// we can find any data on external url, cause we've got all page
			var h = $(data).find('#div-success').html();
			console.log('objeto con id div-success expandido : '+$('#div-success').val(h));
			var t = '';
			for (var key in h) { t +=h[key]; }
  //console.log(key, h[key]);
  console.log(t);
  
  var h1 = $(data).find('#div-danger').html();
			console.log('objeto con id div-danger  : '+$('#div-danger').val(h1));
			var t1 = '';
			for (var key in h1) { t1 +=h1[key]; }
  console.log(t1);

			
			
		},
		error:function() {
			console.log('Error');
		}
	});

});
		

};