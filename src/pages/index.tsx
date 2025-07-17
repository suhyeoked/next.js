import { useRouter } from 'next/router'
import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [toDoList , setToDoList] = useState<string[]>([]);
  const [toDoListInput , setToDoListInput] = useState<string>("");
  const [doneList , setDoneList] = useState<string[]>([]);

  const handleCheck = (index: number) => {
    const movedItem = toDoList[index];
    setToDoList(prev => prev.filter((_, i) => i !== index));
    setDoneList(prevDone => [movedItem, ...prevDone]);
  }
  const handleUncheck = (index: number) => {
    const movedItem = doneList[index];
    setDoneList(prev => prev.filter((_, i) => i !== index));      // DONE 목록에서 제거
    setToDoList(prev => [movedItem, ...prev]);                    // TO DO 목록에 추가
  }
  return (
    <>
      <Header />
      <div className="ToDoInput">
        <div className="Input">
          <input onChange={(e)=>{
            setToDoListInput(e.target.value)
            console.log(e.target.value)
          }} className="ToDoInputText" type="text" placeholder="할 일을 입력해주세요" />
          <div className="pcButton">
            <Button onClick={()=>{
              const copy = [...toDoList]
              copy.unshift(toDoListInput)
              setToDoList(copy)
            }}>
              +추가하기
            </Button>
          </div>
          <div className="phoneButton">
            <Button onClick={()=>{
               const copy = [...toDoList];
               copy.unshift(toDoListInput);
               setToDoList(copy);
            }}>
              +
            </Button>
          </div>
        </div>
      </div>
      <main className="TodoMain">
        <div className="Todo">
          <p>TO DO</p>
          {
            toDoList.map((item , i)=>{
              return(
                <div className="ToDoCheck" >
                  <input type="checkbox" 
                  onChange={()=>{
                    handleCheck(i)
                    console.log('checked');
                  }}/>
                    <p onClick={(e)=>{
                  router.push(`/items/${encodeURIComponent(item)}`)
                  e.stopPropagation(); 
                }} key={item}>
                      {item}
                    </p>
                </div>  
              )
            })
          }
        </div>
        <div className="Done">
          <p>DONE</p>
          {
            doneList.map((item , i)=>{
              return(
                <div className="DoneCheck">
                  <input type="checkbox" checked
                  onChange={()=>{
                    handleUncheck(i)
                  }}/>
                    <p onClick={(e)=>{
                  router.push(`/items/${encodeURIComponent(item)}`)
                  e.stopPropagation(); 
                }}>
                      {item}
                    </p>
                </div>  
              )
            })
          }
        </div>
      </main>
    </>
  );
}
