if (!!window.EventSource) {
    var eventSource = new EventSource("/stream");
    eventSource.onmessage = function(event) {
        data = JSON.parse(event.data);

        var row = '<tr><td>' + data.accountId + '</td><td>' + data.orderId + '</td><td>' + data.orderType + '</td><td>' + data.openDate + '</td><td>' + data.symbol + '</td><td style="text-align: right;">' + data.price + '</td><td style="text-align: right;">' + data.orderFee + '</td></tr>';

        $('#tbody').append(row);
    };
} else {
    window.alert("EventSource not available on this browser.")
}


