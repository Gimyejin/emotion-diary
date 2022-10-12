import { useContext, useEffect, useState } from "react";
import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";

const Home = () => {
    const diaryList = useContext(DiaryStateContext);
    //날짜에 맞게 가공된 data List
    const [data, setData] = useState([]);
    const [curDate, setCurDate] = useState(new Date());
    //getFullYear : 현재 데이터시간의 년도를 가져옴
    //getMonth : 현재 데이터시간의 월을 가져옴 (1월이 0월이기에 +1을 해줘야함)
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`


    //curData가 변화하는 순간만 리렌더링하겠다
    useEffect(() => {
        if (diaryList.length >= 1) {
            //n년도 n월 1일
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();

            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                0
            ).getTime();

            setData(
                diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
            )
        }
    }, [diaryList, curDate]);

    useEffect(() => {
        console.log("useEffect", data)
    }, [data])


    const increaseMonth = () => {
        setCurDate(
            new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                curDate.getDate()
            )
        )
    }
    const decreaseMonth = () => {
        setCurDate(
            new Date(
                curDate.getFullYear(),
                curDate.getMonth() - 1,
                curDate.getDate()
            )
        )
    }
    return (
        <div>
            <MyHeader
                headText={headText}
                leftChild={<MyButton text={'<'} onClick={decreaseMonth} />}
                rightChild={<MyButton text={'>'} onClick={increaseMonth} />}
            />
            <DiaryList diaryList={data} />
        </div>
    );
};
export default Home;