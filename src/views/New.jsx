import { useEffect } from 'react';
import DiaryEditor from '../components/DiaryEditor';

function New() {
  useEffect(() => {
    document.title = `나만 보는 비밀 일기장 - 새 일기`;
  }, []);

  return (
    <div>
      <DiaryEditor />
    </div>
  );
}

export default New;
