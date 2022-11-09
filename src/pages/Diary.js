import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryEmotionContext, DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { getStringDate } from "../util/data";
import { emotionList_util } from "../util/emotion";


const Diary = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState('');
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
                setData(targetDiary);
                console.log(targetDiary)
                emotion.current = emotionList.find(
                    (list) => parseInt(list.emotion_id) === parseInt(targetDiary.emotion)
                );
            } else {
                navigate('/', { replace: true })
            }
        }
    }, [id, diaryList]);

    if (!data) {
        return <div className="DiaryPage">로딩중...</div>
    } else {
        //(방법2) util에서 emotionList를 넣고 사용할 경우
        /* const curEmotionData = emotionList_util.find(
            (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
        );
        console.log(curEmotionData) */
        return (
            <div className="DiaryPage">
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
                    headText={`${getStringDate(new Date(data.date))} 기록`}
                />
                <article>
                    <section>
                        <h4>오늘의 감정</h4>
                        <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
                            <img src={process.env.PUBLIC_URL + emotion.current.emotion_img} />
                            <div className="emotion_desrcipt">
                                {emotion.current.emotion_descript}
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4>오늘의 일기</h4>
                        <div className="diary_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>

            </div>
        );
    }
};
export default Diary;