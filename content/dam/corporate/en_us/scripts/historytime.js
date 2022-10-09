/*global enquire */

'use strict';
var APP = window.APP = window.APP || {};
APP.historyTimeline = function() {
    var timeline = {
            init: function() {
                this.global.init(), this.tools.isMobile() ? (this.mobile.sliderInit(), this.mobile.eventHandlers()) : (this.desktop.onDragIt(), this.desktop.onScrollIt(), this.desktop.yearSlider.init())
            },
            tools: {
                isMobile: function() {
                    var isMobile = !1,
                        windowWidth = $(window).width(),
                        mobileBreakpoint = 1024;
                    return mobileBreakpoint > windowWidth && (isMobile = !0), isMobile
                }
            },
            global: {
                $mobileSlider: $(".history-timeline__content"),
                $desktopSlider: $(".history-timeline__nav--desktop-wrapper"),
                currentView: !1,
                init: function() {
                    this.eventHandlers()
                },
                destroyDesktop: function() {
                    this.$desktopSlider.slider("instance") && this.$desktopSlider.slider("destroy")
                },
                destroyMobile: function() {
                    this.$mobileSlider.unslick()
                },
                eventHandlers: function() {
                    var that = this;
                    $(window).resize(function() {
                        timeline.tools.isMobile() ? "mobile" !== that.currentView && (that.currentView = "mobile", that.destroyDesktop(), $(window).unbind("scroll"), that.$mobileSlider.hasClass("slick-initialized") || timeline.mobile.sliderInit(), timeline.mobile.eventHandlers()) : "desktop" !== that.currentView && (that.currentView = "desktop", that.destroyMobile(), $(window).unbind("scroll"), timeline.desktop.onDragIt(), timeline.desktop.onScrollIt(), timeline.desktop.yearSlider.init())
                    })
                }
            },
            mobile: {
                $slides: $(".history-timeline__content"),
                $slide: $(".history-timeline__content--slide"),
                $prevArrow: $(".history-timeline__nav--prevBtn"),
                $nextArrow: $(".history-timeline__nav--nextBtn"),
                $currentPageHolder: $(".history-timeline__nav--currentPage"),
                $mobileNav: $(".history-timeline__nav"),
                slidesTitles: ["Overview", "1970s", "1980s", "1990s", "2000s", "2010s"],
                sliderInit: function() {
                    var that = this;
                    this.$slides.slick({
                        speed: 200,
                        arrows: !1,
                        onBeforeChange: function(slide, currentSlide, targetSlide) {
                            var currentSlideHeight = that.$slide.eq(targetSlide).height() + 96;
                            that.$slides.css({
                                height: currentSlideHeight
                            })
                        },
                        onAfterChange: function(slide, index) {
                            that.setSlideTitle(index)
                        }
                    })
                },
                setSlideTitle: function(slide) {
                    this.$currentPageHolder.html(this.slidesTitles[slide])
                },
                eventHandlers: function() {
                    var that = this,
                        topMargin = 180;
                    this.$prevArrow.on("click", function() {
                        that.$slides.slickPrev(), that.setSlideTitle(that.$slides.slickCurrentSlide())
                    }), this.$nextArrow.on("click", function() {
                        that.$slides.slickNext(), that.setSlideTitle(that.$slides.slickCurrentSlide())
                    }), $(window).width() > 767 && (topMargin = 0), $(window).scroll(function() {
                        if($("body div").hasClass("history-timeline")){
							var scrollPosition = $(window).scrollTop(),
								navPosition = $(".history-timeline").position().top - topMargin;
							scrollPosition > navPosition ? (that.$slides.addClass("sticky"), that.$mobileNav.addClass("sticky")) : (that.$slides.removeClass("sticky"), that.$mobileNav.removeClass("sticky"))
						}
                    })
                }
            },
            desktop: {
                animationStart: !1,
                $desktopSlider: $(".history-timeline__nav--desktop"),
                $desktopNav: $(".history-timeline__nav--desktop"),
                $timelineYears: $(".history-timeline__content--year"),
                $timelineArrows: $(".history-timeline__content--arrows"),
                $overviewWrapper: $(".history-timeline__content--overview"),
                $timelineYearsWrapper: $(".history-timeline__content--year-wrapper"),
                $desktopSliderWrapper: $(".history-timeline__nav--desktop-wrapper"),
                yearSlider: {
                    init: function() {
                        this.addArrows()
                    },
                    addArrows: function() {
                        var that = this;
                        $.each(timeline.desktop.$timelineYearsWrapper, function(i, val) {
                            var arrows = "<div class='prevArrow'></div><div class='nextArrow'></div>";
                            $(val).prev().html(arrows), that.isSliderNeeded(val) || $(val).prev().find(".nextArrow").hide()
                        }), that.eventHandlers()
                    },
                    isSliderNeeded: function(year) {
                        var modules = $(year).find(".history-timeline__content--year-module"),
                            historyMargin = $(".history-timeline__content").offset().left,
                            windowWidth = $(window).width(),
                            modulesMargin = 160,
                            modulesWidth = 0,
                            isSliderNeeded = !1;
                        return $.each(modules, function(index, module) {
                            modulesWidth += $(module).width()
                        }), historyMargin = parseInt(historyMargin), $(year).attr("data-modules", modules.length), $(year).attr("current-module", "1"), timeline.desktop.$timelineArrows.css("width", windowWidth - historyMargin), isSliderNeeded = modulesWidth + modulesMargin - 25 > windowWidth - historyMargin ? !0 : !1
                    },
                    eventHandlers: function() {
                        $.each($(".history-timeline__content--year-wrapper"), function(index, year) {
                            var $prevArrow = $(year).prev().find(".prevArrow"),
                                $nextArrow = $(year).prev().find(".nextArrow"),
                                currentModule = 1;
                            $prevArrow.on("click", function() {
                                {
                                    var elementParent = $(this).parent().next().find(".history-timeline__content--year"),
                                        $currentModule = elementParent.find(".history-timeline__content--year-module").eq($(this).parent().next().attr("current-module") - 2),
                                        currentModuleWidth = $currentModule.width(),
                                        moduleWidthWithMargin = currentModuleWidth + 60,
                                        currentMarginLeft = elementParent[0].style.marginLeft.split("px")[0],
                                        finalMargin = parseInt(currentMarginLeft) + parseInt(moduleWidthWithMargin);
                                    $(this).parent().next().attr("data-modules")
                                }
                                1 !== currentModule && ($(this).next().fadeIn(), elementParent.animate({
                                    "margin-left": finalMargin + "px"
                                }, 600), 2 === currentModule && $(this).fadeOut()), currentModule--, $(this).parent().next().attr("current-module", currentModule)
                            }), $nextArrow.on("click", function() {
                                var elementParent = $(this).parent().next().find(".history-timeline__content--year"),
                                    $currentModule = elementParent.find(".history-timeline__content--year-module").eq($(this).parent().next().attr("current-module") - 1),
                                    currentModuleWidth = $currentModule.width(),
                                    moduleWidthWithMargin = currentModuleWidth + 60,
                                    currentMarginLeft = elementParent[0].style.marginLeft.split("px")[0];
                                console.log(currentMarginLeft);
                                var finalMargin = parseInt(-1 * currentMarginLeft) + parseInt(moduleWidthWithMargin),
                                    numberOfModules = $(this).parent().next().attr("data-modules");
                                console.log($currentModule), currentModule !== parseInt(numberOfModules) && ($(this).prev().fadeIn(), elementParent.animate({
                                    "margin-left": "-" + finalMargin + "px"
                                }, 600), currentModule === parseInt(numberOfModules) - 1 && $(this).fadeOut()), currentModule++, $(this).parent().next().attr("current-module", currentModule)
                            })
                        })
                    }
                },
                onDragIt: function() {
                    var slideSpeed = 500,
                        doc = $("html, body"),
                        that = this;
                    this.$desktopSliderWrapper.slider({
                        value: 0,
                        min: 0,
                        max: 32,
                        step: 1,
                        start: function() {
                            that.animationStart = !0
                        },
                        stop: function(event, ui) {
                            var stickyHeight;
                            stickyHeight = that.$desktopNav.hasClass("sticky") ? 40 : 0;
                            var position = that.$timelineYearsWrapper.eq(ui.value - 1).position().top + stickyHeight + $(".masthead__wrapper").height();
                            0 === ui.value && (position = 400), doc.animate({
                                scrollTop: position
                            }, slideSpeed, function() {
                                that.animationStart = !1
                            })
                        }
                    })
                },
                onScrollIt: function() {
                    var that = this;
                    $(window).scroll(function() {
						if($("body div").hasClass("history-timeline")){
							var stickyHeight, scrollPosition = $(window).scrollTop(),
								mainHeroHeight = $(".masthead__wrapper").height();
							stickyHeight = that.$desktopNav.hasClass("sticky") ? 0 : 40;
							var modulePosition, sliderPosition = that.$desktopSliderWrapper.slider("value"),
								prevModulePosition = that.$timelineYearsWrapper.eq(sliderPosition - 1).position().top + stickyHeight + mainHeroHeight;
							modulePosition = 31 > sliderPosition ? that.$timelineYearsWrapper.eq(sliderPosition).position().top + stickyHeight + mainHeroHeight : that.$timelineYearsWrapper.eq(sliderPosition - 1).position().top + stickyHeight + mainHeroHeight, scrollPosition > modulePosition && that.animationStart === !1 && 31 > sliderPosition && that.$desktopSliderWrapper.slider("value", sliderPosition + 1), sliderPosition > 1 && prevModulePosition > scrollPosition && that.animationStart === !1 && that.$desktopSliderWrapper.slider("value", sliderPosition - 1), scrollPosition > 460 ? (that.$overviewWrapper.addClass("sticky"), that.$desktopSlider.addClass("sticky")) : (that.$overviewWrapper.removeClass("sticky"), that.$desktopSlider.removeClass("sticky"))
						}
					})
                }
            }
        },
        init = function() {
            timeline.init()
        };
    return {
        init: init
    }
}();
var APP = window.APP = window.APP || {};
APP.home = function() {
    var bindEventsToUI = function() {},
        init = function() {
            APP.cardTherapy.init(), APP.genericWidget.init("news"), bindEventsToUI()
        };
    return {
        init: init
    }
}();
