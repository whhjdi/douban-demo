// 获取电影信息并渲染
var getMovieData = {
    
    init: function (isLoading,loading,keyword,index,navBottom) {
        if (isLoading) return
        this.start(isLoading,loading,keyword,index,navBottom)
    },
    start: function (isLoading,loading, keyword,index,navBottom) {
        isLoading = true
        _this = this
        $.ajax({
            url: `https://api.douban.com/v2/movie/search`,
            type: 'GET',
            data: {
                q: keyword,
                start: index,
                count: 20
            },
            dataType: 'jsonp'
        }).done(function (req) {
            console.log(req)
            _this.setMusicData(req)
            loading.hide()
            navBottom.show()
        }).fail(function () {
            console.log('error movie')
        }).always(function () {
            isLoading = false
        })
    },
    setMusicData: function(data) {
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
            $('.site-content').find('.item-container').append($node)
        })
    }
}
// 获取音乐信息并渲染
var getMusicData = {
        init: function (isLoading,loading,keyword,index,navBottom) {
            if (isLoading) return
            this.start(isLoading,loading,keyword,index,navBottom)
        },
        start: function (isLoading,loading, keyword,index,navBottom) {
            isLoading = true
            _this = this
            $.ajax({
                url: `https://api.douban.com/v2/music/search`,
                type: 'GET',
                data: {
                    q: keyword,
                    start: index,
                    count: 20
                },
                dataType: 'jsonp'
            }).done(function (req) {
                console.log(req)
                _this.setMusicData(req)
                loading.hide()
                navBottom.show()
            }).fail(function () {
                console.log('error music')
            }).always(function () {
                isLoading = false
            })
        },
        setMusicData: function(data) {
            data.musics.forEach(function (music) {
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
                $('.site-content').find('.item-container').append($node)
            })
        }
}
// 获取书籍信息并渲染
var getBookData = {
    init: function (isLoading,loading,keyword,index,navBottom) {
        if (isLoading) return
        this.start(isLoading,loading,keyword,index,navBottom)
    },
    start: function (isLoading,loading, keyword,index,navBottom) {
        isLoading = true
        _this = this
        $.ajax({
            url: `https://api.douban.com/v2/book/search`,
            type: 'GET',
            data: {
                q: keyword,
                start: index,
                count: 20
            },
            dataType: 'jsonp'
        }).done(function (req) {
            console.log(req)
            _this.setBookData(req)
            loading.hide()
            navBottom.show()
        }).fail(function () {
            console.log('error movie')
        }).always(function () {
            isLoading = false
        })
    },
    setBookData: function(data) {
        data.books.forEach(function (book) {
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
            $('.site-content').find('.item-container').append($node)
        })
    }
}
// 事件绑定
var bindEvent = {
    init: function(){
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
    bind: function(){
        var _this = this
        this.isLoading = false
        this.$movie.on('click', function () {
            _this.$itemContainer.attr('title','movie')
            _this.$loading.show()
            _this.$itemContainer.empty()
            _this.$keyword = $('.search').val()
            _this.index = 0
            _this.$document.scrollTop(0)
            _this.$navBottom.hide()
            getMovieData.init(_this.isLoading,_this.$loading, _this.$keyword,_this.index,_this.$navBottom)
            _this.$welcome.hide()
        })
        this.$music.on('click', function () {
            _this.$itemContainer.attr('title','music')
            _this.$loading.show()
            _this.$itemContainer.empty()
            this.$keyword = _this.$search.val()
            _this.index = 0
            _this.$document.scrollTop(0)
            _this.$navBottom.hide()
            getMusicData.init(_this.isLoading,_this.$loading, this.$keyword,_this.index,_this.$navBottom)
            _this.$welcome.hide()
        })
        this.$book.on('click', function () {
            _this.$itemContainer.attr('title','book')
            _this.$loading.show()
            _this.$itemContainer.empty()
            this.$keyword = _this.$search.val()
            _this.index = 0
            _this.$document.scrollTop(0)
            _this.$navBottom.hide()
            getBookData.init(_this.isLoading,_this.$loading, this.$keyword,_this.index,_this.$navBottom)
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
                if(_this.$itemContainer.attr('title') === 'movie'){
                    getMovieData.init(_this.isLoading,_this.$loading, this.$keyword,_this.index,_this.$navBottom)
                }else if(_this.$itemContainer.attr('title') === 'music'){
                    getMusicData.init(_this.isLoading,_this.$loading, this.$keyword,_this.index,_this.$navBottom)
                }else if(_this.$itemContainer.attr('title') === 'book'){
                    getBookData.init(_this.isLoading,_this.$loading, this.$keyword,_this.index,_this.$navBottom)
                }
            }
        })
        this.$next.on('click', function () {
            _this.$loading.show()
            _this.$itemContainer.empty()
            _this.$navBottom.hide()
            _this.index += 20
            this.$keyword = _this.$search.val()
            _this.$document.scrollTop(0)
            if(_this.$itemContainer.attr('title') === 'movie'){
                getMovieData.init(_this.isLoading,_this.$loading, this.$keyword,_this.index,_this.$navBottom)
            }else if(_this.$itemContainer.attr('title') === 'music'){
                getMusicData.init(_this.isLoading,_this.$loading, this.$keyword,_this.index,_this.$navBottom)
            }else if(_this.$itemContainer.attr('title') === 'book'){
                getBookData.init(_this.isLoading,_this.$loading, this.$keyword,_this.index,_this.$navBottom)
            }
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