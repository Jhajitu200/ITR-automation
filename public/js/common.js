var prePayChosen = false;
function calculateEmi() {
    var a = parseInt($("input[name='tenure']").val().replace(/,/g, ""));
    var b = parseInt($("input[name='amount']").val().replace(/,/g, ""));
    var i = parseFloat($("input[name='interestRate']").val().replace(/,/g, ""));    
    var e = $("input[name='processingFee']").val();

    if(a != "" || a !=0 )
    {
        a = parseInt(a);
    }
    if (i != "" || i != 0) {
        i = parseFloat(i);
    }

    var k = i / 100;
    
    if (e != "") {
        e = parseFloat(e);
    }

    var g = calculateEmiValues(b, a, k, e);
    var f = Math.round(g * a - b);
    var j = Math.round((b / 100)*e);
    var d = b + f + j;
    $("#emiamount").html(getFormattedNumber(String(Math.round(g))));
    $("#emitotalinterest").html(getFormattedNumber(String(f)));
    $("#emitotalamount").html(getFormattedNumber(String(Math.round(b + f))));
    $("#processingFee").html(getFormattedNumber(String(j)));
    $("#loanAmountDetails").html(getFormattedNumber(String(b)));
    $("#tenureFee").html(convertMonthsToYear(a*12));
    $("#interestRate").html($("input[name='interestRate']").val() + "%");

    // 
    // $("#pieTotalAmount,#final-amt-without-prepay").html(getFormattedNumber(String(d)));
    // $("#prePayFee").html(getFormattedNumber($("input[name='prePayAmount']").val()));
    // $("#pieLoanAmount").html(getFormattedNumber(String(b)));

    return { loanAmount: b, processFee: j, interestFee: f, tenureValue: a, emiValue: g, interestRate: i };
}

function toIndianCurrency (num) {
    var result =  num.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    });

    return result;
};

function calculateEmiValues(a, c, e, d) {
    console.log(a, c, e, d);
    var b = a * e * (Math.pow(1 + e, c) / (Math.pow(1 + e, c) - 1));
    return b;
}
function getFormattedNumber(a) {
    var b = ("" + a).charAt(0) != "-" ? getFormattedPositiveNumber(a) : "-" + getFormattedPositiveNumber(-a);
    return b == "NaN" ? 0 : b;
}
function getFormattedPositiveNumber(d, f) {
    d = "" + d;
    d = d.replace(/,/g, "");
    d = getRoundedAmount(d);
    var b = d.split(".");
    d = b[0];
    var h = "";
    if (b.length == 2) {
        h = ".".concat(b[1]);
    }
    number = d;
    if (number.length > 3 && number.length <= 12) {
        var g = number.substring(number.length - 3, number.length);
        var a = number.substring(0, number.length - 3);
        var e = makeComma(a);
        e = e + "," + g;
        if (f == 1) {
            if (e.length > 11) {
                var j = e.substr(0, 11);
                var c = e.substr(j.length, e.length);
                returnString = j + "<br>" + c;
                return returnString;
            } else {
                return e + h;
            }
        } else {
            return e + h;
        }
    }
    return number + h;
}

function getRoundedAmount(e) {
    var a = 2;
    var d = e * Math.pow(10, a);
    var c = Math.round(d);
    var b = c / Math.pow(10, a);
    return b.toString();
}

function makeComma(a) {
    var c = 2;
    var b = $("#sector").val();
    if (typeof b !== "undefined" && b != "INDIA") {
        c = 3;
    }
    if (a.length <= c) {
        return a;
    }
    length1 = a.substr(0, a.length - c);
    formattedInput = makeComma(length1) + "," + a.substring(a.length - c, a.length);
    return formattedInput;
}

function convertMonthsToYear(a) {
    var b, c;
    var d;
    if (a != undefined) {
        b = Math.floor(a / 12);
        c = a % 12;
        if (c == 0) {
            d = b + getYearText(a);
        } else {
            if (b == 0) {
                d = c + getMonthText(a);
            } else {
                d = b + getYearText(a) + c + getMonthText(a);
            }
        }
    }
    return d;
}

function getYearText(b) {
    var a = Math.floor(b / 12);
    if (a < 2) {
        return " Year ";
    }
    return " Years ";
}

function getMonthText(a) {
    if (getRemainingMonths(a) <= 1) {
        return " Month ";
    }
    return " Months ";
}

function monToYrMon(a) {
    return a < 12 ? (parseInt(a) <= 1 ? a + " Month" : a + " Months") : a == 12 ? parseInt(a / 12) + "Yr" : parseInt(a / 12) + "." + parseInt(a % 12) + " Yrs";
}
function getYears(a) {
    return Math.floor(a / 12);
}
function getRemainingMonths(a) {
    return a % 12;
}
function drawRow(d, c, b) {
    var a = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var e = $('<tr class="collapse row' + b + '">');
    $("#amortTable").append(e);
    e.append($("<td>" + a[(c[0] - 1) % 12] + "</td>"));
    for (b = 1; b < c.length; b++) {
        e.append(getTableColumnForAmount(c[b]));
    }
}
function constructTable(j, d) {
    var m = 1;
    var e = d;
    var f = [];
    $("#amortTable > tbody").html("");
    var a = j.interestPaid;
    var g = j.principalPaid;
    var b = j.outstandingAmount;
    var k = prePayChosen == false ? f : j.prepaidAmount;
    drawYearRow(e, a[m - 1], g[m - 1], b[m - 1], m, k[m - 1]);
    for (var c = 1; c < j.chartData.length; c++) {
        if (j.chartData[c] != null) {
            if (j.chartData[c][0] % 12 == 0 && j.chartData[c][0] != j.chartData.length) {
                drawRow(e, j.chartData[c], m);
                m = m + 1;
                e = e + 1;
                drawYearRow(e, a[m - 1], g[m - 1], b[m - 1], m, k[m - 1]);
            } else {
                drawRow(e, j.chartData[c], m);
            }
        }
    }
}

function drawYearRow(e, f, c, a, b, g) {
    var d = $('<tr class="clickable amort-table" data-toggle="collapse" id="row' + b + '" data-target=".row' + b + '"/>');
    $("#amortTable").append(d);
    d.append($("<td><i class='glyphicon glyphicon-plus'></i>" + e + "</td>"));
    d.append(getTableColumnForAmount(c[1]));
    d.append(getTableColumnForAmount(f[1]));
    d.append(getTableColumnForAmount(c[1] + f[1]));
    d.append(getTableColumnForAmount(a[1]));
    if (prePayChosen == true) {
        d.append(getTableColumnForAmount(g[1]));
    }
}

function triggerAjax() {
    var c = new calculateEmi();
    var a = "amort_getEmiAmortDetails.html";
    var d = $("#emiForm").serialize();
    var b = $.parseJSON(
        $.ajax({
            cache: false,
            url: a,
            type: "post",
            global: false,
            async: false,
            dataType: "json",
            data: d + "&emiValue=" + c.emiValue + "&prePayChosen=" + prePayChosen,
            success: function (e) {
                return e;
            },
        }).responseText
    );
    return b;
}

function onAmortChartDataReceived(j) {
    var a = [];
    var g = [];
    var c = [];
    var f = [];
    var i = [];
    var b = $("#amort_chart_holder").width();
    var e = j.baseYear;
    a.push(e - 1);
    $.each(j.dataWithoutPrepay.outstandingAmount, function (k, m) {
        a.push(m[0]);
    });
    a.push(e + j.maxX);
    b = b / a.length;
    b = (b * 40) / 100;
    g = j.dataWithoutPrepay.principalPaid;
    c = j.dataWithoutPrepay.interestPaid;
    f = j.dataWithoutPrepay.outstandingAmount;
    if (prePayChosen == true) {
        i = j.dataWithPrepay.outstandingAmount;
    }
    var d = ["Principal", "Interest", "Bal with Pre-payment", "Bal without Pre-payment"];
    plot2 = $.jqplot("amort_chart_holder", [g, c, i, f], {
        stackSeries: true,
        seriesDefaults: { renderer: $.jqplot.BarRenderer, rendererOptions: { barMargin: 100 } },
        axes: {
            xaxis: {
                labelOptions: { textColor: "#ffffff" },
                ticks: a,
                tickOptions: {
                    textColor: "#ffffff",
                    showGridline: false,
                    formatString: "%d",
                    angle: 60,
                    formatter: function (m, k) {
                        if (k < j.baseYear || k >= j.baseYear + j.maxX) {
                            return "";
                        } else {
                            return k;
                        }
                    },
                },
            },
            y2axis: {
                tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                label: "EMI Payment/year",
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                labelOptions: { textColor: "#ffffff" },
                tickOptions: {
                    textColour: "#ffffff",
                    showGridline: false,
                    formatter: function (m, k) {
                        return "Rs." + getFormattedNumber(String(k));
                    },
                },
                useSeriesColor: "#fff",
                autoscale: true,
            },
            yaxis: {
                min: 0,
                labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
                textColor: "#ffffff",
                label: "Balance Amount",
                labelOptions: { textColor: "#ffffff" },
                autoscale: true,
                tickOptions: {
                    textColour: "#ffffff",
                    formatter: function (m, k) {
                        return "Rs." + getFormattedNumber(String(k));
                    },
                },
            },
        },
        highlighter: {
            show: true,
            showTooltip: true,
            tooltipAxes: "xy1y2",
            toltipLocation: "nw",
            tooltipContentEditor: function (o, m, k, n) {
                var p = n.data[m][k];
                return '<div class="jqplot-highlighter"><div class="dropdown-arrow"></div><div class="strong">Year: ' + p[0] + '</div><div class="year">' + d[m] + ":<br/>Rs." + getFormattedNumber(p[1]) + "</div></div>";
            },
        },
        series: [
            { disableStack: false, renderer: $.jqplot.BarRenderer, rendererOptions: { fillToZero: true, barWidth: b }, lineWidth: 2, color: "#f1a334", yaxis: "y2axis", padMin: 0, markerOptions: { size: 10 } },
            { disableStack: false, renderer: $.jqplot.BarRenderer, rendererOptions: { fillToZero: true, barWidth: b }, lineWidth: 2, color: "#02c8a5", yaxis: "y2axis", padMin: 0, pointLabels: { show: false }, markerOptions: { size: 10 } },
            { disableStack: true, renderer: $.jqplot.LineRenderer, lineWidth: 2, color: "#a66bbf", highlightMouseOver: true, highlightColors: "#a66bbf", pointLabels: { show: false }, markerOptions: { size: 10 } },
            { disableStack: true, renderer: $.jqplot.LineRenderer, lineWidth: 2, color: "red", highlightMouseOver: true, highlightColors: "red", pointLabels: { show: false }, markerOptions: { size: 10 } },
        ],
        axesDefaults: { tickRenderer: $.jqplot.CanvasAxisTickRenderer, rendererOptions: { textColour: "#ffffff" } },
    });
    if (prePayChosen == true) {
        updateSaveSection(j);
        constructTable(j.dataWithPrepay, e);
    } else {
        constructTable(j.dataWithoutPrepay, e);
    }
    flagForChartResize = true;
}

function calculateTDS () {
    let recipient = $('input[name="recipient"]:checked').val();
    let pan_of_recipient = $('input[name="pan_of_recipient"]:checked').val();
    let fy = $("#fy").find(":selected").val();
    let nature_of_payment = $("#nature_of_payment").find(':selected').val();
    let amount_of_payment = parseInt($("#amount_of_payment").val());
    var taxableTDS = 0;

    switch (nature_of_payment) {
      
      case '194BA - Income from online games':
        if(fy=='22-23'){
          taxableTDS = 0;
        }else{
          taxableTDS = (pan_of_recipient==="Yes" && amount_of_payment>0) ? ((amount_of_payment/100)*30) : ((amount_of_payment/100)*42.744);
        }
        break;

    case '194B - Income from lottery winnings, card games, crossword puzzles, and other games':
        if(fy=='22-23'){
            taxableTDS = amount_of_payment>10000 ? (amount_of_payment/100)*30 : 0;
        }else{
            taxableTDS = amount_of_payment>10000 ? (amount_of_payment/100)*30 : 0;
        }
    break;
    case '194BB- Income from horse race winnings':
        if(fy=='22-23'){
            taxableTDS = amount_of_payment>10000 ? (amount_of_payment/100)*30 : 0;
        }else{
            taxableTDS = amount_of_payment>10000 ? (amount_of_payment/100)*30 : 0;
        }
    break;
    case '193 - Interest on Securities':
        if(fy=='22-23'){
            if(recipient=="others" && pan_of_recipient=="Yes"){
                taxableTDS = (amount_of_payment/100)*10;
            }else if(recipient=="individuals" && pan_of_recipient=="Yes" && amount_of_payment>5000)
            { 
                taxableTDS = (amount_of_payment/100)*10;
            }else if(recipient=="individuals" && amount_of_payment<=5000){
                taxableTDS = 0;
            }else if(pan_of_recipient=="No"){
                taxableTDS = (amount_of_payment/100)*20;
            }
        }else{
            if(recipient=="others" && pan_of_recipient=="Yes"){
                taxableTDS = (amount_of_payment/100)*10;
            }else if(recipient=="individuals" && pan_of_recipient=="Yes" && amount_of_payment>5000){
                taxableTDS = (amount_of_payment/100)*10;
            }else if(recipient=="individuals" && amount_of_payment<=5000){
                taxableTDS = 0;
            }else if(pan_of_recipient=="No"){
                taxableTDS = (amount_of_payment/100)*20;
            }
        }
    break;
    case '194A - Interest from other sources':
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>5000){
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>5000){
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<=5000){
                taxableTDS = 0;
            }
        }else{
            if(pan_of_recipient=="Yes" && amount_of_payment>5000){
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>5000){
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<=5000){
                taxableTDS = 0;
            }
        }
    break;
    case '194C - Payment to Contractors / sub-contractors':
        if(fy=='22-23'){
            if(recipient=="individuals" && pan_of_recipient=="Yes" && amount_of_payment>30000){
                taxableTDS = (amount_of_payment/100)*1;
            }else if(recipient=="individuals" && pan_of_recipient=="No" && amount_of_payment>30000){
                taxableTDS = (amount_of_payment/100)*20;
            }else if(recipient=="others" && pan_of_recipient=="Yes" && amount_of_payment>30000){
                taxableTDS = (amount_of_payment/100)*2;
            }else if(recipient=="others" && pan_of_recipient=="No" && amount_of_payment>30000){
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<=30000){
                taxableTDS = 0;
            }
        }else{
            if(recipient=="individuals" && pan_of_recipient=="Yes" && amount_of_payment>30000){
                taxableTDS = (amount_of_payment/100)*1;
            }else if(recipient=="individuals" && pan_of_recipient=="No" && amount_of_payment>30000){
                taxableTDS = (amount_of_payment/100)*20;
            }else if(recipient=="others" && pan_of_recipient=="Yes" && amount_of_payment>30000){
                taxableTDS = (amount_of_payment/100)*2;
            }else if(recipient=="others" && pan_of_recipient=="No" && amount_of_payment>30000){
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<=30000){
                taxableTDS = 0;
            }
        }
    break;
    case '194A - Interest from banks/post office/co-operative society':
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>40000){
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>40000){
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<=40000){
                taxableTDS = 0;
            }
        }else{
            if(pan_of_recipient=="Yes" && amount_of_payment>40000){
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>40000){
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<=40000){
                taxableTDS = 0;
            }
        }
    break;
    case '194 - Dividend':
        if(fy=='22-23'){
            if(recipient=="others" && pan_of_recipient=="Yes"){
                taxableTDS = (amount_of_payment/100)*10;
            }else if(recipient=="individuals" && pan_of_recipient=="Yes" && amount_of_payment>5000){
                taxableTDS = (amount_of_payment/100)*10;
            }else if(recipient=="individuals" && amount_of_payment<=5000){
                taxableTDS = 0;
            }else if(pan_of_recipient=="No"){
                taxableTDS = (amount_of_payment/100)*20;
            }
        }else{
            if(recipient=="others" && pan_of_recipient=="Yes"){
                taxableTDS = (amount_of_payment/100)*10;
            }else if(recipient=="individuals" && pan_of_recipient=="Yes" && amount_of_payment>5000){
                taxableTDS = (amount_of_payment/100)*10;
            }else if(recipient=="individuals" && amount_of_payment<=5000){
                taxableTDS = 0;
            }else if(pan_of_recipient=="No"){
                taxableTDS = (amount_of_payment/100)*20;
            }
        }
    break;
    case '192A - Premature withdrawal from EPF':
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>=50000){
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>=50000){
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<50000){
                taxableTDS = 0;
            }
        }else{
            if(pan_of_recipient=="Yes" && amount_of_payment>=50000){
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>=50000){
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<50000){
                taxableTDS = 0;
            }
        }
    break;
    

      case '194D - Insurance Commission':
      if(fy=='22-23'){        
        if(recipient=="individuals" && pan_of_recipient=="Yes" && amount_of_payment>=15000){
          taxableTDS =  (amount_of_payment/100)*5;
        }else if(recipient=="individuals" && pan_of_recipient=="No" && amount_of_payment>=15000){
          taxableTDS = (amount_of_payment/100)*20;
        }else if(recipient == "others" && pan_of_recipient == "Yes" && amount_of_payment>=15000) {
          taxableTDS = (amount_of_payment/100)*10;
        }else if(recipient == "others" && pan_of_recipient == "No" && amount_of_payment>=15000)
        {
          taxableTDS =  (amount_of_payment/100)*20;
        }else if(amount_of_payment<15000)
        {
          taxableTDS = 0;
        }
      }else{
        if(recipient=="individuals" && pan_of_recipient=="Yes" && amount_of_payment>=15000){
          taxableTDS = (amount_of_payment/100)*5; 
        }else if(recipient=="individuals" && pan_of_recipient=="No" && amount_of_payment>=15000){
          taxableTDS = (amount_of_payment/100)*20;
        }else if(recipient=="others" && pan_of_recipient=="Yes" && amount_of_payment>=15000){
          taxableTDS = (amount_of_payment/100)*10;
        }else if(recipient=="others" && pan_of_recipient =="No" && amount_of_payment>=15000)
        { 
          taxableTDS = (amount_of_payment/100)*20;
        }
        else if(amount_of_payment<15000){
          taxableTDS =  0;
        }
      }
      break;

    case '194DA - TDS on payment against life insurance policy.':
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>100000){
                taxableTDS = (amount_of_payment/100)*5;
            }else if(pan_of_recipient=="No" && amount_of_payment>100000){
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<=100000){
                taxableTDS = 0;
            }
        }else{
            if(pan_of_recipient=="Yes" &&amount_of_payment>100000){
                taxableTDS = (amount_of_payment/100)*5;
            }else if(pan_of_recipient=="No" && amount_of_payment>100000){
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<=100000)
            {
                taxableTDS = 0;
            }
        }
    break;  

      case '194E - Payment to non-resident sportsmen / sports association':
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>0){
                taxableTDS = (amount_of_payment/100)*20;
            }else if(pan_of_recipient=="No" && amount_of_payment>0){
                taxableTDS = (amount_of_payment/100)*30;
            }
        }else{
            if(pan_of_recipient=="Yes" && amount_of_payment>0){ 
                taxableTDS = (amount_of_payment/100)*20;
             }else if(pan_of_recipient=="No" && amount_of_payment>0){
                taxableTDS = (amount_of_payment/100)*30;
             }
        }
    break;

    case '194EE - TDS on payment of amount standing to the credit of a person under National Savings Scheme (NSS)':
        if(fy=='22-23'){
            if( recipient=="individuals" && pan_of_recipient=="Yes" && amount_of_payment>=2500){ 
                taxableTDS = (amount_of_payment/100)*10;
            }else if(recipient=="individuals" && pan_of_recipient=="No" && amount_of_payment>=2500){
                taxableTDS = (amount_of_payment/100)*20;
            }else if(recipient=="others" || amount_of_payment<=2500){
                taxableTDS = (amount_of_payment/100*0);
            }
        }else{
            if( recipient=="individuals" && pan_of_recipient=="Yes" && amount_of_payment>=2500){ 
                taxableTDS = (amount_of_payment/100)*10;
            }else if(recipient=="individuals" && pan_of_recipient=="No" && amount_of_payment>=2500){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(recipient=="others" || amount_of_payment<=2500){
                taxableTDS = (amount_of_payment/100)*0;
            }
        }
    break;

    case '194F - TDS on payment for the repurchase of the unit by Unit Trust of India (UTI) or a Mutual Fund':
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>0){
                taxableTDS = (amount_of_payment/100)*20;
            }else if(pan_of_recipient=="No" && amount_of_payment>0){ 
                taxableTDS = (amount_of_payment/100)*30;
            }
        }else{
            if(pan_of_recipient=="Yes" && amount_of_payment>0){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(pan_of_recipient=="No" && amount_of_payment>0){ 
                taxableTDS = (amount_of_payment/100)*30;
            }
        }
    break;

    case '194G - TDS on Payments, commission, etc., on the sale of lottery tickets':
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>15000){ 
                taxableTDS = (amount_of_payment/100)*5;
            }else if(pan_of_recipient=="No" && amount_of_payment>15000){ 
                taxableTDS = (amount_of_payment/100)*20;
            } else if(amount_of_payment<=15000) { 
                taxableTDS = 0;
            }
        }else{
            if(pan_of_recipient=="Yes" && amount_of_payment>15000){ 
                taxableTDS = (amount_of_payment/100)*5;
             } else if(pan_of_recipient=="No" && amount_of_payment>15000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<=15000){
                taxableTDS = 0;
            }
        }
    break;

    case '194H - TDS on Commission or brokerage':
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>15000){ 
                taxableTDS = (amount_of_payment/100)*5;
            }else if(pan_of_recipient=="No" && amount_of_payment>15000){ 
                taxableTDS = (amount_of_payment/100)*20;
             }else if(amount_of_payment<=15000){
                taxableTDS = 0;
             }
        }else{
            if(pan_of_recipient=="Yes" && amount_of_payment>15000){ 
                taxableTDS = (amount_of_payment/100)*5;
             }else if(pan_of_recipient=="No" && amount_of_payment>15000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<=15000){
                taxableTDS = 0;
            }
        }
    break;

    case '194I - TDS on Rent on Plant and machinery':
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>240000){ 
                taxableTDS = (amount_of_payment/100)*2;
            }else if(pan_of_recipient=="No" && amount_of_payment>240000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<=240000){
                taxableTDS = 0;
            }
        }else{
            if(pan_of_recipient=="Yes" && amount_of_payment>240000){ 
                taxableTDS = (amount_of_payment/100)*2;
            }else if(pan_of_recipient=="No" && amount_of_payment>240000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<=240000){
                taxableTDS = 0;
            }
        }
    break;

    case '194I - TDS on Rent on land or building or furniture or fittings':
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>240000){ 
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>240000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<=240000){
                taxableTDS = 0;
            }
        }else{
            if(pan_of_recipient=="Yes" && amount_of_payment>240000){ 
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>240000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<=240000){
                taxableTDS = 0;
            }
        }
    break;
      
    case '194IA - Payment in consideration of transfer of certain immovable property other than agricultural land.':
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>=5000000){ 
                taxableTDS = (amount_of_payment/100)*1;
            }else if(pan_of_recipient=="No" && amount_of_payment>=5000000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<5000000){
                taxableTDS = 0;
            }
        }else{
            if(pan_of_recipient=="Yes" && amount_of_payment>=5000000){ 
                taxableTDS = (amount_of_payment/100)*1;
            }else if(pan_of_recipient=="No" && amount_of_payment>=5000000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<5000000){
                taxableTDS = 0;
            }
        }
    break;

    case '194IB - Rent payment by an individual or HUF on whom Tax Audit not Apply':
        if(fy=='22-23'){
            if(recipient=="individuals" && pan_of_recipient=="Yes" && amount_of_payment>600000){ 
                taxableTDS = (amount_of_payment/100)*5;
                console.log(taxableTDS)
            }else if(recipient=="individuals" && pan_of_recipient=="No" && amount_of_payment>600000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(recipient=="others" || amount_of_payment<=600000){ 
                taxableTDS = (amount_of_payment/100)*0;
            }
        }else{
            if(recipient=="individuals" && pan_of_recipient=="Yes" && amount_of_payment>600000){ 
                taxableTDS = (amount_of_payment/100)*5;
            }else if(recipient=="individuals" && pan_of_recipient=="No" && amount_of_payment>600000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(recipient=="others" || amount_of_payment<=600000){ 
                taxableTDS = (amount_of_payment/100)*0;
            }
        }
    break;

    case '194J - Any sum paid by way of fee for professional services':
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<30000){
                taxableTDS = 0;
            }
        }else{
            if(pan_of_recipient=="Yes" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<30000){
                taxableTDS = 0;
            }
        }
    break;

    case '194J - Any sum paid by way of remuneration/fee/commission to a director':
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<30000){
                taxableTDS = 0;
            }
        }else{
            if(pan_of_recipient=="Yes" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<30000){
                taxableTDS = 0;
            }
        }
    break;

    case '194J - Any sum paid for not carrying out any activity concerning any business or any other sum':
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<30000){
                taxableTDS = 0;
            }
        }else{
            if(pan_of_recipient=="Yes" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<30000){
                taxableTDS = 0;
            }
        }
    break;

    case '194J - Any sum paid as a fee for technical services':
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*2;
            }else if(pan_of_recipient=="No" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<30000){
                taxableTDS = 0;
            }
        }else{
            if(pan_of_recipient=="Yes" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<30000){
                taxableTDS = 0;
            }
        }
    break;

    case '194J - Any sum paid by way of royalty towards the sale or distribution, or exhibition of cinematographic films':
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*2;
            }else if(pan_of_recipient=="No" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<30000){
                taxableTDS = 0;
            }
        }else{
            if(pan_of_recipient=="Yes" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<30000){
                taxableTDS = 0;
            }
        }
    break;

    case '194J - Any sum paid as fees for technical services, but the payee is engaged in the business of call center.':
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*2;
            }else if(pan_of_recipient=="No" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<30000){
                taxableTDS = 0;
            }
        }else{
            if(pan_of_recipient=="Yes" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>=30000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<30000){
                taxableTDS = 0;
            }
        }
    break;
    
    case '194K - Payment of any income for units of a mutual fund, for example, dividend':
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>=5000){ 
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>=5000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<5000){
                taxableTDS = 0;
            }
        }else{
            if(pan_of_recipient=="Yes" && amount_of_payment>=5000){ 
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>=5000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<5000){
                taxableTDS = 0;
            }
        }
    break;

    case '194LA - Payment in respect of compensation on acquiring certain immovable property':
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>=250000){ 
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>=250000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<250000){
                taxableTDS = 0;
            }
        }else{
            if(pan_of_recipient=="Yes" && amount_of_payment>=250000){ 
                taxableTDS = (amount_of_payment/100)*10;
            }else if(pan_of_recipient=="No" && amount_of_payment>=250000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(amount_of_payment<250000){
                taxableTDS = 0;
            }
        }
    break;

    case  '194M - Certain payments by Individual/HUF not liable to deduct TDS under Section 194C, 194H, and 194J':
        if(fy=='22-23'){
            if(recipient=="individuals" && pan_of_recipient=="Yes" && amount_of_payment>5000000){ 
                taxableTDS = (amount_of_payment/100)*5;
            }else if(recipient=="individuals" && pan_of_recipient=="No" && amount_of_payment>5000000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(recipient=="others" || amount_of_payment<=5000000){ 
                taxableTDS = (amount_of_payment/100)*0;
            }
        }else{
            if( recipient=="individuals" && pan_of_recipient=="Yes" && amount_of_payment>5000000){ 
                taxableTDS = (amount_of_payment/100)*5;
            }else if(recipient=="individuals" && pan_of_recipient=="No" && amount_of_payment>5000000){ 
                taxableTDS = (amount_of_payment/100)*20;
            }else if(recipient=="others" || amount_of_payment<=5000000){ 
                taxableTDS = (amount_of_payment/100)*0;
            }
        }
    break;

    case '194O - Payment for the sale of goods or provision of services by the e-commerce operator through its digital or electronic facility or platform.':        
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>500000){ 
                taxableTDS = (amount_of_payment/100)*1;
            }else if(pan_of_recipient=="No" && amount_of_payment>500000){ 
                taxableTDS = (amount_of_payment/100)*5;
            }else if(amount_of_payment<=500000){
                taxableTDS = 0;
            }
        }else{
            if(pan_of_recipient=="Yes" && amount_of_payment>500000){ 
                taxableTDS = (amount_of_payment/100)*1;
            }else if(pan_of_recipient=="No" && amount_of_payment>500000){ 
                taxableTDS = (amount_of_payment/100)*5;
            }else if(amount_of_payment<=500000){
                taxableTDS = 0;
            }
        }
    break;

    case '194Q - Payments for the purchase of goods':
        if(fy=='22-23'){
            if(pan_of_recipient=="Yes" && amount_of_payment>5000000){
                taxableTDS = ((amount_of_payment-5000000)/100)*0.1;
            }else if(pan_of_recipient=="No" && amount_of_payment>5000000){
                taxableTDS = ((amount_of_payment-5000000)/100)*5;
            }else if(amount_of_payment<=5000000){
                taxableTDS = 0;
            }
        }else{
            if(pan_of_recipient=="Yes" && amount_of_payment>5000000){
                taxableTDS = ((amount_of_payment-5000000)/100)*0.1;
            }else if(pan_of_recipient=="No" && amount_of_payment>5000000){
                taxableTDS = ((amount_of_payment-5000000) /100)*5;
            }else if(amount_of_payment<=5000000){
                taxableTDS = 0;
            }
        }    
    break;

    default:
        taxableTDS = 0;

    }

    $("#TDS").html('<span>'+toIndianCurrency(Math.round(taxableTDS,2))+'</span>')               
  }