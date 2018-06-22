/*获取数据*/
var getData = {
    init(index, page) {
        this.isLoading = false
        this.$search = $('.search')
        this.$loading = $('.loading')
        this.$welcome = $('.jumbotron')
        this.$itemContainer = $('.item-container')
        if (this.isLoading) return
        this.isLoading = true
        this.start(index, page)
    },
    start(index, page) {
        _this = this
        $.ajax({
            url: `https://api.douban.com/v2/${_this.$itemContainer.attr('title')}/search`,
            type: 'GET',
            data: {
                q: _this.$search.val(),
                start: index,
                count: 20
            },
            dataType: 'jsonp'
        }).done(function (req) {
            // console.log(req)
            // console.log(index)
            // console.log(page)
            // console.log((index * page >= req.total))
            if (index * page >= req.total || req.total === 0) {
                alert('没有到更多搜索结果了,即将返回首页')
                _this.$loading.hide()
                _this.$welcome.show()
            } else {
                setData.init(req)
                _this.$loading.hide()
                _this.$navBottom.show()
            }
        }).fail(function () {
            console.log('error,获取数据失败')
        }).always(function () {
            isLoading = false
        })
    },
}
/*渲染数据*/
var setData = {  
    init(data) {
        this.$itemContainer = $('.item-container')
        this.$loading = $('.loading')
        this.$navBottom = $('.nav-bottom')
        this.start(data)
    },
    start(data) {
        _this = this
        if (_this.$itemContainer.attr('title') === 'movie') {
            data.subjects.forEach(function (movie) {
                var $node = _this.createMovie(movie, data)
                _this.$itemContainer.append($node)
            })
        } else if (_this.$itemContainer.attr('title') === 'music') {
            data.musics.forEach(function (music) {
                var $node = _this.createMusic(music, data)
                _this.$itemContainer.append($node)
            })
        } else if (_this.$itemContainer.attr('title') === 'book') {
            data.books.forEach(function (book) {
                var $node = _this.createBook(book, data)
                _this.$itemContainer.append($node)
            })
        }
    },
    createMovie: function (movie, data) {
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
            directorsArr.length = 3
            return directorsArr.join(' ')
        })
        $node.find('.actor').text(function () {
            var actorArr = []
            movie.casts.forEach(function (item) {
                actorArr.push(item.name)
            })
            actorArr.length = 3
            return actorArr.join(' ')
        })
        return $node
    },
    createMusic: function (music, data) {
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
    createBook: function (book, data) {
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


}

/*绑定事件*/
var bindEvents = {
    init() {
        this.$navBar = $('.navbar')
        this.$document = $(document)
        this.$movie = $('.movie')
        this.$music = $('.music')
        this.$book = $('.book')
        this.$welcome = $('.jumbotron')
        this.$previous = $('.previous')
        this.$next = $('.next')
        this.$siteContent = $('.site-content')
        this.$navBottom = $('.nav-bottom')
        this.$itemContainer = $('.item-container')
        this.index = 0
        this.$loading = $('.loading')
        this.$search = $('.search')
        this.page = 0
        this.bind()
    },
    showData() {
        this.$loading.show()
        this.$itemContainer.empty()
        this.index = 0
        this.page = 0
        this.$document.scrollTop(0)
        this.$navBottom.hide()
        getData.init(this.index)
        this.$welcome.hide()
    },

    bind() {
        var _this = this
        this.$document.scroll(function () {
            if (document.body.clientWidth < 768 && window.pageYOffset > 200) {
                console.log(1)
                _this.$navBar.fadeOut()
            } else {
                _this.$navBar.fadeIn()
            }
        })

        this.$search.keydown(function (e) {
            if (e.keyCode == "13") {
                // 这里可以加个下拉框,选择的选项,作为$itemContainer的title
                // 这样就可以选择回车键搜索的选项
                _this.$itemContainer.attr('title', 'movie')
                _this.showData()
                return false
            }
        })
        this.$movie.on('click', function () {
            _this.$itemContainer.attr('title', 'movie')
            _this.showData()
        })
        this.$music.on('click', function () {
            _this.$itemContainer.attr('title', 'music')
            _this.showData()
        })
        this.$book.on('click', function () {
            _this.$itemContainer.attr('title', 'book')
            _this.showData()
        })
        this.$previous.on('click', function () {
            if (_this.index === 0) {
                alert('已经是第一页')
            } else {
                _this.$loading.show()
                _this.$itemContainer.empty()
                _this.$navBottom.hide()
                _this.index -= 20
                _this.$document.scrollTop(0)
                _this.page--
                    getData.init(_this.index, _this.page)

            }
        })
        this.$next.on('click', function () {
            _this.$loading.show()
            _this.$itemContainer.empty()
            _this.$navBottom.hide()
            _this.index += 20
            _this.$document.scrollTop(0)
            _this.page++
                getData.init(_this.index, _this.page)
        })
    }
}

bindEvents.init()
