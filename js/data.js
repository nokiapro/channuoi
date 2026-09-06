
const DEFAULT_ANIMALS = [
  {
    id: 'ga-mai',
    icon: '🐔',
    name: 'Gà mái',
    type: 'gia-cam',
    buyPrice: 50,
    raiseTime: 36000,
    raiseStages: [10800, 19800, 28800, 36000],
    yield: 2,
    sellPrice: 35,
    xp: 6,
    desc: 'Gà mái đẻ trứng đều.'
  },
  {
    id: 'ga-trong',
    icon: '🐓',
    name: 'Gà trống',
    type: 'gia-cam',
    buyPrice: 80,
    raiseTime: 49500,
    raiseStages: [14400, 27000, 39600, 49500],
    yield: 1,
    sellPrice: 60,
    xp: 9,
    desc: 'Gà trống oai vệ.'
  },
  {
    id: 'vit-bau',
    icon: '🦆',
    name: 'Vịt bầu',
    type: 'gia-cam',
    buyPrice: 70,
    raiseTime: 45000,
    raiseStages: [13500, 24300, 36000, 45000],
    yield: 2,
    sellPrice: 45,
    xp: 8,
    desc: 'Vịt bầu đẻ trứng to.'
  },
  {
    id: 'vit-co',
    icon: '🦆',
    name: 'Vịt cỏ',
    type: 'gia-cam',
    buyPrice: 55,
    raiseTime: 37800,
    raiseStages: [10800, 20700, 29700, 37800],
    yield: 2,
    sellPrice: 38,
    xp: 7,
    desc: 'Vịt cỏ dễ nuôi.'
  },
  {
    id: 'ngan',
    icon: '🦢',
    name: 'Ngan',
    type: 'gia-cam',
    buyPrice: 90,
    raiseTime: 58500,
    raiseStages: [17100, 31500, 46800, 58500],
    yield: 2,
    sellPrice: 55,
    xp: 10,
    desc: 'Ngan thịt chắc.'
  },
  {
    id: 'ngong',
    icon: '🪿',
    name: 'Ngỗng',
    type: 'gia-cam',
    buyPrice: 110,
    raiseTime: 63000,
    raiseStages: [18900, 34200, 50400, 63000],
    yield: 1,
    sellPrice: 75,
    xp: 12,
    desc: 'Ngỗng canh nhà.'
  },
  {
    id: 'chim-cut',
    icon: '🐦',
    name: 'Chim cút',
    type: 'gia-cam',
    buyPrice: 40,
    raiseTime: 27000,
    raiseStages: [8100, 14400, 21600, 27000],
    yield: 3,
    sellPrice: 22,
    xp: 5,
    desc: 'Chim cút đẻ nhiều trứng.'
  },
  {
    id: 'bo-cau',
    icon: '🕊️',
    name: 'Bồ câu',
    type: 'gia-cam',
    buyPrice: 60,
    raiseTime: 40500,
    raiseStages: [11700, 21600, 32400, 40500],
    yield: 2,
    sellPrice: 40,
    xp: 7,
    desc: 'Bồ câu thịt ngon.'
  },
  {
    id: 'tho-trang',
    icon: '🐰',
    name: 'Thỏ trắng',
    type: 'nho',
    buyPrice: 100,
    raiseTime: 72000,
    raiseStages: [21600, 39600, 57600, 72000],
    yield: 1,
    sellPrice: 70,
    xp: 11,
    desc: 'Thỏ trắng lông mềm.'
  },
  {
    id: 'tho-xam',
    icon: '🐇',
    name: 'Thỏ xám',
    type: 'nho',
    buyPrice: 95,
    raiseTime: 67500,
    raiseStages: [19800, 36900, 54000, 67500],
    yield: 1,
    sellPrice: 65,
    xp: 10,
    desc: 'Thỏ xám nhanh nhẹn.'
  },
  {
    id: 'chuot-lang',
    icon: '🐹',
    name: 'Chuột lang',
    type: 'nho',
    buyPrice: 45,
    raiseTime: 31500,
    raiseStages: [9000, 17100, 25200, 31500],
    yield: 2,
    sellPrice: 28,
    xp: 5,
    desc: 'Chuột lang dễ thương.'
  },
  {
    id: 'soc',
    icon: '🐿️',
    name: 'Sóc',
    type: 'nho',
    buyPrice: 85,
    raiseTime: 54000,
    raiseStages: [16200, 29700, 43200, 54000],
    yield: 1,
    sellPrice: 58,
    xp: 9,
    desc: 'Sóc nhanh nhẹn.'
  },
  {
    id: 'de-sua',
    icon: '🐐',
    name: 'Dê sữa',
    type: 'gia-suc',
    buyPrice: 200,
    raiseTime: 108000,
    raiseStages: [32400, 59400, 86400, 108000],
    yield: 1,
    sellPrice: 140,
    xp: 18,
    desc: 'Dê cho sữa ngon.'
  },
  {
    id: 'de-thit',
    icon: '🐐',
    name: 'Dê thịt',
    type: 'gia-suc',
    buyPrice: 180,
    raiseTime: 99000,
    raiseStages: [29700, 54000, 79200, 99000],
    yield: 1,
    sellPrice: 130,
    xp: 16,
    desc: 'Dê thịt chắc.'
  },
  {
    id: 'cuu-len',
    icon: '🐑',
    name: 'Cừu len',
    type: 'gia-suc',
    buyPrice: 220,
    raiseTime: 126000,
    raiseStages: [37800, 69300, 100800, 126000],
    yield: 1,
    sellPrice: 150,
    xp: 20,
    desc: 'Cừu cho len ấm.'
  },
  {
    id: 'cuu-thit',
    icon: '🐑',
    name: 'Cừu thịt',
    type: 'gia-suc',
    buyPrice: 210,
    raiseTime: 117000,
    raiseStages: [35100, 63900, 93600, 117000],
    yield: 1,
    sellPrice: 145,
    xp: 19,
    desc: 'Cừu thịt ngon.'
  },
  {
    id: 'heo-moi',
    icon: '🐷',
    name: 'Heo mọi',
    type: 'gia-suc',
    buyPrice: 250,
    raiseTime: 135000,
    raiseStages: [40500, 73800, 108000, 135000],
    yield: 1,
    sellPrice: 170,
    xp: 22,
    desc: 'Heo mọi đặc sản.'
  },
  {
    id: 'heo-lai',
    icon: '🐖',
    name: 'Heo lai',
    type: 'gia-suc',
    buyPrice: 280,
    raiseTime: 144000,
    raiseStages: [43200, 79200, 115200, 144000],
    yield: 1,
    sellPrice: 185,
    xp: 24,
    desc: 'Heo lai lớn nhanh.'
  },
  {
    id: 'heo-rung',
    icon: '🐗',
    name: 'Heo rừng',
    type: 'gia-suc',
    buyPrice: 350,
    raiseTime: 180000,
    raiseStages: [54000, 99000, 144000, 180000],
    yield: 1,
    sellPrice: 240,
    xp: 30,
    desc: 'Heo rừng chắc thịt.'
  },
  {
    id: 'bo-sua',
    icon: '🐄',
    name: 'Bò sữa',
    type: 'lon',
    buyPrice: 450,
    raiseTime: 216000,
    raiseStages: [64800, 118800, 172800, 216000],
    yield: 2,
    sellPrice: 160,
    xp: 35,
    desc: 'Bò sữa năng suất cao.'
  },
  {
    id: 'bo-thit',
    icon: '🐂',
    name: 'Bò thịt',
    type: 'lon',
    buyPrice: 500,
    raiseTime: 234000,
    raiseStages: [70200, 128700, 187200, 234000],
    yield: 1,
    sellPrice: 320,
    xp: 38,
    desc: 'Bò thịt chất lượng.'
  },
  {
    id: 'trau',
    icon: '🐃',
    name: 'Trâu',
    type: 'lon',
    buyPrice: 550,
    raiseTime: 252000,
    raiseStages: [75600, 138600, 201600, 252000],
    yield: 1,
    sellPrice: 350,
    xp: 40,
    desc: 'Trâu khỏe mạnh.'
  },
  {
    id: 'ngua',
    icon: '🐴',
    name: 'Ngựa',
    type: 'lon',
    buyPrice: 700,
    raiseTime: 270000,
    raiseStages: [81000, 148500, 216000, 270000],
    yield: 1,
    sellPrice: 420,
    xp: 48,
    desc: 'Ngựa quý hiếm.'
  },
  {
    id: 'lua',
    icon: '🫏',
    name: 'Lừa',
    type: 'lon',
    buyPrice: 400,
    raiseTime: 198000,
    raiseStages: [59400, 108900, 158400, 198000],
    yield: 1,
    sellPrice: 280,
    xp: 32,
    desc: 'Lừa chịu khó.'
  },
  {
    id: 'lac-da',
    icon: '🐪',
    name: 'Lạc đà',
    type: 'lon',
    buyPrice: 800,
    raiseTime: 315000,
    raiseStages: [94500, 172800, 252000, 315000],
    yield: 1,
    sellPrice: 480,
    xp: 55,
    desc: 'Lạc đà sa mạc.'
  },
  {
    id: 'cho-san',
    icon: '🐕',
    name: 'Chó săn',
    type: 'dac-biet',
    buyPrice: 320,
    raiseTime: 162000,
    raiseStages: [48600, 89100, 129600, 162000],
    yield: 1,
    sellPrice: 220,
    xp: 28,
    desc: 'Chó săn trung thành.'
  },
  {
    id: 'meo',
    icon: '🐈',
    name: 'Mèo',
    type: 'dac-biet',
    buyPrice: 150,
    raiseTime: 81000,
    raiseStages: [24300, 44100, 64800, 81000],
    yield: 1,
    sellPrice: 100,
    xp: 14,
    desc: 'Mèo bắt chuột.'
  },
  {
    id: 'ca-koi',
    icon: '🐟',
    name: 'Cá Koi',
    type: 'dac-biet',
    buyPrice: 180,
    raiseTime: 90000,
    raiseStages: [27000, 49500, 72000, 90000],
    yield: 1,
    sellPrice: 120,
    xp: 15,
    desc: 'Cá Koi phong thủy.'
  },
  {
    id: 'tom',
    icon: '🦐',
    name: 'Tôm',
    type: 'dac-biet',
    buyPrice: 90,
    raiseTime: 45000,
    raiseStages: [13500, 24300, 36000, 45000],
    yield: 3,
    sellPrice: 35,
    xp: 8,
    desc: 'Tôm nước ngọt.'
  },
  {
    id: 'cua',
    icon: '🦀',
    name: 'Cua',
    type: 'dac-biet',
    buyPrice: 100,
    raiseTime: 49500,
    raiseStages: [14400, 27000, 39600, 49500],
    yield: 2,
    sellPrice: 42,
    xp: 9,
    desc: 'Cua đồng.'
  },
  {
    id: 'ong',
    icon: '🐝',
    name: 'Ong mật',
    type: 'dac-biet',
    buyPrice: 120,
    raiseTime: 63000,
    raiseStages: [18900, 34200, 50400, 63000],
    yield: 2,
    sellPrice: 50,
    xp: 11,
    desc: 'Ong cho mật ngọt.'
  },
  {
    id: 'tam',
    icon: '🐛',
    name: 'Tằm',
    type: 'dac-biet',
    buyPrice: 70,
    raiseTime: 36000,
    raiseStages: [10800, 19800, 28800, 36000],
    yield: 2,
    sellPrice: 30,
    xp: 6,
    desc: 'Tằm cho tơ.'
  },
  {
    id: 'vit-001',
    icon: '🦆',
    name: 'Vịt #1',
    type: 'gia-cam',
    buyPrice: 58,
    raiseTime: 41400,
    raiseStages: [9900, 20700, 30600, 41400],
    yield: 2,
    sellPrice: 32,
    xp: 5,
    desc: 'Giống Vịt số 1.'
  },
  {
    id: 'heo-002',
    icon: '🐷',
    name: 'Heo #2',
    type: 'gia-suc',
    buyPrice: 206,
    raiseTime: 127800,
    raiseStages: [31500, 63900, 95400, 127800],
    yield: 3,
    sellPrice: 115,
    xp: 6,
    desc: 'Giống Heo số 2.'
  },
  {
    id: 'bo-003',
    icon: '🐄',
    name: 'Bò #3',
    type: 'lon',
    buyPrice: 409,
    raiseTime: 200700,
    raiseStages: [49500, 99900, 150300, 200700],
    yield: 1,
    sellPrice: 227,
    xp: 7,
    desc: 'Giống Bò số 3.'
  },
  {
    id: 'de-004',
    icon: '🐐',
    name: 'Dê #4',
    type: 'gia-suc',
    buyPrice: 172,
    raiseTime: 93600,
    raiseStages: [23400, 46800, 70200, 93600],
    yield: 2,
    sellPrice: 98,
    xp: 8,
    desc: 'Giống Dê số 4.'
  },
  {
    id: 'cuu-005',
    icon: '🐑',
    name: 'Cừu #5',
    type: 'gia-suc',
    buyPrice: 195,
    raiseTime: 112500,
    raiseStages: [27900, 55800, 83700, 112500],
    yield: 3,
    sellPrice: 112,
    xp: 9,
    desc: 'Giống Cừu số 5.'
  },
  {
    id: 'tho-006',
    icon: '🐰',
    name: 'Thỏ #6',
    type: 'nho',
    buyPrice: 98,
    raiseTime: 59400,
    raiseStages: [14400, 29700, 44100, 59400],
    yield: 1,
    sellPrice: 59,
    xp: 10,
    desc: 'Giống Thỏ số 6.'
  },
  {
    id: 'ngua-007',
    icon: '🐴',
    name: 'Ngựa #7',
    type: 'lon',
    buyPrice: 621,
    raiseTime: 258300,
    raiseStages: [63900, 128700, 193500, 258300],
    yield: 2,
    sellPrice: 348,
    xp: 11,
    desc: 'Giống Ngựa số 7.'
  },
  {
    id: 'cho-008',
    icon: '🐕',
    name: 'Chó #8',
    type: 'dac-biet',
    buyPrice: 274,
    raiseTime: 142200,
    raiseStages: [35100, 71100, 106200, 142200],
    yield: 3,
    sellPrice: 158,
    xp: 12,
    desc: 'Giống Chó số 8.'
  },
  {
    id: 'meo-009',
    icon: '🐈',
    name: 'Mèo #9',
    type: 'dac-biet',
    buyPrice: 147,
    raiseTime: 80100,
    raiseStages: [19800, 39600, 59400, 80100],
    yield: 1,
    sellPrice: 89,
    xp: 13,
    desc: 'Giống Mèo số 9.'
  },
  {
    id: 'ga-010',
    icon: '🐔',
    name: 'Gà #10',
    type: 'gia-cam',
    buyPrice: 70,
    raiseTime: 40500,
    raiseStages: [9900, 19800, 29700, 40500],
    yield: 2,
    sellPrice: 48,
    xp: 14,
    desc: 'Giống Gà số 10.'
  },
  {
    id: 'vit-011',
    icon: '🦆',
    name: 'Vịt #11',
    type: 'gia-cam',
    buyPrice: 88,
    raiseTime: 50400,
    raiseStages: [12600, 25200, 37800, 50400],
    yield: 3,
    sellPrice: 59,
    xp: 15,
    desc: 'Giống Vịt số 11.'
  },
  {
    id: 'heo-012',
    icon: '🐷',
    name: 'Heo #12',
    type: 'gia-suc',
    buyPrice: 236,
    raiseTime: 136800,
    raiseStages: [34200, 68400, 102600, 136800],
    yield: 1,
    sellPrice: 141,
    xp: 16,
    desc: 'Giống Heo số 12.'
  },
  {
    id: 'bo-013',
    icon: '🐄',
    name: 'Bò #13',
    type: 'lon',
    buyPrice: 439,
    raiseTime: 209700,
    raiseStages: [52200, 104400, 156600, 209700],
    yield: 2,
    sellPrice: 254,
    xp: 17,
    desc: 'Giống Bò số 13.'
  },
  {
    id: 'de-014',
    icon: '🐐',
    name: 'Dê #14',
    type: 'gia-suc',
    buyPrice: 202,
    raiseTime: 102600,
    raiseStages: [25200, 51300, 76500, 102600],
    yield: 3,
    sellPrice: 125,
    xp: 18,
    desc: 'Giống Dê số 14.'
  },
  {
    id: 'cuu-015',
    icon: '🐑',
    name: 'Cừu #15',
    type: 'gia-suc',
    buyPrice: 225,
    raiseTime: 121500,
    raiseStages: [29700, 60300, 90900, 121500],
    yield: 1,
    sellPrice: 138,
    xp: 19,
    desc: 'Giống Cừu số 15.'
  },
  {
    id: 'tho-016',
    icon: '🐰',
    name: 'Thỏ #16',
    type: 'nho',
    buyPrice: 128,
    raiseTime: 68400,
    raiseStages: [17100, 34200, 51300, 68400],
    yield: 2,
    sellPrice: 86,
    xp: 20,
    desc: 'Giống Thỏ số 16.'
  },
  {
    id: 'ngua-017',
    icon: '🐴',
    name: 'Ngựa #17',
    type: 'lon',
    buyPrice: 651,
    raiseTime: 267300,
    raiseStages: [66600, 133200, 199800, 267300],
    yield: 3,
    sellPrice: 375,
    xp: 21,
    desc: 'Giống Ngựa số 17.'
  },
  {
    id: 'cho-018',
    icon: '🐕',
    name: 'Chó #18',
    type: 'dac-biet',
    buyPrice: 304,
    raiseTime: 151200,
    raiseStages: [37800, 75600, 113400, 151200],
    yield: 1,
    sellPrice: 185,
    xp: 22,
    desc: 'Giống Chó số 18.'
  },
  {
    id: 'meo-019',
    icon: '🐈',
    name: 'Mèo #19',
    type: 'dac-biet',
    buyPrice: 177,
    raiseTime: 89100,
    raiseStages: [21600, 44100, 66600, 89100],
    yield: 2,
    sellPrice: 116,
    xp: 23,
    desc: 'Giống Mèo số 19.'
  },
  {
    id: 'ga-020',
    icon: '🐔',
    name: 'Gà #20',
    type: 'gia-cam',
    buyPrice: 100,
    raiseTime: 49500,
    raiseStages: [11700, 24300, 36900, 49500],
    yield: 3,
    sellPrice: 55,
    xp: 24,
    desc: 'Giống Gà số 20.'
  },
  {
    id: 'vit-021',
    icon: '🦆',
    name: 'Vịt #21',
    type: 'gia-cam',
    buyPrice: 118,
    raiseTime: 59400,
    raiseStages: [14400, 29700, 44100, 59400],
    yield: 1,
    sellPrice: 65,
    xp: 25,
    desc: 'Giống Vịt số 21.'
  },
  {
    id: 'heo-022',
    icon: '🐷',
    name: 'Heo #22',
    type: 'gia-suc',
    buyPrice: 266,
    raiseTime: 145800,
    raiseStages: [36000, 72900, 108900, 145800],
    yield: 2,
    sellPrice: 148,
    xp: 26,
    desc: 'Giống Heo số 22.'
  },
  {
    id: 'bo-023',
    icon: '🐄',
    name: 'Bò #23',
    type: 'lon',
    buyPrice: 469,
    raiseTime: 218700,
    raiseStages: [54000, 108900, 163800, 218700],
    yield: 3,
    sellPrice: 260,
    xp: 27,
    desc: 'Giống Bò số 23.'
  },
  {
    id: 'de-024',
    icon: '🐐',
    name: 'Dê #24',
    type: 'gia-suc',
    buyPrice: 232,
    raiseTime: 111600,
    raiseStages: [27900, 55800, 83700, 111600],
    yield: 1,
    sellPrice: 131,
    xp: 28,
    desc: 'Giống Dê số 24.'
  },
  {
    id: 'cuu-025',
    icon: '🐑',
    name: 'Cừu #25',
    type: 'gia-suc',
    buyPrice: 255,
    raiseTime: 130500,
    raiseStages: [32400, 64800, 97200, 130500],
    yield: 2,
    sellPrice: 145,
    xp: 29,
    desc: 'Giống Cừu số 25.'
  },
  {
    id: 'tho-026',
    icon: '🐰',
    name: 'Thỏ #26',
    type: 'nho',
    buyPrice: 158,
    raiseTime: 77400,
    raiseStages: [18900, 38700, 57600, 77400],
    yield: 3,
    sellPrice: 92,
    xp: 30,
    desc: 'Giống Thỏ số 26.'
  },
  {
    id: 'ngua-027',
    icon: '🐴',
    name: 'Ngựa #27',
    type: 'lon',
    buyPrice: 681,
    raiseTime: 276300,
    raiseStages: [68400, 137700, 207000, 276300],
    yield: 1,
    sellPrice: 381,
    xp: 31,
    desc: 'Giống Ngựa số 27.'
  },
  {
    id: 'cho-028',
    icon: '🐕',
    name: 'Chó #28',
    type: 'dac-biet',
    buyPrice: 334,
    raiseTime: 160200,
    raiseStages: [39600, 80100, 119700, 160200],
    yield: 2,
    sellPrice: 191,
    xp: 32,
    desc: 'Giống Chó số 28.'
  },
  {
    id: 'meo-029',
    icon: '🐈',
    name: 'Mèo #29',
    type: 'dac-biet',
    buyPrice: 207,
    raiseTime: 98100,
    raiseStages: [24300, 48600, 72900, 98100],
    yield: 3,
    sellPrice: 122,
    xp: 33,
    desc: 'Giống Mèo số 29.'
  },
  {
    id: 'ga-030',
    icon: '🐔',
    name: 'Gà #30',
    type: 'gia-cam',
    buyPrice: 130,
    raiseTime: 58500,
    raiseStages: [14400, 28800, 43200, 58500],
    yield: 1,
    sellPrice: 81,
    xp: 4,
    desc: 'Giống Gà số 30.'
  },
  {
    id: 'vit-031',
    icon: '🦆',
    name: 'Vịt #31',
    type: 'gia-cam',
    buyPrice: 148,
    raiseTime: 68400,
    raiseStages: [17100, 34200, 51300, 68400],
    yield: 2,
    sellPrice: 92,
    xp: 5,
    desc: 'Giống Vịt số 31.'
  },
  {
    id: 'heo-032',
    icon: '🐷',
    name: 'Heo #32',
    type: 'gia-suc',
    buyPrice: 296,
    raiseTime: 154800,
    raiseStages: [38700, 77400, 116100, 154800],
    yield: 3,
    sellPrice: 174,
    xp: 6,
    desc: 'Giống Heo số 32.'
  },
  {
    id: 'bo-033',
    icon: '🐄',
    name: 'Bò #33',
    type: 'lon',
    buyPrice: 499,
    raiseTime: 227700,
    raiseStages: [56700, 113400, 170100, 227700],
    yield: 1,
    sellPrice: 287,
    xp: 7,
    desc: 'Giống Bò số 33.'
  },
  {
    id: 'de-034',
    icon: '🐐',
    name: 'Dê #34',
    type: 'gia-suc',
    buyPrice: 262,
    raiseTime: 120600,
    raiseStages: [29700, 60300, 90000, 120600],
    yield: 2,
    sellPrice: 158,
    xp: 8,
    desc: 'Giống Dê số 34.'
  },
  {
    id: 'cuu-035',
    icon: '🐑',
    name: 'Cừu #35',
    type: 'gia-suc',
    buyPrice: 285,
    raiseTime: 139500,
    raiseStages: [34200, 69300, 104400, 139500],
    yield: 3,
    sellPrice: 171,
    xp: 9,
    desc: 'Giống Cừu số 35.'
  },
  {
    id: 'tho-036',
    icon: '🐰',
    name: 'Thỏ #36',
    type: 'nho',
    buyPrice: 188,
    raiseTime: 86400,
    raiseStages: [21600, 43200, 64800, 86400],
    yield: 1,
    sellPrice: 119,
    xp: 10,
    desc: 'Giống Thỏ số 36.'
  },
  {
    id: 'ngua-037',
    icon: '🐴',
    name: 'Ngựa #37',
    type: 'lon',
    buyPrice: 711,
    raiseTime: 285300,
    raiseStages: [71100, 142200, 213300, 285300],
    yield: 2,
    sellPrice: 408,
    xp: 11,
    desc: 'Giống Ngựa số 37.'
  },
  {
    id: 'cho-038',
    icon: '🐕',
    name: 'Chó #38',
    type: 'dac-biet',
    buyPrice: 364,
    raiseTime: 169200,
    raiseStages: [42300, 84600, 126900, 169200],
    yield: 3,
    sellPrice: 218,
    xp: 12,
    desc: 'Giống Chó số 38.'
  },
  {
    id: 'meo-039',
    icon: '🐈',
    name: 'Mèo #39',
    type: 'dac-biet',
    buyPrice: 237,
    raiseTime: 107100,
    raiseStages: [26100, 53100, 80100, 107100],
    yield: 1,
    sellPrice: 149,
    xp: 13,
    desc: 'Giống Mèo số 39.'
  },
  {
    id: 'ga-040',
    icon: '🐔',
    name: 'Gà #40',
    type: 'gia-cam',
    buyPrice: 160,
    raiseTime: 31500,
    raiseStages: [7200, 15300, 23400, 31500],
    yield: 2,
    sellPrice: 88,
    xp: 14,
    desc: 'Giống Gà số 40.'
  },
  {
    id: 'vit-041',
    icon: '🦆',
    name: 'Vịt #41',
    type: 'gia-cam',
    buyPrice: 178,
    raiseTime: 41400,
    raiseStages: [9900, 20700, 30600, 41400],
    yield: 3,
    sellPrice: 98,
    xp: 15,
    desc: 'Giống Vịt số 41.'
  },
  {
    id: 'heo-042',
    icon: '🐷',
    name: 'Heo #42',
    type: 'gia-suc',
    buyPrice: 326,
    raiseTime: 127800,
    raiseStages: [31500, 63900, 95400, 127800],
    yield: 1,
    sellPrice: 181,
    xp: 16,
    desc: 'Giống Heo số 42.'
  },
  {
    id: 'bo-043',
    icon: '🐄',
    name: 'Bò #43',
    type: 'lon',
    buyPrice: 529,
    raiseTime: 200700,
    raiseStages: [49500, 99900, 150300, 200700],
    yield: 2,
    sellPrice: 293,
    xp: 17,
    desc: 'Giống Bò số 43.'
  },
  {
    id: 'de-044',
    icon: '🐐',
    name: 'Dê #44',
    type: 'gia-suc',
    buyPrice: 292,
    raiseTime: 93600,
    raiseStages: [23400, 46800, 70200, 93600],
    yield: 3,
    sellPrice: 164,
    xp: 18,
    desc: 'Giống Dê số 44.'
  },
  {
    id: 'cuu-045',
    icon: '🐑',
    name: 'Cừu #45',
    type: 'gia-suc',
    buyPrice: 315,
    raiseTime: 112500,
    raiseStages: [27900, 55800, 83700, 112500],
    yield: 1,
    sellPrice: 178,
    xp: 19,
    desc: 'Giống Cừu số 45.'
  },
  {
    id: 'tho-046',
    icon: '🐰',
    name: 'Thỏ #46',
    type: 'nho',
    buyPrice: 218,
    raiseTime: 59400,
    raiseStages: [14400, 29700, 44100, 59400],
    yield: 2,
    sellPrice: 125,
    xp: 20,
    desc: 'Giống Thỏ số 46.'
  },
  {
    id: 'ngua-047',
    icon: '🐴',
    name: 'Ngựa #47',
    type: 'lon',
    buyPrice: 741,
    raiseTime: 258300,
    raiseStages: [63900, 128700, 193500, 258300],
    yield: 3,
    sellPrice: 414,
    xp: 21,
    desc: 'Giống Ngựa số 47.'
  },
  {
    id: 'cho-048',
    icon: '🐕',
    name: 'Chó #48',
    type: 'dac-biet',
    buyPrice: 394,
    raiseTime: 142200,
    raiseStages: [35100, 71100, 106200, 142200],
    yield: 1,
    sellPrice: 224,
    xp: 22,
    desc: 'Giống Chó số 48.'
  },
  {
    id: 'meo-049',
    icon: '🐈',
    name: 'Mèo #49',
    type: 'dac-biet',
    buyPrice: 267,
    raiseTime: 80100,
    raiseStages: [19800, 39600, 59400, 80100],
    yield: 2,
    sellPrice: 155,
    xp: 23,
    desc: 'Giống Mèo số 49.'
  },
  {
    id: 'ga-050',
    icon: '🐔',
    name: 'Gà #50',
    type: 'gia-cam',
    buyPrice: 40,
    raiseTime: 40500,
    raiseStages: [9900, 19800, 29700, 40500],
    yield: 3,
    sellPrice: 32,
    xp: 24,
    desc: 'Giống Gà số 50.'
  },
  {
    id: 'vit-051',
    icon: '🦆',
    name: 'Vịt #51',
    type: 'gia-cam',
    buyPrice: 58,
    raiseTime: 50400,
    raiseStages: [12600, 25200, 37800, 50400],
    yield: 1,
    sellPrice: 42,
    xp: 25,
    desc: 'Giống Vịt số 51.'
  },
  {
    id: 'heo-052',
    icon: '🐷',
    name: 'Heo #52',
    type: 'gia-suc',
    buyPrice: 206,
    raiseTime: 136800,
    raiseStages: [34200, 68400, 102600, 136800],
    yield: 2,
    sellPrice: 125,
    xp: 26,
    desc: 'Giống Heo số 52.'
  },
  {
    id: 'bo-053',
    icon: '🐄',
    name: 'Bò #53',
    type: 'lon',
    buyPrice: 409,
    raiseTime: 209700,
    raiseStages: [52200, 104400, 156600, 209700],
    yield: 3,
    sellPrice: 237,
    xp: 27,
    desc: 'Giống Bò số 53.'
  },
  {
    id: 'de-054',
    icon: '🐐',
    name: 'Dê #54',
    type: 'gia-suc',
    buyPrice: 172,
    raiseTime: 102600,
    raiseStages: [25200, 51300, 76500, 102600],
    yield: 1,
    sellPrice: 108,
    xp: 28,
    desc: 'Giống Dê số 54.'
  },
  {
    id: 'cuu-055',
    icon: '🐑',
    name: 'Cừu #55',
    type: 'gia-suc',
    buyPrice: 195,
    raiseTime: 121500,
    raiseStages: [29700, 60300, 90900, 121500],
    yield: 2,
    sellPrice: 122,
    xp: 29,
    desc: 'Giống Cừu số 55.'
  },
  {
    id: 'tho-056',
    icon: '🐰',
    name: 'Thỏ #56',
    type: 'nho',
    buyPrice: 98,
    raiseTime: 68400,
    raiseStages: [17100, 34200, 51300, 68400],
    yield: 3,
    sellPrice: 69,
    xp: 30,
    desc: 'Giống Thỏ số 56.'
  },
  {
    id: 'ngua-057',
    icon: '🐴',
    name: 'Ngựa #57',
    type: 'lon',
    buyPrice: 621,
    raiseTime: 267300,
    raiseStages: [66600, 133200, 199800, 267300],
    yield: 1,
    sellPrice: 358,
    xp: 31,
    desc: 'Giống Ngựa số 57.'
  },
  {
    id: 'cho-058',
    icon: '🐕',
    name: 'Chó #58',
    type: 'dac-biet',
    buyPrice: 274,
    raiseTime: 151200,
    raiseStages: [37800, 75600, 113400, 151200],
    yield: 2,
    sellPrice: 168,
    xp: 32,
    desc: 'Giống Chó số 58.'
  },
  {
    id: 'meo-059',
    icon: '🐈',
    name: 'Mèo #59',
    type: 'dac-biet',
    buyPrice: 147,
    raiseTime: 89100,
    raiseStages: [21600, 44100, 66600, 89100],
    yield: 3,
    sellPrice: 99,
    xp: 33,
    desc: 'Giống Mèo số 59.'
  },
  {
    id: 'ga-060',
    icon: '🐔',
    name: 'Gà #60',
    type: 'gia-cam',
    buyPrice: 70,
    raiseTime: 49500,
    raiseStages: [11700, 24300, 36900, 49500],
    yield: 1,
    sellPrice: 38,
    xp: 4,
    desc: 'Giống Gà số 60.'
  },
  {
    id: 'vit-061',
    icon: '🦆',
    name: 'Vịt #61',
    type: 'gia-cam',
    buyPrice: 88,
    raiseTime: 59400,
    raiseStages: [14400, 29700, 44100, 59400],
    yield: 2,
    sellPrice: 49,
    xp: 5,
    desc: 'Giống Vịt số 61.'
  },
  {
    id: 'heo-062',
    icon: '🐷',
    name: 'Heo #62',
    type: 'gia-suc',
    buyPrice: 236,
    raiseTime: 145800,
    raiseStages: [36000, 72900, 108900, 145800],
    yield: 3,
    sellPrice: 131,
    xp: 6,
    desc: 'Giống Heo số 62.'
  },
  {
    id: 'bo-063',
    icon: '🐄',
    name: 'Bò #63',
    type: 'lon',
    buyPrice: 439,
    raiseTime: 218700,
    raiseStages: [54000, 108900, 163800, 218700],
    yield: 1,
    sellPrice: 244,
    xp: 7,
    desc: 'Giống Bò số 63.'
  },
  {
    id: 'de-064',
    icon: '🐐',
    name: 'Dê #64',
    type: 'gia-suc',
    buyPrice: 202,
    raiseTime: 111600,
    raiseStages: [27900, 55800, 83700, 111600],
    yield: 2,
    sellPrice: 115,
    xp: 8,
    desc: 'Giống Dê số 64.'
  },
  {
    id: 'cuu-065',
    icon: '🐑',
    name: 'Cừu #65',
    type: 'gia-suc',
    buyPrice: 225,
    raiseTime: 130500,
    raiseStages: [32400, 64800, 97200, 130500],
    yield: 3,
    sellPrice: 128,
    xp: 9,
    desc: 'Giống Cừu số 65.'
  },
  {
    id: 'tho-066',
    icon: '🐰',
    name: 'Thỏ #66',
    type: 'nho',
    buyPrice: 128,
    raiseTime: 77400,
    raiseStages: [18900, 38700, 57600, 77400],
    yield: 1,
    sellPrice: 76,
    xp: 10,
    desc: 'Giống Thỏ số 66.'
  },
  {
    id: 'ngua-067',
    icon: '🐴',
    name: 'Ngựa #67',
    type: 'lon',
    buyPrice: 651,
    raiseTime: 276300,
    raiseStages: [68400, 137700, 207000, 276300],
    yield: 2,
    sellPrice: 365,
    xp: 11,
    desc: 'Giống Ngựa số 67.'
  },
  {
    id: 'cho-068',
    icon: '🐕',
    name: 'Chó #68',
    type: 'dac-biet',
    buyPrice: 304,
    raiseTime: 160200,
    raiseStages: [39600, 80100, 119700, 160200],
    yield: 3,
    sellPrice: 175,
    xp: 12,
    desc: 'Giống Chó số 68.'
  },
  {
    id: 'meo-069',
    icon: '🐈',
    name: 'Mèo #69',
    type: 'dac-biet',
    buyPrice: 177,
    raiseTime: 98100,
    raiseStages: [24300, 48600, 72900, 98100],
    yield: 1,
    sellPrice: 106,
    xp: 13,
    desc: 'Giống Mèo số 69.'
  },
  {
    id: 'ga-070',
    icon: '🐔',
    name: 'Gà #70',
    type: 'gia-cam',
    buyPrice: 100,
    raiseTime: 58500,
    raiseStages: [14400, 28800, 43200, 58500],
    yield: 2,
    sellPrice: 65,
    xp: 14,
    desc: 'Giống Gà số 70.'
  },
  {
    id: 'vit-071',
    icon: '🦆',
    name: 'Vịt #71',
    type: 'gia-cam',
    buyPrice: 118,
    raiseTime: 68400,
    raiseStages: [17100, 34200, 51300, 68400],
    yield: 3,
    sellPrice: 75,
    xp: 15,
    desc: 'Giống Vịt số 71.'
  },
  {
    id: 'heo-072',
    icon: '🐷',
    name: 'Heo #72',
    type: 'gia-suc',
    buyPrice: 266,
    raiseTime: 154800,
    raiseStages: [38700, 77400, 116100, 154800],
    yield: 1,
    sellPrice: 158,
    xp: 16,
    desc: 'Giống Heo số 72.'
  },
  {
    id: 'bo-073',
    icon: '🐄',
    name: 'Bò #73',
    type: 'lon',
    buyPrice: 469,
    raiseTime: 227700,
    raiseStages: [56700, 113400, 170100, 227700],
    yield: 2,
    sellPrice: 270,
    xp: 17,
    desc: 'Giống Bò số 73.'
  },
  {
    id: 'de-074',
    icon: '🐐',
    name: 'Dê #74',
    type: 'gia-suc',
    buyPrice: 232,
    raiseTime: 120600,
    raiseStages: [29700, 60300, 90000, 120600],
    yield: 3,
    sellPrice: 141,
    xp: 18,
    desc: 'Giống Dê số 74.'
  },
  {
    id: 'cuu-075',
    icon: '🐑',
    name: 'Cừu #75',
    type: 'gia-suc',
    buyPrice: 255,
    raiseTime: 139500,
    raiseStages: [34200, 69300, 104400, 139500],
    yield: 1,
    sellPrice: 155,
    xp: 19,
    desc: 'Giống Cừu số 75.'
  },
  {
    id: 'tho-076',
    icon: '🐰',
    name: 'Thỏ #76',
    type: 'nho',
    buyPrice: 158,
    raiseTime: 86400,
    raiseStages: [21600, 43200, 64800, 86400],
    yield: 2,
    sellPrice: 102,
    xp: 20,
    desc: 'Giống Thỏ số 76.'
  },
  {
    id: 'ngua-077',
    icon: '🐴',
    name: 'Ngựa #77',
    type: 'lon',
    buyPrice: 681,
    raiseTime: 285300,
    raiseStages: [71100, 142200, 213300, 285300],
    yield: 3,
    sellPrice: 391,
    xp: 21,
    desc: 'Giống Ngựa số 77.'
  },
  {
    id: 'cho-078',
    icon: '🐕',
    name: 'Chó #78',
    type: 'dac-biet',
    buyPrice: 334,
    raiseTime: 169200,
    raiseStages: [42300, 84600, 126900, 169200],
    yield: 1,
    sellPrice: 201,
    xp: 22,
    desc: 'Giống Chó số 78.'
  },
  {
    id: 'meo-079',
    icon: '🐈',
    name: 'Mèo #79',
    type: 'dac-biet',
    buyPrice: 207,
    raiseTime: 107100,
    raiseStages: [26100, 53100, 80100, 107100],
    yield: 2,
    sellPrice: 132,
    xp: 23,
    desc: 'Giống Mèo số 79.'
  },
  {
    id: 'ga-080',
    icon: '🐔',
    name: 'Gà #80',
    type: 'gia-cam',
    buyPrice: 130,
    raiseTime: 31500,
    raiseStages: [7200, 15300, 23400, 31500],
    yield: 3,
    sellPrice: 71,
    xp: 24,
    desc: 'Giống Gà số 80.'
  },
  {
    id: 'vit-081',
    icon: '🦆',
    name: 'Vịt #81',
    type: 'gia-cam',
    buyPrice: 148,
    raiseTime: 41400,
    raiseStages: [9900, 20700, 30600, 41400],
    yield: 1,
    sellPrice: 82,
    xp: 25,
    desc: 'Giống Vịt số 81.'
  },
  {
    id: 'heo-082',
    icon: '🐷',
    name: 'Heo #82',
    type: 'gia-suc',
    buyPrice: 296,
    raiseTime: 127800,
    raiseStages: [31500, 63900, 95400, 127800],
    yield: 2,
    sellPrice: 164,
    xp: 26,
    desc: 'Giống Heo số 82.'
  },
  {
    id: 'bo-083',
    icon: '🐄',
    name: 'Bò #83',
    type: 'lon',
    buyPrice: 499,
    raiseTime: 200700,
    raiseStages: [49500, 99900, 150300, 200700],
    yield: 3,
    sellPrice: 277,
    xp: 27,
    desc: 'Giống Bò số 83.'
  },
  {
    id: 'de-084',
    icon: '🐐',
    name: 'Dê #84',
    type: 'gia-suc',
    buyPrice: 262,
    raiseTime: 93600,
    raiseStages: [23400, 46800, 70200, 93600],
    yield: 1,
    sellPrice: 148,
    xp: 28,
    desc: 'Giống Dê số 84.'
  },
  {
    id: 'cuu-085',
    icon: '🐑',
    name: 'Cừu #85',
    type: 'gia-suc',
    buyPrice: 285,
    raiseTime: 112500,
    raiseStages: [27900, 55800, 83700, 112500],
    yield: 2,
    sellPrice: 161,
    xp: 29,
    desc: 'Giống Cừu số 85.'
  },
  {
    id: 'tho-086',
    icon: '🐰',
    name: 'Thỏ #86',
    type: 'nho',
    buyPrice: 188,
    raiseTime: 59400,
    raiseStages: [14400, 29700, 44100, 59400],
    yield: 3,
    sellPrice: 109,
    xp: 30,
    desc: 'Giống Thỏ số 86.'
  },
  {
    id: 'ngua-087',
    icon: '🐴',
    name: 'Ngựa #87',
    type: 'lon',
    buyPrice: 711,
    raiseTime: 258300,
    raiseStages: [63900, 128700, 193500, 258300],
    yield: 1,
    sellPrice: 398,
    xp: 31,
    desc: 'Giống Ngựa số 87.'
  },
  {
    id: 'cho-088',
    icon: '🐕',
    name: 'Chó #88',
    type: 'dac-biet',
    buyPrice: 364,
    raiseTime: 142200,
    raiseStages: [35100, 71100, 106200, 142200],
    yield: 2,
    sellPrice: 208,
    xp: 32,
    desc: 'Giống Chó số 88.'
  },
  {
    id: 'meo-089',
    icon: '🐈',
    name: 'Mèo #89',
    type: 'dac-biet',
    buyPrice: 237,
    raiseTime: 80100,
    raiseStages: [19800, 39600, 59400, 80100],
    yield: 3,
    sellPrice: 139,
    xp: 33,
    desc: 'Giống Mèo số 89.'
  },
  {
    id: 'ga-090',
    icon: '🐔',
    name: 'Gà #90',
    type: 'gia-cam',
    buyPrice: 160,
    raiseTime: 40500,
    raiseStages: [9900, 19800, 29700, 40500],
    yield: 1,
    sellPrice: 98,
    xp: 4,
    desc: 'Giống Gà số 90.'
  },
  {
    id: 'vit-091',
    icon: '🦆',
    name: 'Vịt #91',
    type: 'gia-cam',
    buyPrice: 178,
    raiseTime: 50400,
    raiseStages: [12600, 25200, 37800, 50400],
    yield: 2,
    sellPrice: 108,
    xp: 5,
    desc: 'Giống Vịt số 91.'
  },
  {
    id: 'heo-092',
    icon: '🐷',
    name: 'Heo #92',
    type: 'gia-suc',
    buyPrice: 326,
    raiseTime: 136800,
    raiseStages: [34200, 68400, 102600, 136800],
    yield: 3,
    sellPrice: 191,
    xp: 6,
    desc: 'Giống Heo số 92.'
  },
  {
    id: 'bo-093',
    icon: '🐄',
    name: 'Bò #93',
    type: 'lon',
    buyPrice: 529,
    raiseTime: 209700,
    raiseStages: [52200, 104400, 156600, 209700],
    yield: 1,
    sellPrice: 303,
    xp: 7,
    desc: 'Giống Bò số 93.'
  },
  {
    id: 'de-094',
    icon: '🐐',
    name: 'Dê #94',
    type: 'gia-suc',
    buyPrice: 292,
    raiseTime: 102600,
    raiseStages: [25200, 51300, 76500, 102600],
    yield: 2,
    sellPrice: 174,
    xp: 8,
    desc: 'Giống Dê số 94.'
  },
  {
    id: 'cuu-095',
    icon: '🐑',
    name: 'Cừu #95',
    type: 'gia-suc',
    buyPrice: 315,
    raiseTime: 121500,
    raiseStages: [29700, 60300, 90900, 121500],
    yield: 3,
    sellPrice: 188,
    xp: 9,
    desc: 'Giống Cừu số 95.'
  },
  {
    id: 'tho-096',
    icon: '🐰',
    name: 'Thỏ #96',
    type: 'nho',
    buyPrice: 218,
    raiseTime: 68400,
    raiseStages: [17100, 34200, 51300, 68400],
    yield: 1,
    sellPrice: 135,
    xp: 10,
    desc: 'Giống Thỏ số 96.'
  },
  {
    id: 'ngua-097',
    icon: '🐴',
    name: 'Ngựa #97',
    type: 'lon',
    buyPrice: 741,
    raiseTime: 267300,
    raiseStages: [66600, 133200, 199800, 267300],
    yield: 2,
    sellPrice: 424,
    xp: 11,
    desc: 'Giống Ngựa số 97.'
  },
  {
    id: 'cho-098',
    icon: '🐕',
    name: 'Chó #98',
    type: 'dac-biet',
    buyPrice: 394,
    raiseTime: 151200,
    raiseStages: [37800, 75600, 113400, 151200],
    yield: 3,
    sellPrice: 234,
    xp: 12,
    desc: 'Giống Chó số 98.'
  },
  {
    id: 'meo-099',
    icon: '🐈',
    name: 'Mèo #99',
    type: 'dac-biet',
    buyPrice: 267,
    raiseTime: 89100,
    raiseStages: [21600, 44100, 66600, 89100],
    yield: 1,
    sellPrice: 165,
    xp: 13,
    desc: 'Giống Mèo số 99.'
  },
  {
    id: 'ga-100',
    icon: '🐔',
    name: 'Gà #100',
    type: 'gia-cam',
    buyPrice: 40,
    raiseTime: 49500,
    raiseStages: [11700, 24300, 36900, 49500],
    yield: 2,
    sellPrice: 22,
    xp: 14,
    desc: 'Giống Gà số 100.'
  },
  {
    id: 'vit-101',
    icon: '🦆',
    name: 'Vịt #101',
    type: 'gia-cam',
    buyPrice: 58,
    raiseTime: 59400,
    raiseStages: [14400, 29700, 44100, 59400],
    yield: 3,
    sellPrice: 32,
    xp: 15,
    desc: 'Giống Vịt số 101.'
  },
  {
    id: 'heo-102',
    icon: '🐷',
    name: 'Heo #102',
    type: 'gia-suc',
    buyPrice: 206,
    raiseTime: 145800,
    raiseStages: [36000, 72900, 108900, 145800],
    yield: 1,
    sellPrice: 115,
    xp: 16,
    desc: 'Giống Heo số 102.'
  },
  {
    id: 'bo-103',
    icon: '🐄',
    name: 'Bò #103',
    type: 'lon',
    buyPrice: 409,
    raiseTime: 218700,
    raiseStages: [54000, 108900, 163800, 218700],
    yield: 2,
    sellPrice: 227,
    xp: 17,
    desc: 'Giống Bò số 103.'
  },
  {
    id: 'de-104',
    icon: '🐐',
    name: 'Dê #104',
    type: 'gia-suc',
    buyPrice: 172,
    raiseTime: 111600,
    raiseStages: [27900, 55800, 83700, 111600],
    yield: 3,
    sellPrice: 98,
    xp: 18,
    desc: 'Giống Dê số 104.'
  },
  {
    id: 'cuu-105',
    icon: '🐑',
    name: 'Cừu #105',
    type: 'gia-suc',
    buyPrice: 195,
    raiseTime: 130500,
    raiseStages: [32400, 64800, 97200, 130500],
    yield: 1,
    sellPrice: 112,
    xp: 19,
    desc: 'Giống Cừu số 105.'
  },
  {
    id: 'tho-106',
    icon: '🐰',
    name: 'Thỏ #106',
    type: 'nho',
    buyPrice: 98,
    raiseTime: 77400,
    raiseStages: [18900, 38700, 57600, 77400],
    yield: 2,
    sellPrice: 59,
    xp: 20,
    desc: 'Giống Thỏ số 106.'
  },
  {
    id: 'ngua-107',
    icon: '🐴',
    name: 'Ngựa #107',
    type: 'lon',
    buyPrice: 621,
    raiseTime: 276300,
    raiseStages: [68400, 137700, 207000, 276300],
    yield: 3,
    sellPrice: 348,
    xp: 21,
    desc: 'Giống Ngựa số 107.'
  },
  {
    id: 'cho-108',
    icon: '🐕',
    name: 'Chó #108',
    type: 'dac-biet',
    buyPrice: 274,
    raiseTime: 160200,
    raiseStages: [39600, 80100, 119700, 160200],
    yield: 1,
    sellPrice: 158,
    xp: 22,
    desc: 'Giống Chó số 108.'
  },
  {
    id: 'meo-109',
    icon: '🐈',
    name: 'Mèo #109',
    type: 'dac-biet',
    buyPrice: 147,
    raiseTime: 98100,
    raiseStages: [24300, 48600, 72900, 98100],
    yield: 2,
    sellPrice: 89,
    xp: 23,
    desc: 'Giống Mèo số 109.'
  },
  {
    id: 'ga-110',
    icon: '🐔',
    name: 'Gà #110',
    type: 'gia-cam',
    buyPrice: 70,
    raiseTime: 58500,
    raiseStages: [14400, 28800, 43200, 58500],
    yield: 3,
    sellPrice: 48,
    xp: 24,
    desc: 'Giống Gà số 110.'
  },
  {
    id: 'vit-111',
    icon: '🦆',
    name: 'Vịt #111',
    type: 'gia-cam',
    buyPrice: 88,
    raiseTime: 68400,
    raiseStages: [17100, 34200, 51300, 68400],
    yield: 1,
    sellPrice: 59,
    xp: 25,
    desc: 'Giống Vịt số 111.'
  },
  {
    id: 'heo-112',
    icon: '🐷',
    name: 'Heo #112',
    type: 'gia-suc',
    buyPrice: 236,
    raiseTime: 154800,
    raiseStages: [38700, 77400, 116100, 154800],
    yield: 2,
    sellPrice: 141,
    xp: 26,
    desc: 'Giống Heo số 112.'
  },
  {
    id: 'bo-113',
    icon: '🐄',
    name: 'Bò #113',
    type: 'lon',
    buyPrice: 439,
    raiseTime: 227700,
    raiseStages: [56700, 113400, 170100, 227700],
    yield: 3,
    sellPrice: 254,
    xp: 27,
    desc: 'Giống Bò số 113.'
  },
  {
    id: 'de-114',
    icon: '🐐',
    name: 'Dê #114',
    type: 'gia-suc',
    buyPrice: 202,
    raiseTime: 120600,
    raiseStages: [29700, 60300, 90000, 120600],
    yield: 1,
    sellPrice: 125,
    xp: 28,
    desc: 'Giống Dê số 114.'
  },
  {
    id: 'cuu-115',
    icon: '🐑',
    name: 'Cừu #115',
    type: 'gia-suc',
    buyPrice: 225,
    raiseTime: 139500,
    raiseStages: [34200, 69300, 104400, 139500],
    yield: 2,
    sellPrice: 138,
    xp: 29,
    desc: 'Giống Cừu số 115.'
  },
  {
    id: 'tho-116',
    icon: '🐰',
    name: 'Thỏ #116',
    type: 'nho',
    buyPrice: 128,
    raiseTime: 86400,
    raiseStages: [21600, 43200, 64800, 86400],
    yield: 3,
    sellPrice: 86,
    xp: 30,
    desc: 'Giống Thỏ số 116.'
  },
  {
    id: 'ngua-117',
    icon: '🐴',
    name: 'Ngựa #117',
    type: 'lon',
    buyPrice: 651,
    raiseTime: 285300,
    raiseStages: [71100, 142200, 213300, 285300],
    yield: 1,
    sellPrice: 375,
    xp: 31,
    desc: 'Giống Ngựa số 117.'
  },
  {
    id: 'cho-118',
    icon: '🐕',
    name: 'Chó #118',
    type: 'dac-biet',
    buyPrice: 304,
    raiseTime: 169200,
    raiseStages: [42300, 84600, 126900, 169200],
    yield: 2,
    sellPrice: 185,
    xp: 32,
    desc: 'Giống Chó số 118.'
  },
  {
    id: 'meo-119',
    icon: '🐈',
    name: 'Mèo #119',
    type: 'dac-biet',
    buyPrice: 177,
    raiseTime: 107100,
    raiseStages: [26100, 53100, 80100, 107100],
    yield: 3,
    sellPrice: 116,
    xp: 33,
    desc: 'Giống Mèo số 119.'
  },
  {
    id: 'ga-120',
    icon: '🐔',
    name: 'Gà #120',
    type: 'gia-cam',
    buyPrice: 100,
    raiseTime: 31500,
    raiseStages: [7200, 15300, 23400, 31500],
    yield: 1,
    sellPrice: 55,
    xp: 4,
    desc: 'Giống Gà số 120.'
  },
  {
    id: 'vit-121',
    icon: '🦆',
    name: 'Vịt #121',
    type: 'gia-cam',
    buyPrice: 118,
    raiseTime: 41400,
    raiseStages: [9900, 20700, 30600, 41400],
    yield: 2,
    sellPrice: 65,
    xp: 5,
    desc: 'Giống Vịt số 121.'
  },
  {
    id: 'heo-122',
    icon: '🐷',
    name: 'Heo #122',
    type: 'gia-suc',
    buyPrice: 266,
    raiseTime: 127800,
    raiseStages: [31500, 63900, 95400, 127800],
    yield: 3,
    sellPrice: 148,
    xp: 6,
    desc: 'Giống Heo số 122.'
  },
  {
    id: 'bo-123',
    icon: '🐄',
    name: 'Bò #123',
    type: 'lon',
    buyPrice: 469,
    raiseTime: 200700,
    raiseStages: [49500, 99900, 150300, 200700],
    yield: 1,
    sellPrice: 260,
    xp: 7,
    desc: 'Giống Bò số 123.'
  },
  {
    id: 'de-124',
    icon: '🐐',
    name: 'Dê #124',
    type: 'gia-suc',
    buyPrice: 232,
    raiseTime: 93600,
    raiseStages: [23400, 46800, 70200, 93600],
    yield: 2,
    sellPrice: 131,
    xp: 8,
    desc: 'Giống Dê số 124.'
  },
  {
    id: 'cuu-125',
    icon: '🐑',
    name: 'Cừu #125',
    type: 'gia-suc',
    buyPrice: 255,
    raiseTime: 112500,
    raiseStages: [27900, 55800, 83700, 112500],
    yield: 3,
    sellPrice: 145,
    xp: 9,
    desc: 'Giống Cừu số 125.'
  },
  {
    id: 'tho-126',
    icon: '🐰',
    name: 'Thỏ #126',
    type: 'nho',
    buyPrice: 158,
    raiseTime: 59400,
    raiseStages: [14400, 29700, 44100, 59400],
    yield: 1,
    sellPrice: 92,
    xp: 10,
    desc: 'Giống Thỏ số 126.'
  },
  {
    id: 'ngua-127',
    icon: '🐴',
    name: 'Ngựa #127',
    type: 'lon',
    buyPrice: 681,
    raiseTime: 258300,
    raiseStages: [63900, 128700, 193500, 258300],
    yield: 2,
    sellPrice: 381,
    xp: 11,
    desc: 'Giống Ngựa số 127.'
  },
  {
    id: 'cho-128',
    icon: '🐕',
    name: 'Chó #128',
    type: 'dac-biet',
    buyPrice: 334,
    raiseTime: 142200,
    raiseStages: [35100, 71100, 106200, 142200],
    yield: 3,
    sellPrice: 191,
    xp: 12,
    desc: 'Giống Chó số 128.'
  },
  {
    id: 'meo-129',
    icon: '🐈',
    name: 'Mèo #129',
    type: 'dac-biet',
    buyPrice: 207,
    raiseTime: 80100,
    raiseStages: [19800, 39600, 59400, 80100],
    yield: 1,
    sellPrice: 122,
    xp: 13,
    desc: 'Giống Mèo số 129.'
  },
  {
    id: 'ga-130',
    icon: '🐔',
    name: 'Gà #130',
    type: 'gia-cam',
    buyPrice: 130,
    raiseTime: 40500,
    raiseStages: [9900, 19800, 29700, 40500],
    yield: 2,
    sellPrice: 81,
    xp: 14,
    desc: 'Giống Gà số 130.'
  },
  {
    id: 'vit-131',
    icon: '🦆',
    name: 'Vịt #131',
    type: 'gia-cam',
    buyPrice: 148,
    raiseTime: 50400,
    raiseStages: [12600, 25200, 37800, 50400],
    yield: 3,
    sellPrice: 92,
    xp: 15,
    desc: 'Giống Vịt số 131.'
  },
  {
    id: 'heo-132',
    icon: '🐷',
    name: 'Heo #132',
    type: 'gia-suc',
    buyPrice: 296,
    raiseTime: 136800,
    raiseStages: [34200, 68400, 102600, 136800],
    yield: 1,
    sellPrice: 174,
    xp: 16,
    desc: 'Giống Heo số 132.'
  },
  {
    id: 'bo-133',
    icon: '🐄',
    name: 'Bò #133',
    type: 'lon',
    buyPrice: 499,
    raiseTime: 209700,
    raiseStages: [52200, 104400, 156600, 209700],
    yield: 2,
    sellPrice: 287,
    xp: 17,
    desc: 'Giống Bò số 133.'
  },
  {
    id: 'de-134',
    icon: '🐐',
    name: 'Dê #134',
    type: 'gia-suc',
    buyPrice: 262,
    raiseTime: 102600,
    raiseStages: [25200, 51300, 76500, 102600],
    yield: 3,
    sellPrice: 158,
    xp: 18,
    desc: 'Giống Dê số 134.'
  },
  {
    id: 'cuu-135',
    icon: '🐑',
    name: 'Cừu #135',
    type: 'gia-suc',
    buyPrice: 285,
    raiseTime: 121500,
    raiseStages: [29700, 60300, 90900, 121500],
    yield: 1,
    sellPrice: 171,
    xp: 19,
    desc: 'Giống Cừu số 135.'
  },
  {
    id: 'tho-136',
    icon: '🐰',
    name: 'Thỏ #136',
    type: 'nho',
    buyPrice: 188,
    raiseTime: 68400,
    raiseStages: [17100, 34200, 51300, 68400],
    yield: 2,
    sellPrice: 119,
    xp: 20,
    desc: 'Giống Thỏ số 136.'
  },
  {
    id: 'ngua-137',
    icon: '🐴',
    name: 'Ngựa #137',
    type: 'lon',
    buyPrice: 711,
    raiseTime: 267300,
    raiseStages: [66600, 133200, 199800, 267300],
    yield: 3,
    sellPrice: 408,
    xp: 21,
    desc: 'Giống Ngựa số 137.'
  },
  {
    id: 'cho-138',
    icon: '🐕',
    name: 'Chó #138',
    type: 'dac-biet',
    buyPrice: 364,
    raiseTime: 151200,
    raiseStages: [37800, 75600, 113400, 151200],
    yield: 1,
    sellPrice: 218,
    xp: 22,
    desc: 'Giống Chó số 138.'
  },
  {
    id: 'meo-139',
    icon: '🐈',
    name: 'Mèo #139',
    type: 'dac-biet',
    buyPrice: 237,
    raiseTime: 89100,
    raiseStages: [21600, 44100, 66600, 89100],
    yield: 2,
    sellPrice: 149,
    xp: 23,
    desc: 'Giống Mèo số 139.'
  },
  {
    id: 'ga-140',
    icon: '🐔',
    name: 'Gà #140',
    type: 'gia-cam',
    buyPrice: 160,
    raiseTime: 49500,
    raiseStages: [11700, 24300, 36900, 49500],
    yield: 3,
    sellPrice: 88,
    xp: 24,
    desc: 'Giống Gà số 140.'
  },
  {
    id: 'vit-141',
    icon: '🦆',
    name: 'Vịt #141',
    type: 'gia-cam',
    buyPrice: 178,
    raiseTime: 59400,
    raiseStages: [14400, 29700, 44100, 59400],
    yield: 1,
    sellPrice: 98,
    xp: 25,
    desc: 'Giống Vịt số 141.'
  },
  {
    id: 'heo-142',
    icon: '🐷',
    name: 'Heo #142',
    type: 'gia-suc',
    buyPrice: 326,
    raiseTime: 145800,
    raiseStages: [36000, 72900, 108900, 145800],
    yield: 2,
    sellPrice: 181,
    xp: 26,
    desc: 'Giống Heo số 142.'
  },
  {
    id: 'bo-143',
    icon: '🐄',
    name: 'Bò #143',
    type: 'lon',
    buyPrice: 529,
    raiseTime: 218700,
    raiseStages: [54000, 108900, 163800, 218700],
    yield: 3,
    sellPrice: 293,
    xp: 27,
    desc: 'Giống Bò số 143.'
  },
  {
    id: 'de-144',
    icon: '🐐',
    name: 'Dê #144',
    type: 'gia-suc',
    buyPrice: 292,
    raiseTime: 111600,
    raiseStages: [27900, 55800, 83700, 111600],
    yield: 1,
    sellPrice: 164,
    xp: 28,
    desc: 'Giống Dê số 144.'
  },
  {
    id: 'cuu-145',
    icon: '🐑',
    name: 'Cừu #145',
    type: 'gia-suc',
    buyPrice: 315,
    raiseTime: 130500,
    raiseStages: [32400, 64800, 97200, 130500],
    yield: 2,
    sellPrice: 178,
    xp: 29,
    desc: 'Giống Cừu số 145.'
  },
  {
    id: 'tho-146',
    icon: '🐰',
    name: 'Thỏ #146',
    type: 'nho',
    buyPrice: 218,
    raiseTime: 77400,
    raiseStages: [18900, 38700, 57600, 77400],
    yield: 3,
    sellPrice: 125,
    xp: 30,
    desc: 'Giống Thỏ số 146.'
  },
  {
    id: 'ngua-147',
    icon: '🐴',
    name: 'Ngựa #147',
    type: 'lon',
    buyPrice: 741,
    raiseTime: 276300,
    raiseStages: [68400, 137700, 207000, 276300],
    yield: 1,
    sellPrice: 414,
    xp: 31,
    desc: 'Giống Ngựa số 147.'
  },
  {
    id: 'cho-148',
    icon: '🐕',
    name: 'Chó #148',
    type: 'dac-biet',
    buyPrice: 394,
    raiseTime: 160200,
    raiseStages: [39600, 80100, 119700, 160200],
    yield: 2,
    sellPrice: 224,
    xp: 32,
    desc: 'Giống Chó số 148.'
  },
  {
    id: 'meo-149',
    icon: '🐈',
    name: 'Mèo #149',
    type: 'dac-biet',
    buyPrice: 267,
    raiseTime: 98100,
    raiseStages: [24300, 48600, 72900, 98100],
    yield: 3,
    sellPrice: 155,
    xp: 33,
    desc: 'Giống Mèo số 149.'
  },
  {
    id: 'ga-150',
    icon: '🐔',
    name: 'Gà #150',
    type: 'gia-cam',
    buyPrice: 40,
    raiseTime: 58500,
    raiseStages: [14400, 28800, 43200, 58500],
    yield: 1,
    sellPrice: 32,
    xp: 4,
    desc: 'Giống Gà số 150.'
  },
  {
    id: 'vit-151',
    icon: '🦆',
    name: 'Vịt #151',
    type: 'gia-cam',
    buyPrice: 58,
    raiseTime: 68400,
    raiseStages: [17100, 34200, 51300, 68400],
    yield: 2,
    sellPrice: 42,
    xp: 5,
    desc: 'Giống Vịt số 151.'
  },
  {
    id: 'heo-152',
    icon: '🐷',
    name: 'Heo #152',
    type: 'gia-suc',
    buyPrice: 206,
    raiseTime: 154800,
    raiseStages: [38700, 77400, 116100, 154800],
    yield: 3,
    sellPrice: 125,
    xp: 6,
    desc: 'Giống Heo số 152.'
  },
  {
    id: 'bo-153',
    icon: '🐄',
    name: 'Bò #153',
    type: 'lon',
    buyPrice: 409,
    raiseTime: 227700,
    raiseStages: [56700, 113400, 170100, 227700],
    yield: 1,
    sellPrice: 237,
    xp: 7,
    desc: 'Giống Bò số 153.'
  },
  {
    id: 'de-154',
    icon: '🐐',
    name: 'Dê #154',
    type: 'gia-suc',
    buyPrice: 172,
    raiseTime: 120600,
    raiseStages: [29700, 60300, 90000, 120600],
    yield: 2,
    sellPrice: 108,
    xp: 8,
    desc: 'Giống Dê số 154.'
  },
  {
    id: 'cuu-155',
    icon: '🐑',
    name: 'Cừu #155',
    type: 'gia-suc',
    buyPrice: 195,
    raiseTime: 139500,
    raiseStages: [34200, 69300, 104400, 139500],
    yield: 3,
    sellPrice: 122,
    xp: 9,
    desc: 'Giống Cừu số 155.'
  },
  {
    id: 'tho-156',
    icon: '🐰',
    name: 'Thỏ #156',
    type: 'nho',
    buyPrice: 98,
    raiseTime: 86400,
    raiseStages: [21600, 43200, 64800, 86400],
    yield: 1,
    sellPrice: 69,
    xp: 10,
    desc: 'Giống Thỏ số 156.'
  },
  {
    id: 'ngua-157',
    icon: '🐴',
    name: 'Ngựa #157',
    type: 'lon',
    buyPrice: 621,
    raiseTime: 285300,
    raiseStages: [71100, 142200, 213300, 285300],
    yield: 2,
    sellPrice: 358,
    xp: 11,
    desc: 'Giống Ngựa số 157.'
  },
  {
    id: 'cho-158',
    icon: '🐕',
    name: 'Chó #158',
    type: 'dac-biet',
    buyPrice: 274,
    raiseTime: 169200,
    raiseStages: [42300, 84600, 126900, 169200],
    yield: 3,
    sellPrice: 168,
    xp: 12,
    desc: 'Giống Chó số 158.'
  },
  {
    id: 'meo-159',
    icon: '🐈',
    name: 'Mèo #159',
    type: 'dac-biet',
    buyPrice: 147,
    raiseTime: 107100,
    raiseStages: [26100, 53100, 80100, 107100],
    yield: 1,
    sellPrice: 99,
    xp: 13,
    desc: 'Giống Mèo số 159.'
  },
  {
    id: 'ga-160',
    icon: '🐔',
    name: 'Gà #160',
    type: 'gia-cam',
    buyPrice: 70,
    raiseTime: 31500,
    raiseStages: [7200, 15300, 23400, 31500],
    yield: 2,
    sellPrice: 38,
    xp: 14,
    desc: 'Giống Gà số 160.'
  },
  {
    id: 'vit-161',
    icon: '🦆',
    name: 'Vịt #161',
    type: 'gia-cam',
    buyPrice: 88,
    raiseTime: 41400,
    raiseStages: [9900, 20700, 30600, 41400],
    yield: 3,
    sellPrice: 49,
    xp: 15,
    desc: 'Giống Vịt số 161.'
  },
  {
    id: 'heo-162',
    icon: '🐷',
    name: 'Heo #162',
    type: 'gia-suc',
    buyPrice: 236,
    raiseTime: 127800,
    raiseStages: [31500, 63900, 95400, 127800],
    yield: 1,
    sellPrice: 131,
    xp: 16,
    desc: 'Giống Heo số 162.'
  },
  {
    id: 'bo-163',
    icon: '🐄',
    name: 'Bò #163',
    type: 'lon',
    buyPrice: 439,
    raiseTime: 200700,
    raiseStages: [49500, 99900, 150300, 200700],
    yield: 2,
    sellPrice: 244,
    xp: 17,
    desc: 'Giống Bò số 163.'
  },
  {
    id: 'de-164',
    icon: '🐐',
    name: 'Dê #164',
    type: 'gia-suc',
    buyPrice: 202,
    raiseTime: 93600,
    raiseStages: [23400, 46800, 70200, 93600],
    yield: 3,
    sellPrice: 115,
    xp: 18,
    desc: 'Giống Dê số 164.'
  },
  {
    id: 'cuu-165',
    icon: '🐑',
    name: 'Cừu #165',
    type: 'gia-suc',
    buyPrice: 225,
    raiseTime: 112500,
    raiseStages: [27900, 55800, 83700, 112500],
    yield: 1,
    sellPrice: 128,
    xp: 19,
    desc: 'Giống Cừu số 165.'
  },
  {
    id: 'tho-166',
    icon: '🐰',
    name: 'Thỏ #166',
    type: 'nho',
    buyPrice: 128,
    raiseTime: 59400,
    raiseStages: [14400, 29700, 44100, 59400],
    yield: 2,
    sellPrice: 76,
    xp: 20,
    desc: 'Giống Thỏ số 166.'
  },
  {
    id: 'ngua-167',
    icon: '🐴',
    name: 'Ngựa #167',
    type: 'lon',
    buyPrice: 651,
    raiseTime: 258300,
    raiseStages: [63900, 128700, 193500, 258300],
    yield: 3,
    sellPrice: 365,
    xp: 21,
    desc: 'Giống Ngựa số 167.'
  },
  {
    id: 'cho-168',
    icon: '🐕',
    name: 'Chó #168',
    type: 'dac-biet',
    buyPrice: 304,
    raiseTime: 142200,
    raiseStages: [35100, 71100, 106200, 142200],
    yield: 1,
    sellPrice: 175,
    xp: 22,
    desc: 'Giống Chó số 168.'
  },
  {
    id: 'meo-169',
    icon: '🐈',
    name: 'Mèo #169',
    type: 'dac-biet',
    buyPrice: 177,
    raiseTime: 80100,
    raiseStages: [19800, 39600, 59400, 80100],
    yield: 2,
    sellPrice: 106,
    xp: 23,
    desc: 'Giống Mèo số 169.'
  },
  {
    id: 'ga-170',
    icon: '🐔',
    name: 'Gà #170',
    type: 'gia-cam',
    buyPrice: 100,
    raiseTime: 40500,
    raiseStages: [9900, 19800, 29700, 40500],
    yield: 3,
    sellPrice: 65,
    xp: 24,
    desc: 'Giống Gà số 170.'
  },
  {
    id: 'vit-171',
    icon: '🦆',
    name: 'Vịt #171',
    type: 'gia-cam',
    buyPrice: 118,
    raiseTime: 50400,
    raiseStages: [12600, 25200, 37800, 50400],
    yield: 1,
    sellPrice: 75,
    xp: 25,
    desc: 'Giống Vịt số 171.'
  },
  {
    id: 'heo-172',
    icon: '🐷',
    name: 'Heo #172',
    type: 'gia-suc',
    buyPrice: 266,
    raiseTime: 136800,
    raiseStages: [34200, 68400, 102600, 136800],
    yield: 2,
    sellPrice: 158,
    xp: 26,
    desc: 'Giống Heo số 172.'
  },
  {
    id: 'bo-173',
    icon: '🐄',
    name: 'Bò #173',
    type: 'lon',
    buyPrice: 469,
    raiseTime: 209700,
    raiseStages: [52200, 104400, 156600, 209700],
    yield: 3,
    sellPrice: 270,
    xp: 27,
    desc: 'Giống Bò số 173.'
  },
  {
    id: 'de-174',
    icon: '🐐',
    name: 'Dê #174',
    type: 'gia-suc',
    buyPrice: 232,
    raiseTime: 102600,
    raiseStages: [25200, 51300, 76500, 102600],
    yield: 1,
    sellPrice: 141,
    xp: 28,
    desc: 'Giống Dê số 174.'
  },
  {
    id: 'cuu-175',
    icon: '🐑',
    name: 'Cừu #175',
    type: 'gia-suc',
    buyPrice: 255,
    raiseTime: 121500,
    raiseStages: [29700, 60300, 90900, 121500],
    yield: 2,
    sellPrice: 155,
    xp: 29,
    desc: 'Giống Cừu số 175.'
  },
  {
    id: 'tho-176',
    icon: '🐰',
    name: 'Thỏ #176',
    type: 'nho',
    buyPrice: 158,
    raiseTime: 68400,
    raiseStages: [17100, 34200, 51300, 68400],
    yield: 3,
    sellPrice: 102,
    xp: 30,
    desc: 'Giống Thỏ số 176.'
  },
  {
    id: 'ngua-177',
    icon: '🐴',
    name: 'Ngựa #177',
    type: 'lon',
    buyPrice: 681,
    raiseTime: 267300,
    raiseStages: [66600, 133200, 199800, 267300],
    yield: 1,
    sellPrice: 391,
    xp: 31,
    desc: 'Giống Ngựa số 177.'
  },
  {
    id: 'cho-178',
    icon: '🐕',
    name: 'Chó #178',
    type: 'dac-biet',
    buyPrice: 334,
    raiseTime: 151200,
    raiseStages: [37800, 75600, 113400, 151200],
    yield: 2,
    sellPrice: 201,
    xp: 32,
    desc: 'Giống Chó số 178.'
  },
  {
    id: 'meo-179',
    icon: '🐈',
    name: 'Mèo #179',
    type: 'dac-biet',
    buyPrice: 207,
    raiseTime: 89100,
    raiseStages: [21600, 44100, 66600, 89100],
    yield: 3,
    sellPrice: 132,
    xp: 33,
    desc: 'Giống Mèo số 179.'
  },
  {
    id: 'ga-180',
    icon: '🐔',
    name: 'Gà #180',
    type: 'gia-cam',
    buyPrice: 130,
    raiseTime: 49500,
    raiseStages: [11700, 24300, 36900, 49500],
    yield: 1,
    sellPrice: 71,
    xp: 4,
    desc: 'Giống Gà số 180.'
  },
  {
    id: 'vit-181',
    icon: '🦆',
    name: 'Vịt #181',
    type: 'gia-cam',
    buyPrice: 148,
    raiseTime: 59400,
    raiseStages: [14400, 29700, 44100, 59400],
    yield: 2,
    sellPrice: 82,
    xp: 5,
    desc: 'Giống Vịt số 181.'
  },
  {
    id: 'heo-182',
    icon: '🐷',
    name: 'Heo #182',
    type: 'gia-suc',
    buyPrice: 296,
    raiseTime: 145800,
    raiseStages: [36000, 72900, 108900, 145800],
    yield: 3,
    sellPrice: 164,
    xp: 6,
    desc: 'Giống Heo số 182.'
  },
  {
    id: 'bo-183',
    icon: '🐄',
    name: 'Bò #183',
    type: 'lon',
    buyPrice: 499,
    raiseTime: 218700,
    raiseStages: [54000, 108900, 163800, 218700],
    yield: 1,
    sellPrice: 277,
    xp: 7,
    desc: 'Giống Bò số 183.'
  },
  {
    id: 'de-184',
    icon: '🐐',
    name: 'Dê #184',
    type: 'gia-suc',
    buyPrice: 262,
    raiseTime: 111600,
    raiseStages: [27900, 55800, 83700, 111600],
    yield: 2,
    sellPrice: 148,
    xp: 8,
    desc: 'Giống Dê số 184.'
  },
  {
    id: 'cuu-185',
    icon: '🐑',
    name: 'Cừu #185',
    type: 'gia-suc',
    buyPrice: 285,
    raiseTime: 130500,
    raiseStages: [32400, 64800, 97200, 130500],
    yield: 3,
    sellPrice: 161,
    xp: 9,
    desc: 'Giống Cừu số 185.'
  },
  {
    id: 'tho-186',
    icon: '🐰',
    name: 'Thỏ #186',
    type: 'nho',
    buyPrice: 188,
    raiseTime: 77400,
    raiseStages: [18900, 38700, 57600, 77400],
    yield: 1,
    sellPrice: 109,
    xp: 10,
    desc: 'Giống Thỏ số 186.'
  },
  {
    id: 'ngua-187',
    icon: '🐴',
    name: 'Ngựa #187',
    type: 'lon',
    buyPrice: 711,
    raiseTime: 276300,
    raiseStages: [68400, 137700, 207000, 276300],
    yield: 2,
    sellPrice: 398,
    xp: 11,
    desc: 'Giống Ngựa số 187.'
  },
  {
    id: 'cho-188',
    icon: '🐕',
    name: 'Chó #188',
    type: 'dac-biet',
    buyPrice: 364,
    raiseTime: 160200,
    raiseStages: [39600, 80100, 119700, 160200],
    yield: 3,
    sellPrice: 208,
    xp: 12,
    desc: 'Giống Chó số 188.'
  },
  {
    id: 'meo-189',
    icon: '🐈',
    name: 'Mèo #189',
    type: 'dac-biet',
    buyPrice: 237,
    raiseTime: 98100,
    raiseStages: [24300, 48600, 72900, 98100],
    yield: 1,
    sellPrice: 139,
    xp: 13,
    desc: 'Giống Mèo số 189.'
  },
  {
    id: 'ga-190',
    icon: '🐔',
    name: 'Gà #190',
    type: 'gia-cam',
    buyPrice: 160,
    raiseTime: 58500,
    raiseStages: [14400, 28800, 43200, 58500],
    yield: 2,
    sellPrice: 98,
    xp: 14,
    desc: 'Giống Gà số 190.'
  },
  {
    id: 'vit-191',
    icon: '🦆',
    name: 'Vịt #191',
    type: 'gia-cam',
    buyPrice: 178,
    raiseTime: 68400,
    raiseStages: [17100, 34200, 51300, 68400],
    yield: 3,
    sellPrice: 108,
    xp: 15,
    desc: 'Giống Vịt số 191.'
  },
  {
    id: 'heo-192',
    icon: '🐷',
    name: 'Heo #192',
    type: 'gia-suc',
    buyPrice: 326,
    raiseTime: 154800,
    raiseStages: [38700, 77400, 116100, 154800],
    yield: 1,
    sellPrice: 191,
    xp: 16,
    desc: 'Giống Heo số 192.'
  },
  {
    id: 'bo-193',
    icon: '🐄',
    name: 'Bò #193',
    type: 'lon',
    buyPrice: 529,
    raiseTime: 227700,
    raiseStages: [56700, 113400, 170100, 227700],
    yield: 2,
    sellPrice: 303,
    xp: 17,
    desc: 'Giống Bò số 193.'
  },
  {
    id: 'de-194',
    icon: '🐐',
    name: 'Dê #194',
    type: 'gia-suc',
    buyPrice: 292,
    raiseTime: 120600,
    raiseStages: [29700, 60300, 90000, 120600],
    yield: 3,
    sellPrice: 174,
    xp: 18,
    desc: 'Giống Dê số 194.'
  },
  {
    id: 'cuu-195',
    icon: '🐑',
    name: 'Cừu #195',
    type: 'gia-suc',
    buyPrice: 315,
    raiseTime: 139500,
    raiseStages: [34200, 69300, 104400, 139500],
    yield: 1,
    sellPrice: 188,
    xp: 19,
    desc: 'Giống Cừu số 195.'
  },
  {
    id: 'tho-196',
    icon: '🐰',
    name: 'Thỏ #196',
    type: 'nho',
    buyPrice: 218,
    raiseTime: 86400,
    raiseStages: [21600, 43200, 64800, 86400],
    yield: 2,
    sellPrice: 135,
    xp: 20,
    desc: 'Giống Thỏ số 196.'
  },
  {
    id: 'ngua-197',
    icon: '🐴',
    name: 'Ngựa #197',
    type: 'lon',
    buyPrice: 741,
    raiseTime: 285300,
    raiseStages: [71100, 142200, 213300, 285300],
    yield: 3,
    sellPrice: 424,
    xp: 21,
    desc: 'Giống Ngựa số 197.'
  },
  {
    id: 'cho-198',
    icon: '🐕',
    name: 'Chó #198',
    type: 'dac-biet',
    buyPrice: 394,
    raiseTime: 169200,
    raiseStages: [42300, 84600, 126900, 169200],
    yield: 1,
    sellPrice: 234,
    xp: 22,
    desc: 'Giống Chó số 198.'
  },
  {
    id: 'meo-199',
    icon: '🐈',
    name: 'Mèo #199',
    type: 'dac-biet',
    buyPrice: 267,
    raiseTime: 107100,
    raiseStages: [26100, 53100, 80100, 107100],
    yield: 2,
    sellPrice: 165,
    xp: 23,
    desc: 'Giống Mèo số 199.'
  },
  {
    id: 'ga-200',
    icon: '🐔',
    name: 'Gà #200',
    type: 'gia-cam',
    buyPrice: 40,
    raiseTime: 31500,
    raiseStages: [7200, 15300, 23400, 31500],
    yield: 3,
    sellPrice: 22,
    xp: 24,
    desc: 'Giống Gà số 200.'
  },
];

const DEFAULT_FEEDS = [
  {
    id: 'cam-thuong',
    icon: '🟤',
    name: 'Cám thường',
    price: 30,
    timeReduce: 0.10,
    yieldBonus: 0,
    desc: 'Cám cơ bản. Giảm 10% thời gian nuôi.'
  },
  {
    id: 'cam-xanh',
    icon: '🟢',
    name: 'Cám xanh',
    price: 50,
    timeReduce: 0.15,
    yieldBonus: 0.05,
    desc: 'Cám hữu cơ. Giảm 15% thời gian, +5% sản lượng.'
  },
  {
    id: 'cam-vang',
    icon: '🟡',
    name: 'Cám vàng',
    price: 80,
    timeReduce: 0.20,
    yieldBonus: 0.10,
    desc: 'Cám trung cấp. Giảm 20% thời gian, +10% sản lượng.'
  },
  {
    id: 'cam-do',
    icon: '🔴',
    name: 'Cám đỏ',
    price: 120,
    timeReduce: 0.22,
    yieldBonus: 0.15,
    desc: 'Cám cao cấp. Giảm 22% thời gian, +15% sản lượng.'
  },
  {
    id: 'phan-tim',
    icon: '🟣',
    name: 'Cám tím',
    price: 180,
    timeReduce: 0.25,
    yieldBonus: 0.20,
    desc: 'Cám đặc biệt. Giảm 25% thời gian, +20% sản lượng.'
  },
  {
    id: 'phan-bac',
    icon: '⚪',
    name: 'Cám bạc',
    price: 250,
    timeReduce: 0.28,
    yieldBonus: 0.25,
    desc: 'Cám quý. Giảm 28% thời gian, +25% sản lượng.'
  },
  {
    id: 'cam-vang-kim',
    icon: '🟨',
    name: 'Cám vàng kim',
    price: 350,
    timeReduce: 0.32,
    yieldBonus: 0.30,
    desc: 'Cám hiếm. Giảm 32% thời gian, +30% sản lượng.'
  },
  {
    id: 'phan-kim-cuong',
    icon: '💎',
    name: 'Cám kim cương',
    price: 500,
    timeReduce: 0.35,
    yieldBonus: 0.40,
    desc: 'Cám cực phẩm. Giảm 35% thời gian, +40% sản lượng.'
  },
  {
    id: 'phan-huyen-thoai',
    icon: '🌟',
    name: 'Cám huyền thoại',
    price: 800,
    timeReduce: 0.40,
    yieldBonus: 0.50,
    desc: 'Cám thần thoại. Giảm 40% thời gian, +50% sản lượng.'
  },
  {
    id: 'phan-than-thoai',
    icon: '👑',
    name: 'Cám thần thoại',
    price: 1200,
    timeReduce: 0.45,
    yieldBonus: 0.60,
    desc: 'Cám tối thượng. Giảm 45% thời gian, +60% sản lượng.'
  }
];


const APP_VERSION = '1.0.0';

const DEFAULT_SETTINGS = {
  penCount: 12,
  startCoins: 1000,
  rainDurationMinutes: 0.25, 
  penPrice: 500,
  
  mergeBaseRate: 25,
  
  appVersion: '1.0.0',
  
  siteIconUrl: '',
  
  updateNotes: '',
  
  forceUpdate: false
};


const DEFAULT_PROTECTS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(rate => ({
  id: 'bao-' + rate,
  icon: rate >= 80 ? '🛡️' : rate >= 50 ? '🧿' : '🔮',
  name: 'Bảo hộ +' + rate + '%',
  rate,
  price: Math.round(40 + rate * rate * 0.18),
  desc: 'Cộng thêm +' + rate + '% vào tỉ lệ ghép cơ bản (tối đa 100%, tối thiểu 1%).'
}));


const DEFAULT_FAIRY_PACKS = [
  { id: 'tien-1', days: 1, price: 200, icon: '<i class="fa-solid fa-wand-magic-sparkles"></i>', name: 'Tiên 1 ngày' },
  { id: 'tien-3', days: 3, price: 500, icon: '<i class="fa-solid fa-wand-magic-sparkles"></i>', name: 'Tiên 3 ngày' },
  { id: 'tien-5', days: 5, price: 750, icon: '<i class="fa-solid fa-wand-magic-sparkles"></i>', name: 'Tiên 5 ngày' },
  { id: 'tien-7', days: 7, price: 1000, icon: '<i class="fa-solid fa-wand-magic-sparkles"></i>', name: 'Tiên 7 ngày' },
  { id: 'tien-10', days: 10, price: 1300, icon: '<i class="fa-solid fa-wand-magic-sparkles"></i>', name: 'Tiên 10 ngày' },
  { id: 'tien-15', days: 15, price: 1800, icon: '<i class="fa-solid fa-wand-magic-sparkles"></i>', name: 'Tiên 15 ngày' },
  { id: 'tien-30', days: 30, price: 3000, icon: '<i class="fa-solid fa-wand-magic-sparkles"></i>', name: 'Tiên 30 ngày' }
];


const DEFAULT_NYC_PACKS = [
  { id: 'nyc-1', days: 1, price: 250, icon: '<i class="fa-solid fa-heart-crack"></i>', name: 'NYC 1 ngày' },
  { id: 'nyc-3', days: 3, price: 650, icon: '<i class="fa-solid fa-heart-crack"></i>', name: 'NYC 3 ngày' },
  { id: 'nyc-5', days: 5, price: 950, icon: '<i class="fa-solid fa-heart-crack"></i>', name: 'NYC 5 ngày' },
  { id: 'nyc-7', days: 7, price: 1300, icon: '<i class="fa-solid fa-heart-crack"></i>', name: 'NYC 7 ngày' },
  { id: 'nyc-10', days: 10, price: 1700, icon: '<i class="fa-solid fa-heart-crack"></i>', name: 'NYC 10 ngày' },
  { id: 'nyc-15', days: 15, price: 2400, icon: '<i class="fa-solid fa-heart-crack"></i>', name: 'NYC 15 ngày' },
  { id: 'nyc-30', days: 30, price: 4000, icon: '<i class="fa-solid fa-heart-crack"></i>', name: 'NYC 30 ngày' }
];


const DEFAULT_HELPER_PACKS = [
  { id: 'help-1', days: 1, price: 180, icon: '<i class="fa-solid fa-user-tie"></i>', name: 'Giúp việc 1 ngày' },
  { id: 'help-3', days: 3, price: 450, icon: '<i class="fa-solid fa-user-tie"></i>', name: 'Giúp việc 3 ngày' },
  { id: 'help-5', days: 5, price: 700, icon: '<i class="fa-solid fa-user-tie"></i>', name: 'Giúp việc 5 ngày' },
  { id: 'help-7', days: 7, price: 950, icon: '<i class="fa-solid fa-user-tie"></i>', name: 'Giúp việc 7 ngày' },
  { id: 'help-10', days: 10, price: 1250, icon: '<i class="fa-solid fa-user-tie"></i>', name: 'Giúp việc 10 ngày' },
  { id: 'help-15', days: 15, price: 1700, icon: '<i class="fa-solid fa-user-tie"></i>', name: 'Giúp việc 15 ngày' },
  { id: 'help-30', days: 30, price: 2800, icon: '<i class="fa-solid fa-user-tie"></i>', name: 'Giúp việc 30 ngày' }
];

const TYPE_LABELS = {
  'gia-cam': 'Gia cầm',
  'nho': 'Nhỏ',
  'gia-suc': 'Gia súc',
  'lon': 'Lớn',
  'dac-biet': 'Đặc biệt',
  khac: 'Khác'
};


let currentUser = null;
let currentPlayer = null;
let currentAnimals = [];
let currentSettings = { ...DEFAULT_SETTINGS };
let isAdmin = false;

function createDefaultPlayerData(uid, email, role) {
  const penCount = currentSettings.penCount || DEFAULT_SETTINGS.penCount;
  const startCoins = currentSettings.startCoins || DEFAULT_SETTINGS.startCoins;

  
  const animals = {};

  
  const feeds = {
    'cam-thuong': 5,
    'cam-xanh': 2
  };

  return {
    uid,
    email: email || '',
    role: role || 'user',
    coins: startCoins,
    level: 1,
    xp: 0,
    pens: Array(penCount).fill(null).map((_, i) => ({
      id: i,
      animalId: null,
      raisedAt: null,
      watered: false,
      waterCount: 0,
      lastWatered: null,
      feedId: null
    })),
    inventory: {
      animals,
      harvest: {},
      feeds,
      protects: {},
      animalsStar: {}
    },
    stats: {
      raised: 0,
      harvested: 0,
      earned: 0,
      spent: 0
    },
    activity: [],
    lastDaily: null,
    collection: {},
    achievements: {},
    helpCareLog: {},
    maxChatStreak: 0,
    fairyUntil: 0,
    fairyConfig: {
      waterMode: 'all',
      waterCount: 12,
      useFeed: true,
      fertSource: 'any',
      fertId: null,
      fertMode: 'all',
      fertCount: 12
    },
    nycUntil: 0,
    lastNycCare: 0,
    nycConfig: { animalId: null, mode: 'all', count: 1 },
    buffPrefs: { fairyEnabled: true, nycEnabled: true },
    createdAt: Date.now()
  };
}

/**
 * Xóa toàn bộ dữ liệu game của tài khoản hiện tại và tạo lại sạch.
 * Giữ nguyên: uid, email, role (admin vẫn là admin), displayName, avatar, birthday.
 * Tài khoản đầu tiên của game vẫn được gán admin khi tạo mới (logic loadPlayer).
 */
async function resetPlayerData(opts) {
  opts = opts || {};
  if (!currentUser || !currentUser.uid) {
    return { ok: false, msg: 'Chưa đăng nhập!' };
  }
  const uid = currentUser.uid;
  const email = (currentUser.email || (currentPlayer && currentPlayer.email) || '');
  // Giữ role hiện tại — admin không bị mất quyền
  let role = (currentPlayer && currentPlayer.role) || 'user';
  if (role !== 'admin') {
    // Nếu không phải admin, kiểm tra có phải tài khoản duy nhất / đầu tiên không
    try {
      const usersSnap = await db.ref('users').once('value');
      const val = usersSnap.val() || {};
      const keys = Object.keys(val);
      // Chỉ còn mình hoặc chưa có ai khác → vẫn cho admin
      if (keys.length <= 1) role = 'admin';
    } catch (_) {}
  }

  const keepName = (currentPlayer && currentPlayer.displayName) || '';
  const keepAvatar = (currentPlayer && currentPlayer.avatar) || '';
  const keepBirthday = (currentPlayer && currentPlayer.birthday) || null;

  // 1) Xóa localStorage liên quan
  try {
    const prefixes = ['vx_', 'vuon_'];
    Object.keys(localStorage).forEach(k => {
      if (prefixes.some(p => k.startsWith(p)) || k.includes(uid) || k === 'vx-theme') {
        // giữ theme nếu muốn — vẫn xóa hết cho sạch
        try { localStorage.removeItem(k); } catch (_) {}
      }
    });
    localStorage.removeItem('vuon_away_' + uid);
    localStorage.removeItem(pendingSyncKey(uid));
    localStorage.removeItem(playLogLocalKey(uid));
    localStorage.removeItem(playerBackupKey(uid));
  } catch (e) {
    console.warn('reset localStorage', e);
  }

  // 2) Xóa playLogs trên Firebase (không bắt buộc nhưng sạch hơn)
  try {
    await db.ref('playLogs/' + uid).remove();
  } catch (e) {
    console.warn('reset playLogs', e);
  }

  // 3) Tạo data mới, giữ role + identity
  const data = createDefaultPlayerData(uid, email, role);
  data.displayName = keepName || data.displayName || 'Player';
  data.avatar = keepAvatar || '';
  if (keepBirthday) data.birthday = keepBirthday;
  data.updatedAt = (typeof nowMs === 'function' ? nowMs() : Date.now());
  data.sessionId = (typeof CLIENT_SESSION_ID !== 'undefined' ? CLIENT_SESSION_ID : String(Date.now()));
  data.lastSeenAt = data.updatedAt;
  data.lastCatchUpAt = data.updatedAt;
  data.resetAt = data.updatedAt;
  data.resetCount = ((currentPlayer && currentPlayer.resetCount) || 0) + 1;

  // Ghi đè Firebase
  await db.ref('users/' + uid).set(data);

  currentPlayer = data;
  _playerBaseUpdatedAt = data.updatedAt;
  isAdmin = role === 'admin';

  if (typeof Game !== 'undefined' && Game.ensureFarms) {
    try { Game.ensureFarms(); } catch (_) {}
  }

  if (!opts.silent) {
    try {
      if (typeof showToast === 'function') showToast('Đã xóa toàn bộ dữ liệu. Đang tải lại...', 'success');
    } catch (_) {}
  }

  // Reload để UI + offline state sạch hoàn toàn
  if (!opts.noReload) {
    setTimeout(() => { location.reload(); }, 600);
  }
  return { ok: true, msg: 'Đã reset dữ liệu', role };
}

async function initGlobalData() {
  try {
    const animalsSnap = await db.ref('animals').once('value');
    if (!animalsSnap.exists()) {
      const obj = {};
      DEFAULT_ANIMALS.forEach(p => { obj[p.id] = p; });
      try {
        await db.ref('animals').set(obj);
      } catch (e) {
        console.warn('seed animals denied, using local defaults', e);
      }
      currentAnimals = [...DEFAULT_ANIMALS];
    } else {
      const val = animalsSnap.val() || {};
      let changed = false;
      DEFAULT_ANIMALS.forEach(p => {
        if (!val[p.id]) {
          val[p.id] = p;
          changed = true;
        } else if (!val[p.id].raiseStages && p.raiseStages) {
          val[p.id].raiseStages = p.raiseStages;
          val[p.id].raiseTime = p.raiseTime;
          changed = true;
        }
      });
      if (changed) {
        try { await db.ref('animals').set(val); } catch (e) { console.warn('merge animals denied', e); }
      }
      currentAnimals = Object.keys(val).map(k => ({ ...val[k], id: val[k].id || k }));
    }
  } catch (e) {
    console.warn('load animals failed, local defaults', e);
    currentAnimals = [...DEFAULT_ANIMALS];
  }

  try {
    const setSnap = await db.ref('settings').once('value');
    if (!setSnap.exists()) {
      try {
        await db.ref('settings').set(DEFAULT_SETTINGS);
      } catch (e) {
        console.warn('seed settings denied, using local defaults', e);
      }
      currentSettings = { ...DEFAULT_SETTINGS };
    } else {
      currentSettings = { ...DEFAULT_SETTINGS, ...setSnap.val() };
    }
  } catch (e) {
    console.warn('load settings failed, local defaults', e);
    currentSettings = { ...DEFAULT_SETTINGS };
  }
  try {
    if (typeof applySiteIcon === 'function') applySiteIcon(currentSettings.siteIconUrl);
  } catch (_) {}
}





let _serverTimeOffset = 0;
let _serverTimeReady = false;
const CLIENT_SESSION_ID = 's_' + Math.random().toString(36).slice(2, 10) + '_' + Date.now().toString(36);

let _playerBaseUpdatedAt = 0;
let _playerDirty = false;
let _pullRemoteBusy = false;

function nowMs() {
  
  return Date.now();
}


const GAME_TIMEZONE = 'Asia/Ho_Chi_Minh';
const GAME_TZ_OFFSET_MS = 7 * 60 * 60 * 1000;


function dateInGameTz(ms) {
  const t = (ms == null ? nowMs() : Number(ms));
  
  try {
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: GAME_TIMEZONE,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    }).formatToParts(new Date(t));
    const get = (type) => {
      const p = parts.find(x => x.type === type);
      return p ? parseInt(p.value, 10) : 0;
    };
    return {
      year: get('year'),
      month: get('month'),
      day: get('day'),
      hour: get('hour') % 24,
      minute: get('minute'),
      second: get('second')
    };
  } catch (_) {
    const d = new Date(t + GAME_TZ_OFFSET_MS);
    return {
      year: d.getUTCFullYear(),
      month: d.getUTCMonth() + 1,
      day: d.getUTCDate(),
      hour: d.getUTCHours(),
      minute: d.getUTCMinutes(),
      second: d.getUTCSeconds()
    };
  }
}


function gameDayKey(ms) {
  const d = dateInGameTz(ms);
  const pad = n => String(n).padStart(2, '0');
  return d.year + '-' + pad(d.month) + '-' + pad(d.day);
}


function gameDateString(ms) {
  const d = dateInGameTz(ms);
  
  return gameDayKey(ms);
}


function formatGameDateTime(ms, withSeconds) {
  if (!ms) return '—';
  try {
    const opt = {
      timeZone: GAME_TIMEZONE,
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
      hour12: false
    };
    if (withSeconds) opt.second = '2-digit';
    return new Date(ms).toLocaleString('vi-VN', opt);
  } catch (_) {
    return new Date(ms).toLocaleString('vi-VN');
  }
}

/** Timestamp 00:00:00 ngày hiện tại theo GMT+7 (Asia/Ho_Chi_Minh) */
function getGmt7DayStartMs(nowMsVal) {
  const now = (typeof nowMsVal === 'number' && nowMsVal > 0)
    ? nowMsVal
    : ((typeof nowMs === 'function') ? nowMs() : Date.now());
  try {
    // en-CA → YYYY-MM-DD theo timezone VN
    const dayStr = new Date(now).toLocaleDateString('en-CA', { timeZone: GAME_TIMEZONE || 'Asia/Ho_Chi_Minh' });
    // 00:00 GMT+7 = Date.parse với offset +07:00
    const start = Date.parse(dayStr + 'T00:00:00+07:00');
    if (Number.isFinite(start)) return start;
  } catch (_) {}
  // fallback UTC+7 thủ công
  const offset = 7 * 60 * 60 * 1000;
  const shifted = new Date(now + offset);
  return Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate()) - offset;
}

/** ms đến mốc 0h00 GMT+7 tiếp theo */
function msUntilNextGmt7Midnight(nowMsVal) {
  const now = (typeof nowMsVal === 'number' && nowMsVal > 0)
    ? nowMsVal
    : ((typeof nowMs === 'function') ? nowMs() : Date.now());
  const startToday = getGmt7DayStartMs(now);
  const next = startToday + 24 * 60 * 60 * 1000;
  return Math.max(500, next - now + 50);
}

/**
 * Chỉ giữ activity trong ngày GMT+7 hiện tại.
 * @returns {{ list: Array, removed: number, changed: boolean }}
 */
function pruneActivityToToday(list, nowMsVal) {
  const dayStart = getGmt7DayStartMs(nowMsVal);
  if (!Array.isArray(list) || !list.length) {
    return { list: Array.isArray(list) ? list : [], removed: 0, changed: false };
  }
  const kept = [];
  for (let i = 0; i < list.length; i++) {
    const a = list[i];
    if (!a || typeof a !== 'object') continue;
    let ts = Number(a.t);
    if (!Number.isFinite(ts) || ts <= 0) {
      // cố parse chuỗi time (vi-VN / ISO)
      if (a.time) {
        const p = Date.parse(String(a.time));
        if (Number.isFinite(p)) ts = p;
      }
    }
    // Không có timestamp đáng tin → coi là cũ, bỏ (tránh giữ log ngày qua)
    if (!Number.isFinite(ts) || ts <= 0) continue;
    if (ts >= dayStart) kept.push(a);
  }
  const removed = list.length - kept.length;
  return { list: kept, removed, changed: removed > 0 };
}

/** Áp dụng prune lên currentPlayer.activity; trả về true nếu có xóa */
function pruneCurrentPlayerActivity(opts) {
  opts = opts || {};
  if (!currentPlayer) return false;
  const r = pruneActivityToToday(currentPlayer.activity || [], opts.now);
  if (r.changed || !Array.isArray(currentPlayer.activity)) {
    currentPlayer.activity = r.list;
    if (r.changed) {
      try { if (typeof markPlayerDirty === 'function') markPlayerDirty(); } catch (_) {}
    }
    return r.changed;
  }
  return false;
}



function markPlayerDirty() {
  _playerDirty = true;
}







function pendingSyncKey(uid) {
  return 'vx_pending_sync_' + (uid || (currentUser && currentUser.uid) || 'guest');
}
function playLogLocalKey(uid) {
  return 'vx_play_log_' + (uid || (currentUser && currentUser.uid) || 'guest');
}

function readLocalPlayLog(uid) {
  try {
    const raw = localStorage.getItem(playLogLocalKey(uid));
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch (_) {
    return [];
  }
}

function writeLocalPlayLog(uid, arr) {
  try {
    localStorage.setItem(playLogLocalKey(uid), JSON.stringify((arr || []).slice(0, 300)));
  } catch (_) {}
}

function markPendingSnapshot(action, at) {
  if (!currentUser || !currentPlayer) return;
  _playerDirty = true;
  try {
    localStorage.setItem(pendingSyncKey(currentUser.uid), JSON.stringify({
      synced: false,
      action: action || 'action',
      at: at || (typeof nowMs === 'function' ? nowMs() : Date.now()),
      updatedAt: Number(currentPlayer.updatedAt) || at || Date.now(),
      player: currentPlayer
    }));
  } catch (_) {}
  backupPlayerLocal();
}






function recordGameEvent(type, data) {
  if (!currentUser || !currentPlayer) return null;
  const t = typeof nowMs === 'function' ? nowMs() : Date.now();
  const entry = {
    id: 'l_' + t + '_' + Math.random().toString(36).slice(2, 8),
    type: String(type || 'other').slice(0, 24),
    a: String(type || 'other').slice(0, 48),
    t: t,
    data: data && typeof data === 'object' ? data : null,
    coins: Number(currentPlayer.coins) || 0,
    sessionId: CLIENT_SESSION_ID,
    _synced: false
  };

  if (!Array.isArray(currentPlayer.playLog)) currentPlayer.playLog = [];
  currentPlayer.playLog.unshift({
    a: entry.type,
    t: entry.t,
    d: data ? JSON.stringify(data).slice(0, 100) : null
  });
  if (currentPlayer.playLog.length > 150) currentPlayer.playLog.length = 150;

  const local = readLocalPlayLog(currentUser.uid);
  local.unshift(entry);
  writeLocalPlayLog(currentUser.uid, local.slice(0, 300));
  markPendingSnapshot(entry.type, t);

  
  if (db && currentUser) {
    const clean = {
      id: entry.id,
      type: entry.type,
      a: entry.a,
      t: entry.t,
      data: entry.data,
      coins: entry.coins,
      sessionId: entry.sessionId
    };
    db.ref('playLogs/' + currentUser.uid + '/' + entry.id).set(clean)
      .then(() => {
        try {
          const arr = readLocalPlayLog(currentUser.uid);
          const hit = arr.find(x => x && x.id === entry.id);
          if (hit) hit._synced = true;
          writeLocalPlayLog(currentUser.uid, arr);
        } catch (_) {}
      })
      .catch(e => console.warn('playLog push', e && e.message));
  }
  return entry;
}


function recordPlayerAction(action, detail) {
  return recordGameEvent(action || 'action', detail != null ? { detail: String(detail).slice(0, 120) } : null);
}


async function flushPlayLogsToFirebase() {
  if (!db || !currentUser) return { ok: false, n: 0 };
  const local = readLocalPlayLog(currentUser.uid);
  if (!local.length) return { ok: true, n: 0 };
  let n = 0;
  const pending = local.filter(e => e && e.id && !e._synced);
  for (const entry of pending.slice(0, 50)) {
    try {
      const clean = {
        id: entry.id,
        type: entry.type || entry.a,
        a: entry.a || entry.type,
        t: entry.t,
        data: entry.data || null,
        coins: entry.coins,
        sessionId: entry.sessionId
      };
      await db.ref('playLogs/' + currentUser.uid + '/' + entry.id).set(clean);
      entry._synced = true;
      n++;
    } catch (e) {
      console.warn('flushPlayLogs', e);
      break;
    }
  }
  writeLocalPlayLog(currentUser.uid, local);
  return { ok: true, n };
}





function applyCriticalPlayLogToPlayer(player) {
  if (!currentUser || !player) return null;
  const local = readLocalPlayLog(currentUser.uid);
  if (!local.length) return null;
  
  const now = typeof nowMs === 'function' ? nowMs() : Date.now();
  const cutoff = now - 48 * 3600 * 1000;
  const critical = local
    .filter(e => e && e.t >= cutoff && e.data && ['animal', 'water', 'fert', 'harvest'].includes(e.type || e.a))
    .slice()
    .sort((a, b) => (a.t || 0) - (b.t || 0));

  if (!critical.length) return null;

  if (typeof Game !== 'undefined' && Game.ensureFarms) {
    try {
      const prev = currentPlayer;
      currentPlayer = player;
      Game.ensureFarms();
      currentPlayer = prev;
    } catch (_) {}
  }

  let earliest = null;
  critical.forEach(e => {
    const d = e.data || {};
    const gi = typeof d.farmIndex === 'number' ? d.farmIndex : 0;
    const pi = typeof d.penId === 'number' ? d.penId : -1;
    if (pi < 0) return;
    if (!Array.isArray(player.farms)) return;
    if (!player.farms[gi]) return;
    let pens = player.farms[gi];
    if (!Array.isArray(pens)) {
      const keys = Object.keys(pens || {}).filter(k => /^\d+$/.test(k)).sort((a, b) => Number(a) - Number(b));
      pens = keys.map(k => pens[k]);
      player.farms[gi] = pens;
    }
    if (!pens[pi]) pens[pi] = { id: pi };
    const pen = pens[pi];
    const type = e.type || e.a;
    if (type === 'animal' && d.animalId) {
      
      if (!pen.animalId || (pen.raisedAt && d.raisedAt && pen.raisedAt > d.raisedAt)) {
        pen.animalId = d.animalId;
        pen.raisedAt = d.raisedAt || e.t;
        pen.watered = !!d.watered;
        pen.waterCount = d.waterCount || 0;
        pen.feedId = d.feedId || null;
        pen.seedKind = d.seedKind || 'normal';
      } else if (pen.animalId === d.animalId && d.raisedAt && (!pen.raisedAt || pen.raisedAt > d.raisedAt)) {
        pen.raisedAt = d.raisedAt;
      }
      earliest = earliest == null ? e.t : Math.min(earliest, e.t);
    } else if (type === 'water' && pen.animalId) {
      pen.watered = true;
      pen.waterCount = Math.max(pen.waterCount || 0, d.waterCount || 1);
      pen.lastWatered = d.at || e.t;
      earliest = earliest == null ? e.t : Math.min(earliest, e.t);
    } else if (type === 'fert' && pen.animalId && d.fertId) {
      if (!pen.feedId) {
        pen.feedId = d.fertId;
        pen.feedAt = d.at || e.t;
      }
      earliest = earliest == null ? e.t : Math.min(earliest, e.t);
    } else if (type === 'harvest') {
      if (pen.animalId && (d.animalId ? pen.animalId === d.animalId : true)) {
        pen.animalId = null;
        pen.raisedAt = null;
        pen.watered = false;
        pen.waterCount = 0;
        pen.lastWatered = null;
        pen.feedId = null;
        pen.feedAt = null;
      }
      earliest = earliest == null ? e.t : Math.min(earliest, e.t);
    }
  });

  
  const ag = typeof player.activeFarm === 'number' ? player.activeFarm : 0;
  if (player.farms && player.farms[ag]) player.pens = player.farms[ag];

  return earliest;
}




async function syncPlayerOnEnter() {
  if (!currentUser || !currentPlayer || !db) return { ok: false, msg: 'no-user' };
  let usedLocal = false;
  let logEarliest = null;

  try {
    const raw = localStorage.getItem(pendingSyncKey(currentUser.uid));
    if (raw) {
      const pending = JSON.parse(raw);
      if (pending && pending.player && pending.synced === false) {
        const pAt = Number(pending.updatedAt) || Number(pending.at) || 0;
        const rAt = Number(currentPlayer.updatedAt) || 0;
        const pScore = playerProgressScore(pending.player);
        const rScore = playerProgressScore(currentPlayer);
        if (pAt > rAt + 500 && (rScore < 1000 || pScore >= rScore * 0.75)) {
          currentPlayer = pending.player;
          _playerBaseUpdatedAt = Math.max(pAt, rAt);
          _playerDirty = true;
          usedLocal = true;
        }
      }
    }
  } catch (e) {
    console.warn('syncPlayerOnEnter pending', e);
  }

  
  try {
    logEarliest = applyCriticalPlayLogToPlayer(currentPlayer);
    if (logEarliest != null) {
      _playerDirty = true;
      
      
      const prevSeen = Number(currentPlayer.lastSeenAt) || 0;
      const prevCatch = Number(currentPlayer.lastCatchUpAt) || 0;
      
      if (logEarliest > prevCatch) {
        
        const targetFrom = Math.max(prevCatch, logEarliest - 1000);
        if (!prevSeen || prevSeen > targetFrom) {
          currentPlayer.lastSeenAt = targetFrom;
        }
        
        currentPlayer._needOfflineFromLog = true;
        currentPlayer._logEarliest = logEarliest;
      }
    }
  } catch (e) {
    console.warn('applyCriticalPlayLog', e);
  }

  try { await flushPlayLogsToFirebase(); } catch (_) {}

  if (_playerDirty || usedLocal) {
    const res = await savePlayer({
      action: usedLocal ? 'sync-pending' : 'enter-sync',
      silent: false
    });
    if (res && res.ok) {
      try {
        localStorage.setItem(pendingSyncKey(currentUser.uid), JSON.stringify({
          synced: true,
          at: typeof nowMs === 'function' ? nowMs() : Date.now(),
          updatedAt: currentPlayer.updatedAt
        }));
      } catch (_) {}
    }
    return Object.assign({}, res || {}, { usedLocal, logEarliest });
  }
  try { backupPlayerLocal(); } catch (_) {}
  return { ok: true, msg: 'up-to-date', usedLocal, logEarliest };
}


function playerBackupKey(uid) {
  return 'vx_player_backup_' + (uid || (currentUser && currentUser.uid) || 'guest');
}

function backupPlayerLocal() {
  try {
    if (!currentPlayer || !currentUser) return;
    const payload = {
      savedAt: typeof nowMs === 'function' ? nowMs() : Date.now(),
      updatedAt: Number(currentPlayer.updatedAt) || 0,
      player: currentPlayer
    };
    localStorage.setItem(playerBackupKey(currentUser.uid), JSON.stringify(payload));
  } catch (e) {
    console.warn('backupPlayerLocal', e);
  }
}


function playerProgressScore(p) {
  if (!p || typeof p !== 'object') return 0;
  let score = (Number(p.coins) || 0) + (Number(p.level) || 1) * 10000 + (Number(p.xp) || 0);
  const inv = p.inventory || {};
  const countBag = (bag) => {
    if (!bag || typeof bag !== 'object') return 0;
    return Object.keys(bag).reduce((s, k) => s + (Number(bag[k]) || 0), 0);
  };
  score += countBag(inv.animals) * 50;
  score += countBag(inv.animalsStar) * 80;
  score += countBag(inv.harvest) * 30;
  score += countBag(inv.feeds) * 20;
  score += countBag(inv.protects) * 40;
  let animals = 0;
  const farms = Array.isArray(p.farms) ? p.farms : null;
  if (farms) {
    farms.forEach(g => {
      const pens = Array.isArray(g) ? g : (g && g.pens) || [];
      (pens || []).forEach(pl => { if (pl && pl.animalId) animals++; });
    });
  } else {
    const pens = Array.isArray(p.pens) ? p.pens : Object.values(p.pens || {});
    pens.forEach(pl => { if (pl && pl.animalId) animals++; });
  }
  score += animals * 200;
  if (p.fairyUntil) score += 500;
  if (p.nycUntil) score += 500;
  if (p.helperUntil) score += 500;
  return score;
}







function mergeRemoteAdminGifts(remote) {
  if (!remote || !currentPlayer) return false;
  let changed = false;
  const rCoins = Number(remote.coins) || 0;
  const lCoins = Number(currentPlayer.coins) || 0;
  if (rCoins > lCoins) {
    currentPlayer.coins = rCoins;
    changed = true;
  }
  let rPens = remote.pens;
  if (rPens && !Array.isArray(rPens)) rPens = Object.values(rPens);
  if (Array.isArray(rPens) && Array.isArray(currentPlayer.pens) && rPens.length > currentPlayer.pens.length) {
    for (let i = currentPlayer.pens.length; i < rPens.length; i++) {
      const p = rPens[i] || {};
      currentPlayer.pens.push({
        id: i,
        animalId: p.animalId || null,
        raisedAt: p.raisedAt || null,
        watered: !!p.watered,
        waterCount: typeof p.waterCount === 'number' ? p.waterCount : 0,
        lastWatered: p.lastWatered || null,
        feedId: p.feedId || null,
        feedAt: p.feedAt || null,
        specialMult: p.specialMult,
        specialId: p.specialId,
        specialName: p.specialName
      });
    }
    changed = true;
  }
  if (remote.role && remote.role !== currentPlayer.role) {
    currentPlayer.role = remote.role;
    changed = true;
  }
  if (remote.banned != null && !!remote.banned !== !!currentPlayer.banned) {
    currentPlayer.banned = !!remote.banned;
    currentPlayer.banReason = remote.banReason || null;
    changed = true;
  }
  
  if (Array.isArray(remote.activity) && remote.activity.length) {
    if (!Array.isArray(currentPlayer.activity)) currentPlayer.activity = [];
    const head = remote.activity[0];
    if (head && head.text && String(head.text).indexOf('Admin') === 0) {
      const exists = currentPlayer.activity.some(a => a && a.text === head.text && a.time === head.time);
      if (!exists) {
        currentPlayer.activity.unshift(head);
        if (currentPlayer.activity.length > 30) currentPlayer.activity = currentPlayer.activity.slice(0, 30);
        changed = true;
      }
    }
  }
  return changed;
}






function restorePlayerLocalIfNewer(remotePlayer) {
  try {
    if (!currentUser) return false;
    const raw = localStorage.getItem(playerBackupKey(currentUser.uid));
    if (!raw) return false;
    const payload = JSON.parse(raw);
    if (!payload || !payload.player) return false;
    const bAt = Number(payload.updatedAt) || Number(payload.savedAt) || 0;
    const rAt = remotePlayer ? (Number(remotePlayer.updatedAt) || 0) : 0;
    const bScore = playerProgressScore(payload.player);
    const rScore = playerProgressScore(remotePlayer);
    const bCatch = Number(payload.player.lastCatchUpAt) || 0;
    const rCatch = remotePlayer ? (Number(remotePlayer.lastCatchUpAt) || 0) : 0;
    const bSeen = Number(payload.player.lastSeenAt) || 0;
    const rSeen = remotePlayer ? (Number(remotePlayer.lastSeenAt) || 0) : 0;

    // Ưu tiên local nếu mới hơn rõ, hoặc gần bằng nhưng progress tốt hơn (tránh mất tiến độ khi thoát web / vào admin)
    const localClearlyNewer = bAt > rAt + 800;
    const localCloseAndBetter = (bAt >= rAt - 2000) && (bScore >= rScore * 0.95) && (bScore > rScore || bCatch > rCatch || bSeen > rSeen);
    const localHasAnimalsRemoteEmpty = (bScore > 0 && rScore < 500 && bAt >= rAt - 5000);

    if ((localClearlyNewer || localCloseAndBetter || localHasAnimalsRemoteEmpty) && (rScore < 1000 || bScore >= rScore * 0.75)) {
      currentPlayer = payload.player;
      _playerBaseUpdatedAt = Math.max(bAt, rAt);
      _playerDirty = true;
      try { mergeRemoteAdminGifts(remotePlayer); } catch (_) {}
      // Không để backup local kéo role về user nếu server đang là admin
      if (remotePlayer && remotePlayer.role) {
        currentPlayer.role = remotePlayer.role;
      }
      return true;
    }

    if (rScore > bScore * 1.2 && rAt >= bAt) {
      try { localStorage.removeItem(playerBackupKey(currentUser.uid)); } catch (_) {}
    }
  } catch (e) {
    console.warn('restorePlayerLocalIfNewer', e);
  }
  return false;
}

async function initServerTime() {
  
  _serverTimeOffset = 0;
  _serverTimeReady = true;
  return 0;
}






async function pullRemotePlayerIfNewer() {
  if (!db || !currentUser || !currentPlayer || _pullRemoteBusy) return false;
  
  if (_playerDirty) {
    try { await savePlayer(); } catch (_) {}
    return false;
  }
  _pullRemoteBusy = true;
  try {
    const snap = await db.ref('users/' + currentUser.uid).once('value');
    if (!snap.exists()) return false;
    const remote = snap.val();
    const rAt = Number(remote.updatedAt) || 0;
    const lAt = Number(currentPlayer.updatedAt) || _playerBaseUpdatedAt || 0;
    
    if (rAt > lAt + 1500) {
      if (remote.sessionId && remote.sessionId !== CLIENT_SESSION_ID) {
        // Chỉ ghi đè full khi remote tiến bộ hơn rõ — tránh mất raisedAt / tiến độ trại
        // khi vừa thoát web hoặc chuyển admin rồi quay lại (sessionId luôn khác mỗi lần load)
        const lScore = playerProgressScore(currentPlayer);
        const rScore = playerProgressScore(remote);
        const shouldOverwrite = (rScore >= lScore * 0.9) || (lScore < 500);
        if (shouldOverwrite && !_playerDirty) {
          currentPlayer = remote;
          _playerBaseUpdatedAt = rAt;
          _playerDirty = false;
          if (typeof Game !== 'undefined' && Game.ensureFarms) {
            try { Game.ensureFarms(); Game.syncActiveFarm(); } catch (_) {}
          }
          return true;
        }
        // Local đang tốt hơn hoặc đang dirty → chỉ merge gift/admin, giữ farms local
        if (mergeRemoteAdminGifts(remote)) {
          _playerBaseUpdatedAt = Math.max(_playerBaseUpdatedAt, rAt);
          return true;
        }
        if (rAt > _playerBaseUpdatedAt) _playerBaseUpdatedAt = rAt;
        return false;
      }

      if (mergeRemoteAdminGifts(remote)) {
        _playerBaseUpdatedAt = Math.max(_playerBaseUpdatedAt, rAt);
        return true;
      }
    }
    if (rAt > _playerBaseUpdatedAt) _playerBaseUpdatedAt = rAt;
    return false;
  } catch (e) {
    console.warn('pullRemotePlayerIfNewer', e);
    return false;
  } finally {
    _pullRemoteBusy = false;
  }
}


/** Migrate schema cũ (cây/vườn) → chăn nuôi (animalId/raisedAt/pens/farms) */
function migratePlayerSchema(player) {
  if (!player || typeof player !== 'object') return player;

  // plots → pens
  if (!player.pens && player.plots) {
    player.pens = player.plots;
    delete player.plots;
  }
  // gardens → farms
  if (!player.farms && player.gardens) {
    player.farms = player.gardens;
    delete player.gardens;
  }

  const fixPen = (p, idx) => {
    if (!p || typeof p !== 'object') {
      return {
        id: idx, animalId: null, raisedAt: null, watered: false,
        waterCount: 0, lastWatered: null, feedId: null
      };
    }
    // plantId → animalId
    if (p.plantId != null && (p.animalId == null || p.animalId === '')) {
      p.animalId = p.plantId;
    }
    // plantedAt → raisedAt
    if (p.plantedAt != null && (p.raisedAt == null || p.raisedAt === '')) {
      p.raisedAt = p.plantedAt;
    }
    // fertilizerId / fertId → feedId
    if (p.fertilizerId != null && !p.feedId) p.feedId = p.fertilizerId;
    if (p.fertId != null && !p.feedId) p.feedId = p.fertId;
    // feedActionrId typo leftovers
    if (p.feedActionrId != null && !p.feedId) p.feedId = p.feedActionrId;
    if (p.fertilizedAt != null && !p.feedAt) p.feedAt = p.fertilizedAt;
    if (p.lastCareed != null && !p.lastWatered) p.lastWatered = p.lastCareed;
    if (typeof p.id !== 'number') p.id = idx;
    // cleanup old keys (giữ animalId/raisedAt)
    delete p.plantId;
    delete p.plantedAt;
    delete p.fertilizerId;
    delete p.fertId;
    delete p.feedActionrId;
    delete p.fertilizedAt;
    delete p.lastCareed;
    delete p.feedAt;
    return p;
  };

  if (Array.isArray(player.pens)) {
    player.pens = player.pens.map((p, i) => fixPen(p, i));
  } else if (player.pens && typeof player.pens === 'object') {
    player.pens = Object.keys(player.pens).map((k, i) => fixPen(player.pens[k], i));
  }

  if (Array.isArray(player.farms)) {
    player.farms = player.farms.map((g, gi) => {
      if (Array.isArray(g)) return g.map((p, i) => fixPen(p, i));
      if (g && Array.isArray(g.pens)) {
        g.pens = g.pens.map((p, i) => fixPen(p, i));
        return g.pens;
      }
      if (g && typeof g === 'object') {
        const keys = Object.keys(g).filter(k => /^\d+$/.test(k)).sort((a, b) => Number(a) - Number(b));
        if (keys.length) return keys.map((k, i) => fixPen(g[k], i));
      }
      return Array.isArray(g) ? g : [];
    });
  }

  // inventory.seeds → animals
  if (player.inventory) {
    if (player.inventory.seeds && !player.inventory.animals) {
      player.inventory.animals = player.inventory.seeds;
      delete player.inventory.seeds;
    }
    if (player.inventory.seedsStar && !player.inventory.animalsStar) {
      player.inventory.animalsStar = player.inventory.seedsStar;
      delete player.inventory.seedsStar;
    }
    if (player.inventory.seedsMyth && !player.inventory.animalsMyth) {
      player.inventory.animalsMyth = player.inventory.seedsMyth;
      delete player.inventory.seedsMyth;
    }
    if (player.inventory.fertilizer && !player.inventory.feeds) {
      // legacy number bag
      if (typeof player.inventory.fertilizer === 'object') {
        player.inventory.feeds = player.inventory.fertilizer;
      }
      delete player.inventory.fertilizer;
    }
  }


  // Kho cám: legacy fertilizer / phan-* → feeds / cam-*
  if (player.inventory) {
    if (!player.inventory.feeds || typeof player.inventory.feeds !== 'object') {
      player.inventory.feeds = {};
    }
    const bag = player.inventory.feeds;
    // object cũ
    if (player.inventory.fertilizer && typeof player.inventory.fertilizer === 'object') {
      Object.keys(player.inventory.fertilizer).forEach(k => {
        const q = Number(player.inventory.fertilizer[k]) || 0;
        if (q > 0) bag[k] = (Number(bag[k]) || 0) + q;
      });
      delete player.inventory.fertilizer;
    }
    if (player.inventory.fert && typeof player.inventory.fert === 'object') {
      Object.keys(player.inventory.fert).forEach(k => {
        const q = Number(player.inventory.fert[k]) || 0;
        if (q > 0) bag[k] = (Number(bag[k]) || 0) + q;
      });
      delete player.inventory.fert;
    }
    // map id cũ phan-* sang cam-* (nếu còn)
    const idMap = {
      'phan-thuong': 'cam-thuong',
      'phan-xanh': 'cam-xanh',
      'phan-vang': 'cam-vang',
      'phan-do': 'cam-do'
    };
    Object.keys(idMap).forEach(oldId => {
      if (bag[oldId]) {
        const q = Number(bag[oldId]) || 0;
        const nid = idMap[oldId];
        bag[nid] = (Number(bag[nid]) || 0) + q;
        delete bag[oldId];
      }
    });
  }

  // stats.planted → raised
  if (player.stats) {
    if (player.stats.planted != null && player.stats.raised == null) {
      player.stats.raised = player.stats.planted;
    }
  }

  return player;
}


async function loadPlayer(uid, email) {
  if (typeof initServerTime === 'function') {
    try { await initServerTime(); } catch (_) {}
  }
  const snap = await db.ref('users/' + uid).once('value');
  if (!snap.exists()) {
    // Không list toàn bộ /users (rules chặn). User mới = role user.
    // Gán admin thủ công trong Firebase Console: users/<UID>/role = "admin"
    const role = 'user';
    const data = createDefaultPlayerData(uid, email, role);
    data.updatedAt = nowMs();
    data.sessionId = CLIENT_SESSION_ID;
    data.lastSeenAt = nowMs();
    await db.ref('users/' + uid).set(data);
    currentPlayer = data;
    _playerBaseUpdatedAt = data.updatedAt;
    isAdmin = role === 'admin';
  } else {
    const remoteVal = snap.val();
    
    if (restorePlayerLocalIfNewer(remoteVal)) {
      
    } else {
      currentPlayer = remoteVal;
      _playerBaseUpdatedAt = Number(currentPlayer.updatedAt) || 0;
    }

    if (!currentPlayer.inventory) currentPlayer.inventory = { animals: {}, harvest: {}, feeds: {} };
    if (!currentPlayer.inventory.animals) currentPlayer.inventory.animals = {};
    if (!currentPlayer.inventory.harvest) currentPlayer.inventory.harvest = {};
    
    if (typeof currentPlayer.inventory.feed === 'number') {
      if (!currentPlayer.inventory.feeds) currentPlayer.inventory.feeds = {};
      currentPlayer.inventory.feeds['cam-vang'] = (currentPlayer.inventory.feeds['cam-vang'] || 0) + currentPlayer.inventory.feed;
      delete currentPlayer.inventory.feed;
    }
    if (!currentPlayer.inventory.feeds) currentPlayer.inventory.feeds = {};

    // Hoạt động gần đây: chỉ giữ trong ngày (GMT+7), xóa log ngày cũ
    try {
      if (pruneCurrentPlayerActivity()) {
        _playerDirty = true;
      }
    } catch (_) {}

    
    if (!currentPlayer.seedGiftRemoved) {
      currentPlayer.seedGiftRemoved = true;
    }

    
    if (Object.keys(currentPlayer.inventory.feeds || {}).length === 0) {
      currentPlayer.inventory.feeds = { 'cam-thuong': 5, 'cam-xanh': 2 };
    }

    if (!currentPlayer.stats) currentPlayer.stats = { raised: 0, harvested: 0, earned: 0, spent: 0 };
    if (!currentPlayer.activity) currentPlayer.activity = [];
    if (!currentPlayer.level) currentPlayer.level = 1;
    if (typeof currentPlayer.xp !== 'number') currentPlayer.xp = 0;
    if (!currentPlayer.collection) currentPlayer.collection = {};
    if (!currentPlayer.achievements) currentPlayer.achievements = {};
    if (!currentPlayer.helpCareLog) currentPlayer.helpCareLog = {};
    if (typeof currentPlayer.maxChatStreak !== 'number') currentPlayer.maxChatStreak = 0;
    if (!currentPlayer.inventory.protects) currentPlayer.inventory.protects = {};
    if (!currentPlayer.inventory.animalsStar) currentPlayer.inventory.animalsStar = {};
    if (typeof currentPlayer.fairyUntil !== 'number') currentPlayer.fairyUntil = 0;
    if (typeof currentPlayer.lastFairyCare !== 'number') currentPlayer.lastFairyCare = 0;
    if (typeof currentPlayer.helperUntil !== 'number') currentPlayer.helperUntil = 0;
    if (typeof currentPlayer.lastSeenAt !== 'number') currentPlayer.lastSeenAt = nowMs();
    if (typeof currentPlayer.lastCatchUpAt !== 'number') currentPlayer.lastCatchUpAt = 0;
    if (typeof currentPlayer.updatedAt !== 'number') currentPlayer.updatedAt = _playerBaseUpdatedAt || nowMs();
    if (typeof currentPlayer.lastHelperBuy !== 'number') currentPlayer.lastHelperBuy = 0;
    if (!currentPlayer.fairyConfig || typeof currentPlayer.fairyConfig !== 'object') {
      currentPlayer.fairyConfig = {
        waterMode: 'all', waterCount: 12, useFeed: true,
        fertSource: 'any', fertId: null, fertMode: 'all', fertCount: 12
      };
    }
    if (typeof currentPlayer.nycUntil !== 'number') currentPlayer.nycUntil = 0;
    if (typeof currentPlayer.lastNycCare !== 'number') currentPlayer.lastNycCare = 0;
    if (!currentPlayer.nycConfig || typeof currentPlayer.nycConfig !== 'object') {
      currentPlayer.nycConfig = { animalId: null, mode: 'all', count: 1 };
    } else {
      if (!('animalId' in currentPlayer.nycConfig)) currentPlayer.nycConfig.animalId = null;
      if (!currentPlayer.nycConfig.mode) currentPlayer.nycConfig.mode = 'all';
      if (typeof currentPlayer.nycConfig.count !== 'number') currentPlayer.nycConfig.count = 1;
    }
    if (!currentPlayer.buffPrefs || typeof currentPlayer.buffPrefs !== 'object') {
      currentPlayer.buffPrefs = { fairyEnabled: true, nycEnabled: true };
    } else {
      if (typeof currentPlayer.buffPrefs.fairyEnabled !== 'boolean') currentPlayer.buffPrefs.fairyEnabled = true;
      if (typeof currentPlayer.buffPrefs.nycEnabled !== 'boolean') currentPlayer.buffPrefs.nycEnabled = true;
    }

    if (!Array.isArray(currentPlayer.pens)) {
      const penCount = currentSettings.penCount || 12;
      currentPlayer.pens = Array(penCount).fill(null).map((_, i) => ({
        id: i, animalId: null, raisedAt: null, watered: false, waterCount: 0, lastWatered: null, feedId: null
      }));
    }
    if (!Array.isArray(currentPlayer.pens)) {
      currentPlayer.pens = Object.values(currentPlayer.pens);
    }
    currentPlayer.pens.forEach((p, i) => {
      if (typeof p.waterCount !== 'number') p.waterCount = p.watered ? 1 : 0;
      
      if (p.feed === true && !p.feedId) p.feedId = 'cam-vang';
      if (p.feedId === undefined) p.feedId = null;
      delete p.feed;
      p.id = i;
    });

    try { migratePlayerSchema(currentPlayer); } catch (e) { console.warn('migratePlayerSchema', e); }

    // Luôn lấy role mới nhất từ server (tránh local backup / save cũ ghi đè admin)
    try {
      const roleSnap = await db.ref('users/' + uid + '/role').once('value');
      if (roleSnap.exists() && roleSnap.val()) {
        currentPlayer.role = roleSnap.val();
      }
    } catch (_) {}
    isAdmin = currentPlayer.role === 'admin';
    if (!currentPlayer.helpCareLog) currentPlayer.helpCareLog = {};
    if (typeof Game !== 'undefined' && Game.applyPendingHelps) {
      await Game.applyPendingHelps();
    }
    
    if (typeof Game !== 'undefined' && Game.ensureFarms) {
      try { Game.ensureFarms(); } catch (_) {}
    }
    
    try {
      if (typeof Features !== 'undefined' && Features.claimMarketCredits) {
        const cr = await Features.claimMarketCredits();
        if (cr && cr.claimed > 0) _playerDirty = true;
      }
    } catch (_) {}

    
    if (_playerDirty) {
      try { await savePlayer(); } catch (_) {}
    } else {
      
      try { backupPlayerLocal(); } catch (_) {}
    }
  }
  return currentPlayer;
}


let _lastSaveOkToastAt = 0;
function notifyFirebaseSave(ok, msg, opts) {
  if (typeof showToast !== 'function') return;
  const silent = opts && opts.silent;
  try {
    if (ok) {
      if (silent) return;
      const now = Date.now();
      
      if (now - _lastSaveOkToastAt < 1200) return;
      _lastSaveOkToastAt = now;
      showToast('☁️ Đã lưu lên Firebase', 'success');
    } else {
      
      showToast('⚠️ Chưa lên Firebase' + (msg ? ': ' + msg : '') + ' — F5 có thể mất tiến trình', 'error');
    }
  } catch (_) {}
}






async function savePlayer(opts) {
  opts = opts || {};
  if (!currentUser || !currentPlayer || !db) {
    const r = { ok: false, msg: 'Chưa đăng nhập / chưa có DB' };
    notifyFirebaseSave(false, r.msg, opts);
    return r;
  }
  
  try {
    if (typeof Features !== 'undefined' && Features.claimMarketCredits) {
      await Features.claimMarketCredits();
    }
  } catch (_) {}
  
  if (opts.action && opts.action !== 'enter-sync') {
    try { recordPlayerAction(opts.action, opts.detail || null); } catch (_) {}
  } else if (!opts.silent && !opts.action) {
    try { recordPlayerAction('save', null); } catch (_) {}
  }
  if (typeof Game !== 'undefined' && Game.ensureFarms) {
    try {
      Game.ensureFarms();
      Game.syncActiveFarm();
    } catch (_) {}
  }
  if (typeof currentPlayer.fairyUntil !== 'number') currentPlayer.fairyUntil = 0;
  if (typeof currentPlayer.lastFairyCare !== 'number') currentPlayer.lastFairyCare = 0;
  if (typeof currentPlayer.nycUntil !== 'number') currentPlayer.nycUntil = 0;
  if (typeof currentPlayer.lastNycCare !== 'number') currentPlayer.lastNycCare = 0;

  const t = typeof nowMs === 'function' ? nowMs() : Date.now();
  currentPlayer.timersSyncedAt = t;
  
  
  if (typeof currentPlayer.lastSeenAt !== 'number' || !currentPlayer.lastSeenAt) {
    currentPlayer.lastSeenAt = t;
  }
  currentPlayer.sessionId = CLIENT_SESSION_ID;
  const prev = Math.max(
    Number(currentPlayer.updatedAt) || 0,
    Number(_playerBaseUpdatedAt) || 0
  );
  currentPlayer.updatedAt = Math.max(t, prev + 1);
  _playerDirty = true;

  
  backupPlayerLocal();

  const ref = db.ref('users/' + currentUser.uid);
  let lastErr = null;
  
  try {
    const pre = await ref.once('value');
    if (pre.exists()) {
      const remote = pre.val();
      const rAt = Number(remote.updatedAt) || 0;
      if (rAt > (Number(_playerBaseUpdatedAt) || 0)) {
        mergeRemoteAdminGifts(remote);
        
        if (rAt > (Number(_playerBaseUpdatedAt) || 0)) {
          _playerBaseUpdatedAt = rAt;
        }
        
        currentPlayer.updatedAt = Math.max(
          Number(currentPlayer.updatedAt) || 0,
          rAt + 1,
          typeof nowMs === 'function' ? nowMs() : Date.now()
        );
      }
    }
  } catch (_) {}

  
  let payload;
  // Chỉ lưu activity trong ngày GMT+7
  try { pruneCurrentPlayerActivity(); } catch (_) {}

  try {
    payload = JSON.parse(JSON.stringify(currentPlayer));
  } catch (e) {
    payload = currentPlayer;
  }

  // Bảo vệ role: không cho client ghi đè admin → user khi F5 / save
  try {
    const roleSnap = await ref.child('role').once('value');
    if (roleSnap.exists()) {
      const serverRole = roleSnap.val();
      if (serverRole) {
        payload.role = serverRole;
        currentPlayer.role = serverRole;
        isAdmin = serverRole === 'admin';
      }
    }
  } catch (e) {
    console.warn('preserve role', e);
  }

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await ref.set(payload);
      _playerBaseUpdatedAt = currentPlayer.updatedAt;
      _playerDirty = false;
      backupPlayerLocal();
      try {
        if (typeof Game !== 'undefined' && Game.updateLeaderboard) await Game.updateLeaderboard();
      } catch (_) {}
      try {
        if (typeof Game !== 'undefined' && Game.publishPublicFarm) await Game.publishPublicFarm();
      } catch (_) {}
      try {
        if (currentUser) {
          localStorage.setItem(pendingSyncKey(currentUser.uid), JSON.stringify({
            synced: true,
            at: currentPlayer.updatedAt,
            updatedAt: currentPlayer.updatedAt
          }));
        }
      } catch (_) {}
      
      try { flushPlayLogsToFirebase(); } catch (_) {}
      notifyFirebaseSave(true, null, opts);
      return { ok: true };
    } catch (e) {
      lastErr = e;
      console.warn('savePlayer attempt ' + attempt, e && e.message ? e.message : e);
      await new Promise(r => setTimeout(r, 350 * attempt));
    }
  }
  _playerDirty = true;
  const msg = (lastErr && lastErr.message) ? lastErr.message : 'Lỗi lưu Firebase';
  console.error('savePlayer FAILED', msg);
  notifyFirebaseSave(false, msg, opts);
  return { ok: false, msg };
}





let _timerSyncBusy = false;
let _timerSyncQueued = false;






async function syncTimersToFirebase() {
  return;
}


let _savePlayerDebounceTimer = null;
function scheduleSavePlayer(delayMs = 800) {
  if (!currentUser || !currentPlayer) return;
  _playerDirty = true;
  backupPlayerLocal();
  if (_savePlayerDebounceTimer) clearTimeout(_savePlayerDebounceTimer);
  _savePlayerDebounceTimer = setTimeout(() => {
    _savePlayerDebounceTimer = null;
    savePlayer().catch(e => console.warn('scheduleSavePlayer', e));
  }, delayMs);
}


function flushSavePlayer() {
  if (!currentUser || !currentPlayer) return;
  if (_savePlayerDebounceTimer) {
    clearTimeout(_savePlayerDebounceTimer);
    _savePlayerDebounceTimer = null;
  }
  backupPlayerLocal();
  
  return savePlayer({ silent: true }).catch(e => console.warn('flushSavePlayer', e));
}


if (typeof window !== 'undefined' && !window.__vxOnlineSaveBound) {
  window.__vxOnlineSaveBound = true;
  window.addEventListener('online', () => {
    flushSavePlayer();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      
      flushSavePlayer();
    } else if (_playerDirty) {
      flushSavePlayer();
    }
  });
  window.addEventListener('pagehide', () => {
    backupPlayerLocal();
    flushSavePlayer();
  });
  window.addEventListener('beforeunload', () => {
    backupPlayerLocal();
  });
}





let _playerTimerUnsub = null;
function listenPlayerTimers() {
  
  if (_playerTimerUnsub && currentUser && db) {
    try { db.ref('users/' + currentUser.uid).off('value', _playerTimerUnsub); } catch (_) {}
  }
  _playerTimerUnsub = null;
}

function stopListenPlayerTimers() {
  if (_playerTimerUnsub && currentUser && db) {
    try { db.ref('users/' + currentUser.uid).off('value', _playerTimerUnsub); } catch (_) {}
  }
  _playerTimerUnsub = null;
}

async function refreshAnimals() {
  const snap = await db.ref('animals').once('value');
  if (snap.exists()) {
    const val = snap.val();
    currentAnimals = Object.keys(val).map(k => ({ ...val[k], id: val[k].id || k }));
  }
}

async function saveAnimals() {
  const obj = {};
  currentAnimals.forEach(p => { obj[p.id] = p; });
  await db.ref('animals').set(obj);
}

async function saveSettings() {
  await db.ref('settings').set(currentSettings);
}

function getFeed(id) {
  return DEFAULT_FEEDS.find(f => f.id === id);
}



const DEFAULT_PETS = [
  { id: 'pet-meo-trang', icon: '🐱', name: 'Mèo trắng', price: 800, species: 'cat', coinChance: 0.008, coinMin: 1, coinMax: 3, desc: 'Đi dạo quanh trại. Hiếm khi nhặt được vài xu.' },
  { id: 'pet-meo-den', icon: '🐈‍⬛', name: 'Mèo đen', price: 1200, species: 'cat', coinChance: 0.01, coinMin: 1, coinMax: 4, desc: 'May mắn hơn một chút khi nhặt xu.' },
  { id: 'pet-cho-vang', icon: '🐶', name: 'Chó vàng', price: 900, species: 'dog', coinChance: 0.009, coinMin: 1, coinMax: 3, desc: 'Chạy quanh hàng rào, thỉnh thoảng nhặt xu.' },
  { id: 'pet-cho-shiba', icon: '🐕', name: 'Shiba', price: 1500, species: 'dog', coinChance: 0.012, coinMin: 1, coinMax: 5, desc: 'Shiba tinh anh — tỉ lệ nhặt xu hơi cao hơn.' },
  { id: 'pet-meo-cam', icon: '😺', name: 'Mèo cam', price: 1000, species: 'cat', coinChance: 0.009, coinMin: 1, coinMax: 3, desc: 'Mèo cam béo, đi chậm nhưng dễ thương.' },
  { id: 'pet-cho-corgi', icon: '🦮', name: 'Corgi', price: 1800, species: 'dog', coinChance: 0.011, coinMin: 1, coinMax: 4, desc: 'Chân ngắn, uy tín dài.' },
  { id: 'pet-tho', icon: '🐰', name: 'Thỏ con', price: 700, species: 'other', coinChance: 0.007, coinMin: 1, coinMax: 2, desc: 'Nhảy quanh luống rau.' },
  { id: 'pet-vit', icon: '🦆', name: 'Vịt vàng', price: 650, species: 'other', coinChance: 0.007, coinMin: 1, coinMax: 2, desc: 'Kêu cạp cạp gần ao (tưởng tượng).' },
  { id: 'pet-hamster', icon: '🐹', name: 'Hamster', price: 750, species: 'other', coinChance: 0.008, coinMin: 1, coinMax: 3, desc: 'Phồng má, thỉnh thoảng nhặt xu.' },
  { id: 'pet-panda', icon: '🐼', name: 'Gấu trúc', price: 2500, species: 'other', coinChance: 0.014, coinMin: 2, coinMax: 6, desc: 'Hiếm & đáng yêu — nhặt xu khá tốt.' },
  { id: 'pet-fox', icon: '🦊', name: 'Cáo cam', price: 2000, species: 'other', coinChance: 0.013, coinMin: 1, coinMax: 5, desc: 'Lanh lợi, tỉ lệ nhặt xu cao.' },
  { id: 'pet-owl', icon: '🦉', name: 'Cú mèo', price: 1600, species: 'other', coinChance: 0.01, coinMin: 1, coinMax: 4, desc: 'Canh trại ban đêm.' },
  { id: 'pet-penguin', icon: '🐧', name: 'Chim cánh cụt', price: 2200, species: 'other', coinChance: 0.012, coinMin: 1, coinMax: 5, desc: 'Lách cách đi quanh luống.' },
  { id: 'pet-frog', icon: '🐸', name: 'Ếch xanh', price: 600, species: 'other', coinChance: 0.006, coinMin: 1, coinMax: 2, desc: 'Nhảy gần vòi nước.' }
];






const KITCHEN_STYLES = [
  { key: 'salad', name: 'Salad', icon: '🥗', mult: 1.15 },
  { key: 'soup', name: 'Súp', icon: '🍲', mult: 1.25 },
  { key: 'grill', name: 'Nướng', icon: '🔥', mult: 1.35 },
  { key: 'fry', name: 'Chiên', icon: '🍳', mult: 1.3 },
  { key: 'steam', name: 'Hấp', icon: '🥟', mult: 1.2 },
  { key: 'smoothie', name: 'Sinh tố', icon: '🥤', mult: 1.18 },
  { key: 'cake', name: 'Bánh', icon: '🍰', mult: 1.4 },
  { key: 'jam', name: 'Mứt', icon: '🫙', mult: 1.22 },
  { key: 'tea', name: 'Trà', icon: '🍵', mult: 1.12 },
  { key: 'hotpot', name: 'Lẩu', icon: '🥘', mult: 1.45 },
  { key: 'rice', name: 'Cơm trộn', icon: '🍱', mult: 1.28 },
  { key: 'pickle', name: 'Muối chua', icon: '🥒', mult: 1.1 },
  { key: 'dessert', name: 'Tráng miệng', icon: '🍮', mult: 1.38 },
  { key: 'juice', name: 'Nước ép', icon: '🧃', mult: 1.16 },
  { key: 'roast', name: 'Rang', icon: '☕', mult: 1.24 }
];

let _RECIPE_CACHE = null;
function buildKitchenRecipes(animals) {
  if (_RECIPE_CACHE && _RECIPE_CACHE.length) return _RECIPE_CACHE;
  const list = Array.isArray(animals) && animals.length ? animals : (typeof DEFAULT_ANIMALS !== 'undefined' ? DEFAULT_ANIMALS : []);
  const recipes = [];
  const styles = KITCHEN_STYLES;
  let idx = 0;
  
  for (let i = 0; i < list.length && recipes.length < 1000; i++) {
    const p = list[i];
    if (!p || !p.id) continue;
    for (let s = 0; s < styles.length && recipes.length < 1000; s++) {
      const st = styles[s];
      const need = 1 + (s % 3); 
      const base = Math.max(2, Number(p.sellPrice) || 10);
      const sell = Math.max(need + 1, Math.floor(base * need * st.mult));
      recipes.push({
        id: 'rcp-' + st.key + '-' + p.id,
        name: st.name + ' ' + (p.name || p.id),
        icon: st.icon,
        ingredients: [{ animalId: p.id, qty: need }],
        sellPrice: sell,
        xp: Math.max(1, Math.floor(sell / 20))
      });
      idx++;
    }
  }
  
  for (let i = 0; i < list.length - 1 && recipes.length < 1000; i++) {
    const a = list[i], b = list[i + 1];
    if (!a || !b) continue;
    const st = styles[i % styles.length];
    const sell = Math.floor(((Number(a.sellPrice) || 10) + (Number(b.sellPrice) || 10)) * st.mult);
    recipes.push({
      id: 'rcp-mix-' + a.id + '-' + b.id,
      name: st.name + ' ' + a.name + ' & ' + b.name,
      icon: st.icon,
      ingredients: [
        { animalId: a.id, qty: 1 },
        { animalId: b.id, qty: 1 }
      ],
      sellPrice: Math.max(5, sell),
      xp: Math.max(1, Math.floor(sell / 18))
    });
  }
  _RECIPE_CACHE = recipes.slice(0, 1000);
  return _RECIPE_CACHE;
}

function getKitchenRecipes() {
  const animals = (typeof currentAnimals !== 'undefined' && currentAnimals && currentAnimals.length)
    ? currentAnimals
    : (typeof DEFAULT_ANIMALS !== 'undefined' ? DEFAULT_ANIMALS : []);
  return buildKitchenRecipes(animals);
}
function getKitchenRecipe(id) {
  return getKitchenRecipes().find(r => r.id === id);
}
function getPets() { return DEFAULT_PETS; }
function getPet(id) { return DEFAULT_PETS.find(p => p.id === id); }

const DEFAULT_COMPANIONS = [
  { id: 'cp-001', icon: '🐶', name: 'Cún', price: 400, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-002', icon: '🐱', name: 'Mèo', price: 435, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-003', icon: '🐭', name: 'Chuột', price: 470, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-004', icon: '🐹', name: 'Hamster', price: 505, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-005', icon: '🐰', name: 'Thỏ', price: 540, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-006', icon: '🦊', name: 'Cáo', price: 575, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-007', icon: '🐻', name: 'Gấu', price: 610, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-008', icon: '🐼', name: 'Panda', price: 645, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-009', icon: '🐨', name: 'Gấu trúc', price: 680, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-010', icon: '🐯', name: 'Hổ', price: 715, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-011', icon: '🦁', name: 'Sư tử', price: 850, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-012', icon: '🐮', name: 'Bò', price: 885, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-013', icon: '🐷', name: 'Heo', price: 920, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-014', icon: '🐸', name: 'Ếch', price: 955, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-015', icon: '🐵', name: 'Khỉ', price: 990, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-016', icon: '🐔', name: 'Gà', price: 1025, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-017', icon: '🐧', name: 'Cánh cụt', price: 1060, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-018', icon: '🐦', name: 'Chim', price: 1095, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-019', icon: '🐤', name: 'Gà con', price: 1130, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-020', icon: '🦆', name: 'Vịt', price: 1165, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-021', icon: '🦅', name: 'Đại bàng', price: 1300, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-022', icon: '🦉', name: 'Cú', price: 1335, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-023', icon: '🦇', name: 'Dơi', price: 1370, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-024', icon: '🐺', name: 'Sói', price: 1405, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-025', icon: '🐗', name: 'Lợn rừng', price: 1440, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-026', icon: '🐴', name: 'Ngựa', price: 1475, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-027', icon: '🦄', name: 'Kỳ lân', price: 1510, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-028', icon: '🐝', name: 'Ong', price: 1545, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-029', icon: '🦋', name: 'Bướm', price: 1580, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-030', icon: '🐌', name: 'Ốc sên', price: 1615, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-031', icon: '🐞', name: 'Bọ rùa', price: 1750, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-032', icon: '🐜', name: 'Kiến', price: 1785, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-033', icon: '🦟', name: 'Muỗi', price: 1820, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-034', icon: '🦗', name: 'Dế', price: 1855, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-035', icon: '🐢', name: 'Rùa', price: 1890, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-036', icon: '🐍', name: 'Rắn', price: 1925, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-037', icon: '🦎', name: 'Thằn lằn', price: 1960, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-038', icon: '🐙', name: 'Bạch tuộc', price: 1995, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-039', icon: '🦑', name: 'Mực', price: 2030, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-040', icon: '🦐', name: 'Tôm', price: 2065, rarity: 'common', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-041', icon: '🦞', name: 'Tôm hùm', price: 2860, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-042', icon: '🦀', name: 'Cua', price: 2905, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-043', icon: '🐡', name: 'Cá nóc', price: 2951, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-044', icon: '🐠', name: 'Cá nhiệt đới', price: 2996, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-045', icon: '🐟', name: 'Cá', price: 3042, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-046', icon: '🐬', name: 'Cá heo', price: 3087, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-047', icon: '🐳', name: 'Cá voi', price: 3133, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-048', icon: '🐋', name: 'Cá voi xanh', price: 3178, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-049', icon: '🦈', name: 'Cá mập', price: 3224, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-050', icon: '🐊', name: 'Cá sấu', price: 3269, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-051', icon: '🐅', name: 'Hổ lớn', price: 3445, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-052', icon: '🐆', name: 'Báo', price: 3490, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-053', icon: '🦓', name: 'Ngựa vằn', price: 3536, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-054', icon: '🦍', name: 'Khỉ đột', price: 3581, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-055', icon: '🦧', name: 'Đười ươi', price: 3627, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-056', icon: '🐘', name: 'Voi', price: 3672, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-057', icon: '🦣', name: 'Voi ma mút', price: 3718, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-058', icon: '🦏', name: 'Tê giác', price: 3763, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-059', icon: '🦛', name: 'Hà mã', price: 3809, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-060', icon: '🐪', name: 'Lạc đà', price: 3854, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-061', icon: '🐫', name: 'Lạc đà 2', price: 4030, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-062', icon: '🦒', name: 'Hươu cao', price: 4075, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-063', icon: '🦘', name: 'Kangaroo', price: 4121, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-064', icon: '🦬', name: 'Bò bison', price: 4166, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-065', icon: '🐃', name: 'Trâu', price: 4212, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-066', icon: '🐂', name: 'Bò đực', price: 4257, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-067', icon: '🐄', name: 'Bò cái', price: 4303, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-068', icon: '🐎', name: 'Ngựa 2', price: 4348, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-069', icon: '🐖', name: 'Heo 2', price: 4394, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-070', icon: '🐏', name: 'Cừu đực', price: 4439, rarity: 'rare', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-071', icon: '🐑', name: 'Cừu', price: 6390, rarity: 'epic', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-072', icon: '🦙', name: 'Lạc đà không bướu', price: 6453, rarity: 'epic', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-073', icon: '🐐', name: 'Dê', price: 6516, rarity: 'epic', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-074', icon: '🦌', name: 'Nai', price: 6579, rarity: 'epic', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-075', icon: '🐕', name: 'Chó', price: 6642, rarity: 'epic', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-076', icon: '🐩', name: 'Poodle', price: 6705, rarity: 'epic', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-077', icon: '🦮', name: 'Chó dẫn', price: 6768, rarity: 'epic', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-078', icon: '🐈', name: 'Mèo 2', price: 6831, rarity: 'epic', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-079', icon: '🐓', name: 'Gà trống', price: 6894, rarity: 'epic', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-080', icon: '🦃', name: 'Gà tây', price: 6957, rarity: 'epic', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-081', icon: '🦤', name: 'Dodo', price: 7200, rarity: 'epic', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-082', icon: '🦚', name: 'Công', price: 7263, rarity: 'epic', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-083', icon: '🦜', name: 'Vẹt', price: 7326, rarity: 'epic', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-084', icon: '🦢', name: 'Thiên nga', price: 7389, rarity: 'epic', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-085', icon: '🦩', name: 'Hồng hạc', price: 7452, rarity: 'epic', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-086', icon: '🕊️', name: 'Bồ câu', price: 7515, rarity: 'epic', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-087', icon: '🐇', name: 'Thỏ 2', price: 7578, rarity: 'epic', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-088', icon: '🦝', name: 'Gấu mèo', price: 7641, rarity: 'epic', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-089', icon: '🦨', name: 'Chồn hôi', price: 7704, rarity: 'epic', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-090', icon: '🦡', name: 'Lửng', price: 7767, rarity: 'epic', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-091', icon: '🦫', name: 'Hải ly', price: 11125, rarity: 'legendary', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-092', icon: '🦦', name: 'Rái cá', price: 11212, rarity: 'legendary', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-093', icon: '🦥', name: 'Lười', price: 11300, rarity: 'legendary', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-094', icon: '🐁', name: 'Chuột nhắt', price: 11387, rarity: 'legendary', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-095', icon: '🐀', name: 'Chuột cống', price: 11475, rarity: 'legendary', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-096', icon: '🐿️', name: 'Sóc', price: 11562, rarity: 'legendary', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-097', icon: '🦔', name: 'Nhím', price: 11650, rarity: 'legendary', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-098', icon: '🐲', name: 'Rồng con', price: 11737, rarity: 'legendary', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-099', icon: '🌵', name: 'Xương rồng', price: 11825, rarity: 'legendary', desc: 'Thú cưng ngồi cạnh avatar' },
  { id: 'cp-100', icon: '⭐', name: 'Sao', price: 11912, rarity: 'legendary', desc: 'Thú cưng ngồi cạnh avatar' }
];
function getCompanions() { return DEFAULT_COMPANIONS; }
function getCompanion(id) { return DEFAULT_COMPANIONS.find(c => c.id === id); }





const _FA_BADGE_SEED = [
  ['address-book', 'Sổ địa chỉ', 320], ['address-card', 'Thẻ địa chỉ', 330],
  ['bell', 'Chuông', 340], ['bookmark', 'Đánh dấu', 350], ['building', 'Tòa nhà', 360],
  ['calendar', 'Lịch', 370], ['calendar-check', 'Lịch check', 380], ['calendar-days', 'Lịch ngày', 390],
  ['chart-bar', 'Biểu đồ', 400], ['chess-bishop', 'Tượng cờ', 410], ['chess-king', 'Vua cờ', 420],
  ['chess-knight', 'Mã cờ', 430], ['chess-pawn', 'Tốt cờ', 440], ['chess-queen', 'Hậu cờ', 450],
  ['chess-rook', 'Xe cờ', 460], ['circle', 'Tròn', 300], ['circle-check', 'Tròn check', 350],
  ['circle-dot', 'Chấm tròn', 320], ['circle-down', 'Tròn xuống', 330], ['circle-left', 'Tròn trái', 330],
  ['circle-pause', 'Tạm dừng', 340], ['circle-play', 'Phát', 350], ['circle-question', 'Hỏi', 360],
  ['circle-right', 'Tròn phải', 330], ['circle-stop', 'Dừng', 340], ['circle-up', 'Tròn lên', 330],
  ['circle-user', 'User tròn', 380], ['circle-xmark', 'Tròn X', 360], ['clipboard', 'Clipboard', 370],
  ['clock', 'Đồng hồ', 380], ['clone', 'Clone', 390], ['closed-captioning', 'Phụ đề', 400],
  ['comment', 'Bình luận', 360], ['comment-dots', 'Chat dots', 370], ['comments', 'Chat nhóm', 380],
  ['compass', 'La bàn', 420], ['copy', 'Copy', 350], ['copyright', 'Bản quyền', 360],
  ['credit-card', 'Thẻ tín dụng', 400], ['envelope', 'Thư', 340], ['envelope-open', 'Thư mở', 360],
  ['eye', 'Mắt', 350], ['eye-slash', 'Che mắt', 360], ['face-angry', 'Tức giận', 380],
  ['face-dizzy', 'Chóng mặt', 390], ['face-flushed', 'Đỏ mặt', 400], ['face-frown', 'Buồn', 380],
  ['face-frown-open', 'Buồn miệng mở', 390], ['face-grimace', 'Nhăn mặt', 400],
  ['face-grin', 'Cười toe', 380], ['face-grin-beam', 'Cười tươi', 400],
  ['face-grin-beam-sweat', 'Cười mồ hôi', 420], ['face-grin-hearts', 'Cười tim', 450],
  ['face-grin-squint', 'Cười nheo', 420], ['face-grin-stars', 'Cười sao', 450],
  ['face-grin-tears', 'Cười khóc', 430], ['face-grin-tongue', 'Cười lưỡi', 420],
  ['face-grin-tongue-squint', 'Cười lưỡi nheo', 440], ['face-grin-tongue-wink', 'Cười lưỡi nháy', 440],
  ['face-grin-wide', 'Cười rộng', 420], ['face-grin-wink', 'Cười nháy', 430],
  ['face-kiss', 'Hôn', 420], ['face-kiss-beam', 'Hôn tươi', 440], ['face-kiss-wink-heart', 'Hôn tim', 480],
  ['face-laugh', 'Cười lớn', 400], ['face-laugh-beam', 'Cười rạng', 420],
  ['face-laugh-squint', 'Cười nheo', 420], ['face-laugh-wink', 'Cười nháy', 430],
  ['face-meh', 'Meh', 360], ['face-meh-blank', 'Meh trống', 370],
  ['face-rolling-eyes', 'Lăn mắt', 400], ['face-sad-cry', 'Khóc buồn', 400],
  ['face-sad-tear', 'Nước mắt', 400], ['face-smile', 'Cười', 360],
  ['face-smile-beam', 'Cười tươi', 400], ['face-smile-wink', 'Cười nháy', 420],
  ['face-surprise', 'Ngạc nhiên', 400], ['face-tired', 'Mệt', 380],
  ['file', 'File', 320], ['file-audio', 'File audio', 360], ['file-code', 'File code', 380],
  ['file-excel', 'File Excel', 400], ['file-image', 'File ảnh', 380], ['file-lines', 'File dòng', 360],
  ['file-pdf', 'File PDF', 400], ['file-powerpoint', 'File PPT', 400], ['file-video', 'File video', 380],
  ['file-word', 'File Word', 400], ['file-zipper', 'File zip', 380],
  ['flag', 'Cờ', 350], ['floppy-disk', 'Đĩa mềm', 360], ['folder', 'Thư mục', 340],
  ['folder-closed', 'Thư mục đóng', 350], ['folder-open', 'Thư mục mở', 360],
  ['font-awesome', 'Font Awesome', 500], ['futbol', 'Bóng đá', 400],
  ['gem', 'Ngọc', 600], ['hand', 'Tay', 350], ['hand-back-fist', 'Nắm đấm', 380],
  ['hand-lizard', 'Tay thằn lằn', 400], ['hand-peace', 'Peace', 400],
  ['hand-point-down', 'Chỉ xuống', 360], ['hand-point-left', 'Chỉ trái', 360],
  ['hand-point-right', 'Chỉ phải', 360], ['hand-point-up', 'Chỉ lên', 360],
  ['hand-pointer', 'Con trỏ', 380], ['hand-scissors', 'Kéo', 380],
  ['hand-spock', 'Spock', 400], ['handshake', 'Bắt tay', 420],
  ['hard-drive', 'Ổ cứng', 380], ['heart', 'Tim', 400], ['hospital', 'Bệnh viện', 420],
  ['hourglass', 'Đồng hồ cát', 400], ['hourglass-half', 'Cát nửa', 420],
  ['id-badge', 'Thẻ ID', 400], ['id-card', 'CMND', 420],
  ['image', 'Ảnh', 360], ['images', 'Nhiều ảnh', 380],
  ['keyboard', 'Bàn phím', 380], ['lemon', 'Chanh', 400],
  ['life-ring', 'Phao', 420], ['lightbulb', 'Bóng đèn', 400],
  ['map', 'Bản đồ', 420], ['message', 'Tin nhắn', 360],
  ['money-bill-1', 'Tiền', 400], ['moon', 'Trăng', 420],
  ['newspaper', 'Báo', 380], ['note-sticky', 'Sticky note', 360],
  ['object-group', 'Nhóm object', 380], ['object-ungroup', 'Tách object', 380],
  ['paper-plane', 'Máy bay giấy', 420], ['paste', 'Dán', 350],
  ['pen-to-square', 'Sửa', 380], ['rectangle-list', 'Danh sách', 360],
  ['rectangle-xmark', 'Hộp X', 360], ['registered', 'Registered', 350],
  ['share-from-square', 'Chia sẻ', 380], ['snowflake', 'Tuyết', 420],
  ['square', 'Vuông', 300], ['square-caret-down', 'Caret xuống', 340],
  ['square-caret-left', 'Caret trái', 340], ['square-caret-right', 'Caret phải', 340],
  ['square-caret-up', 'Caret lên', 340], ['square-check', 'Vuông check', 360],
  ['square-full', 'Vuông đầy', 320], ['square-minus', 'Vuông trừ', 340],
  ['square-plus', 'Vuông cộng', 340], ['star', 'Sao', 450],
  ['sun', 'Mặt trời', 430], ['thumbs-down', 'Dislike', 360],
  ['thumbs-up', 'Like', 360], ['trash-can', 'Thùng rác', 350],
  ['user', 'User', 320], ['window-maximize', 'Cửa sổ max', 360],
  ['window-minimize', 'Cửa sổ min', 360], ['window-restore', 'Khôi phục', 360]
];

const DEFAULT_AVATAR_BADGES = (function () {
  const seen = {};
  const out = [];
  let i = 0;
  _FA_BADGE_SEED.forEach(row => {
    const slug = String(row[0] || '').replace(/^fa-/, '');
    if (!slug || seen[slug]) return;
    seen[slug] = true;
    i++;
    const fa = 'fa-regular fa-' + slug;
    const id = 'ab-' + String(i).padStart(3, '0');
    const name = row[1] || slug;
    const price = Number(row[2]) || 400;
    let rarity = 'common';
    if (price >= 550) rarity = 'legendary';
    else if (price >= 450) rarity = 'epic';
    else if (price >= 380) rarity = 'rare';
    out.push({
      id,
      fa,
      slug,
      name,
      price,
      rarity,
      desc: 'Icon FA regular · ' + slug
    });
  });
  return out;
})();

function getAvatarBadges() { return DEFAULT_AVATAR_BADGES; }
function getAvatarBadge(id) { return DEFAULT_AVATAR_BADGES.find(b => b.id === id); }


const DEFAULT_AVATAR_FRAMES = [
  { id: 'af-emerald', name: 'Ngọc Lục Bảo', price: 500, rarity: 'common', desc: 'Xanh ngọc dịu', gradient: 'linear-gradient(135deg,#10b981,#34d399,#6ee7b7)' },
  { id: 'af-mint', name: 'Bạc Hà', price: 600, rarity: 'common', desc: 'Mint mát lạnh', gradient: 'linear-gradient(135deg,#5eead4,#99f6e4,#ccfbf1)' },
  { id: 'af-sky', name: 'Bầu Trời', price: 700, rarity: 'common', desc: 'Xanh trời trong', gradient: 'linear-gradient(135deg,#0ea5e9,#38bdf8,#7dd3fc)' },
  { id: 'af-ocean', name: 'Đại Dương', price: 900, rarity: 'common', desc: 'Sóng xanh sâu', gradient: 'linear-gradient(135deg,#0369a1,#0ea5e9,#22d3ee)' },
  { id: 'af-lime', name: 'Chanh Vàng', price: 550, rarity: 'common', desc: 'Xanh chanh tươi', gradient: 'linear-gradient(135deg,#65a30d,#a3e635,#bef264)' },
  { id: 'af-leaf', name: 'Lá Non', price: 650, rarity: 'common', desc: 'Xanh đồng cỏ', gradient: 'linear-gradient(135deg,#15803d,#22c55e,#86efac)' },
  { id: 'af-sand', name: 'Cát Vàng', price: 800, rarity: 'common', desc: 'Cát nắng', gradient: 'linear-gradient(135deg,#ca8a04,#eab308,#fde047)' },
  { id: 'af-coral', name: 'San Hô', price: 850, rarity: 'common', desc: 'Cam san hô', gradient: 'linear-gradient(135deg,#f97316,#fb923c,#fdba74)' },
  { id: 'af-rose', name: 'Hồng Nhẹ', price: 750, rarity: 'common', desc: 'Hồng pastel', gradient: 'linear-gradient(135deg,#fb7185,#fda4af,#fecdd3)' },
  { id: 'af-lavender', name: 'Oải Hương', price: 900, rarity: 'common', desc: 'Tím oải hương', gradient: 'linear-gradient(135deg,#a78bfa,#c4b5fd,#ddd6fe)' },
  { id: 'af-peach', name: 'Đào', price: 700, rarity: 'common', desc: 'Cam đào', gradient: 'linear-gradient(135deg,#fb923c,#fdba74,#fed7aa)' },
  { id: 'af-ice', name: 'Băng Giá', price: 800, rarity: 'common', desc: 'Xanh băng', gradient: 'linear-gradient(135deg,#67e8f9,#a5f3fc,#ecfeff)' },
  { id: 'af-grape', name: 'Nho', price: 1200, rarity: 'rare', desc: 'Tím nho', gradient: 'linear-gradient(135deg,#7c3aed,#a855f7,#c084fc)' },
  { id: 'af-berry', name: 'Dâu Rừng', price: 1300, rarity: 'rare', desc: 'Hồng dâu', gradient: 'linear-gradient(135deg,#be185d,#ec4899,#f9a8d4)' },
  { id: 'af-sunset', name: 'Hoàng Hôn', price: 1500, rarity: 'rare', desc: 'Cam vàng hoàng hôn', gradient: 'linear-gradient(135deg,#ea580c,#f59e0b,#fbbf24)' },
  { id: 'af-dawn', name: 'Bình Minh', price: 1600, rarity: 'rare', desc: 'Hồng cam bình minh', gradient: 'linear-gradient(135deg,#f43f5e,#fb923c,#fbbf24)' },
  { id: 'af-twilight', name: 'Chạng Vạng', price: 1800, rarity: 'rare', desc: 'Tím hoàng hôn', gradient: 'linear-gradient(135deg,#4c1d95,#7c3aed,#c026d3)' },
  { id: 'af-aurora', name: 'Cực Quang', price: 2200, rarity: 'rare', desc: 'Xanh tím cực quang', gradient: 'linear-gradient(135deg,#06b6d4,#22c55e,#a855f7)' },
  { id: 'af-neon', name: 'Neon', price: 2400, rarity: 'rare', desc: 'Neon điện', gradient: 'linear-gradient(135deg,#22d3ee,#e879f9,#f472b6)' },
  { id: 'af-fire', name: 'Ngọn Lửa', price: 2000, rarity: 'rare', desc: 'Đỏ lửa', gradient: 'linear-gradient(135deg,#991b1b,#ef4444,#fbbf24)' },
  { id: 'af-gold', name: 'Hoàng Kim', price: 2800, rarity: 'rare', desc: 'Vàng kim', gradient: 'linear-gradient(135deg,#a16207,#eab308,#fef08a)' },
  { id: 'af-silver', name: 'Bạch Kim', price: 2600, rarity: 'rare', desc: 'Bạc trắng', gradient: 'linear-gradient(135deg,#64748b,#94a3b8,#e2e8f0)' },
  { id: 'af-copper', name: 'Đồng', price: 2100, rarity: 'rare', desc: 'Cam đồng', gradient: 'linear-gradient(135deg,#9a3412,#ea580c,#fdba74)' },
  { id: 'af-jade', name: 'Phỉ Thúy', price: 2500, rarity: 'rare', desc: 'Xanh phỉ thúy', gradient: 'linear-gradient(135deg,#047857,#10b981,#6ee7b7)' },
  { id: 'af-sapphire', name: 'Sapphire', price: 3000, rarity: 'rare', desc: 'Xanh sapphire', gradient: 'linear-gradient(135deg,#1e3a8a,#2563eb,#60a5fa)' },
  { id: 'af-ruby', name: 'Ruby', price: 3200, rarity: 'rare', desc: 'Đỏ ruby', gradient: 'linear-gradient(135deg,#9f1239,#e11d48,#fb7185)' },
  { id: 'af-amethyst', name: 'Thạch Anh Tím', price: 3100, rarity: 'rare', desc: 'Tím thạch anh', gradient: 'linear-gradient(135deg,#5b21b6,#8b5cf6,#c4b5fd)' },
  { id: 'af-topaz', name: 'Topaz', price: 2900, rarity: 'rare', desc: 'Vàng topaz', gradient: 'linear-gradient(135deg,#b45309,#f59e0b,#fde68a)' },
  { id: 'af-opal', name: 'Opal', price: 3500, rarity: 'epic', desc: 'Opal lung linh', gradient: 'linear-gradient(135deg,#67e8f9,#f9a8d4,#fde68a)' },
  { id: 'af-prism', name: 'Lăng Kính', price: 4200, rarity: 'epic', desc: 'Cầu vồng lăng kính', gradient: 'linear-gradient(135deg,#ef4444,#eab308,#22c55e,#3b82f6,#a855f7)' },
  { id: 'af-galaxy', name: 'Thiên Hà', price: 4800, rarity: 'epic', desc: 'Ngân hà', gradient: 'linear-gradient(135deg,#312e81,#7c3aed,#ec4899,#22d3ee)' },
  { id: 'af-nebula', name: 'Tinh Vân', price: 4500, rarity: 'epic', desc: 'Tinh vân hồng', gradient: 'linear-gradient(135deg,#4c1d95,#db2777,#06b6d4)' },
  { id: 'af-comet', name: 'Sao Chổi', price: 4000, rarity: 'epic', desc: 'Vệt sao chổi', gradient: 'linear-gradient(135deg,#0ea5e9,#e0f2fe,#fbbf24)' },
  { id: 'af-void', name: 'Hư Không', price: 3800, rarity: 'epic', desc: 'Đêm hư không', gradient: 'linear-gradient(135deg,#0f172a,#334155,#64748b)' },
  { id: 'af-bloodmoon', name: 'Trăng Máu', price: 4600, rarity: 'epic', desc: 'Trăng đỏ', gradient: 'linear-gradient(135deg,#450a0a,#9f1239,#fb7185)' },
  { id: 'af-frost', name: 'Sương Giá', price: 3600, rarity: 'epic', desc: 'Băng sương', gradient: 'linear-gradient(135deg,#e0f2fe,#7dd3fc,#bae6fd)' },
  { id: 'af-magma', name: 'Nham Thạch', price: 4400, rarity: 'epic', desc: 'Dung nham', gradient: 'linear-gradient(135deg,#7c2d12,#ea580c,#fbbf24)' },
  { id: 'af-forest', name: 'Rừng Thiêng', price: 3700, rarity: 'epic', desc: 'Rừng sâu', gradient: 'linear-gradient(135deg,#14532d,#16a34a,#a3e635)' },
  { id: 'af-sakura', name: 'Anh Đào', price: 3900, rarity: 'epic', desc: 'Hoa anh đào', gradient: 'linear-gradient(135deg,#fb7185,#fecdd3,#fff1f2)' },
  { id: 'af-lotus', name: 'Sen Hồng', price: 4100, rarity: 'epic', desc: 'Sen hồng', gradient: 'linear-gradient(135deg,#db2777,#f9a8d4,#fce7f3)' },
  { id: 'af-rainbow', name: 'Cầu Vồng', price: 5500, rarity: 'epic', desc: 'Cầu vồng đầy đủ', gradient: 'linear-gradient(135deg,#ef4444,#f59e0b,#22c55e,#3b82f6,#a855f7,#ec4899)' },
  { id: 'af-cyber', name: 'Cyberpunk', price: 5200, rarity: 'epic', desc: 'Neon cyber', gradient: 'linear-gradient(135deg,#f0abfc,#22d3ee,#f472b6)' },
  { id: 'af-matrix', name: 'Matrix', price: 5000, rarity: 'epic', desc: 'Mã xanh Matrix', gradient: 'linear-gradient(135deg,#052e16,#22c55e,#86efac)' },
  { id: 'af-royal', name: 'Hoàng Gia', price: 5800, rarity: 'epic', desc: 'Xanh vàng hoàng gia', gradient: 'linear-gradient(135deg,#1e3a8a,#eab308,#fef08a)' },
  { id: 'af-dragon', name: 'Rồng Lửa', price: 6000, rarity: 'epic', desc: 'Rồng lửa', gradient: 'linear-gradient(135deg,#7f1d1d,#f97316,#fde047)' },
  { id: 'af-phoenix', name: 'Phượng Hoàng', price: 6500, rarity: 'legendary', desc: 'Phượng hoàng', gradient: 'linear-gradient(135deg,#9a3412,#f43f5e,#fbbf24)' },
  { id: 'af-unicorn', name: 'Kỳ Lân', price: 7000, rarity: 'legendary', desc: 'Kỳ lân mộng', gradient: 'linear-gradient(135deg,#c4b5fd,#f9a8d4,#67e8f9,#fef08a)' },
  { id: 'af-angel', name: 'Thiên Thần', price: 7200, rarity: 'legendary', desc: 'Ánh thiên thần', gradient: 'linear-gradient(135deg,#fefce8,#fde68a,#e0e7ff)' },
  { id: 'af-demon', name: 'Ác Ma', price: 6800, rarity: 'legendary', desc: 'Bóng ác ma', gradient: 'linear-gradient(135deg,#450a0a,#7f1d1d,#a855f7)' },
  { id: 'af-celestial', name: 'Thiên Thể', price: 8000, rarity: 'legendary', desc: 'Vũ trụ thiên thể', gradient: 'linear-gradient(135deg,#1e1b4b,#6366f1,#e0e7ff,#fbbf24)' },
  { id: 'af-yggdrasil', name: 'Yggdrasil', price: 9000, rarity: 'legendary', desc: 'Con thế giới', gradient: 'linear-gradient(135deg,#064e3b,#10b981,#f59e0b,#f43f5e)' },
  { id: 'af-divine', name: 'Thần Thánh', price: 9500, rarity: 'legendary', desc: 'Ánh thần thánh', gradient: 'linear-gradient(135deg,#fbbf24,#fef08a,#ffffff,#a5f3fc)' },
  { id: 'af-chaos', name: 'Hỗn Mang', price: 8500, rarity: 'legendary', desc: 'Hỗn mang sắc màu', gradient: 'linear-gradient(135deg,#ef4444,#a855f7,#22d3ee,#f59e0b)' },
  { id: 'af-eternity', name: 'Vĩnh Hằng', price: 10000, rarity: 'legendary', desc: 'Vĩnh hằng', gradient: 'linear-gradient(135deg,#0c4a6e,#7c3aed,#db2777,#fbbf24)' },
  { id: 'af-infinity', name: 'Vô Cực', price: 12000, rarity: 'legendary', desc: 'Vô cực', gradient: 'linear-gradient(135deg,#111827,#6366f1,#ec4899,#22d3ee,#fbbf24)' },
  { id: 'af-mint-glow', name: 'Mint Phát Sáng', price: 1100, rarity: 'rare', desc: 'Mint phát quang', gradient: 'linear-gradient(135deg,#14b8a6,#5eead4,#ccfbf1)' },
  { id: 'af-blue-flame', name: 'Lửa Xanh', price: 2700, rarity: 'rare', desc: 'Ngọn lửa xanh', gradient: 'linear-gradient(135deg,#1d4ed8,#3b82f6,#67e8f9)' },
  { id: 'af-pink-gold', name: 'Hồng Kim', price: 3300, rarity: 'rare', desc: 'Hồng ánh kim', gradient: 'linear-gradient(135deg,#db2777,#f59e0b,#fef08a)' },
  { id: 'af-teal-purple', name: 'Teal Tím', price: 3400, rarity: 'rare', desc: 'Teal pha tím', gradient: 'linear-gradient(135deg,#0f766e,#8b5cf6,#c4b5fd)' },
  { id: 'af-orange-crush', name: 'Cam Ép', price: 1700, rarity: 'rare', desc: 'Cam rực', gradient: 'linear-gradient(135deg,#c2410c,#f97316,#fdba74)' },
  { id: 'af-soft-rainbow', name: 'Cầu Vồng Mềm', price: 4800, rarity: 'epic', desc: 'Cầu vồng pastel', gradient: 'linear-gradient(135deg,#fda4af,#fde68a,#bbf7d0,#bfdbfe,#e9d5ff)' },
  { id: 'af-midnight', name: 'Nửa Đêm', price: 4300, rarity: 'epic', desc: 'Nửa đêm', gradient: 'linear-gradient(135deg,#020617,#1e3a8a,#6366f1)' },
  { id: 'af-candy', name: 'Kẹo Ngọt', price: 4700, rarity: 'epic', desc: 'Kẹo màu', gradient: 'linear-gradient(135deg,#f472b6,#a78bfa,#67e8f9,#fde047)' },
  { id: 'af-steel', name: 'Thép', price: 2400, rarity: 'rare', desc: 'Xám thép', gradient: 'linear-gradient(135deg,#1f2937,#6b7280,#d1d5db)' },
  { id: 'af-bronze', name: 'Đồng Cổ', price: 2300, rarity: 'rare', desc: 'Đồng cổ', gradient: 'linear-gradient(135deg,#78350f,#b45309,#fcd34d)' },
  { id: 'af-emerald-gold', name: 'Lục Kim', price: 5100, rarity: 'epic', desc: 'Ngọc lục + vàng', gradient: 'linear-gradient(135deg,#065f46,#10b981,#fbbf24)' },
  { id: 'af-violet-sky', name: 'Trời Tím', price: 4000, rarity: 'epic', desc: 'Trời tím', gradient: 'linear-gradient(135deg,#4c1d95,#7c3aed,#38bdf8)' },
  { id: 'af-watermelon', name: 'Dưa Hấu', price: 1900, rarity: 'rare', desc: 'Dưa hấu', gradient: 'linear-gradient(135deg,#14532d,#22c55e,#fb7185)' },
  { id: 'af-cotton', name: 'Kẹo Bông', price: 2800, rarity: 'rare', desc: 'Kẹo bông', gradient: 'linear-gradient(135deg,#fce7f3,#e0e7ff,#ecfeff)' },
  { id: 'af-toxic', name: 'Độc Tố', price: 3500, rarity: 'epic', desc: 'Xanh độc', gradient: 'linear-gradient(135deg,#365314,#84cc16,#d9f99d)' },
  { id: 'af-plasma', name: 'Plasma', price: 5600, rarity: 'epic', desc: 'Plasma', gradient: 'linear-gradient(135deg,#db2777,#8b5cf6,#22d3ee)' },
  { id: 'af-solar', name: 'Thái Dương', price: 6200, rarity: 'legendary', desc: 'Thái dương', gradient: 'linear-gradient(135deg,#9a3412,#f59e0b,#fef9c3)' },
  { id: 'af-lunar', name: 'Thái Âm', price: 6100, rarity: 'legendary', desc: 'Ánh trăng', gradient: 'linear-gradient(135deg,#1e293b,#94a3b8,#f8fafc)' },
  { id: 'af-starborn', name: 'Sinh Sao', price: 8800, rarity: 'legendary', desc: 'Sinh ra từ sao', gradient: 'linear-gradient(135deg,#312e81,#f472b6,#fde047,#67e8f9)' },
  { id: 'af-mythic', name: 'Huyền Thoại', price: 11000, rarity: 'legendary', desc: 'Huyền thoại', gradient: 'linear-gradient(135deg,#7c2d12,#a855f7,#22d3ee,#fbbf24)' },
  { id: 'af-gen-001', name: 'Sương Mai', price: 540, rarity: 'common', desc: 'Gradient common', gradient: 'linear-gradient(135deg,#e27e36,#8ad826,#6bdf70)' },
  { id: 'af-gen-002', name: 'Gió Biển', price: 580, rarity: 'common', desc: 'Gradient common', gradient: 'linear-gradient(135deg,#e2c636,#26d842,#6bdfc3)' },
  { id: 'af-gen-003', name: 'Mây Hồng', price: 620, rarity: 'common', desc: 'Gradient common', gradient: 'linear-gradient(135deg,#b5e236,#26d8c3,#6ba8df)' },
  { id: 'af-gen-004', name: 'Trăng Non', price: 660, rarity: 'common', desc: 'Gradient common', gradient: 'linear-gradient(135deg,#6de236,#266dd8,#826bdf)' },
  { id: 'af-gen-005', name: 'Sao Đêm', price: 700, rarity: 'common', desc: 'Gradient common', gradient: 'linear-gradient(135deg,#36e247,#26d8b8,#6bafdf)' },
  { id: 'af-gen-006', name: 'Hồ Thu', price: 740, rarity: 'common', desc: 'Gradient common', gradient: 'linear-gradient(135deg,#36e28f,#2678d8,#7b6bdf)' },
  { id: 'af-gen-007', name: 'Nắng Hạ', price: 780, rarity: 'common', desc: 'Gradient common', gradient: 'linear-gradient(135deg,#36e2d7,#5426d8,#cf6bdf)' },
  { id: 'af-gen-008', name: 'Mưa Xuân', price: 820, rarity: 'common', desc: 'Gradient common', gradient: 'linear-gradient(135deg,#36a4e2,#d526d8,#df6b9c)' },
  { id: 'af-gen-009', name: 'Lá Vàng', price: 860, rarity: 'common', desc: 'Gradient common', gradient: 'linear-gradient(135deg,#365ce2,#d8265b,#df8e6b)' },
  { id: 'af-gen-010', name: 'Tuyết Trắng', price: 900, rarity: 'common', desc: 'Gradient common', gradient: 'linear-gradient(135deg,#5836e2,#ca26d8,#df6ba3)' },
  { id: 'af-gen-011', name: 'Khói Tím', price: 940, rarity: 'common', desc: 'Gradient common', gradient: 'linear-gradient(135deg,#a036e2,#d82666,#df876b)' },
  { id: 'af-gen-012', name: 'Nước Mắt', price: 980, rarity: 'common', desc: 'Gradient common', gradient: 'linear-gradient(135deg,#e236db,#d86626,#dfdb6b)' },
  { id: 'af-gen-013', name: 'Cát Hồng', price: 1020, rarity: 'common', desc: 'Gradient common', gradient: 'linear-gradient(135deg,#e23693,#cad826,#90df6b)' },
  { id: 'af-gen-014', name: 'Rêu Xanh', price: 1060, rarity: 'common', desc: 'Gradient common', gradient: 'linear-gradient(135deg,#e2364a,#49d826,#6bdf9a)' },
  { id: 'af-gen-015', name: 'Con Ngọc', price: 1100, rarity: 'common', desc: 'Gradient common', gradient: 'linear-gradient(135deg,#e26936,#d5d826,#97df6b)' },
  { id: 'af-gen-016', name: 'Ánh Kim', price: 2300, rarity: 'rare', desc: 'Gradient rare', gradient: 'linear-gradient(135deg,#e2b236,#54d826,#6bdf93)' },
  { id: 'af-gen-017', name: 'Bóng Đêm', price: 2350, rarity: 'rare', desc: 'Gradient rare', gradient: 'linear-gradient(135deg,#cae236,#26d878,#6bd8df)' },
  { id: 'af-gen-018', name: 'Sóng Lửa', price: 2400, rarity: 'rare', desc: 'Gradient rare', gradient: 'linear-gradient(135deg,#81e236,#26b8d8,#6b85df)' },
  { id: 'af-gen-019', name: 'Mắt Mèo', price: 2450, rarity: 'rare', desc: 'Gradient rare', gradient: 'linear-gradient(135deg,#39e236,#2638d8,#a56bdf)' },
  { id: 'af-gen-020', name: 'Cánh Bướm', price: 2500, rarity: 'rare', desc: 'Gradient rare', gradient: 'linear-gradient(135deg,#36e27b,#26c3d8,#6b8cdf)' },
  { id: 'af-gen-021', name: 'Hoa Cúc', price: 2550, rarity: 'rare', desc: 'Gradient rare', gradient: 'linear-gradient(135deg,#36e2c3,#2642d8,#9e6bdf)' },
  { id: 'af-gen-022', name: 'Đom Đóm', price: 2600, rarity: 'rare', desc: 'Gradient rare', gradient: 'linear-gradient(135deg,#36b9e2,#8a26d8,#df6bcd)' },
  { id: 'af-gen-023', name: 'Sứa Biển', price: 2650, rarity: 'rare', desc: 'Gradient rare', gradient: 'linear-gradient(135deg,#3670e2,#d826a6,#df6b79)' },
  { id: 'af-gen-024', name: 'San Hô Đỏ', price: 2700, rarity: 'rare', desc: 'Gradient rare', gradient: 'linear-gradient(135deg,#4336e2,#d82626,#dfb16b)' },
  { id: 'af-gen-025', name: 'Ngọc Trai', price: 2750, rarity: 'rare', desc: 'Gradient rare', gradient: 'linear-gradient(135deg,#8c36e2,#d826b1,#df6b80)' }
];
function getAvatarFrames() { return DEFAULT_AVATAR_FRAMES; }
function getAvatarFrame(id) { return DEFAULT_AVATAR_FRAMES.find(f => f.id === id); }