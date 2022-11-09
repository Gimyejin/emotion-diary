import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryEmotionContext, DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";


const Diary = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [originData, setOriginData] = useState('');
    const diaryList = useContext(DiaryStateContext);
    const emotionList = useContext(DiaryEmotionContext);
    //let emotion = [];
    let emotion = useRef([]);

    useEffect(() => {
        if (diaryList.length > 0) {
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            );
            if (targetDiary) {
                setOriginData(targetDiary);
                console.log(targetDiary)
                emotion.current = emotionList.find(
                    (list) => parseInt(list.emotion_id) === parseInt(targetDiary.emotion)
                );
            } else {
                navigate('/', { replace: true })
            }
        }
    }, [])

    //날짜 양식 yyyy-mm-dd로 수정필요
    //const strDate = new Date(parseInt(originData.date)).toLocaleDateString();
    const writeDay = new Date(originData.date);
    const headText =
        `${writeDay.getFullYear()}년 ${writeDay.getMonth() + 1}월 ${writeDay.getDate()}일`

    console.log("emotion", emotion.current.emotion_img);
    return (
        <div>
            <MyHeader
                leftChild={
                    <MyButton
                        text={'< 뒤로가기'}
                        onClick={() => navigate(-1)}
                    />}
                rightChild={
                    <MyButton text={'수정하기'}
                        onClick={() => navigate(`/edit/${id}`)}
                    />}
                headText={headText + ' 기록'}
            />
            <div>
                <h4>오늘의 감정</h4>
                <img src={process.env.PUBLIC_URL + emotion.current.emotion_img} />
                <h4>{emotion.current.emotion_descript}</h4>
            </div>
            <div>
                {originData.content}
            </div>
        </div>
    );
};
export default Diary;