
// d3.json('https://api.imgur.com/3/gallery/r/foodporn/top/1')
// .header("Authorization", 'Client-Id 9e7ab6a35eb2f7a')
// .header("Accept", 'application/json')
// .get(function (err, data) {
//   if (err) throw new Error(err)
//   else
//     init(data.data.filter(function(d) { return ! d.nsfw && d.type })
//          .map(function (d) { return d.link })
//         )
// })

var c = d3.select('canvas')
var width = c.attr('width')
  , height = c.attr('height')

var col = 30
  , s = ~~ (width / col)
  , row = ~~ (height / s)

var findAverageHue = 'vec4 accumulator (vec4 a, vec4 b) {'
                   + '  return vec4(a.x + b.x, 0, a.z, a.w);'
                   + '}'

var b =  pathgl.texture('.t')
var a = pathgl.texture('.l')

init()
function init(arr) {
  //arr.width = 1024
  //arr.rows = 8
  //tiles = pathgl.texture(getWebcam()).repeat()
  //tiles = pathgl.texture(arr)//.pipe(mozify)
  c.selectAll('rect').data(d3.range(col * row ))
  .enter().append('rect')
  .attr('x', function (d) { return s/2 + s * (d % col) })
  .attr('y', function (d) { return s/2 + s * ~~(d / col) })
  .attr('width', s )
  .attr('height', s)
  //.filter(function (d, i) { return (d % 30) < 15 })
  //.transition().delay(function (d) { return d * 10 })
  .attr('fill', function (d) { return d % 2 ? a : b })

  return
  var mozify = pathgl.shader().matchWith(findAverageHue)
  var webcam = pathgl.texture(getWebcam()).repeat().pipe(mozify)
  var mosaic = pathgl.texture()
  return mosaic
}

//var webcam = pathgl.texture(getWebcam()).repeat()

function getWebcam() {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia
  var video = d3.select('body').append('video')
              .attr('height', '1024').attr('width', 'auto')
              .attr('autoplay', true).attr('loopo', true)
              //.style('display', 'none')
              .node()

  navigator.getUserMedia({ video: true }, function(stream) {
    video.src = window.URL.createObjectURL(stream)
  }, function(error) {})

  var c = document.createElement('canvas').getContext('2d')
    , s = c.canvas.width = c.canvas.height = 1024

  return video
}
