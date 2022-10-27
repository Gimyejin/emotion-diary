import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import DiaryEditor from "../components/DiaryEditor";
import { DiaryStateContext } from "../App";

const Edit = () => {
    const [originData, setOriginData] = useState('');
    const navigate = useNavigate();

    const { id } = useParams();
    const diaryList = useContext(DiaryStateContext);

    useEffect(() => {
        if (diaryList.length > 0) {
            const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));

            //undefind일시 false로 탐지(없는 id를 방지)
            if (targetDiary) {
                setOriginData(targetDiary);
            } else {
                navigate('/', { replace: true })
            }
        }
    }, [id])

    return (
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData} />}
        </div>
    );
};
export default Edit;