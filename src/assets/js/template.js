(function($) {
    'use strict';

    var Unifato = {
        init: function() {
            this.header();
            this.sidebar();
            this.content();
            this.enablePlugins();
        },

        enablePlugins: function() {
            this.enablePace();
            this.slickSlider();
            this.shareBlogposts();
            this.magnificPopup();
            this.enableSticky();
            this.enableCountdown();
            this.enableCountup();
        },

        header: function() {
            this.enableMenuSearch();
            this.enableShoppingWidget();
            this.menuToggler();
        },

        sidebar: function() {},

        content: function() {
            this.inputFocus();
            this.enableSidebar();
            this.enableSidebarToggle();
            this.enableScrollToElement();
            this.enableBlogSocialWidget();
            this.enableSliderWidget();
            this.enableShopSingleTabs();
            this.enableShopPriceRangeSlider();
            // this.enableSocialWidgetCounters();
        },

        enablePace: function() {
            // Pace.on('done', function() {
            //   $(document).trigger('PACE_DONE');
            // });
        },

        slickSlider: function() {
            var $containers = $('.slick-container');

            if (!$containers.length) return;

            var defaults = {
                arrows: true,
                speed: 1000,
                infinite: true,
                prevArrow: "<a href='javascript: void(0);' class='slick-arrow-left'></a>",
                nextArrow: "<a href='javascript: void(0);' class='slick-arrow-right'></a>",
                focusOnSelect: true,
            };

            $containers.each(function() {
                var $container = $(this);
                var $sliders = $container.find('.slick-slider, .slick-slider-nav');

                $sliders.each(function() {
                    var $slider = $(this);
                    var options = $slider.data('slick');
                    if (options === undefined || options === null) options = {};
                    options = $.extend({}, defaults, options);
                    if ($slider.data('navTarget') !== undefined && $slider.data('navTarget').length) {
                        options.asNavFor = $($slider.data('navTarget'));
                    }
                    var instance = $slider.slick(options);

                    //////
                    // Adding slider instance to object
                    //////
                    if (this.unifato === undefined) this.unifato = {};
                    this.unifato.slick = {};
                    this.unifato.slick.instance = instance;

                    //////
                    // Adding animation to slider caption
                    //////
                    var addAnimation = function($el) {
                        var anim = $el.data('animation-in');

                        if ($el.data('animation-in-delay'))
                            $el[0].style.animationDelay = $el.data('animation-in-delay');

                        if ($el.data('animation-in-duration'))
                            $el[0].style.animationDuration = $el.data('animation-in-duration');

                        $el[0].classList.add(anim);
                        $el[0].classList.add('animated');
                    }

                    var animateCaptions = function($slider, currentSlide, nextSlide) {
                        var $slickTrack = $($slider.find('.slick-track'));
                        var $nextSlide = $($slickTrack[0].children[nextSlide]);
                        var $currentSlide = $($slickTrack[0].children[currentSlide]);

                        var $nextSlideAnimElements = $nextSlide.find('[data-animation-in]');
                        $nextSlideAnimElements.each(function() {
                            addAnimation($(this));
                        });

                        var $curSlideAnimElements = $currentSlide.find('[data-animation-in]');
                        $curSlideAnimElements.each(function() {
                            var $el = $(this);
                            var anim = $el.data('animation-in');

                            if ($el.data('animation-in-delay')) this.style.animationDelay = null;
                            if ($el.data('animation-in-duration')) this.style.animationDuration = null;

                            this.classList.remove(anim);
                            this.classList.remove('animated');
                        });
                    };

                    //////
                    // Change body class according to slider
                    //////
                    var changeHeaderSkin = function($slider, nextSlide) {
                        var slide = $slider[0].getElementsByClassName('slider-item')[nextSlide];
                        var headerStyle = slide.dataset.setHeaderSkin;
                        if (headerStyle === undefined) return;
                        document.body.dataset.headerSkin = headerStyle;
                    };

                    $slider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
                        changeHeaderSkin($slider, nextSlide);
                        animateCaptions($slider, currentSlide, nextSlide);
                    });

                    changeHeaderSkin($slider, 0);

                    // Animate the slide on script load
                    var $currentSlideAnimeElements = $slider.find('.slick-track .slider-item:first [data-animation-in]');
                    $currentSlideAnimeElements.each(function() {
                        addAnimation($(this));
                    });

                    //////
                    // Slider Controls
                    //////
                    var $nav = $container.find('.slick-slider-controls');
                    if ($nav.length) {

                        // Left Button
                        var $left = $nav.find('.slick-slider-left');
                        if ($left.length) {
                            $left.on('click', function() {
                                $slider.slick('slickPrev');
                            });
                        }

                        // Right Button
                        var $right = $nav.find('.slick-slider-right');
                        if ($right.length) {
                            $right.on('click', function() {
                                $slider.slick('slickNext');
                            });
                        }
                    }
                });
            });
        },

        shareBlogposts: function() {
            var $shareLinksContainer = $('.share-links');
            if (!$shareLinksContainer.length) return;

            $shareLinksContainer.each(function() {
                var $shareLinks = $(this);
                var $toggleLink = $shareLinks.find('.entry-share-link');
                var $socialList = $shareLinks.find('.social-list');
                $toggleLink.on('click', function() {
                    $socialList.toggleClass('d-block');
                });

                $(document).on('click', function(e) {
                    var $shareLinksParent = $(e.target).closest('.share-links');
                    if ($socialList.hasClass('d-block')) {
                        if ($shareLinksParent.length === 0 ||
                            $shareLinksParent[0] !== $shareLinks[0]) {
                            $socialList.removeClass('d-block');
                        }
                    }
                });

            });
        },

        magnificPopup: function() {
            var $popup = $('.popup-youtube, .popup-vimeo, .popup-gmaps');
            if (!$popup.length) return;

            $popup.magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        },

        enableTodo: function() {
            var el = document.getElementsByClassName('todo-widget');
            if (!el.length) return;
            for (var i = 0; i < el.length; i++) {
                var todo1 = new Todo(el[i]);
            }
        },

        enableMenuSearch: function() {
            var el = document.getElementsByClassName('menu-search-trigger');
            if (!el.length) return;
            for (var i = 0; i < el.length; i++) {
                var menuSearchTrigger = el[i];
                var menuSearch = menuSearchTrigger.parentNode.getElementsByClassName('menu-search')[0];
                var menuSearchBackdrop = menuSearch.getElementsByClassName('menu-search-backdrop')[0];
                var menuSearchCloseBtn = menuSearch.getElementsByClassName('menu-search-close')[0];

                var menuSearchOpen = function(menuSearch) {
                    menuSearch.classList.add('menu-search-active');
                    var input = menuSearch.getElementsByTagName('input')[0];
                    input.focus();
                };

                var menuSearchClose = function(menuSearch) {
                    menuSearch.classList.remove('menu-search-active');
                };

                menuSearchTrigger.addEventListener('click', function() {
                    menuSearchOpen(menuSearch);
                });

                document.addEventListener('keydown', function(e) {
                    if (e.keyCode === 27) {
                        if (menuSearch.classList.contains('menu-search-active')) {
                            menuSearchClose(menuSearch);
                        }
                    }
                });

                menuSearchBackdrop.addEventListener('click', function() {
                    menuSearchClose(menuSearch);
                });

                menuSearchCloseBtn.addEventListener('click', function() {
                    menuSearchClose(menuSearch);
                });
            }
        },

        enableShoppingWidget: function() {
            var $el = $('.product_list_widget');
            if (!$el.length) return;
            $el.each(function() {
                var $productList = $(this);
                var $miniCartView = $productList.closest('.mini-cart-view');
                var $menuItem = $productList.closest('.menu-item');
                var $removeBtn = $productList.find('.btn-remove');
                $removeBtn.on('click', function() {
                    var $list = $(this).closest('li');
                    $list.remove();

                    var lists = $productList.find('li');
                    if (!lists.length) $miniCartView.addClass('product_list_empty');
                    $menuItem.find('.items-counter').html(lists.length);
                });
            });
        },

        menuToggler: function() {
            var $el = $('.menu-toggler');
            $el.each(function() {
                var $toggle = $(this);
                var $target = $($toggle.data('target'));
                $toggle.on('click', function() {
                    $target.toggleClass('menu-toggle-active');
                    document.body.classList.toggle('menu-overlay-active');
                });

                var closeMenu = function($target) {
                    $target.removeClass('menu-toggle-active');
                    document.body.classList.remove('menu-overlay-active');
                }

                // Remove Button append
                var removeBtn = document.createElement('button');
                var icon = document.createElement('i');
                icon.className = 'feather-x';
                removeBtn.appendChild(icon);
                removeBtn.className = 'remove-btn btn btn-outline-light btn-circle text-primary btn-sm';
                removeBtn.addEventListener('click', function() {
                    closeMenu($target);
                });
                $target.prepend(removeBtn);
                // Remove Button end

                // Backdrop Append
                var backdropSearch = document.getElementsByClassName('menu-toggle-backdrop');
                if (!backdropSearch.length) {
                    var backdrop = document.createElement('div');
                    backdrop.className = 'menu-toggle-backdrop';
                    $target[0].parentNode.append(backdrop);
                    backdrop.addEventListener('click', function() {
                        closeMenu($target);
                    });
                }
                // End Backdrop

                var $menuHasChild = $target.find('.menu-item-has-children');
                $menuHasChild.each(function() {
                    var $menu = $(this);
                    var $submenu = $menu.find('> .sub-menu');
                    var $link = $menu.find('> a');
                    $link.on('click', function(e) {
                        $submenu.toggleClass('open-submenu');
                        e.preventDefault();
                    });
                });
            });
        },

        enableSticky: function() {
            var $el = $('.sticky-wrapper');
            if (!$el.length) return;
            var defaults = {
                useStickyClasses: true
            };
            $el.each(function() {
                var $sticky = $(this);
                var options = $sticky.data('plugin-options');
                options = $.extend({}, defaults, options);
                stickybits($sticky[0], options);

                // Workaround for firefox bug
                var posY = window.pageYOffset;
                var posX = window.pageXOffset;
                window.scrollTo(posY, window.pageYOffset - 1);
                window.scrollTo(posY, window.pageYOffset);
            });
        },

        enableCountdown: function() {
            var $el = $('.countdown');
            if (!$el.length) return;
            var defaults = {
                contentFormat: '%-D day%!D %H:%M:%S',
            };
            $el.each(function() {
                var $this = $(this);
                var options = $this.data('plugin-options');
                var $content = $this.find('.countdown-content');
                if ($content.html().length)
                    options.contentFormat = $content.html();
                $content.html('');
                options = $.extend({}, defaults, options);
                var instance = $this.countdown(options.finalDate, options);
                instance.on('update.countdown', function(e) {
                    if (e.elapsed) $this[0].dataset.status = 'elapsed';
                    $content.html(e.strftime(options.contentFormat));
                });
                if ($this.find('.countdown-completed-content').length) {
                    instance.on('finish.countdown', function(e) {
                        $this[0].dataset.status = 'finished';
                    });
                }

                $this[0].dataset.status = 'active';
                if (this.template === undefined) this.template = {};
                this.template.countdown = instance;
            });
        },

        inputFocus: function() {
            var el = $('input:not([type=checkbox]):not([type=radio]), textarea');
            if (!el.length) return;

            el.each(function() {
                var $this = $(this),
                    self = this;

                var hasValueFunction = function() {
                    if (self.value.length > 0) {
                        self.parentNode.classList.add('input-has-value');
                        $(self).closest('.form-group').addClass('input-has-value');
                    } else {
                        self.parentNode.classList.remove('input-has-value');
                        $(self).closest('.form-group').removeClass('input-has-value');
                    }
                };

                hasValueFunction(this);
                $this.on('input', hasValueFunction);

                $this.focusin(function() {
                    this.parentNode.classList.add('input-focused');
                    $this.closest('.form-group').addClass('input-focused');
                });
                $this.focusout(function() {
                    this.parentNode.classList.remove('input-focused');
                    $this.closest('.form-group').removeClass('input-focused');
                });

                $this.find('.remove-focus').on('click', function() {
                    $this.emit('focusout');
                });
            });
        },

        enableSidebar: function() {
            var sidebars = document.getElementsByClassName('sidebar');
            if (sidebars === null) return;
            try {
                _.map(sidebars, function(sidebar) {
                    if (sidebar.template === undefined) sidebar.template = {};

                    sidebar.template.closeSidebar = function() {
                        sidebar.dataset.templateOpen = 'false';
                        var event = document.createEvent('CustomEvent');
                        event.initCustomEvent('template.sidebar.close');
                        sidebar.dispatchEvent(event);
                    };

                    sidebar.template.openSidebar = function() {
                        sidebar.dataset.templateOpen = 'true';
                        var event = document.createEvent('CustomEvent');
                        event.initCustomEvent('template.sidebar.open');
                        sidebar.dispatchEvent(event);
                    };

                    sidebar.template.toggleSidebar = function() {
                        var a = {
                            'true': true,
                            'false': false
                        };

                        if (a[sidebar.dataset.templateOpen])
                            sidebar.tempate.closeSidebar()
                        else
                            sidebar.template.openSidebar()
                    };

                    //////
                    // Close sidebar when clicked outside sidebar
                    //////
                    document.addEventListener('click', function(e) {
                        if (e.target === sidebar && sidebar.dataset.templateOpen === 'true') {
                            sidebar.template.closeSidebar()
                        }
                    });

                    //////
                    // Close sidebar when 'esc' key pressed
                    //////
                    document.addEventListener('keydown', function(e) {
                        if (e.keyCode === 27 && sidebar.dataset.templateOpen === 'true') {
                            sidebar.template.closeSidebar()
                        }
                    });

                    var closeBtns = sidebar.getElementsByClassName('close');
                    _.map(closeBtns, function(closeBtn) {
                        closeBtn.addEventListener('click', function() {
                            sidebar.template.closeSidebar();
                        })
                    });

                    //////
                    // Menu in sidebar
                    //////
                    var menus = sidebar.getElementsByClassName('menu');
                    _.map(menus, function(menu) {
                        var menusWithSubmenu = menu.getElementsByClassName('menu-item-has-children');
                        _.map(menusWithSubmenu, function(menuWithSubmenu) {
                            var submenu = menuWithSubmenu.querySelector(':scope > .sub-menu');
                            var link = menuWithSubmenu.querySelector(':scope > a');
                            link.addEventListener('click', function() {
                                menuWithSubmenu.classList.toggle('open');
                            });
                        });
                    });

                });
            } catch (e) {
                console.error(e);
            }
        },

        enableSidebarToggle: function() {
            var toggles = document.getElementsByClassName('sidebar-toggle');
            if (toggles === null) return;
            try {
                _.map(toggles, function(toggle) {
                    var trigger = toggle.dataset.templateSidebarTrigger;
                    if (trigger === undefined)
                        throw 'You have not set trigger element in [data-template-sidebar-toggle]';
                    var sidebarTarget = document.querySelector(trigger);
                    if (sidebarTarget === undefined)
                        throw 'No target found for [data-template-sidebar-toggle]';
                    toggle.addEventListener('click', function() {
                        sidebarTarget.template.toggleSidebar();
                    });

                    sidebarTarget.addEventListener('template.sidebar.open', function() {
                        toggle.dataset.templateOpen = 'true';
                    });

                    sidebarTarget.addEventListener('template.sidebar.close', function() {
                        toggle.dataset.templateOpen = 'close';
                    });
                });
            } catch (e) {
                console.error(e);
            }
        },

        enableScrollToElement: function() {
            var els = document.getElementsByClassName('scroll-to-element');
            if (els === null) return;

            var duration = 300;

            _.map(els, function(el) {
                try {
                    var target = el.dataset.scrollTo;
                    if (target === undefined)
                        throw 'Target is not defined for [data-scroll-to]';
                    var targetElem = document.querySelector(target);
                    if (targetElem === null)
                        throw 'Target element not found';
                    if (el.dataset.scrollToDuration !== undefined)
                        duration = el.dataset.scrollToDuration;
                    duration = parseInt(duration);
                    el.addEventListener('click', function() {
                        var targetOffset = targetElem.offsetTop;
                        var navbarHeight = document.getElementById('navbar').getBoundingClientRect().height;
                        $('html').stop().animate({
                            scrollTop: targetOffset - navbarHeight - 20
                        }, duration);
                    });
                } catch (e) {
                    console.error(e);
                }
            })
        },

        enableBlogSocialWidget: function() {
            var stickys = document.getElementsByClassName('sticky');
            if (stickys !== null && stickys.length === 0) return;
            var defaults = {};
            _.each(stickys, function(sticky) {
                var dataOptions = sticky.dataset.pluginOptions !== undefined ? JSON.parse(sticky.dataset.pluginOptions) : {};
                var options = _.assign(defaults, dataOptions);
                var sticky = stickybits(sticky, {
                    useStickyClasses: true
                });
                console.log(sticky);
            });
        },

        enableCountup: function() {
            var elms = document.getElementsByClassName('counter');
            if (elms === null && elms.length === 0) return;
            var defaults = {
                start: 0,
                end: 100,
                decimalPlaces: 0,
                duration: 3,

                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
            };
            _.each(elms, function(elm) {
                var dataOptions = JSON.parse(elm.dataset.pluginOptions);
                var options = _.assign(defaults, dataOptions);
                var instance = new CountUp(elm, options.start, options.end, options.decimalPlaces, options.duration, options);

                if (!instance.error) {
                    var runOnVisible = function() {
                        if (elementInViewport(elm)) {
                            instance.start();
                            window.removeEventListener('scroll', runOnVisible);
                        }
                    };
                    window.addEventListener('scroll', runOnVisible);
                    runOnVisible();
                } else console.error(instance.error);


                if (elm.unifato === undefined) elm.unifato = {};
                elm.unifato.slick = {};
                elm.unifato.slick.instance = instance;
            });
        },

        enableSliderWidget: function() {
            //$( ".price_slider" ).slider();
        },

        enableShopSingleTabs: function() {
            try {
                var wooTabs = document.getElementsByClassName('woocommerce-tabs');
                if (wooTabs === null || wooTabs.length === 0) return;
                _.each(wooTabs, function(wooTab) {
                    var tabs = wooTab.getElementsByClassName('tabs');
                    if (tabs === null || tabs.length === 0)
                        throw '.tabs not defined';
                    tabs = tabs[0];
                    var links = tabs.getElementsByTagName('a');

                    var changeTabPanel = function(link) {
                        var href = link.getAttribute('href');
                        var target = document.querySelector(href);
                        if (target === null || target.length === 0) {
                            console.error('Target is not defined');
                            return;
                        } else {
                            var panels = target.parentNode.querySelectorAll('[role="tabpanel"]');
                            _.each(panels, function(panel) {
                                panel.setAttribute('hidden', '');
                            });
                            target.removeAttribute('hidden');

                            var activeLink = link.parentNode.parentNode.getElementsByClassName('active');
                            if (activeLink === null || activeLink.length === 0) {
                                return;
                            } else {
                                activeLink = activeLink[0];
                                activeLink.classList.remove('active');
                                link.parentNode.classList.add('active');
                            }
                        }
                    };

                    _.each(links, function(link) {
                        link.addEventListener('click', function(e) {
                            changeTabPanel(link);
                            e.preventDefault();
                        });
                    });

                    var activeListItem = tabs.getElementsByClassName('active');
                    if (activeListItem === null || activeListItem === 0) return;
                    else {
                        var link = activeListItem[0].getElementsByTagName('a')[0];
                        changeTabPanel(link);
                    }
                });
            } catch (e) {
                console.error(e);
            }
        },

        enableShopPriceRangeSlider: function() {
            var $sliders = $('.price_slider');
            if ($sliders.length === 0) return;
            var defaults = {
                range: true,
            };
            $sliders.each(function() {
                var $slider = $(this);
                var options = $slider.data('plugin-options');
                var $amount = $slider.parent('.price_slider_wrapper').find('.price_slider_amount');
                options = $.extend({}, defaults, options);
                options.slide = function(e, ui) {
                    $slider[0].dataset.min = ui.values[0];
                    $slider[0].dataset.max = ui.values[1];

                    $amount.find('.from').html(ui.values[0]);
                    $amount.find('.to').html(ui.values[1]);

                    $amount.find('input[name="min_price"]').val(ui.values[0]);
                    $amount.find('input[name="max_price"]').val(ui.values[1]);
                }
                $slider.slider(options);
            });
        },
    };

    AOS.init({
        once: true,
        easing: 'ease-in-out-quad'
    });

    function elementInViewport(el) {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
            top < (window.pageYOffset + window.innerHeight) &&
            left < (window.pageXOffset + window.innerWidth) &&
            (top + height) > window.pageYOffset &&
            (left + width) > window.pageXOffset
        );
    }

    document.addEventListener('DOMContentLoaded', function() {
        Unifato.init();
        AOS.refresh();
    });
})(jQuery);


Pace.on('done', function() {
    document.body.classList.add('pace-completed');
});