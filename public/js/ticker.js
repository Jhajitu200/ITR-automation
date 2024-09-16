var tickerList = $('#tickers');


        $.each(tickers, function (i, item) {
            tickerList.append('<li>' + item.key + '</li>');
        });


        var tickerWidth = tickerList.width();

        function tick() {
            tickerList.animate({ marginLeft: '-=1' }, 10, 'linear', function () {
                if (Math.abs(parseInt($(this).css('margin-left'))) >= tickerWidth) {
                    $(this).css('margin-left', 0);
                }
            });
        }


        function startTicker() {
            tick();
            requestAnimationFrame(startTicker);
        }


        startTicker();