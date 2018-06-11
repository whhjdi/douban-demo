//电影搜索
! function () {
    $('.site-content').hide()
    $('.movie').on('click', function () {
        $('.loading').show()
        $('.page-bottom').hide()
        $('.item-container').empty()
        var keyword = $('.search').val()
        index = 0
        console.log('click')
        $(document).scrollTop(0)
        getMovieData(keyword)
        $('.jumbotron').hide()
        $('.site-content').show()
        $('.nav-bottom').show()
    })
    $('.previous').on('click', function () {
        if (index === 0) {
            alert('已经是第一页')
        } else {
            $('.item-container').empty()
            index -= 10
            var keyword = $('.search').val()
            $(document).scrollTop(0)
            getMovieData(keyword)
        }
    })
    $('.next').on('click', function () {
        $('.item-container').empty()
        index += 10
        var keyword = $('.search').val()
        $(document).scrollTop(0)
        // console.log('scrollTop')
        // console.log($(document).scrollTop())
        getMovieData(keyword)
    })
    var isLoading = false
    var index = 0

    function getMovieData(keyword) {
        if (isLoading) return
        isLoading = true

        $.ajax({
            url: `https://api.douban.com/v2/movie/search`,
            type: 'GET',
            data: {
                q: keyword,
                start: index,
                count: 10
            },
            dataType: 'jsonp'
        }).done(function (req) {
            console.log(req)
            setMovieData(req)
            $('.loading').hide()
        }).fail(function () {
            console.log(1)
        }).always(function () {
            isLoading = false
        })
    }

    function setMovieData(data) {
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
}()
//book
! function () {
    $('.site-content').hide()
    $('.book').on('click', function () {
        $('.loading').show()
        $('.site-content').hide()
        $('.jumbotron').hide()
        $('.page-bottom').hide()
        $(".item-container").empty();
        var keyword = $('.search').val()
        index = 0
        getBookData(keyword)
        $(document).scrollTop(0)
        $('.site-content').show()
        $('.nav-bottom').show()
    })
    $('.previous').on('click', function () {
        if (index === 0) {
            alert('已经是第一页')
        } else {
            $('.item-container').empty()
            index -= 10
            var keyword = $('.search').val()
            $(document).scrollTop(0)
            getBookData(keyword)
        }
    })
    $('.next').on('click', function () {
        $('.item-container').empty()
        index += 10
        var keyword = $('.search').val()
        $(document).scrollTop(0)
        // console.log('scrollTop')
        // console.log($(document).scrollTop())
        getBookData(keyword)
    })
    var isLoading = false
    var index = 0

    function getBookData(keyword) {
        if (isLoading) return
        isLoading = true

        $.ajax({
            url: `https://api.douban.com/v2/book/search`,
            type: 'GET',
            data: {
                q: keyword,
                start: index,
                count: 10
            },
            dataType: 'jsonp'
        }).done(function (req) {
            console.log(req)
            setBookData(req)
            $('.loading').hide()
        }).fail(function () {
            console.log(1)
        }).always(function () {
            isLoading = false
        })
    }

    function setBookData(data) {
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
}()


! function () {
    $('.site-content').hide()
    $('.music').on('click', function () {
        $('.loading').show()
        $('.site-content').hide()
        $('.jumbotron').hide()
        $('.page-bottom').hide()
        $(".item-container").empty();
        var keyword = $('.search').val()
        index = 0
        getMusicData(keyword)
        $(document).scrollTop(0)
        $('.site-content').show()
        $('.nav-bottom').show()
    })
    $('.previous').on('click', function () {
        if (index === 0) {
            alert('已经是第一页')
        } else {
            $('.item-container').empty()
            index -= 10
            var keyword = $('.search').val()
            $(document).scrollTop(0)
            getMusicData(keyword)
        }
    })
    $('.next').on('click', function () {
        $('.item-container').empty()
        index += 10
        var keyword = $('.search').val()
        $(document).scrollTop(0)
        // console.log('scrollTop')
        // console.log($(document).scrollTop())
        getMusicData(keyword)
    })
    var isLoading = false
    var index = 0
    function getMusicData(keyword) {
        if (isLoading) return
        isLoading = true

        $.ajax({
            url: `https://api.douban.com//v2/music/search`,
            type: 'GET',
            data: {
                q: keyword,
                start: index,
                count: 10
            },
            dataType: 'jsonp'
        }).done(function (req) {
            console.log(req)
            setMusicData(req)
            $('.loading').hide()
        }).fail(function () {
            console.log(1)
        }).always(function () {
            isLoading = false
        })
    }

    function setMusicData(data) {
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
}()