import { useNavigate, useParams } from "react-router-dom";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";

const Diary = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log("id", id)
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
                        onClick={() => navigate(-1)}
                    />}
            />
        </div>
    );
};
export default Diary;