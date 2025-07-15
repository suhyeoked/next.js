// pages/items/[itemId].tsx
import { useRouter } from "next/router" 
import Header from "@/components/Header/Header"
import './itemId.css'
import { ChangeEvent, useState, useEffect } from "react"

export default function DetailPages() {
  const router = useRouter()
  const { itemId } = router.query as { itemId: string }

  // ★ 추가: preview 상태
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string>('')

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null

    if (f) {
      if (!/^[A-Za-z0-9_-]+\.[A-Za-z0-9]+$/.test(f.name)) {
        setError('파일 이름은 영문, 숫자, _, - 만 사용할 수 있습니다.')
        setFile(null)
        setPreview(null)
        return
      }
      if (f.size > 5 * 1024 * 1024) {
        setError('파일 크기는 5MB 이하여야 합니다.')
        setFile(null)
        setPreview(null)
        return
      }

      setError('')
      setFile(f)

      // ★ 미리보기 URL 생성
      const url = URL.createObjectURL(f)
      setPreview(url)
    } else {
      // 선택 취소 시
      setFile(null)
      setPreview(null)
      setError('')
    }
  }

  // ★ unmount 시 메모리 해제
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <>
      <Header />

      <div className="ToDoTitle">
        <input type="checkbox" id={`checkbox-${itemId}`} />
        <label htmlFor={`checkbox-${itemId}`}>
          <p>{decodeURIComponent(itemId)}</p>
        </label>
      </div>

      <div className="ToDoDetailPages">
        <div className="ToDoDetailInput">
          <div className="ToDoTitleInputImage">
            {preview
                ? <img src={preview} alt="미리보기" className="preview-img" />
                : ''}
            <label htmlFor="input-file" className="ToDoTitleInputImageAdd">
              +
            </label>
            <input
              id="input-file"
              className="ToDoTitleInputImageAddInput"
              type="file"
              accept="image/*"
              onChange={handleFile}
              style={{ display: 'none' }}
            />
            {error && <div className="file-error">⚠️ {error}</div>}
          </div>

          <div className="ToDoTitleMemo">
            <p>Memo</p>
            <input
              type="text"
              placeholder="오메가 3, 프로폴리스, 아연 챙겨먹기"
            />
          </div>
        </div>
      </div>

      <div className="ToDoTitleButton">
        <button className="CorrectionButton">✔ 수정 완료</button>
        <button className="DeleteButton">X 삭제하기</button>
      </div>
    </>
  )
}
