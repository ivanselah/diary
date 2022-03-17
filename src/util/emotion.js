export const emotionList = [
  { no: 1, des: '완전좋음' },
  { no: 2, des: '좋음' },
  { no: 3, des: '그럭저럭' },
  { no: 4, des: '나쁨' },
  { no: 5, des: '끔찍함' },
].map((item) => {
  return {
    emotion_id: item.no,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion${item.no}.png`,
    emotion_descript: item.des,
  };
});
