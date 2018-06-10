//电影搜索
! function () {
    $('.site-content').hide()
    $('.movie').on('click', function () {
        $('.page-bottom').hide()
        $('.item-container').empty()
        var keyword = $('.search').val()
        index = 0
        console.log('click')
        $(document).scrollTop(0)
        getData(keyword)
        $('.jumbotron').hide()
        $('.site-content').show()
        
    })

    var isLoading = false
    var index = 0

    function isToEnd() {
        console.log('判断')
        // console.log('当前位置')
        // console.log($(window).height() + $(document).scrollTop())
        console.log($('.site-content').height())
        return $(window).height() + $(document).scrollTop() >= $('.site-content').height()
    }

    function isScrollToEnd() {
        var clock
        $(window).on('scroll',function () {
            if (clock) {
                clearTimeout(clock)
            }
            clock = setTimeout(function () {
                if (isToEnd()&&$(document).scrollTop()!=0) {
                    var keyword = $('.search').val()
                    console.log('scroll')
                    console.log($(document).scrollTop())
                    getData(keyword)
                    console.log('执行获取请求')
                }
            }, 300)
        })
    }


    function getData(keyword) {
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
            setData(req)
            index += 10
            isScrollToEnd()
        }).fail(function () {
            console.log(1)
        }).always(function () {
            isLoading = false
        })
    }

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
// ! function () {
//     $('.site-content').hide()
//     $('.book').on('click', function () {
//         $('.site-content').hide()
//         $('.jumbotron').hide()
//         $('.page-bottom').hide()
//         $(".item-container").empty();
//         var keyword = $('.search').val()
//         index = 0
//         getData(keyword)
//         $('.site-content').show()
//     })

//     var isLoading = false
//     var index = 0

//     function isToEnd() {
//         return $(window).height() + $(window).scrollTop() - 10 >= $('.item-container').height()
//     }
//     var clock
//     $(window).scroll(function () {
//         if (clock) {
//             clearTimeout(clock)
//         }
//         clock = setTimeout(function () {
//             if (isToEnd()) {
//                 var keyword = $('.search').val()
//                 getData(keyword)
//             }
//         }, 300)
//     })

//     function getData(keyword) {
//         if (isLoading) return
//         isLoading = true

//         $.ajax({
//             url: `https://api.douban.com/v2/book/search`,
//             type: 'GET',
//             data: {
//                 q: keyword,
//                 start: index,
//                 count: 10
//             },
//             dataType: 'jsonp'
//         }).done(function (req) {
//             console.log(req)
//             setData(req)
//             index += 10
//         }).fail(function () {
//             console.log(1)
//         }).always(function () {
//             isLoading = false
//         })
//     }

//     function setData(data) {
//         data.books.forEach(function (book) {
//             var template = `<div class="item">
//       <a href="#" class='wrapper' target="_blank">
//         <div class="cover">
//           <img src="" alt="">
//         </div>
//         <div class="detail">
//           <h2></h2>
//           <div class="extra">评分:<span class="score"></span>分</div>
//           <div class="extra">作者: <span class="author"></span></div>
//           <div class="extra">出版时间: <span class="year"></span></div>
//           <div class="extra">出版社: <span class="publish"></span></div>
//           <div class="extra">定价: <span class="price"></span></div>
//         </div>
//       </a>
//     </div>`

//             function getImages(_url) {
//                 if (_url !== undefined) {
//                     let _u = _url.substring(7);
//                     return 'https://images.weserv.nl/?url=' + _u;
//                 }
//             }
//             var $node = $(template)
//             $node.find('.total').text(data.total)
//             $node.find('.wrapper').attr('href', book.alt)
//             $node.find('.cover img').attr('src', getImages(book.image))
//             $node.find('.detail h2').text(book.title)
//             $node.find('.score').text(book.rating.average)
//             $node.find('.year').text(book.pubdate)
//             $node.find('.publish').text(book.publisher)
//             $node.find('.price').text(book.price)
//             $node.find('.author').text(function () {
//                 if (book.author) {
//                     return book.author.join(' ')
//                 } else {
//                     return '暂无'
//                 }
//             })
//             $('.site-content').find('.item-container').append($node)
//         })
//     }
// }()


// ! function () {
//     $('.site-content').hide()
//     $('.music').on('click', function () {
//         $('.site-content').hide()
//         $('.jumbotron').hide()
//         $('.page-bottom').hide()
//         $(".item-container").empty();
//         var keyword = $('.search').val()
//         index = 0
//         getData(keyword)
//         $('.site-content').show()
//     })

//     var isLoading = false
//     var index = 0

//     function isToEnd() {
//         return $(window).height() + $(window).scrollTop() - 10 >= $('.item-container').height()
//     }
//     var clock
//     $(window).scroll(function () {
//         if (clock) {
//             clearTimeout(clock)
//         }
//         clock = setTimeout(function () {
//             if (isToEnd()) {
//                 var keyword = $('.search').val()
//                 getData(keyword)
//             }
//         }, 300)
//     })

//     function getData(keyword) {
//         if (isLoading) return
//         isLoading = true

//         $.ajax({
//             url: `https://api.douban.com//v2/music/search`,
//             type: 'GET',
//             data: {
//                 q: keyword,
//                 start: index,
//                 count: 10
//             },
//             dataType: 'jsonp'
//         }).done(function (req) {
//             console.log(req)
//             setData(req)
//             index += 10
//         }).fail(function () {
//             console.log(1)
//         }).always(function () {
//             isLoading = false
//         })
//     }

//     function setData(data) {
//         data.musics.forEach(function (music) {
//             var template = `<div class="item">
//       <a href="#" class='wrapper' target="_blank">
//         <div class="cover">
//           <img src="" alt="">
//         </div>
//         <div class="detail">
//           <h2></h2>
//           <div class="extra">评分:<span class="score"></span>分</div>
//           <div class="extra">发行时间: <span class="year"></span></div>
//           <div class="extra">出版: <span class="publish"></span></div>
//           <div class="extra">歌手: <span class="singer"></span></div>
//         </div>
//       </a>
//     </div>`

//             function getImages(_url) {
//                 if (_url !== undefined) {
//                     let _u = _url.substring(7);
//                     return 'https://images.weserv.nl/?url=' + _u;
//                 }
//             }
//             var $node = $(template)
//             $node.find('.total').text(data.total)
//             $node.find('.wrapper').attr('href', music.alt)
//             $node.find('.cover img').attr('src', getImages(music.image))
//             $node.find('.detail h2').text(music.title)
//             $node.find('.score').text(music.rating.average)
//             $node.find('.year').text(function () {
//                 if (music.attrs.pubdate) {
//                     return music.attrs.pubdate.join(' ')
//                 } else {
//                     return '暂无'
//                 }
//             })
//             $node.find('.publish').text(function () {
//                 if (music.attrs.publisher) {
//                     return music.attrs.publisher.join(' ')
//                 } else {
//                     return '暂无'
//                 }
//             })
//             $node.find('.singer').text(function () {
//                 if (music.attrs.singer) {
//                     return music.attrs.singer.join(' ')
//                 } else {
//                     return '暂无'
//                 }
//             })
//             $('.site-content').find('.item-container').append($node)
//         })
//     }
// }()

