import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import DiaryEditor from "../components/DiaryEditor";
import { DiaryDispatchContext, DiaryStateContext } from "../App";

const Edit = () => {
    const [originData, setOriginData] = useState('');
    const navigate = useNavigate();
    const { onEdit } = useContext(DiaryDispatchContext);

    //url에 있는 param값을 받아옴
    const { id } = useParams();
    const diaryList = useContext(DiaryStateContext);
    //targetId, date, content, emotion
    const handleEdit = ({ id, date, content, emotion }) => {
        onEdit(id, date, content, emotion)
    }
    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));
            console.log(targetDiary)

            //undefind일시 false로 탐지(없는 id를 방지)
            if (targetDiary) {
                setOriginData(targetDiary);
            } else {
                navigate('/', { replace: true })
            }
        }

    }, [id, diaryList])

    return (
        <div>
            <DiaryEditor thisDiary={originData} />
        </div>
    );
};
export default Edit;