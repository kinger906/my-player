var numId = 1007;
var name = '人民的名义';
var arr = [
  'https://v5.cdtlas.com/20220625/FEb2YGNu/index.m3u8',
  'https://v5.cdtlas.com/20220625/fxgVISZk/index.m3u8',
  'https://v5.cdtlas.com/20220625/TqvZyMOI/index.m3u8',
  'https://v5.cdtlas.com/20220625/u1emHLcn/index.m3u8',
  'https://v5.cdtlas.com/20220625/HeSF4ett/index.m3u8',
  'https://v5.cdtlas.com/20220625/qT09odJL/index.m3u8',
  'https://v5.cdtlas.com/20220625/VZxx41Cf/index.m3u8',
  'https://v5.cdtlas.com/20220625/qMySn2Ca/index.m3u8',
  'https://v5.cdtlas.com/20220625/r5QfMnT2/index.m3u8',
  'https://v5.cdtlas.com/20220625/8zBbDjOE/index.m3u8',
  'https://v5.cdtlas.com/20220625/IR9QMq4J/index.m3u8',
  'https://v5.cdtlas.com/20220625/ParvkmFs/index.m3u8',
  'https://v5.cdtlas.com/20220625/ZgalpCoY/index.m3u8',
  'https://v5.cdtlas.com/20220625/ZwkgPDBZ/index.m3u8',
  'https://v5.cdtlas.com/20220625/tpi4nUa9/index.m3u8',
  'https://v5.cdtlas.com/20220625/1YeAmZSm/index.m3u8',
  'https://v5.cdtlas.com/20220625/6h1yfiTS/index.m3u8',
  'https://v5.cdtlas.com/20220625/QyR053qq/index.m3u8',
  'https://v5.cdtlas.com/20220625/l9JLXWy3/index.m3u8',
  'https://v5.cdtlas.com/20220625/vcA0VnXo/index.m3u8',
  'https://v5.cdtlas.com/20220625/e809NB9l/index.m3u8',
  'https://v5.cdtlas.com/20220625/ug21F3gb/index.m3u8',
  'https://v5.cdtlas.com/20220625/u5ZxLyx0/index.m3u8',
  'https://v5.cdtlas.com/20220625/GpFjD8Ba/index.m3u8',
  'https://v5.cdtlas.com/20220625/Eot2wRhe/index.m3u8',
  'https://v5.cdtlas.com/20220625/sUAb1COr/index.m3u8',
  'https://v5.cdtlas.com/20220625/z5mGCWrB/index.m3u8',
  'https://v5.cdtlas.com/20220625/BUgMfNDL/index.m3u8',
  'https://v5.cdtlas.com/20220625/1OmGJy04/index.m3u8',
  'https://v5.cdtlas.com/20220625/wTBiL874/index.m3u8',
  'https://v5.cdtlas.com/20220625/LWlCtPvJ/index.m3u8',
  'https://v5.cdtlas.com/20220625/td1lXJW2/index.m3u8',
  'https://v5.cdtlas.com/20220625/6gTns79x/index.m3u8',
  'https://v5.cdtlas.com/20220625/SwzgtLvW/index.m3u8',
  'https://v5.cdtlas.com/20220625/cLhteptd/index.m3u8',
  'https://v5.cdtlas.com/20220625/VUlz564V/index.m3u8',
  'https://v5.cdtlas.com/20220625/0ybJVI8J/index.m3u8',
  'https://v5.cdtlas.com/20220625/Its7ukoH/index.m3u8',
  'https://v5.cdtlas.com/20220625/UkX9aSoT/index.m3u8',
  'https://v5.cdtlas.com/20220625/7TIsaw8O/index.m3u8',
  'https://v5.cdtlas.com/20220625/gUrdNvUa/index.m3u8',
  'https://v5.cdtlas.com/20220625/yqFo87fk/index.m3u8',
  'https://v5.cdtlas.com/20220625/jm5c62HW/index.m3u8',
  'https://v5.cdtlas.com/20220625/IoZPjbSV/index.m3u8',
  'https://v5.cdtlas.com/20220625/CIKhtfdD/index.m3u8',
  'https://v5.cdtlas.com/20220625/zzXRaWmp/index.m3u8',
  'https://v5.cdtlas.com/20220625/KtCTCP00/index.m3u8',
  'https://v5.cdtlas.com/20220625/qMhcCOEx/index.m3u8',
  'https://v5.cdtlas.com/20220625/n9SMbdGF/index.m3u8',
  'https://v5.cdtlas.com/20220625/b1hbKSmn/index.m3u8',
  'https://v5.cdtlas.com/20220625/x322ilXg/index.m3u8',
  'https://v5.cdtlas.com/20220625/j3kpHaON/index.m3u8',
  'https://v5.cdtlas.com/20220625/76aW9LM8/index.m3u8',
  'https://v5.cdtlas.com/20220625/9QnWdleC/index.m3u8',
  'https://v5.cdtlas.com/20220625/0YjmQ7Dp/index.m3u8',
];

function getMovieSource(numId, arr, name) {
  const movieObj = {
    id: numId,
    name: name,
    logo: 'https://hbimg.b0.upaiyun.com/be5e0391080aa6f8f472e50139205404f4a5721d147db-xMBaaX_fw658',
    info: name,
    order: 1,
    sources: arr.map((dataItem, index) => {
      return {
        id: Number(numId.toString() + (index + 1).toString().padStart(2, 0)),
        name: (index + 1).toString(),
        source: dataItem,
      };
    }),
  };
  return movieObj;
}

var movies = getMovieSource(numId, arr, name);
copy(movies);
