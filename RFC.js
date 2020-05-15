// Dale aquí ----> Shava

function laChica() {
    $('input[id$="txtRfc"]').toggleClass('ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-focus');
    $('input[id$="txtRfc"]').val('ITE430714KI0')
    $('input[id$="txtRfc"]').toggleClass('ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-focus');
    $('input[id$="txtCurp"]').toggleClass('ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all ui-state-disabled')
    $('input[id$="txtCurp"]').attr('aria-disabled',"true");
    $('button[id$="btnBuscar"]').removeAttr('disabled');
    $('button[id$="btnBuscar"]').attr('aria-disabled',"false");
    $('button[id$="btnBuscar"]').toggleClass('ui-state-disabled');
    /*
        Al parecer ese input ViewStates es una key que te da acceso al servicio, la Key se genera de manera dinamica y con un proceso de back del cual no sabemos nada
        Tratamos de cambiar el valor con alguno generado previamente pero no responde aún asi
        La función en general hace todo el proceso que se debe seguir para que regrese un resultado
        Pero sin el acceso a la modificación del View States, no se obtiene nada
    */
    $('input[id$="ViewStates"]').val('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');
    $('button[id$="btnBuscar"]').click();
}

// https://api.jquery.com/removeAttr/

// Evaluación de elementos de página del SAT
/*
class="ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all"
class="ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all ui-state-hover"
class="ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all"


class="ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all ui-state-disabled"
curp
class="ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all"

<input id="busquedaPorRfcForm:txtCurp" name="busquedaPorRfcForm:txtCurp" type="text" value="" autocomplete="off" maxlength="18" size="30" disabled="disabled" style="text-transform: uppercase" class="ui-inputfield ui-inputtext ui-widget ui-state-default ui-corner-all ui-state-disabled" role="textbox" aria-disabled="true" aria-readonly="false" aria-multiline="false">

// button forma
<button id="busquedaPorRfcForm:btnBuscar" name="busquedaPorRfcForm:btnBuscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-state-disabled btn btn-primary btn-sm" onclick="statusDialog.show();" type="submit" disabled="disabled" role="button" aria-disabled="true"> <span class="ui-button-text ui-c">Buscar</span></button>
<button id="busquedaPorRfcForm:btnBuscar" name="busquedaPorRfcForm:btnBuscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-state-disabled btn btn-primary btn-sm" onclick="statusDialog.show();" type="submit" disabled="disabled" role="button" aria-disabled="true"> <span class="ui-button-text ui-c">Buscar</span></button>
<button id="busquedaPorRfcForm:btnBuscar" name="busquedaPorRfcForm:btnBuscar" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only btn btn-primary btn-sm" onclick="statusDialog.show();" type="submit" role="button" aria-disabled="false"> <span class="ui-button-text ui-c">Buscar</span></button>
*/