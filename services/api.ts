import type {
  VideoItem,
  Comment,
  PlayUrlResponse,
  QRCodeInfo,
  VideoShotData,
  DanmakuItem,
  LiveRoom,
  LiveRoomDetail,
  LiveAnchorInfo,
  LiveStreamInfo,
  SearchSuggestItem,
  HotSearchItem,
} from './types';
import {
  MOCK_VIDEOS,
  MOCK_VIDEO_DETAIL,
  MOCK_PLAY_URL,
  MOCK_LIVE_ROOMS,
  MOCK_LIVE_DETAIL,
  MOCK_LIVE_ANCHOR,
  MOCK_LIVE_STREAM,
  MOCK_COMMENTS,
  MOCK_DANMAKU,
  MOCK_SEARCH_RESULTS,
  MOCK_HOT_SEARCH,
  MOCK_SEARCH_SUGGEST,
  MOCK_UPLOADER_INFO,
  MOCK_UPLOADER_VIDEOS,
  MOCK_USER_INFO,
  MOCK_QR_CODE,
  PUBLIC_VIDEOS,
} from './mockData';

export async function getRecommendFeed(_freshIdx = 0): Promise<VideoItem[]> {
  return MOCK_VIDEOS;
}

export async function getPopularVideos(_pn = 1): Promise<VideoItem[]> {
  return MOCK_VIDEOS;
}

export function getVideoDetail(_bvid: string): Promise<VideoItem> {
  return Promise.resolve(MOCK_VIDEO_DETAIL);
}

export async function getVideoRelated(_bvid: string): Promise<VideoItem[]> {
  return MOCK_VIDEOS.slice(5, 15);
}

export function getPlayUrl(_bvid: string, _cid: number, _qn = 64): Promise<PlayUrlResponse> {
  return Promise.resolve(MOCK_PLAY_URL);
}

export async function getPlayUrlForDownload(
  _bvid: string,
  _cid: number,
  _qn = 64,
): Promise<string> {
  return PUBLIC_VIDEOS[0].url;
}

export async function getUploaderStat(_mid: number): Promise<{ follower: number; archiveCount: number }> {
  return {
    follower: MOCK_UPLOADER_INFO.follower,
    archiveCount: MOCK_UPLOADER_INFO.archiveCount,
  };
}

export async function getUploaderInfo(_mid: number): Promise<{ name: string; face: string; sign: string; follower: number; archiveCount: number }> {
  return MOCK_UPLOADER_INFO;
}

export async function getUploaderVideos(_mid: number, pn = 1, ps = 20): Promise<{ videos: VideoItem[]; total: number }> {
  const allVideos = MOCK_UPLOADER_VIDEOS.videos;
  const start = (pn - 1) * ps;
  const videos = allVideos.slice(start, start + ps);
  return { videos, total: MOCK_UPLOADER_VIDEOS.total };
}

export async function getUserInfo(): Promise<{ face: string; uname: string; mid: number }> {
  return MOCK_USER_INFO;
}

export async function getComments(
  _aid: number,
  _cursor = '',
  _sort = 2,
): Promise<{ replies: Comment[]; nextCursor: string; isEnd: boolean }> {
  return {
    replies: MOCK_COMMENTS,
    nextCursor: '',
    isEnd: true,
  };
}

export async function getVideoShot(_bvid: string, _cid: number): Promise<VideoShotData | null> {
  return null;
}

export async function generateQRCode(): Promise<QRCodeInfo> {
  return MOCK_QR_CODE;
}

export async function pollQRCode(_qrcode_key: string): Promise<{ code: number; cookie?: string }> {
  return { code: 0, cookie: 'mock-sessdata-2025' };
}

export async function getLiveList(_page = 1, _parentAreaId = 0): Promise<LiveRoom[]> {
  return MOCK_LIVE_ROOMS;
}

export async function getLiveRoomDetail(_roomId: number): Promise<LiveRoomDetail> {
  return MOCK_LIVE_DETAIL;
}

export async function getLiveAnchorInfo(_roomId: number): Promise<LiveAnchorInfo> {
  return MOCK_LIVE_ANCHOR;
}

export async function getLiveStreamUrl(_roomId: number, _qn = 10000): Promise<LiveStreamInfo> {
  return MOCK_LIVE_STREAM;
}

export async function searchVideos(_keyword: string, _page = 1, _order = ''): Promise<VideoItem[]> {
  return MOCK_SEARCH_RESULTS;
}

export async function getLiveDanmakuHistory(_roomId: number): Promise<{
  danmakus: DanmakuItem[];
  adminMsgs: string[];
}> {
  return {
    danmakus: MOCK_DANMAKU.slice(0, 10).map(d => ({ ...d, timeline: '2025-03-26 20:00:00' })),
    adminMsgs: ['欢迎来到直播间！', '主播正在直播中，请文明发言'],
  };
}

export async function getDanmaku(_cid: number): Promise<DanmakuItem[]> {
  return MOCK_DANMAKU;
}

export async function getFollowedLiveRooms(): Promise<LiveRoom[]> {
  return MOCK_LIVE_ROOMS.slice(0, 3);
}

export async function getSearchSuggest(_term: string): Promise<SearchSuggestItem[]> {
  return MOCK_SEARCH_SUGGEST;
}

export async function getHotSearch(): Promise<HotSearchItem[]> {
  return MOCK_HOT_SEARCH;
}
