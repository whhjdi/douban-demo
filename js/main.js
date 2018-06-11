/*获取数据*/
var getData = {
    init: function (loading, keyword, index, navBottom, api) {
        this.isLoading = false
        $itemContainer = $('.item-container')
        this.start(loading, keyword, index, navBottom, api)
    },
    start: function (loading, keyword, index, navBottom, api) {
        if (this.isLoading) return
        this.isLoading = true
        _this = this
        console.log(api)
        $.ajax({
            url: `https://api.douban.com/v2/${api}/search`,
            type: 'GET',
            data: {
                q: keyword,
                start: index,
                count: 20
            },
            dataType: 'jsonp'
        }).done(function (req) {
            console.log(req)
            setData.init(req)
            loading.hide()
            navBottom.show()
        }).fail(function () {
            console.log('error movie')
        }).always(function () {
            isLoading = false
        })
    },
}

/*渲染数据*/
var setData = {
    init: function (data) {
        this.$itemContainer = $('.item-container')
        this.start(data)
    },
    start: function (data) {
        _this = this
        if (_this.$itemContainer.attr('title') === 'movie') {
            data.subjects.forEach(function (movie) {
                var $node = _this.createMovie(movie,data)
                _this.$itemContainer.append($node)
            })
        } else if (_this.$itemContainer.attr('title') === 'music') {
            data.musics.forEach(function (music) {
                var $node = _this.createMusic(music,data)
                _this.$itemContainer.append($node)
            })
        } else if (_this.$itemContainer.attr('title') === 'book') {
            data.books.forEach(function (book) {
                var $node = _this.createBook(book,data)
                _this.$itemContainer.append($node)
            })
        }
    },

    createBook: function (book,data) {
            var template = `<div class="item">
    <a href="#" class='wrapper' target="_blank">
    <div class="cover">
        <img src="" alt="">
    </div>
    <div class="detail">
        <h2></h2>
        <div class="extra">评分:<span class="score"></span>分</div>
        <div class="extra">作者: <span class="author"></span></div>
        <div class="extra">出版时间: <span class="year"></span></div>
        <div class="extra">出版社: <span class="publish"></span></div>
        <div class="extra">定价: <span class="price"></span></div>
    </div>
    </a>
</div>`

            function getImages(_url) {
                if (_url !== undefined) {
                    let _u = _url.substring(7);
                    return 'https://images.weserv.nl/?url=' + _u;
                }
            }

            var $node = $(template)
            $node.find('.total').text(data.total)
            $node.find('.wrapper').attr('href', book.alt)
            $node.find('.cover img').attr('src', getImages(book.image))
            $node.find('.detail h2').text(book.title)
            $node.find('.score').text(book.rating.average)
            $node.find('.year').text(book.pubdate)
            $node.find('.publish').text(book.publisher)
            $node.find('.price').text(book.price)
            $node.find('.author').text(function () {
                if (book.author) {
                    return book.author.join(' ')
                } else {
                    return '暂无'
                }
            })
            return $node
    },
    createMusic: function (music,data) {
            var template = `<div class="item">
      <a href="#" class='wrapper' target="_blank">
        <div class="cover">
          <img src="" alt="">
        </div>
        <div class="detail">
          <h2></h2>
          <div class="extra">评分:<span class="score"></span>分</div>
          <div class="extra">发行时间: <span class="year"></span></div>
          <div class="extra">出版: <span class="publish"></span></div>
          <div class="extra">歌手: <span class="singer"></span></div>
        </div>
      </a>
    </div>`

            function getImages(_url) {
                if (_url !== undefined) {
                    let _u = _url.substring(7);
                    return 'https://images.weserv.nl/?url=' + _u;
                }
            }
            var $node = $(template)
            $node.find('.total').text(data.total)
            $node.find('.wrapper').attr('href', music.alt)
            $node.find('.cover img').attr('src', getImages(music.image))
            $node.find('.detail h2').text(music.title)
            $node.find('.score').text(music.rating.average)
            $node.find('.year').text(function () {
                if (music.attrs.pubdate) {
                    return music.attrs.pubdate.join(' ')
                } else {
                    return '暂无'
                }
            })
            $node.find('.publish').text(function () {
                if (music.attrs.publisher) {
                    return music.attrs.publisher.join(' ')
                } else {
                    return '暂无'
                }
            })
            $node.find('.singer').text(function () {
                if (music.attrs.singer) {
                    return music.attrs.singer.join(' ')
                } else {
                    return '暂无'
                }
            })
            return $node
    },
    createMovie: function (movie,data) {
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
</div>
`

        function getImages(_url) {
            if (_url !== undefined) {
                let _u = _url.substring(7);
                return 'https://images.weserv.nl/?url=' + _u;
            }
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

/*绑定事件*/
var bindEvent = {
    init: function () {
        this.$document = $(document)
        this.$movie = $('.movie')
        this.$music = $('.music')
        this.$book = $('.book')
        this.$welcome = $('.jumbotron')
        this.$previous = $('.previous')
        this.$siteContent = $('.site-content')
        this.$navBottom = $('.nav-bottom')
        this.$next = $('.next')
        this.$itemContainer = $('.item-container')
        this.$loading = $('.loading')
        this.index = 0
        this.$music = $('.music')
        this.$itemContainer = $('.item-container')
        this.$loading = $('.loading')
        this.$search = $('.search')
        this.bind()
    },
    bind: function () {
        var _this = this
        
        this.$movie.on('click', function () {
            _this.$itemContainer.attr('title', 'movie')
            _this.$loading.show()
            _this.$itemContainer.empty()
            _this.$keyword = $('.search').val()
            _this.index = 0
            _this.$document.scrollTop(0)
            _this.$navBottom.hide()
            getData.init(_this.$loading, _this.$keyword, _this.index, _this.$navBottom, _this.$itemContainer.attr('title'))
            _this.$welcome.hide()
        })
        this.$music.on('click', function () {
            _this.$itemContainer.attr('title', 'music')
            _this.$loading.show()
            _this.$itemContainer.empty()
            this.$keyword = _this.$search.val()
            _this.index = 0
            _this.$document.scrollTop(0)
            _this.$navBottom.hide()
            getData.init(_this.$loading, this.$keyword, _this.index, _this.$navBottom, _this.$itemContainer.attr('title'))
            _this.$welcome.hide()
        })
        this.$book.on('click', function () {
            _this.$itemContainer.attr('title', 'book')
            _this.$loading.show()
            _this.$itemContainer.empty()
            this.$keyword = _this.$search.val()
            _this.index = 0
            _this.$document.scrollTop(0)
            _this.$navBottom.hide()
            getData.init(_this.$loading, this.$keyword, _this.index, _this.$navBottom, _this.$itemContainer.attr('title'))
            _this.$welcome.hide()
        })
        this.$previous.on('click', function () {
            if (_this.index === 0) {
                alert('已经是第一页')
            } else {
                _this.$loading.show()
                _this.$itemContainer.empty()
                _this.$navBottom.hide()
                _this.index -= 20
                this.$keyword = _this.$search.val()
                _this.$document.scrollTop(0)
                getData.init(_this.$loading, this.$keyword, _this.index, _this.$navBottom, _this.$itemContainer.attr('title'))
            }
        })
        this.$next.on('click', function () {
            _this.$loading.show()
            _this.$itemContainer.empty()
            _this.$navBottom.hide()
            _this.index += 20
            this.$keyword = _this.$search.val()
            _this.$document.scrollTop(0)
            getData.init(_this.$loading, this.$keyword, _this.index, _this.$navBottom, _this.$itemContainer.attr('title'))
        })
    }
}
//入口
var app = {
    init: function () {
        bindEvent.init()
    }
}
app.init()