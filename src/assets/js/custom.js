(function($) {
    'use strict';

    var Custom = {
        init: function() {
            this.errorPageMovingGradient();
            this.triggerNewsletter();
            this.scheduleSelector();
        },

        warningModal: function() {
            var el = $('.modal-alert-warning');
            if (!el.length) return;
            el.on('click', function() {
                swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonClass: 'btn btn-warning',
                    confirmButtonText: 'Yes, delete it!'
                }).then(function() {
                    swal({
                        title: 'Deleted!',
                        text: 'Your file has been deleted.',
                        type: 'success',
                        confirmButtonClass: 'btn btn-success'
                    });
                });
            });
        },

        getStyle: function(el, prop) {
            return window.getComputedStyle(el).getPropertyValue(prop);
        },

        elementInViewport: function(el) {
            var rect = el.getBoundingClientRect(),
                vWidth = window.innerWidth || doc.documentElement.clientWidth,
                vHeight = window.innerHeight || doc.documentElement.clientHeight,
                efp = function(x, y) {
                    return document.elementFromPoint(x, y)
                };

            // Return false if it's not in the viewport
            if (rect.right < 0 || rect.bottom < 0 ||
                rect.left > vWidth || rect.top > vHeight)
                return false;

            // Return true if any of its four corners are visible
            return (
                el.contains(efp(rect.left, rect.top)) ||
                el.contains(efp(rect.right, rect.top)) ||
                el.contains(efp(rect.right, rect.bottom)) ||
                el.contains(efp(rect.left, rect.bottom))
            );
        },

        errorPageMovingGradient: function() {
            var els = document.getElementsByClassName('error-title');
            if (els === null || els.length === 0) return;
            _.each(els, function(title) {
                var gradientObj = {
                    angle: 0,

                    c1r: 244,
                    c1g: 41,
                    c1b: 88,
                    c2r: 227,
                    c2g: 67,
                    c2b: 42,
                };

                var updateFunc = function() {
                    var gO = gradientObj;
                    var c1 = 'rgb(' + gO.c1r + ', ' + gO.c1g + ', ' + gO.c1b + ')';
                    var c2 = 'rgb(' + gO.c2r + ', ' + gO.c2g + ', ' + gO.c2b + ')';
                    title.style.backgroundImage = 'linear-gradient(' + gradientObj.angle + 'deg,' +
                        c1 + ', ' + c2 + ')';
                };

                var animateTitleTimeline = anime.timeline({
                    loop: true,
                });

                animateTitleTimeline
                    .add({
                        targets: gradientObj,
                        angle: 180,
                        c1r: 226,
                        c1g: 159,
                        c1b: 43,
                        c2r: 227,
                        c2g: 67,
                        c2b: 42,
                        duration: 4000,
                        easing: 'linear',
                        update: updateFunc,
                    })

                    .add({
                        targets: gradientObj,
                        angle: 360,
                        c1r: 244,
                        c1g: 41,
                        c1b: 88,
                        c2r: 227,
                        c2g: 67,
                        c2b: 42,
                        duration: 4000,
                        easing: 'linear',
                        update: updateFunc,
                    })
            });
        },

        triggerNewsletter: function() {
            var $els = $('#newsletter-modal');
            if ($els.length === 0) return;
            var bool = {
                'true': true,
                'false': false,
            };
            $els.each(function() {
                var $this = $(this);
                var disableNLForever = Cookies.get('disable_newsletter_forever');
                var disableNL = Cookies.get('disable_newsletter');
                var checkbox = $this.find('#disable_newsletter_forever')[0];

                if (disableNLForever === undefined) {
                    Cookies.set('disable_newsletter_forever', false, {
                        expires: 365
                    });
                    disableNLForever = Cookies.get('disable_newsletter_forever');
                }

                if (disableNL === undefined) {
                    Cookies.set('disable_newsletter', false, {
                        expires: 1
                    });
                    disableNL = Cookies.get('disable_newsletter_forever');
                }

                disableNLForever = bool[disableNLForever];
                disableNL = bool[disableNL];

                if (disableNLForever === true) {
                    disableNL = true;
                    Cookies.set('disable_newsletter', true, {
                        expires: 1
                    });
                }

                if (disableNL === false) {
                    Pace.on('done', function() {
                        $this.modal('show');
                    });
                    $this.on('hide.bs.modal', function(e) {
                        if (checkbox.checked) {
                            Cookies.set('disable_newsletter_forever', true, {
                                expires: 365
                            });
                        }
                        Cookies.set('disable_newsletter', true, {
                            expires: 1
                        });
                    });
                }
            });
        },

        scheduleSelector: function() {
            var scheduleSelectors = document.getElementsByClassName('schedule-selector');
            if (scheduleSelectors === null && scheduleSelectors.length === 0) return;
            _.each(scheduleSelectors, function(scheduleSelector) {
                var target = document.querySelector(scheduleSelector.dataset.target);
                if (target === null) return;

                var hideShowContent = function() {
                    var value = scheduleSelector.value;
                    var categories = target.querySelectorAll('[data-schedule-category]');
                    if (value === 'all') {
                        _.each(categories, function(category) {
                            category.classList.remove('invisible');
                        });
                    } else {
                        _.each(categories, function(category) {
                            if (category.dataset.scheduleCategory === value)
                                category.classList.remove('invisible');
                            else
                                category.classList.add('invisible');
                        });
                    }
                };

                scheduleSelector.addEventListener('change', hideShowContent);
                hideShowContent();
            });
        },
    };

    $(document).ready(function() {
        Custom.init();
    });

})(jQuery);