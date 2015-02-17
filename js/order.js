var global_test;

$(document).ready(function() {


    var orders = [];

    $('.calendar td:not([disabled])').click(function() {

        var date = $(this).html();

        if (date !== "")
            $(this).toggleClass('selected');

        var state = $(this).hasClass('selected');

        if (state)
            orders.push(date);
        else
            delete orders.splice(orders.indexOf(date), 1);
    });

    $('#place-order').click(function(res) {
        var menu = $('#menu').val();
		var type = $('#type').val();
		
        if (orders.length === 0)
            setError('Please Choose a Orderable Date');
        else if (menu === null)
            setError('Please Select Menu');
        else if(type === null)
			setError('Choose Order Type');
		else {
            unsetError();
            $('#place-order').html('<span class="glyphicon glyphicon-floppy-save"></span> Ordering...wait')
                    .attr('disabled','disabled');
            if (askConfirmation()) {
                placeOrder(orders, menu, type, function(res){
		    orders = [];
                    $('#place-order').html('Place Your Order').removeAttr('disabled');
                    if( res.orders && res.orders.length > 0 ){
                    	$('#numOrder').html(res.orders.length);
                    	$('#paynow').modal('show');
                    }
		    if( res.errors ){
			setError(res.errors);
		   }
                });
            }
        }

    });

});

function placeOrder(order, menu, type, callback) {

    $.ajax({
        url: $('#place-order-url').val(),
        type: 'POST',
        data: {
            orders: order,
            menu: menu,
			type: type,
            year: $('#year').val(),
            month: $('#month').val()
        },
        success: function(res) {

            if (res.orders)
            {
                for (var i = 0; i < res.orders.length; i++)
                {
                    var order = res.orders[i];
                    var orderElem = $('[data-date="' + order.date + '"]');
                    $(orderElem).addClass('info');
                    $(orderElem).removeClass('selected');
                }

                $('.selected').removeClass('selected');
            }
            
            callback(res);
        }
    });
}

function askConfirmation() {
    return true;
}

function setError(msg) {
    $('#error').html(msg);
}

function unsetError() {
    $('#error').html('');
}

$.ajaxSetup({
	data: {
		'_token': $('#_token').val()
	}
});
