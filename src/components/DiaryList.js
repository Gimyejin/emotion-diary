import React, { useState } from "react"
import MyButton from "./MyButton"
import { useNavigate } from "react-router-dom"
import DiaryItem from "./DiaryItem"


const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된순" },
]

const filterOptionList = [/* filter를 value, setFilter는 바꾸는 함수,optionList는 filterOptionList로 */
    { value: "all", name: "전부 다" },
    { value: "good", name: "좋은 감정만" },
    { value: "bad", name: "나쁜 감정만" },
]
const ControlMenu = React.memo(({ value, onChange, optionList }) => {//onChagne는 setSortType임
    console.log(value)
    return (<select className="controlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
        {optionList.map((it, idx) =>
            <option key={idx} value={it.value}>{it.name}</option>
        )}
    </select>);
})

const DiaryList = ({ diaryList }) => {
    const navigate = useNavigate();//페이지 이동
    //정렬기준
    const [sortType, setSortType] = useState('latest');
    const [filter, setFilter] = useState("all");

    const getProcessDiaryList = () => {

        const filterCallBack = (item) => {
            if (filter === 'good') {
                return parseInt(item.emotion) <= 3;
            } else {
                return parseInt(item.emotion) > 3;
            }
        }

        const compare = (a, b) => {
            if (sortType === 'latest') {
                return parseInt(b.date) - parseInt(a.date);
            }
            else {
                return parseInt(a.date) - parseInt(b.date);
            }
        }
        //JSON.stringify() : 배열을 JSON화 시켜서 문자열로 바꿈
        //JSON.parse() : 문자열에서 다시 배열로 복구
        const copyList = JSON.parse(JSON.stringify(diaryList));
        const filtedList = filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

        const sortedList = filtedList.sort(compare);
        return sortedList;
    }

    return <div className="DiaryList">
        <div className="menu_wrapper">
            <div className="left_col">
                <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
                <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
            </div>
            <div className="right_col">
                <MyButton type={'positive'} text={'새 일기쓰기'} onClick={() => navigate('/new')} />
            </div>
        </div>


        {getProcessDiaryList().map((it) => (
            <DiaryItem key={it.id} {...it} />
        ))}
    </div>
}


DiaryList.defaultProps = {
    diaryList: []
}
export default DiaryList;