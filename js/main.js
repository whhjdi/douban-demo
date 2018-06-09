$('.site-content').hide()
$('.movie').on('click', function () {
    $('.site-content').hide()
    $('.jumbotron').hide()
    $('.page-bottom').hide()
    $(".item-container").empty();
    var keyword = $('.search').val()
    index = 0
    getData(keyword)
    $('.site-content').show()
})

var isLoading = false
var index = 0
function isToEnd() {
    return $(window).height() + $(window).scrollTop() - 10 >= $('.item-container').height()
}
console.log(isToEnd())
var clock
$(window).scroll(function () {
    if (clock) {
        clearTimeout(timeId)
    }
    timeId = setTimeout(function () {
        if (isToEnd()) {
            var keyword = $('.search').val()
            getData(keyword)
        }
    }, 300)
})

function getData(keyword) {
    if (isLoading) return
    isLoading = true
    
    $.ajax({
        url: `http://api.douban.com/v2/movie/search?q=${keyword}`,
        type: 'GET',
        data: {
            start: index,
            count: 10
        },
        dataType: 'jsonp'
    }).done(function (req) {
        console.log(req)
        setData(req)
        index += 10
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