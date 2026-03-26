import type {
  VideoItem,
  Comment,
  PlayUrlResponse,
  QRCodeInfo,
  DanmakuItem,
  LiveRoom,
  LiveRoomDetail,
  LiveAnchorInfo,
  LiveStreamInfo,
  SearchSuggestItem,
  HotSearchItem,
} from '../types';

// ─── Public-domain video URLs (Blender Foundation, CC BY 3.0) ────────────────
const VIDEOS_BASE = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample';
export const PUBLIC_VIDEOS = [
  { url: `${VIDEOS_BASE}/BigBuckBunny.mp4`, duration: 596 },
  { url: `${VIDEOS_BASE}/ElephantsDream.mp4`, duration: 653 },
  { url: `${VIDEOS_BASE}/ForBiggerBlazes.mp4`, duration: 15 },
  { url: `${VIDEOS_BASE}/ForBiggerEscapes.mp4`, duration: 15 },
  { url: `${VIDEOS_BASE}/SubaruOutbackOnStreetAndDirt.mp4`, duration: 60 },
];

// Public HLS live demo stream
export const PUBLIC_HLS_URL = 'https://demo.unified-streaming.com/k8s/live/stable/univision.isml/univision.m3u8';

// ─── Mock Videos ─────────────────────────────────────────────────────────────
const makeVideo = (
  id: number,
  title: string,
  ownerName: string,
  view: number,
  duration: number,
  desc = '',
): VideoItem => ({
  bvid: `BV1mock${String(id).padStart(5, '0')}`,
  aid: 170000 + id,
  title,
  pic: `https://picsum.photos/seed/cover${id}/320/180`,
  owner: {
    mid: 1000 + id,
    name: ownerName,
    face: `https://picsum.photos/seed/face${id}/80/80`,
  },
  stat: {
    view,
    danmaku: Math.floor(view * 0.01),
    reply: Math.floor(view * 0.005),
    like: Math.floor(view * 0.08),
    coin: Math.floor(view * 0.03),
    favorite: Math.floor(view * 0.04),
  },
  duration,
  desc: desc || `${title} - 精彩内容等你来看`,
  cid: 200000 + id,
  pages: [{ cid: 200000 + id, part: 'P1' }],
});

export const MOCK_VIDEOS: VideoItem[] = [
  makeVideo(1, 'React Native 开发实战：从零打造视频 App', '前端小课堂', 892341, 3612, 'React Native + Expo 完整项目开发教程'),
  makeVideo(2, '2025 最值得买的数码产品 TOP10 盘点', '数码测评君', 1234567, 847),
  makeVideo(3, '【旅行 Vlog】独自骑行川藏线全记录', '骑行者小明', 2341890, 5432),
  makeVideo(4, '零基础学 TypeScript：类型系统完全指南', 'Code时间', 543210, 4821),
  makeVideo(5, '家常红烧肉的正确做法，肥而不腻的秘诀', '厨艺达人', 3456789, 614),
  makeVideo(6, '【游戏解说】原神：深境螺旋 36 星通关思路', '游戏攻略站', 1876543, 1823),
  makeVideo(7, '自制小型无人机：从电路到飞行全过程', '创客工坊', 654321, 2156),
  makeVideo(8, '《流浪地球》系列深度解析：科幻背后的科学', '影视解说', 4321098, 1245),
  makeVideo(9, '街头摄影技巧：用手机拍出胶片感', '摄影日记', 765432, 731),
  makeVideo(10, 'Python 爬虫入门到实战：B 站数据分析', '编程达人', 432109, 3024),
  makeVideo(11, '健身房新手指南：第一个月该如何训练', '运动博主', 987654, 1132),
  makeVideo(12, '极简主义生活 30 天挑战：我的真实体验', '生活方式', 543210, 892),
  makeVideo(13, '【科普】量子计算机究竟有多厉害？', '科技前沿', 2109876, 1543),
  makeVideo(14, '钢琴自学 3 个月：我的进步汇报', '音乐小站', 432109, 423),
  makeVideo(15, '深夜食堂系列：一个人的火锅', '美食治愈系', 1234567, 512),
  makeVideo(16, 'Kubernetes 生产环境部署实战', '云原生笔记', 321098, 5421),
  makeVideo(17, '二次元周边开箱：这次花了多少钱', '动漫爱好者', 876543, 723),
  makeVideo(18, '城市骑行探店：寻找北京最好吃的煎饼', '骑行探城', 654321, 1823),
  makeVideo(19, 'After Effects 粒子特效从入门到精通', '视觉创作者', 543210, 4215),
  makeVideo(20, '古典园林建筑美学：苏州园林深度游', '人文记录', 765432, 2134),
];

// ─── Mock Video Detail (single item with pages) ───────────────────────────────
export const MOCK_VIDEO_DETAIL: VideoItem = {
  ...MOCK_VIDEOS[0],
  pages: [
    { cid: 200001, part: '第一集：环境搭建与项目初始化' },
    { cid: 200002, part: '第二集：路由系统与页面跳转' },
    { cid: 200003, part: '第三集：数据请求与状态管理' },
  ],
  ugc_season: {
    id: 5001,
    title: 'React Native 开发系列',
    cover: 'https://picsum.photos/seed/season1/320/180',
    ep_count: 3,
    sections: [{
      episodes: [
        { aid: 170001, bvid: 'BV1mock00001', cid: 200001, title: '第一集：环境搭建与项目初始化', arc: { pic: 'https://picsum.photos/seed/ep1/320/180', stat: { view: 120000 } } },
        { aid: 170002, bvid: 'BV1mock00002', cid: 200002, title: '第二集：路由系统与页面跳转', arc: { pic: 'https://picsum.photos/seed/ep2/320/180', stat: { view: 98000 } } },
        { aid: 170003, bvid: 'BV1mock00003', cid: 200003, title: '第三集：数据请求与状态管理', arc: { pic: 'https://picsum.photos/seed/ep3/320/180', stat: { view: 87000 } } },
      ],
    }],
  },
};

// ─── Mock Play URL (Big Buck Bunny MP4) ───────────────────────────────────────
export const MOCK_PLAY_URL: PlayUrlResponse = {
  quality: 64,
  accept_quality: [64, 32, 16],
  accept_description: ['720P 高清', '480P 清晰', '360P 流畅'],
  durl: [
    {
      url: PUBLIC_VIDEOS[0].url,
      length: PUBLIC_VIDEOS[0].duration * 1000,
      size: 158008374,
    },
  ],
};

// ─── Mock Live Rooms ──────────────────────────────────────────────────────────
const makeLiveRoom = (id: number, title: string, uname: string, online: number, area: string, parentArea: string): LiveRoom => ({
  roomid: 10000 + id,
  uid: 2000 + id,
  title,
  uname,
  face: `https://picsum.photos/seed/lface${id}/80/80`,
  cover: `https://picsum.photos/seed/lcover${id}/320/180`,
  online,
  area_name: area,
  parent_area_name: parentArea,
});

export const MOCK_LIVE_ROOMS: LiveRoom[] = [
  makeLiveRoom(1, '【王者荣耀】冲击王者段位！今晚必上！', '游戏达人_阿强', 34521, '王者荣耀', '网游'),
  makeLiveRoom(2, '手工皮具制作直播 | 今天做一个手包', '皮艺工坊', 8921, '手工', '生活'),
  makeLiveRoom(3, '午夜 Lo-Fi 音乐陪你学习/工作', 'ChillBeats', 15432, '聊天', '娱乐'),
  makeLiveRoom(4, '【原神】4.4 版本新角色实机测试', '原神攻略组', 56789, '原神', '手游'),
  makeLiveRoom(5, '开心农场直播 | 今天种番茄', '农场日记', 3241, '户外', '生活'),
  makeLiveRoom(6, '前端开发直播 | React 组件库搭建中', '码农老王', 4567, '编程', '科技'),
  makeLiveRoom(7, '街头篮球挑战赛直播', '球场风云', 23456, '篮球', '体育'),
  makeLiveRoom(8, '深夜美食 | 自制拉面挑战', '吃货小熊', 12345, '美食', '生活'),
  makeLiveRoom(9, '油画创作直播 | 荷花池系列第三幅', '画室时光', 5678, '绘画', '知识'),
  makeLiveRoom(10, '电子音乐制作 | 今天做一首 House', 'DJ小飞', 9876, '音乐', '娱乐'),
];

// ─── Mock Live Detail ─────────────────────────────────────────────────────────
export const MOCK_LIVE_DETAIL: LiveRoomDetail = {
  roomid: 10001,
  uid: 2001,
  title: '【王者荣耀】冲击王者段位！今晚必上！',
  description: '每晚 8 点开播，带你上分，欢迎关注！',
  live_status: 1,
  online: 34521,
  area_name: '王者荣耀',
  parent_area_name: '网游',
  keyframe: 'https://picsum.photos/seed/lcover1/320/180',
};

// ─── Mock Live Anchor ─────────────────────────────────────────────────────────
export const MOCK_LIVE_ANCHOR: LiveAnchorInfo = {
  uid: 2001,
  uname: '游戏达人_阿强',
  face: 'https://picsum.photos/seed/lface1/80/80',
};

// ─── Mock Live Stream ─────────────────────────────────────────────────────────
export const MOCK_LIVE_STREAM: LiveStreamInfo = {
  hlsUrl: PUBLIC_HLS_URL,
  flvUrl: '',
  qn: 10000,
  qualities: [
    { qn: 10000, desc: '原画' },
    { qn: 400, desc: '蓝光' },
    { qn: 250, desc: '超清' },
    { qn: 150, desc: '高清' },
  ],
};

// ─── Mock Comments ────────────────────────────────────────────────────────────
const makeComment = (id: number, message: string, uname: string, like: number, ctime: number, replies?: Comment[]): Comment => ({
  rpid: id,
  content: { message },
  member: {
    uname,
    avatar: `https://picsum.photos/seed/avatar${id}/80/80`,
  },
  like,
  ctime,
  replies: replies ?? null,
});

export const MOCK_COMMENTS: Comment[] = [
  makeComment(1, '这个教程真的太详细了，跟着做了一遍，全部成功！感谢 UP 主！', '学习中的小白', 3421, 1711900800, [
    makeComment(101, '同感！我也跟着做了，一次就跑通了', '一起学习吧', 156, 1711901000),
    makeComment(102, '建议 UP 主出续集，期待更多内容', '热心观众', 89, 1711902000),
  ]),
  makeComment(2, '视频质量非常高，讲解清晰，逻辑连贯，希望能持续更新！', '程序员小张', 2156, 1711800000),
  makeComment(3, '有一个问题想问：第 15 分钟那里的代码，我运行报错了，能帮看看吗？', '新手求助', 45, 1711700000),
  makeComment(4, '三刷了，每次都有新收获。这才是真正有价值的内容！', '资深学习者', 1876, 1711600000),
  makeComment(5, '搭配官方文档一起看效果更好，UP 主解释了很多文档里没写清楚的地方', '老码农', 987, 1711500000),
  makeComment(6, 'UP 主声音好好听，讲解也好清晰，已一键三连', '铁粉', 765, 1711400000),
  makeComment(7, '这个项目已经在我们公司用上了，非常实用，谢谢分享！', '公司 CTO', 2345, 1711300000),
  makeComment(8, '期待下一期！什么时候更新啊', '催更小队', 432, 1711200000),
  makeComment(9, '讲得太好了，我把链接发给了我所有搞技术的朋友', '传播者', 876, 1711100000),
  makeComment(10, '从零基础看到现在，终于看懂了！感动到流泪', '逆袭中', 1234, 1711000000),
];

// ─── Mock Danmaku ─────────────────────────────────────────────────────────────
export const MOCK_DANMAKU: DanmakuItem[] = [
  { time: 3.2, mode: 1, fontSize: 25, color: 0xffffff, text: '开始了开始了！' },
  { time: 5.8, mode: 1, fontSize: 25, color: 0x00aeec, text: '这个项目好厉害！' },
  { time: 8.1, mode: 1, fontSize: 25, color: 0xffffff, text: '感谢 UP 主分享' },
  { time: 12.4, mode: 1, fontSize: 25, color: 0xffdd00, text: '前排占座' },
  { time: 15.7, mode: 1, fontSize: 25, color: 0xffffff, text: '这个思路很清晰' },
  { time: 20.3, mode: 1, fontSize: 25, color: 0xff6699, text: '哇真的吗！' },
  { time: 25.6, mode: 1, fontSize: 25, color: 0xffffff, text: '666666' },
  { time: 30.1, mode: 1, fontSize: 25, color: 0x00ff00, text: '学到了学到了' },
  { time: 35.9, mode: 1, fontSize: 25, color: 0xffffff, text: '这里有点没懂，多看几遍' },
  { time: 42.0, mode: 1, fontSize: 25, color: 0xffd700, text: '牛！！！' },
  { time: 48.5, mode: 1, fontSize: 25, color: 0xffffff, text: '已经收藏了' },
  { time: 55.2, mode: 1, fontSize: 25, color: 0xff4500, text: '三连了！' },
  { time: 62.8, mode: 1, fontSize: 25, color: 0xffffff, text: '讲得比我老师好多了' },
  { time: 70.3, mode: 4, fontSize: 25, color: 0x00aeec, text: '精华部分来了' },
  { time: 78.9, mode: 1, fontSize: 25, color: 0xffffff, text: '笔记已做好' },
  { time: 85.4, mode: 1, fontSize: 25, color: 0xff69b4, text: '太棒了' },
  { time: 92.1, mode: 1, fontSize: 25, color: 0xffffff, text: '这部分之前一直不理解' },
  { time: 100.6, mode: 1, fontSize: 25, color: 0xadff2f, text: '醍醐灌顶！' },
  { time: 110.2, mode: 1, fontSize: 25, color: 0xffffff, text: '求下一期！' },
  { time: 120.8, mode: 1, fontSize: 25, color: 0x87ceeb, text: '这才是干货' },
  { time: 130.5, mode: 1, fontSize: 25, color: 0xffffff, text: '做了好久的笔记' },
  { time: 145.3, mode: 1, fontSize: 25, color: 0xff8c00, text: '弹幕飘过' },
  { time: 158.7, mode: 5, fontSize: 25, color: 0xffd700, text: '收藏从未空过' },
  { time: 172.4, mode: 1, fontSize: 25, color: 0xffffff, text: '看了三遍终于懂了' },
  { time: 185.9, mode: 1, fontSize: 25, color: 0x00aeec, text: '这个项目已经部署上线了' },
  { time: 200.2, mode: 1, fontSize: 25, color: 0xffffff, text: '太有用了' },
  { time: 215.6, mode: 1, fontSize: 25, color: 0xff1493, text: '冲！' },
  { time: 230.1, mode: 1, fontSize: 25, color: 0xffffff, text: '发给朋友了' },
  { time: 248.8, mode: 1, fontSize: 25, color: 0x7fffd4, text: '期待续集！' },
  { time: 265.3, mode: 4, fontSize: 25, color: 0xffd700, text: '感谢 UP 主！' },
];

// ─── Mock Search ──────────────────────────────────────────────────────────────
export const MOCK_SEARCH_RESULTS: VideoItem[] = MOCK_VIDEOS.slice(0, 10);

export const MOCK_HOT_SEARCH: HotSearchItem[] = [
  { keyword: 'React Native 教程', show_name: 'React Native 教程' },
  { keyword: '2025 科技趋势', show_name: '2025 科技趋势' },
  { keyword: '原神新角色', show_name: '原神新角色' },
  { keyword: '零基础学编程', show_name: '零基础学编程' },
  { keyword: '街头摄影技巧', show_name: '街头摄影技巧' },
  { keyword: '健身入门指南', show_name: '健身入门指南' },
  { keyword: '美食制作教程', show_name: '美食制作教程' },
  { keyword: '音乐制作软件', show_name: '音乐制作软件' },
  { keyword: '旅行 vlog 拍摄', show_name: '旅行 vlog 拍摄' },
  { keyword: 'TypeScript 最佳实践', show_name: 'TypeScript 最佳实践' },
];

export const MOCK_SEARCH_SUGGEST: SearchSuggestItem[] = [
  { value: 'React Native 开发教程', ref: 1000 },
  { value: 'React Native 环境搭建', ref: 800 },
  { value: 'React Native 路由跳转', ref: 650 },
  { value: 'React Native 性能优化', ref: 500 },
  { value: 'React Native 动画效果', ref: 420 },
];

// ─── Mock Uploader ────────────────────────────────────────────────────────────
export const MOCK_UPLOADER_INFO = {
  name: '前端小课堂',
  face: 'https://picsum.photos/seed/uploader1/80/80',
  sign: '专注前端开发教学，每周更新高质量视频教程。如果内容对你有帮助，欢迎关注！',
  follower: 328900,
  archiveCount: 156,
};

export const MOCK_UPLOADER_VIDEOS = {
  videos: MOCK_VIDEOS.slice(0, 12),
  total: 156,
};

// ─── Mock User Info ───────────────────────────────────────────────────────────
export const MOCK_USER_INFO = {
  face: 'https://picsum.photos/seed/myavatar/80/80',
  uname: '访客用户',
  mid: 99999,
};

// ─── Mock QR Code ─────────────────────────────────────────────────────────────
export const MOCK_QR_CODE: QRCodeInfo = {
  url: 'https://example.com/mock-login-qr',
  qrcode_key: 'mock-qrcode-key-2025',
};
