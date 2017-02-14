(function() {
    "use strict";
    $(document).ready(function() {
        const app = {
            cards: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16],

            init: function() {
                app.shuffle();
            },

            shuffle: function() { // shuffle cards
                let random = 0;
                let temp = 0;
                for (let i = 1; i < app.cards.length; i++) {
                    random = Math.round(Math.random() * i);
                    temp = app.cards[i];
                    app.cards[i] = app.cards[random];
                    app.cards[random] = temp;
                }
                // console.log(app.cards);
                app.assignCards();
            },

            assignCards: function() { // assign cards
                $('.card').each(function(index) {
                    $(this).attr('data-card-value', app.cards[index]);
                });
                app.bindEvents();
            },

            bindEvents: function() { // bind events
                $('.card').on('click', function() {
                    $(this).html('<p>' + $(this).data('cardValue') + '</p>').addClass('selected');
                    app.checkMatch();
                });
            },

            checkMatch: function() { // check for a match
                if ($('.selected').length === 2) {
                    if ($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) {
                        $('.selected').each(function() {
                            $(this).animate({
                                opacity: 0
                            }).removeClass('unmatched');
                        });
                        $('.selected').each(function() {
                            $(this).removeClass('selected');
                        });
                        app.checkWin();
                    } else {
                        setTimeout(function() {
                            $('.selected').each(function() {
                                $(this).html('').removeClass('selected');
                            });
                        }, 500);
                    }
                }
            },


            checkWin: function() { // check for win
                if ($('.unmatched').length === 0) {
                    $('.container').html('<h1>Congratulations!</h1>');
                    window.reload();
                }
            }
        };

        app.init();

        function displayTime() { // display current time
            const timeSpan = document.querySelector('.timer');
            let time = new Date();
            let currentTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
            timeSpan.innerHTML = currentTime;
        }

        setInterval(displayTime, 1000);
    });
})();
