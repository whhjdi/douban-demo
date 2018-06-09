var Helpers = {
        isToBottom: function ($viewport, $content) {
            return $viewport.height() + $viewport.scrollTop() + 30 > $content.height()
        },

        createNode: function (subject) {
            function setData(data) {
                data.subjects.forEach(function (movie) {
                        var template = `<div class="item">
            <a href="#" class='wrapper' target="_blank">
            <div class="cover">
                <img src="" alt="">
            </div>
            <div class="detail">
                <h2></h2>
                <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
                <div class="extra"><span class="year"></span> / <span class="type"></span></div>
                <div class="extra">导演: <span class="director"></span></div>
                <div class="extra">主演: <span class="actor"></span></div>
            </div>
            </a>
        </div>`

                function getImages(_url) {
                    if (_url !== undefined) {
                        let _u = _url.substring(7);
                        return 'https://images.weserv.nl/?url=' + _u;
                    }
                }
                if (movie.total > 20) {
                    $('.page-bottom').show()
                }
                var $node = $(template)
                $node.find('.total').text(movie.total)
                $node.find('.wrapper').attr('href', movie.alt)
                $node.find('.cover img').attr('src', getImages(movie.images.medium))
                $node.find('.detail h2').text(movie.title)
                $node.find('.score').text(movie.rating.average)
                $node.find('.collect').text(movie.collect_count)
                $node.find('.year').text(movie.year)
                $node.find('.type').text(movie.genres.join(' / '))
                $node.find('.director').text(function () {
                    var directorsArr = []
                    movie.directors.forEach(function (item) {
                        directorsArr.push(item.name)
                    })
                    return directorsArr.join('、')
                })
                $node.find('.actor').text(function () {
                    var actorArr = []
                    movie.casts.forEach(function (item) {
                        actorArr.push(item.name)
                    })
                    return actorArr.join('、')
                })
                return $node
            }
        }

                    var index = 0
                    var Paging = {
                        init: function () {
                            $('.site-content').hide()
                        }
                    }
                    var Search = {
                        init: function () {
                            this.page = 0
                            this.count = 10
                            this.isFinshed = false
                            this.isLoading = false
                            this.$body = $('body')
                            this.$container = $('#site-content')
                            this.$content = this.$container.find('.item-container')
                            this.bind()
                        },

                        bind: function () {
                            var _this = this
                            this.$body.find('.movie').on('click', function () {
                                console.log('click ')
                                $('.jumbotron').hide()
                                $('.page-bottom').hide()
                                $(".item-container").empty();
                                _this.getData(function (data) {
                                    console.log(data)
                                    _this.renderData(data)
                                })
                            })

                            this.$body.on('scroll', function () {
                                console.log(_this.isLoading)
                                if (Helpers.isToBottom(_this.$container, !_this.isFinshed && !_this.isLoading)) {
                                    console.log('to bottom')
                                    _this.getData(function (data) {
                                        _this.renderData(data)
                                        _this.page++
                                            if (_this.page * _this.count > data.total) {
                                                _this.isFinshed = true
                                            }
                                    })
                                }
                            })
                        },

                        getData: function (callback) {
                            var _this = this
                            var keyword = $('.search').val()
                            this.isLoading = true
                            $.ajax({
                                url: `http://api.douban.com/v2/movie/search?q=${keyword}`,
                                data: {
                                    start: index,
                                    count: 20,
                                    keyword: keyword
                                },
                                dataType: 'jsonp'
                            }).done(function (ret) {
                                _this.isLoading = false
                                callback(ret)
                            })
                        },

                        renderData(data) {
                            var _this = this
                            data.subjects.forEach(function (item) {
                                var $node = Helpers.createNode(item)
                                _this.$content.append($node)
                            })
                        }
                    }
                    var App = {
                        init: function () {
                            Paging.init()
                            Search.init()
                        }
                    }

                    App.init()